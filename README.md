This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.
#   S H I V - V I B E S 
 
 




courses [id]
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





courses/page.tsx
"use client";
import React, { useState } from "react";
import Image from "next/image";
import { CardBody, CardContainer, CardItem } from "@/components/ui/3d-card";
import courseData from "@/data/music_courses.json";
import { FaClock, FaCalendarAlt, FaSearch } from "react-icons/fa";

const CoursesPage: React.FC = () => {
  const [theme, setTheme] = useState("dark");

  const [searchTerm, setSearchTerm] = useState("");

  const handleSearch = () => {
    // Handle your search logic here
    console.log("Searching for:", searchTerm);
  };
  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };
  return (
    <div
      className={`  ${
        theme === "dark"
          ? "bg-gray-900 text-gray-100"
          : "bg-gray-100 text-gray-900"
      }`}
    >
      <div className=" bg-gray-900 px-4 pt-2">
        <div className="flex flex-row justify-between items-center">
          <h1 className="text-2xl md:text-4xl font-bold sm:text-xs mb-6 text-center">
            Select the right free course for your goals.
          </h1>
          <div className="relative">
            <input
              type="text"
              placeholder="Search..."
              value={searchTerm}
              onChange={(event) => setSearchTerm(event.target.value)}
              className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none 
                dark:border-gray-700 dark:bg-gray-800 dark:text-white dark:placeholder-gray-400 
                border-gray-300 bg-white text-black placeholder-gray-500 
                focus:border-blue-500 dark:focus:border-blue-500"
            />
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <FaSearch
                onClick={handleSearch}
                className="text-black dark:text-white"
              />
            </div>
          </div>
        </div>
      </div>
      <h1 className="text-lg md:text-7xl text-center font-sans font-bold mb-8 text-white">
        All courses ({courseData.courses.length})
      </h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 justify-center">
        {courseData.courses.map((course) => (
          <CardContainer
            key={course.id}
            className="inter-var my-4 sm:mx-8 mx-1"
          >
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
    </div>
  );
};

export default CoursesPage;
