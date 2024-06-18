"use client";
import { useState } from "react";

const predefinedCourses = [
  { id: 1, name: "Course 1" },
  { id: 2, name: "Course 2" },
  { id: 3, name: "Course 3" },
];

function AddCourse() {
  const [courseName, setCourseName] = useState(predefinedCourses[0].name);
  const [courseAccess, setCourseAccess] = useState("All members have access");
  const [price, setPrice] = useState("199.99");
  const [currency, setCurrency] = useState("USD");

  const handleSubmit = async (event: any) => {
    event.preventDefault();

    const response = await fetch("/api/courses", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        courseName,
        courseAccess,
        price,
        currency,
      }),
    });

    const data = await response.json();
    console.log(data);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100">
      <div className="bg-white dark:bg-gray-800 p-8 rounded-lg shadow-md w-full max-w-lg">
        <h2 className="text-2xl font-bold mb-6">Add Course</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="courseName" className="block mb-1">
              Course Name:
            </label>
            <select
              id="courseName"
              value={courseName}
              onChange={(event) => setCourseName(event.target.value)}
              className="w-full px-3 py-2 border rounded-lg dark:bg-gray-700 dark:border-gray-600"
            >
              {predefinedCourses.map((course) => (
                <option key={course.id} value={course.name}>
                  {course.name}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label htmlFor="courseAccess" className="block mb-1">
              Course Access:
            </label>
            <select
              id="courseAccess"
              value={courseAccess}
              onChange={(event) => setCourseAccess(event.target.value)}
              className="w-full px-3 py-2 border rounded-lg dark:bg-gray-700 dark:border-gray-600"
            >
              <option value="All members have access">
                All members have access
              </option>
              <option value="Specific members only">
                Specific members only
              </option>
            </select>
          </div>
          <div>
            <label htmlFor="price" className="block mb-1">
              Price:
            </label>
            <input
              type="number"
              id="price"
              value={price}
              onChange={(event) => setPrice(event.target.value)}
              className="w-full px-3 py-2 border rounded-lg dark:bg-gray-700 dark:border-gray-600"
            />
          </div>
          <div>
            <label htmlFor="currency" className="block mb-1">
              Currency:
            </label>
            <select
              id="currency"
              value={currency}
              onChange={(event) => setCurrency(event.target.value)}
              className="w-full px-3 py-2 border rounded-lg dark:bg-gray-700 dark:border-gray-600"
            >
              <option value="USD">USD</option>
              <option value="EUR">EUR</option>
            </select>
          </div>
          <button
            type="submit"
            className="w-full py-2 px-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600"
          >
            Add Course
          </button>
        </form>
      </div>
    </div>
  );
}

export default AddCourse;
