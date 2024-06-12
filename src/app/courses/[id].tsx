import { GetStaticPaths, GetStaticProps } from "next";
import Image from "next/image";
import React from "react";
import courseData from "@/data/music_courses.json";

const CoursePage = ({ course }: any) => {
  if (!course) {
    return <div>Course not found</div>;
  }

  return (
    <div className="min-h-screen bg-black py-12 pt-28">
      <h1 className="text-lg md:text-7xl text-center font-sans font-bold mb-8 text-white">
        {course.title}
      </h1>
      <div className="flex justify-center">
        <div className="bg-gray-50 relative group/card dark:hover:shadow-2xl dark:hover:shadow-emerald-500/[0.1] dark:bg-black dark:border-white/[0.2] border-black/[0.1] w-full h-full rounded-xl p-1 border">
          <div className="text-xl font-bold text-neutral-600 dark:text-white">
            {course.title}
          </div>
          <p className="text-neutral-500 text-sm mt-2 dark:text-neutral-300">
            {course.description}
          </p>
          <div className="w-full mt-4">
            <Image
              src={course.image}
              height={300}
              width={400}
              className="h-60 w-full object-cover rounded-xl group-hover/card:shadow-xl"
              alt={course.title}
            />
          </div>
          <div className="flex justify-between items-center mt-4">
            <button className="px-4 py-2 rounded-xl text-xs font-normal dark:text-white">
              Try now →
            </button>
            <button className="px-4 py-2 rounded-xl bg-black dark:bg-white dark:text-black text-white text-xs font-bold">
              Sign up
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export const getStaticPaths: GetStaticPaths = async () => {
  const paths = courseData.courses.map((course) => ({
    params: { id: course.id.toString() },
  }));

  return { paths, fallback: false };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const course = courseData.courses.find(
    (course) => course.id.toString() === params!.id
  );

  return { props: { course } };
};

export default CoursePage;
