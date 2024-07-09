"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";
import Image from "next/image";

interface SongwritingSection {
  title: string;
  content: string[];
  image: {
    url: string;
    alt: string;
  };
  tips?: {
    author: string;
    tip: string;
  }[];
  infographic?: {
    url: string;
    alt: string;
  };
  examples?: {
    song: string;
    artist: string;
    url: string;
  }[];
}

interface CraftingMelodiesAndLyrics {
  title: string;
  sections: SongwritingSection[];
}

// Component definition
const SongWritingComponent: React.FC = () => {
  const [craftingMelodiesAndLyricsData, setCraftingMelodiesAndLyricsData] =
    useState<CraftingMelodiesAndLyrics | null>(null);
  const [songwritingData, setSongWritingData] =
    useState<CraftingMelodiesAndLyrics | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch data from your API endpoint
        const response = await axios.get<{
          success: boolean;
          data: CraftingMelodiesAndLyrics[];
        }>("http://localhost:3000/api/courses/Songwriting");

        // Assuming the API response contains a `data` field with your structured data
        setCraftingMelodiesAndLyricsData(response.data.data[0]);
        setLoading(false);
      } catch (error) {
        console.error(
          "Error fetching crafting melodies and lyrics data:",
          error
        );
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch data from your API endpoint
        const response = await axios.get<{
          success: boolean;
          data: CraftingMelodiesAndLyrics[];
        }>("/api/courses/Songwriting");

        // Assuming the API response contains a `data` field with your structured data
        setSongWritingData(response.data.data[1]);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching songwriting data:", error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (!craftingMelodiesAndLyricsData || !songwritingData) {
    return <p>No data available</p>;
  }

  return (
    <div className="bg-gray-900 text-white shadow-lg rounded-lg p-6">
      <h1 className="text-3xl font-bold mb-4">
        {craftingMelodiesAndLyricsData.title}
      </h1>

      {craftingMelodiesAndLyricsData.sections.map((section, index) => (
        <section key={index} className="mb-8">
          <h2 className="text-xl font-bold mb-2">{section.title}</h2>
          <div className="flex flex-col md:flex-row mb-4">
            <Image
              src={section.image.url}
              alt={section.image.alt}
              width={200}
              height={200}
              className="rounded-lg w-full h-auto max-h-60 md:w-60 m-4 md:h-60 object-cover"
            />
            <ul className="text-gray-300 space-y-2 flex-1">
              {section.content.map((item, idx) => (
                <li key={idx}>{item}</li>
              ))}
            </ul>
          </div>
          {section.tips && (
            <div className="space-y-4">
              <h4 className="font-bold mb-2">Tips:</h4>
              {section.tips.map((tip, idx) => (
                <p key={idx} className="text-gray-300">
                  <strong>{tip.author}</strong>: {tip.tip}
                </p>
              ))}
            </div>
          )}
          {section.infographic && (
            <div className="mt-4">
              <Image
                src={section.infographic.url}
                alt={section.infographic.alt}
                width={400}
                height={250}
                className="w-full h-auto rounded-lg object-cover"
              />
            </div>
          )}
          {section.examples && (
            <div className="space-y-4">
              <h4 className="font-bold mb-2">Examples:</h4>
              {section.examples.map((example, idx) => (
                <div key={idx}>
                  <p className="text-gray-300">
                    <strong>{example.song}</strong> by {example.artist}
                  </p>
                  <a
                    href={example.url}
                    className="text-blue-400 hover:underline"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Listen
                  </a>
                </div>
              ))}
            </div>
          )}
        </section>
      ))}

      <h1 className="text-3xl font-bold mb-4">{songwritingData.title}</h1>

      {songwritingData.sections.map((section, index) => (
        <section key={index} className="mb-8">
          <h2 className="text-xl font-bold mb-2">{section.title}</h2>
          <div className="flex flex-col md:flex-row mb-4">
            <Image
              src={section.image.url}
              alt={section.image.alt}
              width={200}
              height={200}
              className="rounded-lg w-full h-auto max-h-60 md:w-60 m-4 md:h-60 object-cover"
            />
            <ul className="text-gray-300 space-y-2 flex-1">
              {section.content.map((item, idx) => (
                <li key={idx}>{item}</li>
              ))}
            </ul>
          </div>
          {section.tips && (
            <div className="space-y-4">
              <h4 className="font-bold mb-2">Tips:</h4>
              {section.tips.map((tip, idx) => (
                <p key={idx} className="text-gray-300">
                  <strong>{tip.author}</strong>: {tip.tip}
                </p>
              ))}
            </div>
          )}
          {section.infographic && (
            <div className="mt-4">
              <Image
                src={section.infographic.url}
                alt={section.infographic.alt}
                width={400}
                height={250}
                className="w-full h-auto rounded-lg object-cover"
              />
            </div>
          )}
          {section.examples && (
            <div className="space-y-4">
              <h4 className="font-bold mb-2">Examples:</h4>
              {section.examples.map((example, idx) => (
                <div key={idx}>
                  <p className="text-gray-300">
                    <strong>{example.song}</strong> by {example.artist}
                  </p>
                  <a
                    href={example.url}
                    className="text-blue-400 hover:underline"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Listen
                  </a>
                </div>
              ))}
            </div>
          )}
        </section>
      ))}
    </div>
  );
};

export default SongWritingComponent;
