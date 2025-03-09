/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React, { useRef, useEffect, useState } from "react";
import { geoPath, geoNaturalEarth1 } from "d3-geo";
import { feature } from "topojson-client";
import { select, zoom } from "d3";

declare global {
  interface Window {
    mapData?: any;
  }
}

// Country visit data with counts
// Format: [country name, visit count]

// List of countries you've visited with visit counts
// You can modify this list with countries you've visited
const visitedCountries: [string, number][] = [
  ["United States", 10],
  ["India", 4],
  ["France", 3],
  ["Luxembourg", 1],
  ["Ireland", 1],
  ["Northern Ireland", 1],
  ["Netherlands", 1],
  ["Belgium", 1],
  ["Germany", 1],
  ["Switzerland", 1],
  ["Italy", 1],
  ["Monaco", 1],
  ["Czechia", 1],
  ["Austria", 1],
  ["Hungary", 1],
  ["Denmark", 1],
  ["Portugal", 1],
  ["Spain", 2],
  ["Gibraltar", 1],
  ["Morocco", 1],
  ["Egypt", 1],
  ["Chile", 1],
  ["South Korea", 1],
  ["Costa Rica", 1],
];

// Enhanced green color scale with better visibility on dark background
const COUNTRY_COLORS = [
  "#3A3A3A", // Gray for 0 visits
  "#32E875", // Medium green (1 visit)
  "#00C853", // Rich green (2-3 visits)
  "#00893C", // Deep forest green (4+ visits)
];

// Function to get color based on visit count with absolute scaling
const getColorForVisitCount = (count: number): string => {
  if (count === 0) return COUNTRY_COLORS[0]; // Gray
  if (count === 1) return COUNTRY_COLORS[1]; // Medium green
  if (count >= 2 && count <= 3) return COUNTRY_COLORS[2]; // Rich green
  return COUNTRY_COLORS[3]; // Deep forest green (4+)
};

