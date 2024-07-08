/* eslint-disable @next/next/no-img-element */
"use client";
import React, { useState, useEffect, SetStateAction } from "react";
import axios from "axios";

interface Topic {
  topics: SetStateAction<Topic[]>;
  title: string;
  content: string[];
  image: string;
}

const MusicProductionComponent: React.FC = () => {
  const [musicProductionData, setMusicProductionData] = useState<Topic[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get<{ success: boolean; data: Topic[] }>(
          "http://localhost:3000/api/courses/Music_Production"
        );
        if (response.data.success && response.data.data.length > 0) {
          setMusicProductionData(response.data.data[0].topics);
        } else {
          console.error("Error: No data available");
        }
        setLoading(false);
      } catch (error) {
        console.error("Error fetching music production data:", error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (musicProductionData.length === 0) {
    return <p>No data available</p>;
  }

  return (
    <div className="bg-gray-900 text-white shadow-lg rounded-lg p-6">
      {musicProductionData.map((topic, index) => (
        <section key={index} className="mb-8">
          <h2 className="text-xl font-bold mb-2">{topic.title}</h2>
          <ul className="space-y-2">
            {topic.content.map((paragraph, idx) => (
              <li key={idx} className="text-gray-300 mb-1">
                {paragraph}
              </li>
            ))}
          </ul>
          <div className="mt-4">
            <img
              src={topic.image}
              alt={topic.title}
              className="rounded-lg w-full h-auto max-h-60 object-cover"
            />
          </div>
        </section>
      ))}
    </div>
  );
};

export default MusicProductionComponent;
