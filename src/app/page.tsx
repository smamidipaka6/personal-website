"use client";
import React, { useState } from "react";
import TravelMap from "./Components/travelMap";

const Page = () => {
  const quotes = [
    { text: "Trying to do better", author: "Peter Parker" },
    {
      text: "Nah, I'd win.",
      author: "Satoru Gojo",
    },
    {
      text: "You can't just skip ahead to where you think your life should be.",
      author: "Lily Aldrin",
    },
    {
      text: "A lie is just a great story that someone ruined with the truth.",
      author: "Barney Stinson",
    },
    {
      text: "Destiny is a gift. Some go their entire lives, living existences of quiet desperation, never learning the truth that what feels as though a burden pushing down upon their shoulders is really a sense of purpose that lifts us to greater heights. Never forget that fear is but the precursor to valor, that to strive and triumph in the face of fear is what it means to be a hero. Don't think. Become.",
      author: "Blinkous Galadrigal",
    },
    {
      text: "Whatever you do in this life, it's not legendary unless your friends are there to see it.",
      author: "Barney Stinson",
    },
  ];

  const [currentQuoteIndex, setCurrentQuoteIndex] = useState(0);
  const [fadeIn, setFadeIn] = useState(true);

  const rotateQuote = () => {
    // First fade out
    setFadeIn(false);

    // After fade out completes, change quote and fade in
    setTimeout(() => {
      setCurrentQuoteIndex((prevIndex) => (prevIndex + 1) % quotes.length);
      setFadeIn(true);
    }, 300); // Match this with the CSS transition duration
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      {/* First container - content before Projects */}
      <div className="w-xl text-sm text-left line-relaxed px-4">
        <h3 className="mt-10 pt-12 text-3xl text-center font-bold">
          Sahit Mamidipaka
        </h3>

        <div
          className="mt-6 px-4 py-2 border-l-4 border-[#9F7AEA] italic text-gray-300 bg-[#2D2D3A] rounded-r-md cursor-pointer hover:bg-[#36364A] transition-colors duration-200"
          onClick={rotateQuote}
          title="Click for another quote"
        >
          <div
            key={currentQuoteIndex}
            className={`text-base transition-opacity duration-300 ease-in-out ${
              fadeIn ? "opacity-100" : "opacity-0"
            }`}
          >
            <div className="flex flex-wrap justify-between items-center">
              <span className="mr-2">
                &quot;{quotes[currentQuoteIndex].text}&quot;
              </span>
              {quotes[currentQuoteIndex].text.length < 100 ? (
                <span className="ml-auto whitespace-nowrap">
                  {" "}
                  — {quotes[currentQuoteIndex].author}
                </span>
              ) : null}
            </div>
            {quotes[currentQuoteIndex].text.length >= 100 && (
              <div className="text-right mt-1">
                <span> — {quotes[currentQuoteIndex].author}</span>
              </div>
            )}
          </div>
        </div>

        <p className="mt-8 font-semibold text-foreground/60 [&::selection]:bg-[#4C1D95] [&::selection]:text-white text-xl">
          About Me
        </p>

        <p className="mt-3 [&_*::selection]:bg-[#9F7AEA] [&_*::selection]:text-black [&::selection]:bg-[#9F7AEA] [&::selection]:text-black text-base">
          Hey!
          <br />
          <br />
          My name is Sahit, and I love building functional products that help
          other people. I try my best to build things that I find technically
          challenging/cool and functionally useful (both for me and hopefully
          others).
          <br />
          <br />
          Take a look at my projects and see if you like or find value in any of
          em!
          <br />
          <br />
          And always feel free to reach out to me for anything (email == highest
          chance of me responding)!!
        </p>

        <p className="mt-6 font-semibold text-foreground/60 [&::selection]:bg-[#4C1D95] [&::selection]:text-white text-xl">
          Education
        </p>

        <div className="mt-4 border-l-4 border-[#B3A369] pl-4 py-2 rounded [&_*::selection]:bg-[#B3A369] [&_*::selection]:text-black">
          <div className="mb-3">
            <div className="flex flex-row justify-between items-center">
              <p className="font-medium text-white text-base">
                BS in Computer Science (Intelligence & People)
              </p>
              <p className="px-3 py-1 bg-[#B3A369] rounded-md text-[var(--background)] text-xs inline-block shadow-sm">
                Aug 2022 - May 2026
              </p>
            </div>
            <p className="text-sm text-gray-300">
              Georgia Institute of Technology • Minor in Economics
            </p>
          </div>
          <ul className="list-disc pl-5 space-y-1 text-base text-gray-300">
            <li>GPA: 3.9/4.0 (thanks to ChatGPT and my friends)</li>
            <li>Relevant Coursework: Not a lot but DSA, AI, and ML</li>
            <li>Undergraduate Research Assistant at GT-Emory BME Lab</li>
          </ul>
        </div>

        <p className="mt-6 font-semibold text-foreground/60 [&::selection]:bg-[#4C1D95] [&::selection]:text-white text-xl">
          Work Experience
        </p>

        <div className="mt-4 space-y-6">
          <div className="border-l-4 border-[#1877F2] pl-4 py-2 rounded [&_*::selection]:bg-[#1877F2] [&_*::selection]:text-white">
            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2 mb-3">
              <p className="font-medium text-white text-base">
                Software Engineering Intern at Meta
              </p>
              <p className="px-3 py-1 bg-[#1877F2] rounded-md text-white text-xs inline-block shadow-sm">
                May 2025 - August 2025
              </p>
            </div>
            <ul className="list-disc pl-5 space-y-1 text-base text-gray-300">
              <li>
                Haven&apos;t started yet—hopefully I get a cool and exciting
                team like Reality Labs or Wearable Tech??
              </li>
              <li>First time living in the Bay—I&apos;m really excited!!</li>
              <li>Going to be eating a lot of free food</li>
            </ul>
            <br />
            <p className="text-base">
              <strong>Skills:</strong> TBD
            </p>
          </div>

          <div className="border-l-4 border-[#C01933] pl-4 py-2 rounded [&_*::selection]:bg-[#C01933] [&_*::selection]:text-white">
            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2 mb-3">
              <p className="font-medium text-white text-base">
                Software Engineering Intern at Delta
              </p>
              <p className="px-3 py-1 bg-[#C01933] rounded-md text-white text-xs inline-block shadow-sm">
                Jan 2025 - May 2025
              </p>
            </div>
            <ul className="list-disc pl-5 space-y-1 text-base text-gray-300">
              <li>
                Half my work was boring Excel stuff, but the other half was
                really cool NLP stuff
              </li>
              <li>
                Learned a lot about the airline industries and the deep, complex
                intricacies involved in safely and smoothly getting an aircraft
                to get from Point A to Point B
              </li>
              <li>
                Had to drive to office in rush-hour traffic unfortunately but
                got to work near the ATL airport
              </li>
              <li>
                Traveled a lot (3 Countries, 3 Continents, and Counting...).
                Gained a lot of perspective and appreciation for travel
              </li>
            </ul>
            <br />
            <p className="text-base">
              <strong>Skills:</strong> Python, PyTorch, Pandas, Matplotlib,
              SciPy, Seaborn, and Excel (ugh)
            </p>
          </div>

          <div className="border-l-4 border-[#6B46C1] pl-4 py-2 rounded [&_*::selection]:bg-[#6B46C1] [&_*::selection]:text-white">
            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2 mb-3">
              <p className="font-medium text-white text-base">
                Software Engineering Intern at NCR
              </p>
              <p className="px-3 py-1 bg-[#6B46C1] rounded-md text-white text-xs inline-block shadow-sm">
                May 2024 - August 2024
              </p>
            </div>
            <ul className="list-disc pl-5 space-y-1 text-base text-gray-300">
              <li>
                Made a dynamic analytics web application for NCR&apos;s retail
                clients (like Walmart) to track and display key performance
                indicators for loyalty programs and promotional data
              </li>
              <li>
                Wrote GraphQL queries/resolvers to connect to microservice
                architecture APIs and external databases, performing data
                analysis to integrate processed data into front-end widgets
              </li>
              <li>
                Improved average time saved for clients by 48% and increased
                customer satisfaction by 32%
              </li>
              <li>
                In other words, made a React dashboard lol. Got to meet and hang
                out with cool interns/friends. Shortest work commute of my life.
              </li>
            </ul>
            <br />
            <p className="text-base">
              <strong>Skills:</strong> React, Material-UI, GraphQL, Apollo
              Client, Cucumber, Jest
            </p>
          </div>

          <div className="border-l-4 border-[#1A4D4D] pl-4 py-2 rounded [&_*::selection]:bg-[#1A4D4D] [&_*::selection]:text-white">
            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2 mb-3">
              <p className="font-medium text-white text-base">
                Software Engineering Intern at Salesloft
              </p>
              <p className="px-3 py-1 bg-[#1A4D4D] rounded-md text-white text-xs inline-block shadow-sm">
                May 2023 - August 2023
              </p>
            </div>
            <ul className="list-disc pl-5 space-y-1 text-base text-gray-300">
              <li>
                Created a feature to map Salesloft field information to/from
                CRMs, improving time saved per seller by ~30 minutes
              </li>
              <li>
                Developed front-end components with React and handled data
                migration from/to CRMs with Ruby on Rails. Leveraged Docker and
                Kubernetes to containerize and deploy the project on GCP
              </li>
              <li>
                Engineered a customized generative AI sales email-generation
                feature to help facilitate and automate lead outreach
              </li>
              <li>
                My first real internship and experience working at a company
              </li>
            </ul>
            <br />
            <p className="text-base">
              <strong>Skills:</strong> React, Redis, Ruby on Rails, OpenAI API,
              LangChain, RAG tools, and Pandas.
            </p>
          </div>
        </div>
      </div>

      {/* Projects section with wider width */}
      <div className="w-[105%] max-w-[850px] text-sm text-left line-relaxed px-4 my-8">
        <p className="font-semibold text-foreground/60 text-center mb-6 [&::selection]:bg-[#4C1D95] [&::selection]:text-white text-xl">
          Projects
        </p>

        <div className="mt-8 space-y-16">
          {/* Project 1: Text on left, Image on right */}
          <div className="flex flex-col md:flex-row gap-8">
            {/* Left side - Content (50%) */}
            <div className="md:w-1/2 [&_*::selection]:bg-[#9F7AEA] [&_*::selection]:text-black">
              <h3 className="font-medium text-white mb-3 text-center text-lg">
                Swift Note
              </h3>
              <ul className="list-disc pl-5 space-y-1 text-base text-gray-300">
                <li>
                  A blazingly fast, temporary note-taking app designed for quick
                  thoughts and ideas.
                </li>
                <li>
                  The fastest note-taking website in the world with minimal UI
                  and maximum efficiency.
                </li>
                <li>
                  Built with performance as the top priority, Swift Note ensures
                  your ideas are captured instantly.
                </li>
                <li>
                  Features include markdown support, auto-save functionality,
                  and keyboard shortcuts for power users.
                </li>
              </ul>
            </div>

            {/* Right side - Image (50%) */}
            <div className="md:w-1/2 flex items-center justify-center">
              <img
                src="/swift-note-demo.png"
                alt="Swift Note Demo"
                className="rounded-md w-full object-contain shadow-lg"
              />
            </div>
          </div>

          {/* Project 2: Image on left, Text on right */}
          <div className="flex flex-col md:flex-row-reverse gap-8">
            {/* Right side - Content (50%) */}
            <div className="md:w-1/2 [&_*::selection]:bg-[#9F7AEA] [&_*::selection]:text-black">
              <h3 className="font-medium text-white mb-3 text-center text-lg">
                Travel Map
              </h3>
              <ul className="list-disc pl-5 space-y-1 text-base text-gray-300">
                <li>
                  Track and showcase your travel experiences with an interactive
                  map visualization.
                </li>
                <li>
                  Inspired by GitHub&apos;s contribution map, this tool helps
                  you document your journey around the world.
                </li>
                <li>
                  Add photos, notes, and memories to each location you&apos;ve
                  visited to create a personal travel journal.
                </li>
                <li>
                  Share your adventures with friends or keep them private - you
                  have complete control over your data.
                </li>
              </ul>
            </div>

            {/* Left side - Image (50%) */}
            <div className="md:w-1/2 flex items-center justify-center">
              <img
                src="/swift-note-demo.png"
                alt="Travel Map Demo"
                className="rounded-md w-full object-contain shadow-lg"
              />
            </div>
          </div>

          {/* Project 3: Text on left, Image on right */}
          <div className="flex flex-col md:flex-row gap-8">
            {/* Left side - Content (50%) */}
            <div className="md:w-1/2 [&_*::selection]:bg-[#9F7AEA] [&_*::selection]:text-black">
              <h3 className="font-medium text-white mb-3 text-center text-lg">
                MCP Server
              </h3>
              <ul className="list-disc pl-5 space-y-1 text-base text-gray-300">
                <li>
                  A versatile MCP server designed for integration with various
                  systems.
                </li>
                <li>
                  Built with scalability and performance in mind, it provides a
                  robust foundation for your applications.
                </li>
                <li>
                  Supports multiple protocols and can be easily extended with
                  custom modules to fit your specific needs.
                </li>
                <li>
                  Includes comprehensive documentation and examples to help you
                  get started quickly.
                </li>
              </ul>
            </div>

            {/* Right side - Image (50%) */}
            <div className="md:w-1/2 flex items-center justify-center">
              <img
                src="/swift-note-demo.png"
                alt="MCP Server Demo"
                className="rounded-md w-full object-contain shadow-lg"
              />
            </div>
          </div>

          {/* Project 4: Image on left, Text on right */}
          <div className="flex flex-col md:flex-row-reverse gap-8">
            {/* Right side - Content (50%) */}
            <div className="md:w-1/2 [&_*::selection]:bg-[#9F7AEA] [&_*::selection]:text-black">
              <h3 className="font-medium text-white mb-3 text-center text-lg">
                Notion AI
              </h3>
              <ul className="list-disc pl-5 space-y-1 text-base text-gray-300">
                <li>A Cursor-inspired AI assistant for writing in Notion.</li>
                <li>
                  Enhances your writing workflow with intelligent suggestions
                  and automated formatting.
                </li>
                <li>
                  Analyzes your writing style and provides contextually relevant
                  recommendations to improve clarity.
                </li>
                <li>
                  Integrates seamlessly with Notion&apos;s existing interface,
                  making it feel like a native feature.
                </li>
              </ul>
            </div>

            {/* Left side - Image (50%) */}
            <div className="md:w-1/2 flex items-center justify-center">
              <img
                src="/swift-note-demo.png"
                alt="Notion AI Demo"
                className="rounded-md w-full object-contain shadow-lg"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Second container - content after Projects */}
      <div className="w-xl text-sm text-left line-relaxed px-4">
        <p className="mt-6 font-semibold text-foreground/60 [&::selection]:bg-[#4C1D95] [&::selection]:text-white text-xl">
          Research
        </p>

        <div className="mt-3 space-y-2 [&_*::selection]:bg-[#9F7AEA] [&_*::selection]:text-black">
          <p className="text-base">SNEL</p>
          <p className="text-base">Publication List: EMUSort, LITMUS</p>
        </div>
      </div>

      {/* Travel section with wider width */}
      <div className="w-[105%] max-w-[850px] text-sm text-left line-relaxed px-4 my-8">
        <p className="font-semibold text-foreground/60 text-center [&::selection]:bg-[#4C1D95] [&::selection]:text-white text-xl">
          Travel
        </p>

        <div>
          <div>
            <TravelMap />
          </div>
        </div>
      </div>

      {/* Third container - content after Travel */}
      <div className="w-xl text-sm text-left line-relaxed px-4">
        <p className="mt-6 font-semibold text-foreground/60 [&::selection]:bg-[#4C1D95] [&::selection]:text-white text-xl">
          Music
        </p>

        <div className="mt-3 space-y-2">
          <p className="text-base">
            Spotify Wrapped Stats for 2022, 2023, 2024
          </p>
          <p className="text-base">[Spotify Embedded Player for Live Music]</p>
        </div>

        {/* <p className="mt-6 font-semibold text-foreground/60 [&::selection]:bg-[#4C1D95] [&::selection]:text-white text-xl">
          Contact Me
        </p> */}

        <div className="mt-16 mb-8 flex flex-wrap justify-center gap-4">
          <a
            href="https://www.linkedin.com/in/sahit-mamidipaka/"
            target="_blank"
            rel="noopener noreferrer"
            style={{ cursor: "pointer" }}
            className="px-2.5 py-1 bg-[#027FBC] rounded-md text-white text-xs inline-flex items-center shadow-sm font-bold hover:opacity-90"
          >
            <img
              src="/LinkedIn_icon_circle.svg.png"
              alt="LinkedIn"
              className="h-4 w-4 mr-1.5"
            />
            LinkedIn
          </a>
          <a
            href="https://www.instagram.com/sahit_22/"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              background: "linear-gradient(45deg, #FCAF45, #FD1D1D, #833AB4)",
              cursor: "pointer",
            }}
            className="px-2.5 py-1 rounded-md text-white text-xs inline-flex items-center shadow-sm font-bold hover:opacity-90"
          >
            <img
              src="/Instagram_icon.png.webp"
              alt="Instagram"
              className="h-4 w-4 mr-1.5"
            />
            Instagram
          </a>
          <a
            href="https://github.com/smamidipaka6"
            target="_blank"
            rel="noopener noreferrer"
            style={{ cursor: "pointer" }}
            className="px-2.5 py-1 bg-[#333] rounded-md text-white text-xs inline-flex items-center shadow-sm font-bold hover:opacity-90"
          >
            <img
              src="/github_icon.png"
              alt="GitHub"
              className="h-4 w-4 mr-1.5"
            />
            GitHub
          </a>
          <a
            href="mailto:sahit.mamidipaka@gmail.com"
            style={{ cursor: "pointer" }}
            className="px-2.5 py-1 bg-[#FF7F50] rounded-md text-white text-xs inline-flex items-center shadow-sm font-bold hover:opacity-90"
          >
            <img
              src="/google-mail-gmail-icon-logo-symbol-free-png.webp"
              alt="Email"
              className="h-4 w-auto mr-1.5"
            />
            Email
          </a>
        </div>

        <br></br>
        <br></br>
        <br></br>
      </div>
    </div>
  );
};

export default Page;