export default function TravelMap() {
  const svgRef = useRef<SVGSVGElement>(null);
  const mapGroupRef = useRef<SVGGElement | null>(null);
  const tooltipRef = useRef<HTMLDivElement>(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [hoveredCountry, setHoveredCountry] = useState<string | null>(null);
  const [hoveredVisitCount, setHoveredVisitCount] = useState<number | null>(
    null
  );
  const [tooltipPosition, setTooltipPosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    // Only run this effect on the client
    if (typeof window === "undefined") return;

    const fetchData = async () => {
      try {
        // Fetch the world map data
        const response = await fetch(
          "https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json"
        );

        if (!response.ok) {
          throw new Error(`Failed to load map data: ${response.status}`);
        }

        const data = await response.json();

        // Convert TopoJSON to GeoJSON
        const countries = feature(data, data.objects.countries);

        // Draw the map
        drawMap(countries);
        setIsLoaded(true);
      } catch (err: any) {
        console.error("Error loading map data:", err);
        setError(err.message);
      }
    };

    fetchData();

    // Add resize handler to redraw map when window size changes
    const handleResize = () => {
      if (isLoaded) {
        
        const countries = feature(
          window.mapData,
          window.mapData.objects.countries
        );
        drawMap(countries);
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Helper function to check if a country has been visited and get visit count
  const getVisitInfo = (
    countryName: string
  ): { visited: boolean; count: number } => {
    // Case-insensitive check
    const normalizedName = countryName.toLowerCase();

    for (const [name, count] of visitedCountries) {
      const entryName = name.toLowerCase();
      if (
        normalizedName.includes(entryName) ||
        entryName.includes(normalizedName)
      ) {
        return { visited: true, count };
      }
    }

    return { visited: false, count: 0 };
  };

  const drawMap = (geoData: any) => {
    if (!svgRef.current) return;

    // Store map data for resize events
    if (typeof window !== "undefined" && !window.mapData) {
      window.mapData = geoData.objects
        ? geoData
        : { objects: { countries: { geometries: geoData.features } } };
    }

    // Clear any existing content
    select(svgRef.current).selectAll("*").remove();

    // Set dimensions
    const width = svgRef.current.clientWidth;
    const height = svgRef.current.clientHeight;

    // Create Natural Earth projection with adjusted scale to fill the container
    const projection = geoNaturalEarth1()
      .scale(Math.min(width / 5.2, height / 2.8)) // Adjusted scale to ensure map is visible and fills container
      .translate([width / 2, height / 2]);

    // Create path generator
    const path = geoPath().projection(projection);

    // Create SVG element
    const svg = select(svgRef.current);

    // Create a container group for all map elements
    const g = svg.append("g");
    mapGroupRef.current = g.node();

    // Add zoom behavior
    const zoomBehavior = zoom()
      .scaleExtent([1, 8]) // Min zoom is 1 (original size), max zoom is 8x
      .on("zoom", (event: any) => {
        // Apply transform to the group
        g.attr(
          "transform",
          `translate(${event.transform.x},${event.transform.y}) scale(${event.transform.k})`
        );

        // Hide tooltip when zooming
        setHoveredCountry(null);
        setHoveredVisitCount(null);

        // If zooming out to scale 1, center the map
        if (event.transform.k === 1) {
          event.transform.x = 0;
          event.transform.y = 0;
          g.attr("transform", "translate(0,0) scale(1)");
        }
      });

    // Apply zoom behavior to SVG
    svg.call(zoomBehavior as any);

    // Draw countries in the container group
    g.selectAll<SVGPathElement, any>("path")
      .data(geoData.features)
      .enter()
      .append("path")
      .attr("d", path as any)
      .attr("fill", (d: any) => {
        // Get country visit info
        const countryName = d.properties.name || "";
        const { count } = getVisitInfo(countryName);

        // Use color scale based on visit count
        return getColorForVisitCount(count);
      })
      .attr("stroke", "#000000")
      .attr("stroke-width", 0.5)
      .on("mouseover", function (event: any, d: any) {
        // Get country name and visit info
        const countryName = d.properties.name || "Unknown";
        const { count } = getVisitInfo(countryName);

        setHoveredCountry(countryName);
        setHoveredVisitCount(count);

        // Get the mouse position relative to the SVG element
        const svgElement = svgRef.current;
        if (!svgElement) return;

        // Get SVG bounding rect
        const svgRect = svgElement.getBoundingClientRect();

        // Calculate mouse position relative to the viewport
        const mouseX = event.clientX - svgRect.left;
        const mouseY = event.clientY - svgRect.top;

        // Set tooltip position based on mouse coordinates
        setTooltipPosition({
          x: mouseX,
          y: mouseY - 30,
        });
      })
      .on("mouseout", function () {
        setHoveredCountry(null);
        setHoveredVisitCount(null);
      });

    // Update the instructions text
    // svg
    //   .append("text")
    //   .attr("x", 10)
    //   .attr("y", 20)
    //   .attr("fill", "#999")
    //   .attr("font-size", "12px")
    //   .text("Scroll to zoom, drag to pan");
  };

  return (
    <div className="flex flex-col ">
      <div className="w-full overflow-hidden relative">
        {error && (
          <div className="p-4 text-red-500">Error loading map: {error}</div>
        )}

        {!isLoaded && !error && (
          <div className="p-4 flex items-center justify-center h-full">
            Loading map data...
          </div>
        )}

        <div className="h-[500px] w-full flex items-center justify-center">
          <svg
            ref={svgRef}
            width="100%"
            height="100%"
            preserveAspectRatio="xMidYMid meet"
            style={{ backgroundColor: "transparent" }}
          />
        </div>

        {/* Improved tooltip with better positioning */}
        {hoveredCountry && (
          <div
            ref={tooltipRef}
            className="absolute pointer-events-none bg-black bg-opacity-90 text-white px-3 py-1.5 rounded-lg text-sm transform -translate-x-1/2 border border-green-500"
            style={{
              left: tooltipPosition.x,
              top: tooltipPosition.y,
              transition: "opacity 0.15s ease-in-out",
              zIndex: 1000,
              boxShadow: "0 2px 4px rgba(0,0,0,0.3)",
            }}
          >
            {hoveredCountry} - {hoveredVisitCount}
          </div>
        )}
      </div>
      <div className="text-sm text-gray-500">
        Map Status:{" "}
        {isLoaded
          ? "Loaded! Tryna seperate Alaska and Hawaii into their own entities"
          : error
          ? "Error"
          : "Loading..."}
      </div>
    </div>
  );
}
