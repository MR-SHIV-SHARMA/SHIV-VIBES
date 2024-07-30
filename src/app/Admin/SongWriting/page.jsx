"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Image from "next/image";
import {
  FaSearch,
  FaUser,
  FaPlus,
  FaEllipsisH,
  FaEdit,
  FaTrashAlt,
  FaChevronLeft,
  FaChevronRight,
} from "react-icons/fa";
import AdminSlider from "@/app/Admin/AdminSlider/page";

const AllCourses = () => {
  const [allCourses, setAllCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [buttonBgColor, setButtonBgColor] = useState("bg-blue-500");
  const [newCourse, setNewCourse] = useState({
    title: "",
    status: "",
    content: { point1: "", point2: "", point3: "", point4: "" },
    image: { url: "", alt: "" },
    examples: { song: "", artist: "", url: "" },
    tips: { author: "", tip: "" },
  });

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await axios.get(`/api/Admin/Songwriting`);
        setAllCourses(response.data.data);
        setLoading(false);
      } catch (error) {
        setError(error.response ? error.response.data.error : error.message);
        setLoading(false);
      }
    };

    fetchCourses();
  }, []);

  const [showAddProduct, setShowAddProduct] = useState(false);

  const openAddProductForm = () => {
    setShowAddProduct(true);
  };

  const closeAddProductForm = () => {
    setShowAddProduct(false);
  };

  const handleInputChange = (e, courseIndex) => {
    const { name, value } = e.target;

    setAllCourses((prevCourses) => {
      const updatedCourses = [...prevCourses];
      if (updatedCourses[courseIndex]) {
        updatedCourses[courseIndex] = {
          ...updatedCourses[courseIndex],
          [name]: value,
        };
      }
      return updatedCourses;
    });
  };

  const handleNestedInputChange = (e, courseIndex, section, field) => {
    const { value } = e.target;

    setAllCourses((prevCourses) => {
      const updatedCourses = [...prevCourses];
      if (updatedCourses[courseIndex] && updatedCourses[courseIndex][section]) {
        updatedCourses[courseIndex][section][field] = value;
      }
      return updatedCourses;
    });
  };

  const toggleDropdown = () => {
    setIsDropdownOpen((prev) => !prev);
  };

  const saveUpdates = async (course) => {
    const data = JSON.stringify(course);
    const config = {
      method: "PUT",
      url: `/api/Admin/Songwriting?id=${course._id}`,
      headers: {
        "Content-Type": "application/json",
      },
      data: data,
    };

    try {
      const response = await axios.request(config);
      toast.success("Details updated successfully!");
      setButtonBgColor("bg-green-500");
      console.log(JSON.stringify(response.data));
    } catch (error) {
      toast.error("Failed to update details.");
      console.log(error);
    }
  };

  const deleteCourse = async (_id) => {
    const config = {
      method: "DELETE",
      url: `/api/Admin/Songwriting?id=${_id}`,
      headers: {
        "Content-Type": "application/json",
      },
    };

    try {
      await axios.request(config);
      toast.success("Course deleted successfully!");
      setAllCourses(allCourses.filter((course) => course._id !== _id));
    } catch (error) {
      toast.error("Failed to delete course.");
      console.log(error);
    }
  };

  const addCourse = async () => {
    try {
      const response = await axios.post("/api/Admin/Songwriting", newCourse, {
        headers: { "Content-Type": "application/json" },
      });
      toast.success("Course added successfully!");
      setAllCourses([...allCourses, response.data.data]);
      setNewCourse({
        title: "",
        status: "",
        content: { point1: "", point2: "", point3: "", point4: "" },
        image: { url: "", alt: "" },
        examples: { song: "", artist: "", url: "" },
        tips: { author: "", tip: "" },
      });
      setIsDropdownOpen(false); // Close the dropdown after adding the course
      console.log("Course added:", response.data);
    } catch (error) {
      toast.error("Failed to add course.");
      console.error(
        "Error adding course:",
        error.response ? error.response.data : error.message
      );
    }
  };

  // State and handlers for product actions and filtering
  const [showActions, setShowActions] = useState(false);
  const [activeIndex, setActiveIndex] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearchChange = (e) => setSearchQuery(e.target.value);

  const handleEllipsisClick = (index) => {
    if (activeIndex === index) {
      setActiveIndex(null);
      setShowActions(false);
    } else {
      setActiveIndex(index);
      setShowActions(true);
    }
  };

  const [filter, setFilter] = useState("All");
  const filteredProducts = (allCourses || []) // Ensure allCourses is an array
    .filter((product) => {
      // Check if filter is "All" or if product status matches the filter
      if (filter === "All") return true;
      return product.status === filter;
    })
    .filter((product) => {
      const title = product.title || ""; // Fallback to empty string if title is undefined
      return title.toLowerCase().includes(searchQuery.toLowerCase());
    });

  // Pagination logic
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 5;

  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = filteredProducts.slice(
    indexOfFirstProduct,
    indexOfLastProduct
  );

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  if (loading) return <p className="text-center mt-4">Loading...</p>;
  if (error) return <p className="text-center mt-4">Error: {error}</p>;

  return (
    <div className="w-fit min-h-screen bg-gray-300 text-gray-700">
      <ToastContainer />
      <div className="flex">
        <AdminSlider />
        <div className="flex-1 p-6 ml-16 border">
          <div>
            <nav className="flex justify-between items-center mb-4">
              <div>
                <span className="font-semibold">/Admin/SongWriting</span>
              </div>
              <div className="flex space-x-4 items-center">
                <div className="flex items-center bg-white p-2 rounded">
                  <FaSearch className="mr-2 text-gray-500" />
                  <input
                    type="text"
                    placeholder="Search..."
                    className="outline-none"
                    value={searchQuery}
                    onChange={handleSearchChange}
                  />
                </div>
                <span className="flex items-center">
                  <div className="mr-2 text-gray-500 text-2xl border border-gray-500 rounded-full p-2">
                    <FaUser />
                  </div>
                </span>
              </div>
            </nav>
          </div>

          <div className="flex justify-between mb-4">
            <div className="flex space-x-4">
              {["All", "Active", "Draft", "Archived"].map((status) => (
                <span
                  key={status}
                  className={`cursor-pointer ${
                    filter === status ? "font-bold" : ""
                  }`}
                  onClick={() => setFilter(status)}
                >
                  {status}
                </span>
              ))}
            </div>
            <div className="flex justify-between mt-4">
              <button
                className="bg-blue-500 text-white px-4 py-2 rounded flex items-center"
                onClick={openAddProductForm}
              >
                <FaPlus className="mr-2" />
                Add Product
              </button>
              {showAddProduct && (
                <div className="fixed inset-0 flex items-center justify-center bg-gray-500 bg-opacity-50">
                  <div className="bg-white text-black p-8 rounded w-1/2 max-h-screen overflow-y-auto">
                    <h2 className="text-xl font-semibold mb-4">
                      Add New Product
                    </h2>
                    <form>
                      <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700">
                          title:
                        </label>
                        <input
                          type="text"
                          name="title"
                          placeholder="Title"
                          value={newCourse.title}
                          onChange={handleInputChange}
                          required
                          className="border border-gray-300 rounded-md w-full p-2 mt-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                      </div>
                      <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700">
                          Status:
                        </label>
                        <select
                          name="status"
                          value={newCourse.status}
                          onChange={handleInputChange}
                          required
                          className="border border-gray-300 rounded-md w-full p-2 mt-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        >
                          <option value="">Select Status</option>
                          <option value="Active">Active</option>
                          <option value="Draft">Draft</option>
                          <option value="Archived">Archived</option>
                        </select>
                      </div>
                      <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700">
                          Content Point 1:
                        </label>
                        <input
                          type="text"
                          name="content.point1"
                          placeholder="Content Point 1"
                          value={newCourse.content.point1}
                          onChange={handleInputChange}
                          required
                          className="border border-gray-300 rounded-md w-full p-2 mt-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                      </div>
                      <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700">
                          Content Point 2:
                        </label>
                        <input
                          type="text"
                          name="content.point2"
                          placeholder="Content Point 2"
                          value={newCourse.content.point2}
                          onChange={handleInputChange}
                          required
                          className="border border-gray-300 rounded-md w-full p-2 mt-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                      </div>
                      <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700">
                          Content Point 3:
                        </label>
                        <input
                          type="text"
                          name="content.point3"
                          placeholder="Content Point 3"
                          value={newCourse.content.point3}
                          onChange={handleInputChange}
                          required
                          className="border border-gray-300 rounded-md w-full p-2 mt-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                      </div>
                      <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700">
                          Image URL:
                        </label>
                        <input
                          type="text"
                          name="image.url"
                          placeholder="Image URL"
                          value={newCourse.image.url}
                          onChange={handleInputChange}
                          required
                          className="border border-gray-300 rounded-md w-full p-2 mt-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                      </div>
                      <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700">
                          Image Alt:
                        </label>
                        <input
                          type="text"
                          name="image.alt"
                          placeholder="Image Alt"
                          value={newCourse.image.alt}
                          onChange={handleInputChange}
                          required
                          className="border border-gray-300 rounded-md w-full p-2 mt-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                      </div>
                      <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700">
                          Example Song:
                        </label>
                        <input
                          type="text"
                          name="examples.song"
                          placeholder="Example Song"
                          value={newCourse.examples.song}
                          onChange={handleInputChange}
                          required
                          className="border border-gray-300 rounded-md w-full p-2 mt-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                      </div>
                      <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700">
                          Example Artist:
                        </label>
                        <input
                          type="text"
                          name="examples.artist"
                          placeholder="Example Artist"
                          value={newCourse.examples.artist}
                          onChange={handleInputChange}
                          required
                          className="border border-gray-300 rounded-md w-full p-2 mt-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                      </div>
                      <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700">
                          Example URL:
                        </label>
                        <input
                          type="text"
                          name="examples.url"
                          placeholder="Example URL"
                          value={newCourse.examples.url}
                          onChange={handleInputChange}
                          required
                          className="border border-gray-300 rounded-md w-full p-2 mt-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                      </div>
                      <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700">
                          Tip Author:
                        </label>
                        <input
                          type="text"
                          name="tips.author"
                          placeholder="Tip Author"
                          value={newCourse.tips.author}
                          onChange={handleInputChange}
                          required
                          className="border border-gray-300 rounded-md w-full p-2 mt-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                      </div>
                      <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700">
                          Tip:
                        </label>
                        <input
                          type="text"
                          name="tips.tip"
                          placeholder="Tip"
                          value={newCourse.tips.tip}
                          onChange={handleInputChange}
                          required
                          className="border border-gray-300 rounded-md w-full p-2 mt-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                      </div>
                      <div className="flex justify-end">
                        <button
                          type="button"
                          className="bg-gray-400 text-white px-4 py-2 rounded mr-2 transition duration-300 ease-in-out hover:bg-gray-500 focus:outline-none focus:ring-2 focus:ring-gray-400"
                          onClick={closeAddProductForm}
                        >
                          Cancel
                        </button>
                        <button
                          type="button"
                          onClick={addCourse} // Call the addCourse function directly
                          className="bg-blue-500 text-white px-4 py-2 rounded transition duration-300 ease-in-out hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400"
                        >
                          Add Product
                        </button>
                      </div>
                    </form>
                  </div>
                </div>
              )}
            </div>
          </div>

          <div className="overflow-x-auto">
            <div className="min-w-full bg-gray-50 p-6 rounded-lg shadow-lg">
              <h1 className="text-3xl font-bold text-gray-800 mb-2">
                Products
              </h1>
              <p className="text-lg text-gray-600">
                Manage your products and view their sales performance.
              </p>
              <hr className="border-t-2 border-gray-300 my-4" />
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Image URL
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Image Alt
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Title
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Status
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Content Point 1
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Content Point 2
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Content Point 3
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Example Song
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Example Artist
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Example URL
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Tips Author
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Tips Tip
                    </th>
                    <th scope="col" className="relative px-6 py-3">
                      <span className="sr-only">Edit</span>
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {currentProducts.map((course, index) => (
                    <tr key={course._id}>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        <Image
                          src={course.image?.url || ""}
                          alt="course Image"
                          width={56} // Example width
                          height={56} // Example height
                          className="object-cover rounded-full"
                        />
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {course.image?.alt || ""}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {course.title || ""}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span
                          className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                            course.status === "Active"
                              ? "bg-green-100 text-green-800"
                              : course.status === "Draft"
                              ? "bg-yellow-100 text-yellow-800"
                              : "bg-red-100 text-red-800"
                          }`}
                        >
                          {course.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {course.content?.point1 || ""}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {course.content?.point2 || ""}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {course.content?.point3 || ""}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {course.examples?.song || ""}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {course.examples?.artist || ""}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {course.examples?.url || ""}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {course.tips?.author || ""}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {course.tips?.tip || ""}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <div className="relative inline-block text-left">
                          <div>
                            <button
                              type="button"
                              className="inline-flex justify-center w-full rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none"
                              id="options-menu"
                              aria-expanded="true"
                              onClick={() => handleEllipsisClick(index)}
                            >
                              <FaEllipsisH className="h-5 w-5" />
                            </button>
                          </div>
                          {showActions && activeIndex === index && (
                            <div className="origin-top-right absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
                              <div
                                className="py-1"
                                role="menu"
                                aria-orientation="vertical"
                                aria-labelledby="options-menu"
                              >
                                <div className="flex justify-between mt-4">
                                  <button
                                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900 w-full text-left"
                                    onClick={openAddProductForm}
                                  >
                                    <FaEdit className="mr-2" />
                                    Edit
                                  </button>
                                  {showAddProduct && (
                                    <div className="fixed inset-0 flex items-center justify-center bg-gray-500 bg-opacity-50">
                                      <div className="bg-white text-black p-8 rounded w-1/2 max-h-screen overflow-y-auto">
                                        <h2 className="text-xl font-semibold mb-4">
                                          Edit Course
                                        </h2>
                                        <form>
                                          <div className="mb-4">
                                            <label className="block text-sm font-medium text-gray-700">
                                              Title:
                                            </label>
                                            <input
                                              type="text"
                                              name="title"
                                              value={course.title || ""}
                                              onChange={(e) =>
                                                handleInputChange(e, index)
                                              } // Pass index here
                                              required
                                              className="border border-gray-300 rounded-md w-full p-2 mt-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                            />
                                          </div>

                                          <div className="mb-4">
                                            <label className="block text-sm font-medium text-gray-700">
                                              Status:
                                            </label>
                                            <select
                                              name="status"
                                              value={course.status || ""} // Ensure default value is handled
                                              onChange={(e) =>
                                                handleInputChange(e, index)
                                              } // Pass index here
                                              required
                                              className="border border-gray-300 rounded-md w-full p-2 mt-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                            >
                                              <option value="">
                                                Select Status
                                              </option>
                                              <option value="Active">
                                                Active
                                              </option>
                                              <option value="Draft">
                                                Draft
                                              </option>
                                              <option value="Archived">
                                                Archived
                                              </option>
                                            </select>
                                          </div>

                                          <div className="mb-4">
                                            <label className="block text-sm font-medium text-gray-700">
                                              Image URL:
                                            </label>
                                            <input
                                              type="text"
                                              name="image.url"
                                              value={course.image?.url || ""}
                                              onChange={(e) =>
                                                handleNestedInputChange(
                                                  e,
                                                  index,
                                                  "image",
                                                  "url"
                                                )
                                              }
                                              required
                                              className="border border-gray-300 rounded-md w-full p-2 mt-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                            />
                                          </div>

                                          <div className="mb-4">
                                            <label className="block text-sm font-medium text-gray-700">
                                              Image Alt:
                                            </label>
                                            <input
                                              type="text"
                                              name="image.alt"
                                              value={course.image?.alt || ""}
                                              onChange={(e) =>
                                                handleNestedInputChange(
                                                  e,
                                                  index,
                                                  "image",
                                                  "alt"
                                                )
                                              }
                                              required
                                              className="border border-gray-300 rounded-md w-full p-2 mt-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                            />
                                          </div>

                                          <div className="mb-4">
                                            <label className="block text-sm font-medium text-gray-700">
                                              Content Point 1:
                                            </label>
                                            <input
                                              type="text"
                                              name="content.point1"
                                              value={
                                                course.content?.point1 || ""
                                              }
                                              onChange={(e) =>
                                                handleNestedInputChange(
                                                  e,
                                                  index,
                                                  "content",
                                                  "point1"
                                                )
                                              }
                                              required
                                              className="border border-gray-300 rounded-md w-full p-2 mt-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                            />
                                          </div>
                                          <div className="mb-4">
                                            <label className="block text-sm font-medium text-gray-700">
                                              Content Point 2:
                                            </label>
                                            <input
                                              type="text"
                                              name="content.point2"
                                              value={
                                                course.content?.point2 || ""
                                              }
                                              onChange={(e) =>
                                                handleNestedInputChange(
                                                  e,
                                                  index,
                                                  "content",
                                                  "point2"
                                                )
                                              }
                                              required
                                              className="border border-gray-300 rounded-md w-full p-2 mt-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                            />
                                          </div>
                                          <div className="mb-4">
                                            <label className="block text-sm font-medium text-gray-700">
                                              Content Point 3:
                                            </label>
                                            <input
                                              type="text"
                                              name="content.point3"
                                              value={
                                                course.content?.point3 || ""
                                              }
                                              onChange={(e) =>
                                                handleNestedInputChange(
                                                  e,
                                                  index,
                                                  "content",
                                                  "point3"
                                                )
                                              }
                                              required
                                              className="border border-gray-300 rounded-md w-full p-2 mt-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                            />
                                          </div>

                                          <div className="mb-4">
                                            <label className="block text-sm font-medium text-gray-700">
                                              Example Song:
                                            </label>
                                            <input
                                              type="text"
                                              name="examples.song"
                                              value={
                                                course.examples?.song || ""
                                              }
                                              onChange={(e) =>
                                                handleNestedInputChange(
                                                  e,
                                                  index,
                                                  "examples",
                                                  "song"
                                                )
                                              }
                                              required
                                              className="border border-gray-300 rounded-md w-full p-2 mt-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                            />
                                          </div>

                                          <div className="mb-4">
                                            <label className="block text-sm font-medium text-gray-700">
                                              Example Artist:
                                            </label>
                                            <input
                                              type="text"
                                              name="examples.artist"
                                              value={
                                                course.examples?.artist || ""
                                              }
                                              onChange={(e) =>
                                                handleNestedInputChange(
                                                  e,
                                                  index,
                                                  "examples",
                                                  "artist"
                                                )
                                              }
                                              required
                                              className="border border-gray-300 rounded-md w-full p-2 mt-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                            />
                                          </div>

                                          <div className="mb-4">
                                            <label className="block text-sm font-medium text-gray-700">
                                              Example URL:
                                            </label>
                                            <input
                                              type="text"
                                              name="examples.url"
                                              value={course.examples?.url || ""}
                                              onChange={(e) =>
                                                handleNestedInputChange(
                                                  e,
                                                  index,
                                                  "examples",
                                                  "url"
                                                )
                                              }
                                              required
                                              className="border border-gray-300 rounded-md w-full p-2 mt-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                            />
                                          </div>

                                          <div className="mb-4">
                                            <label className="block text-sm font-medium text-gray-700">
                                              Tips Author:
                                            </label>
                                            <input
                                              type="text"
                                              name="tips.author"
                                              value={course.tips?.author || ""}
                                              onChange={(e) =>
                                                handleNestedInputChange(
                                                  e,
                                                  index,
                                                  "tips",
                                                  "author"
                                                )
                                              }
                                              required
                                              className="border border-gray-300 rounded-md w-full p-2 mt-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                            />
                                          </div>

                                          <div className="mb-4">
                                            <label className="block text-sm font-medium text-gray-700">
                                              Tips Tip:
                                            </label>
                                            <input
                                              type="text"
                                              name="tips.tip"
                                              value={course.tips?.tip || ""}
                                              onChange={(e) =>
                                                handleNestedInputChange(
                                                  e,
                                                  index,
                                                  "tips",
                                                  "tip"
                                                )
                                              }
                                              required
                                              className="border border-gray-300 rounded-md w-full p-2 mt-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                            />
                                          </div>

                                          <div className="flex justify-end">
                                            <button
                                              type="button"
                                              className="bg-gray-400 text-white px-4 py-2 rounded mr-2 transition duration-300 ease-in-out hover:bg-gray-500 focus:outline-none focus:ring-2 focus:ring-gray-400"
                                              onClick={closeAddProductForm}
                                            >
                                              Cancel
                                            </button>
                                            <button
                                              type="button"
                                              onClick={() =>
                                                saveUpdates(course)
                                              }
                                              className="bg-blue-500 text-white px-4 py-2 rounded transition duration-300 ease-in-out hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400"
                                            >
                                              Save
                                            </button>
                                          </div>
                                        </form>
                                      </div>
                                    </div>
                                  )}
                                </div>
                                <button
                                  onClick={() => deleteCourse(course._id)}
                                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900 w-full text-left"
                                >
                                  <FaTrashAlt className="mr-2" />
                                  Delete
                                </button>
                              </div>
                            </div>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <div className="flex justify-between mt-4">
            <div>
              Showing {indexOfFirstProduct + 1}-
              {Math.min(indexOfLastProduct, filteredProducts.length)} of{" "}
              {filteredProducts.length} products
            </div>
            <div className="flex space-x-2">
              <button
                className={`bg-gray-400 text-white px-2 py-1 rounded flex items-center ${
                  currentPage === 1 ? "pointer-events-none opacity-50" : ""
                }`}
                onClick={() => paginate(currentPage - 1)}
                disabled={currentPage === 1}
              >
                <FaChevronLeft className="mr-2" />
                Prev
              </button>
              <button
                className={`bg-gray-400 text-white px-2 py-1 rounded flex items-center ${
                  indexOfLastProduct >= filteredProducts.length
                    ? "pointer-events-none opacity-50"
                    : ""
                }`}
                onClick={() => paginate(currentPage + 1)}
                disabled={indexOfLastProduct >= filteredProducts.length}
              >
                Next
                <FaChevronRight className="ml-2" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AllCourses;
