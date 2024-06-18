"use client";
import React, { useState } from "react";
import Link from "next/link";
import { FaClock, FaCalendarAlt, FaSearch } from "react-icons/fa";

interface Lesson {
  title: string;
  duration: string;
  videoUrl: string;
}

const lessons: Lesson[] = [
  {
    title: "1.01 List Comprehension In Python",
    duration: "05:50",
    videoUrl:
      "https://videos.pexels.com/video-files/20317231/20317231-hd_1280_720_30fps.mp4",
  },
  {
    title: "1.02 Python List vs Tuple",
    duration: "03:15",
    videoUrl:
      "https://videos.pexels.com/video-files/20317231/20317231-hd_1280_720_30fps.mp4",
  },
  {
    title: "1.03 Python Interview Questions for Freshers",
    duration: "06:35",
    videoUrl:
      "https://videos.pexels.com/video-files/20317231/20317231-hd_1280_720_30fps.mp4",
  },
  {
    title: "1.04 Python Coding Interview",
    duration: "04:49",
    videoUrl:
      "https://videos.pexels.com/video-files/20317231/20317231-hd_1280_720_30fps.mp4",
  },
  {
    title: "1.05 Exact Domain And Username",
    duration: "03:39",
    videoUrl:
      "https://videos.pexels.com/video-files/20317231/20317231-hd_1280_720_30fps.mp4",
  },
];

const CombinedPage = () => {
  const [theme, setTheme] = useState("dark");
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const [isListOpen, setIsListOpen] = useState<boolean>(true);

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  const toggleLessonVideo = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  const toggleLessonList = () => {
    setIsListOpen(!isListOpen);
  };

  return (
    <div
      className={`min-h-screen pt-2 ${
        theme === "dark"
          ? "bg-gray-900 text-gray-100"
          : "bg-gray-100 text-gray-900"
      }`}
    >
      <div
        className={`min-h-screen p-0 flex flex-col items-center overflow-hidden ${
          theme === "dark"
            ? "bg-gray-900 text-white"
            : "bg-gray-100 text-gray-800"
        }`}
      >
        <div
          className={`rounded-lg shadow-md p-4 mb-4 w-full max-w-4xl overflow-hidden ${
            theme === "dark" ? "bg-gray-800" : "bg-white"
          }`}
        >
          <video
            src="/19990812-uhd_2560_1440_30fps.mp4"
            controls
            className="rounded-lg"
            controlsList="nodownload"
            width="100%"
            height="auto"
          >
            Your browser does not support the video tag.
          </video>
          <div className="flex items-center justify-between mt-4">
            <h2
              className={`text-2xl font-bold ${
                theme === "dark" ? "text-gray-100" : "text-gray-900"
              }`}
            >
              Learn Python
            </h2>
            <label
              htmlFor="toggle"
              className="flex items-center cursor-pointer"
            >
              <div className="relative">
                <input
                  id="toggle"
                  type="checkbox"
                  className="hidden"
                  onChange={toggleTheme}
                />
                <div
                  className={`toggle__line w-12 h-6 ${
                    theme === "dark" ? "bg-blue-600" : "bg-blue-600"
                  } rounded-full shadow-inner`}
                ></div>
                <div
                  className={`toggle__dot absolute w-6 h-6 ${
                    theme === "dark" ? "bg-white left-0" : "bg-black right-0"
                  } rounded-full shadow inset-y-0`}
                ></div>
              </div>
              <div
                className={`ml-3 font-medium ${
                  theme === "dark" ? "text-gray-300" : "text-gray-700"
                }`}
              ></div>
            </label>
          </div>
          <p
            className={`mt-2 ${
              theme === "dark" ? "text-gray-300" : "text-gray-600"
            }`}
          >
            Master the fundamentals of Python programming with this
            comprehensive course.
          </p>
          <button
            className={`bg-blue-500 text-white px-4 py-2 rounded mt-4 ${
              theme === "dark"
                ? "dark:bg-blue-700 hover:dark:bg-blue-800"
                : "hover:bg-blue-600"
            }`}
          >
            Start Learning
          </button>
          <p
            className={`text-gray-600 mt-4 ${
              theme === "dark" ? "text-gray-400" : "text-gray-600"
            }`}
          >
            This Course Includes
          </p>
          <div className="flex items-center mt-4">
            <FaClock className="text-gray-600 mb-6 mr-2" />
            <div>
              <span
                className={`text-gray-600 ${
                  theme === "dark" ? "text-gray-400" : "text-gray-600"
                }`}
              >
                2 Hours
              </span>
              <span
                className={`block ${
                  theme === "dark" ? "text-gray-400" : "text-gray-600"
                }`}
              >
                Of self-paced video lessons
              </span>
            </div>
          </div>
          <div className="flex items-center mt-2">
            <FaCalendarAlt className="text-gray-600 mr-2" />
            <span
              className={`text-gray-600 ${
                theme === "dark" ? "text-gray-400" : "text-gray-600"
              }`}
            >
              90 Days of Access
            </span>
          </div>
          <p
            className={`ml-6 ${
              theme === "dark" ? "text-gray-400" : "text-gray-600"
            }`}
          >
            To your Free Course
          </p>
        </div>
        <button
          onClick={toggleLessonList}
          className={`bg-blue-500 text-white px-4 py-2 rounded mb-4 ${
            theme === "dark"
              ? "dark:bg-blue-700 hover:dark:bg-blue-800"
              : "hover:bg-blue-600"
          }`}
        >
          {isListOpen ? "Hide Lessons" : "Show Lessons"}
        </button>
        {isListOpen && (
          <ul className="list-none p-0 w-full max-w-4xl overflow-hidden">
            {lessons.map((lesson, index) => (
              <li
                key={lesson.title}
                className={`rounded-lg shadow-md mb-4 p-4 flex flex-col justify-between items-center w-full overflow-hidden ${
                  theme === "dark" ? "bg-gray-800" : "bg-white"
                }`}
              >
                <div className="flex justify-between w-full items-center">
                  <h1
                    className={`text-blue-500 no-underline font-medium cursor-pointer ${
                      theme === "dark" ? "text-gray-300" : "text-gray-700"
                    }`}
                    onClick={() => toggleLessonVideo(index)}
                  >
                    {lesson.title}
                  </h1>
                  <span
                    className={`text-sm ${
                      theme === "dark" ? "text-gray-300" : "text-gray-700"
                    }`}
                  >
                    {lesson.duration}
                  </span>
                </div>
                {openIndex === index && (
                  <div className="w-full mt-4 overflow-hidden">
                    <video controls width="100%" className="rounded-lg">
                      <source src={lesson.videoUrl} type="video/mp4" />
                      Your browser does not support the video tag.
                    </video>
                  </div>
                )}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default CombinedPage;
