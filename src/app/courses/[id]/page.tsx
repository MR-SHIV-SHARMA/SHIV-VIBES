"use client";
import { useEffect, useState } from "react";
import axios from "axios";
import Image from "next/image";
import { useParams } from "next/navigation";
import { FaClock, FaCalendarAlt } from "react-icons/fa";

interface VideoDetails {
  title: string;
  duration: string;
  intro: string;
  description: string;
  videoUrl: string;
}

interface Course {
  title: string;
  description: string;
  thumbnail: string;
  videoUrl: string;
  videoDetails: {
    videos: VideoDetails[];
  };
}

const CourseDetailsPage = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const [isListOpen, setIsListOpen] = useState<boolean>(false);

  const toggleLessonVideo = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  const toggleLessonList = () => {
    setIsListOpen(!isListOpen);
  };

  const { id: courseId } = useParams(); // Extracting courseId from URL
  const [course, setCourse] = useState<Course | null>(null);

  useEffect(() => {
    const fetchCourse = async () => {
      try {
        const response = await axios.get(
          `/api/courses/All_Course?courseId=${courseId}`
        );
        setCourse(response.data.data[0]); // Assuming the course data is directly in response.data
      } catch (error) {
        console.error("Error fetching course:", error);
      }
    };

    if (courseId) {
      fetchCourse();
    }
  }, [courseId]);

  if (!course) {
    return (
      <div>
        <h1>Loading Course Details...</h1>
      </div>
    );
  }

  return (
    <div className="bg-gray-900 text-white rounded-lg shadow-lg min-h-screen overflow-hidden">
      <div className="px-2 sm:px-6 py-4 ">
        <video
          className="w-[100%] h-auto sm:h-screen-90"
          controls
          poster={course.thumbnail}
        >
          <source src={course.videoUrl} type="video/mp4" />
        </video>

        <h1 className="text-3xl font-bold mt-2 mb-2">{course.title}</h1>
        <p className="text-gray-400">{course.description}</p>
        <button className="bg-blue-500 text-white px-4 py-2 rounded mt-2 hover:bg-blue-600">
          Start Learning
        </button>
        <p className="text-gray-400 mt-2">This Course Includes</p>
        <div className="flex items-center mt-2">
          <FaClock className="text-gray-600 mr-2" />
          <span className="text-gray-400">2 Hours</span>
        </div>
        <p className="ml-6 text-gray-400"> Of self-paced video lessons</p>
        <div className="flex items-center mt-2">
          <FaCalendarAlt className="text-gray-600 mr-2" />
          <span className="text-gray-400">90 Days of Access</span>
        </div>
        <p className="ml-6 text-gray-400">To your Free Course</p>
        <button
          onClick={toggleLessonList}
          className="text-white w-full py-2 rounded mt-4 bg-blue-600"
        >
          {isListOpen ? (
            <span className="p-3 mb-4">Hide Lessons</span>
          ) : (
            <span className="p-3 mb-4">Show Lessons</span>
          )}
        </button>
        {isListOpen && (
          <ul className="list-none p-0 mt-4">
            {course.videoDetails?.videos?.map((video, index) => (
              <li
                key={index}
                className="mb-4 p-4 bg-gray-800 rounded-lg shadow-md"
              >
                <div className="flex justify-between items-center">
                  <h3
                    className="text-blue-500 cursor-pointer hover:underline"
                    onClick={() => toggleLessonVideo(index)}
                  >
                    {video.title}
                  </h3>
                  <span className="text-sm text-gray-300">
                    {video.duration}
                  </span>
                </div>
                {openIndex === index && (
                  <div className="w-full mt-4">
                    <video controls className="w-full rounded-lg">
                      <source src={video.videoUrl} type="video/mp4" />
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

export default CourseDetailsPage;
