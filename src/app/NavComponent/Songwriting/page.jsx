"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";
import Image from "next/image";

const SongWritingComponent = () => {
  const [allCourses, setAllCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await axios.get(
          `/api/Admin/Songwriting`
        );
        // Filter out the id field from each course object
        const filteredCourses = response.data.data.map(
          ({ id, ...rest }) => rest
        );
        setAllCourses(filteredCourses || []);
      } catch (error) {
        setError(error.response ? error.response.data.error : error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchCourses();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-white text-lg">Loading...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-red-500 text-lg">Error: {error}</p>
      </div>
    );
  }

  return (
    <div className="bg-gray-900 text-white shadow-lg rounded-lg p-6">
      {allCourses.length > 0 ? (
        allCourses.map((course, courseIndex) => (
          <div key={courseIndex} className="mb-8">
            <h1 className="text-3xl font-bold mb-4">{course.title}</h1>
            {course.content && typeof course.content === "object" ? (
              <div className="flex flex-col md:flex-row mb-4">
                {course.image && (
                  <Image
                    src={course.image.url}
                    alt={course.image.alt || "Image"}
                    width={200}
                    height={200}
                    className="rounded-lg w-full h-auto max-h-60 md:w-60 mb-3 mr-4 md:h-60 object-cover"
                  />
                )}
                <ul className="text-gray-300 space-y-2 flex-1">
                  {Object.entries(course.content).map(([key, value], idx) => (
                    <li key={idx}>{value}</li>
                  ))}
                </ul>
              </div>
            ) : (
              <p></p>
            )}
            {course.examples && (
              <div className="mt-4">
                <h3 className="text-xl font-semibold">Example:</h3>
                <p className="text-gray-300">Song: {course.examples.song}</p>
                <p className="text-gray-300">
                  Artist: {course.examples.artist}
                </p>
                {course.examples.url && (
                  <a
                    href={course.examples.url}
                    className="text-blue-400 hover:underline"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Listen here
                  </a>
                )}
              </div>
            )}
          </div>
        ))
      ) : (
        <p>No courses available</p>
      )}
    </div>
  );
};

export default SongWritingComponent;
