"use client"
// src/pages/courses.tsx (assuming this is your file structure)

import { useEffect, useState } from "react";
import axios from "axios";
import Image from "next/image";
import { CardBody, CardContainer, CardItem } from "@/components/ui/3d-card";

const CoursesPage: React.FC = () => {
  const [courses, setCourses] = useState<any[]>([]); // Adjust type as per your course data structure
  const [selectedCourse, setSelectedCourse] = useState<any | null>(null); // To track which course is selected

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await axios.get("/api/courses/All_Course"); // Adjust API endpoint as per your backend route
        setCourses(response.data.data); // Assuming your API response is structured with a `data` key
      } catch (error) {
        console.error("Error fetching courses:", error);
      }
    };

    fetchCourses();
  }, []);

  const handleCourseClick = (course: any) => {
    setSelectedCourse(course);
  };

  return (
    <div className="min-h-screen bg-black py-12 pt-28">
      <h1 className="text-lg md:text-7xl text-center font-sans font-bold mb-8 text-white">
        All courses ({courses.length})
      </h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 justify-center">
        {courses.map((course) => (
          <CardContainer key={course.id} className="inter-var my-4 sm:mx-8 mx-1">
            <CardBody className="bg-gray-50 relative group/card dark:hover:shadow-2xl dark:hover:shadow-emerald-500/[0.1] dark:bg-black dark:border-white/[0.2] border-black/[0.1] w-full h-full rounded-xl p-1 border">
              <CardItem
                translateZ="50"
                className="text-xl font-bold text-neutral-600 dark:text-white"
              >
                {course.title}
              </CardItem>
              <CardItem
                as="p"
                translateZ="60"
                className="text-neutral-500 text-sm mt-2 dark:text-neutral-300"
              >
                {course.description}
              </CardItem>
              <CardItem translateZ="100" className="w-full mt-4">
                <Image
                  src={course.image}
                  height={300}
                  width={400}
                  className="h-60 w-full object-cover rounded-xl group-hover/card:shadow-xl"
                  alt={course.title}
                />
              </CardItem>
              <div className="flex justify-between items-center mt-4">
                <CardItem
                  translateZ={20}
                  as="button"
                  className="px-4 py-2 rounded-xl text-xs font-normal dark:text-white"
                  onClick={() => handleCourseClick(course)}
                >
                  Try now →
                </CardItem>
                <CardItem
                  translateZ={20}
                  as="button"
                  className="px-4 py-2 rounded-xl bg-black dark:bg-white dark:text-black text-white text-xs font-bold"
                >
                  Sign up
                </CardItem>
              </div>
            </CardBody>
          </CardContainer>
        ))}
      </div>
      {selectedCourse && (
        <div className="fixed top-0 left-0 right-0 bottom-0 bg-black bg-opacity-90 flex justify-center items-center z-50">
          <div className="max-w-3xl w-full bg-white rounded-xl p-8">
            <h2 className="text-2xl font-bold text-gray-800">{selectedCourse.title}</h2>
            <p className="text-gray-600 mt-2">{selectedCourse.description}</p>
            <button
              className="mt-4 px-4 py-2 rounded-xl bg-black text-white font-bold"
              onClick={() => setSelectedCourse(null)}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default CoursesPage;
