"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import Image from "next/image";
import { useParams } from "next/navigation";

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
  image: string;
  videoDetails: {
    videos: VideoDetails[];
  };
}

const CourseDetailsPage = () => {
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
    <div className="bg-gray-900 text-white rounded-lg shadow-lg overflow-hidden">
      <div className="px-6 py-8">
        <h1 className="text-3xl font-bold mb-4">{course.title}</h1>
        <p className="text-gray-400 mb-6">{course.description}</p>
        <div className="mb-6">
          <Image
            src={course.image}
            alt={course.title}
            width={400}
            height={300}
            className="rounded-lg"
          />
        </div>
        <div>
          <h2 className="text-2xl font-bold mb-4">Videos</h2>
          {course.videoDetails?.videos?.map(
            (video: VideoDetails, index: number) => (
              <div
                key={index}
                className="mb-8 p-6 bg-gray-800 rounded-lg shadow-md"
              >
                <h3 className="text-xl font-semibold mb-2">{video.title}</h3>
                <p className="text-gray-400 mb-2">
                  <strong>Duration:</strong> {video.duration}
                </p>
                <p className="text-gray-400 mb-2">
                  <strong>Intro:</strong> {video.intro}
                </p>
                <p className="text-gray-400 mb-2">
                  <strong>Description:</strong> {video.description}
                </p>
                <a
                  href={video.videoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-400 hover:underline"
                >
                  Watch Video
                </a>
              </div>
            )
          )}
        </div>
      </div>
    </div>
  );
};

export default CourseDetailsPage;
