"use client";
import Image from "next/image";
import React, { useState } from "react";
import clsx from "clsx";
import axios from "axios";
import Link from "next/link";
import { toast } from "react-hot-toast";
import { FaHome, FaPhone, FaCity, FaUser, FaMusic } from "react-icons/fa";
import {
  FaTrophy,
  FaMedal,
  FaScroll,
  FaGlobe,
  FaInstagram,
  FaYoutube,
  FaLinkedin,
} from "react-icons/fa";

const Profile: React.FC = () => {
  const [profile, setProfile] = useState("/1704988810024.jpg");
  const [firstName, setFirstName] = useState("Shiv");
  const [lastName, setLastName] = useState("Sharma");
  const [email, setEmail] = useState("shiv.sharma@example.com");
  const [phone, setPhone] = useState(" 123-456-7890");
  const [city, setCity] = useState("New York");
  const [hobbies, setHobbies] = useState("Web Development");
  const [studentId, setStudentId] = useState("123456789");
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [theme, setTheme] = useState("dark");

  const [genresStyles, setGenresStyles] = useState(
    " Classical, Jazz, Rock, Pop"
  );
  const [performanceExperience, setPerformanceExperience] = useState(
    " Performed as a solo pianist and band member for 5 years."
  );
  const [achievementsAwards, setAchievementsAwards] = useState(
    " Winner of the 2020 National Piano Competition."
  );
  const [musicEducationHistory, setMusicEducationHistory] = useState(
    " Bachelor's degree in Music from Berklee College of Music."
  );

  const initialLinks = [
    {
      icon: <FaInstagram />,
      url: "https://instagram.com/MR_SHIV_SHARMA_1",
      displayText: "MR_SHIV_SHARMA_1 ",
    },
    {
      icon: <FaYoutube />,
      url: "https://youtube.com/@MR_SHIV_SHARMA_1",
      displayText: "@MR_SHIV_SHARMA_1 ",
    },
    {
      icon: <FaLinkedin />,
      url: "https://www.linkedin.com/in/shiv-prasad-sharma-490b732a1/",
      displayText: "shiv-prasad-sharma",
    },
  ];

  const [socialMediaLinks, setSocialMediaLinks] = useState(initialLinks);

  const toggleTheme = () => {
    setIsDarkMode((prev) => !prev);
    setTheme(theme === "dark" ? "light" : "dark");
  };

  const toggleDropdown = () => {
    setIsDropdownOpen((prev) => !prev);
  };

  const saveUpdates = () => {
    // Handle save updates logic here
    alert("Profile updated successfully!");
    // Example: Send musical details to backend or perform necessary actions
    const musicalDetails = {
      genresStyles,
      performanceExperience,
      achievementsAwards,
      musicEducationHistory,
      socialMediaLinks,
    };
    // Send musicalDetails to backend or perform necessary actions
  };

  const [data, setData] = useState("nothing");
  const getUserDetails = async () => {
    try {
      const res = await axios.post("/api/users/me");
      console.log(res.data);
      setData(res.data.data._id);
    } catch (error: any) {
      console.log(error.message);
      toast.error(error.message);
    }
  };

  return (
    <div
      className={clsx("min-h-screen mx-auto sm:px-6 sm:py-1.5", {
        dark: isDarkMode,
      })}
    >
      <div
        className={clsx("shadow-md rounded-lg p-6", {
          "bg-white text-black": !isDarkMode,
          "bg-gray-800 text-white": isDarkMode,
        })}
      >
        <div className="flex flex-row justify-between ">
          <Link href="/">
            <FaHome size={24} />
          </Link>
          <label htmlFor="toggle" className="flex items-center cursor-pointer">
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
        <div className="flex flex-col md:flex-col items-center md:items-center">
          <div className="relative w-32 h-32 md:w-40 md:h-40">
            <Image
              src={profile}
              alt="Profile Photo"
              layout="fill"
              className="rounded-full object-cover"
            />
          </div>
          <div className="md:ml-6 mt-4 md:mt-0 text-center md:text-left">
            <h2 className="text-xl text-center p-2 font-semibold">
              {firstName} {lastName}
            </h2>
            <p className="text-gray-400 text-center">{email}</p>
          </div>
        </div>
        <div className="mx-auto flex flex-col lg:flex-row justify-between">
          <div className="">
            <p
              className={clsx("flex items-center", {
                "text-black": !isDarkMode,
                "text-white": isDarkMode,
              })}
            >
              <FaPhone className="mr-2" />{" "}
              <span className="font-bold mr-1">Phone : </span> {phone}
            </p>
            <p
              className={clsx("flex items-center", {
                "text-black": !isDarkMode,
                "text-white": isDarkMode,
              })}
            >
              <FaCity className="mr-2" />{" "}
              <span className="font-bold mr-1">City : </span> {city}
            </p>
            <p
              className={clsx("flex items-center", {
                "text-black": !isDarkMode,
                "text-white": isDarkMode,
              })}
            >
              <FaMusic className="mr-2" />{" "}
              <span className="font-bold mr-1">Hobbie : </span> {hobbies}
            </p>
            <p
              className={clsx("flex items-center", {
                "text-black": !isDarkMode,
                "text-white": isDarkMode,
              })}
            >
              <FaUser className="mr-2" />{" "}
              <span className="font-bold mr-1">Student ID : </span> {studentId}
            </p>
          </div>
          <div className="">
            <h1 className="my-2 lg:hidden font-semibold text-xl">
              Musical Details
            </h1>
            <p
              className={clsx("flex items-center flex-col lg:flex-row mt-2", {
                "text-black": !isDarkMode,
                "text-white": isDarkMode,
              })}
            >
              <FaMusic size={54} className="mr-2 md:hidden" />
              {/* Show on small screens */}
              <FaMusic size={20} className="mr-2 hidden md:inline-block" />
              {/* Show on larger screens */}
              <span className="font-bold mr-1">Styles:</span> {genresStyles}
            </p>
            <p
              className={clsx("flex items-center flex-col lg:flex-row mt-2", {
                "text-black": !isDarkMode,
                "text-white": isDarkMode,
              })}
            >
              <FaTrophy size={54} className="mr-2 md:hidden" />
              {/* Show on small screens */}
              <FaTrophy size={22} className="mr-2 hidden md:inline-block" />
              {/* Show on larger screens */}
              <span className="font-bold mr-1">Experience:</span>
              {performanceExperience}
            </p>
            <p
              className={clsx("flex items-center flex-col lg:flex-row mt-2", {
                "text-black": !isDarkMode,
                "text-white": isDarkMode,
              })}
            >
              <FaMedal size={54} className="mr-2 md:hidden" />
              {/* Show on small screens */}
              <FaMedal size={22} className="mr-2 hidden md:inline-block" />
              {/* Show on larger screens */}{" "}
              <span className="font-bold mr-1">Awards: </span>{" "}
              {performanceExperience}
            </p>
            <p
              className={clsx("flex items-center flex-col lg:flex-row mt-2", {
                "text-black": !isDarkMode,
                "text-white": isDarkMode,
              })}
            >
              <FaScroll size={54} className="mr-2 md:hidden" />{" "}
              {/* Show on small screens */}
              <FaScroll
                size={22}
                className="mr-2 hidden md:inline-block"
              />{" "}
              {/* Show on larger screens */}{" "}
              <span className="font-bold mr-1">MusicHistory: </span>
              {musicEducationHistory}
            </p>

            <div className="flex items-center flex-wrap mt-2">
              <FaGlobe size={22} className="mr-2" />
              <span className="font-bold">Social Media:</span>
              <div className="flex flex-wrap ml-2">
                {socialMediaLinks.map((link, index) => (
                  <div key={index} className="flex items-center  mr-4">
                    {link.icon}
                    <a
                      href={link.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="ml-2 text-blue-500 hover:underline"
                    >
                      {link.displayText}
                    </a>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
        <div
          className={clsx("mt-6", {
            "text-black": !isDarkMode,
            "text-white": isDarkMode,
          })}
        >
          <p>
            Hello! Im {firstName}, a passionate web developer with expertise in
            front-end technologies. I love creating beautiful and functional
            websites and writing about tech trends.
          </p>
        </div>
        <div className="card-body mt-2">
          <span className="p-1 rounded bg-green-500">
            {data === "nothing" ? (
              "Nothing"
            ) : (
              <Link href={`/profile/${data}`}>{data}</Link>
            )}
          </span>
          <div className="card-actions justify-end">
            <button
              onClick={getUserDetails}
              className="bg-green-800 mt-4 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            >
              GetUser Details
            </button>
          </div>
        </div>
        <div className="mt-2">
          <h3
            className="text-lg font-semibold cursor-pointer"
            onClick={toggleDropdown}
          >
            Update Profile
          </h3>
          {isDropdownOpen && (
            <div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input
                  type="text"
                  placeholder="profile img"
                  value={profile}
                  onChange={(e) => setProfile(e.target.value)}
                  className="p-2 mt-2 border rounded bg-gray-200 dark:bg-gray-700 text-black dark:text-white"
                />
                <input
                  type="text"
                  placeholder="First Name"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  className="p-2 border rounded bg-gray-200 dark:bg-gray-700 text-black dark:text-white"
                />
                <input
                  type="text"
                  placeholder="Last Name"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  className="p-2 border rounded bg-gray-200 dark:bg-gray-700 text-black dark:text-white"
                />
                <input
                  type="email"
                  placeholder="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="p-2 border rounded bg-gray-200 dark:bg-gray-700 text-black dark:text-white"
                />
                <input
                  type="text"
                  placeholder="Phone"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="p-2 border rounded bg-gray-200 dark:bg-gray-700 text-black dark:text-white"
                />
                <input
                  type="text"
                  placeholder="City"
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  className="p-2 border rounded bg-gray-200 dark:bg-gray-700 text-black dark:text-white"
                />
                <input
                  type="text"
                  placeholder="Hobbies"
                  value={hobbies}
                  onChange={(e) => setHobbies(e.target.value)}
                  className="p-2 border rounded bg-gray-200 dark:bg-gray-700 text-black dark:text-white"
                />
                <input
                  type="text"
                  placeholder="Student ID"
                  value={studentId}
                  onChange={(e) => setStudentId(e.target.value)}
                  className="p-2 border rounded bg-gray-200 dark:bg-gray-700 text-black dark:text-white"
                />
              </div>
              <div className="mt-6">
                <h3 className="text-lg font-semibold mb-4">Musical Details</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <input
                    type="text"
                    placeholder="Genres or Styles"
                    value={genresStyles}
                    onChange={(e) => setGenresStyles(e.target.value)}
                    className="p-2 border rounded bg-gray-200 dark:bg-gray-700 text-black dark:text-white"
                  />
                  <input
                    type="text"
                    placeholder="Performance Experience"
                    value={performanceExperience}
                    onChange={(e) => setPerformanceExperience(e.target.value)}
                    className="p-2 border rounded bg-gray-200 dark:bg-gray-700 text-black dark:text-white"
                  />
                  <input
                    type="text"
                    placeholder="Achievements and Awards"
                    value={achievementsAwards}
                    onChange={(e) => setAchievementsAwards(e.target.value)}
                    className="p-2 border rounded bg-gray-200 dark:bg-gray-700 text-black dark:text-white"
                  />
                  <input
                    type="text"
                    placeholder="Music Education History"
                    value={musicEducationHistory}
                    onChange={(e) => setMusicEducationHistory(e.target.value)}
                    className="p-2 border rounded bg-gray-200 dark:bg-gray-700 text-black dark:text-white"
                  />
                  <input
                    type="text"
                    placeholder="Add a Social Media Link"
                    onChange={(e) => {
                      const newLinks = e.target.value
                        .split(",")
                        .map((item, idx) => {
                          const parts = item.trim().split(" ");
                          const url = parts[0];
                          const displayText = parts.slice(1).join(" ");
                          let icon;
                          if (url.includes("instagram")) {
                            icon = <FaInstagram />;
                          } else if (url.includes("youtube")) {
                            icon = <FaYoutube />;
                          } else if (url.includes("linkedin")) {
                            icon = <FaLinkedin />;
                          } else {
                            icon = <FaGlobe />;
                          }
                          return { icon, url, displayText };
                        });
                      setSocialMediaLinks(newLinks);
                    }}
                    className="p-2 border rounded bg-gray-200 dark:bg-gray-700 text-black dark:text-white mt-4"
                  />
                </div>
              </div>
              <button
                onClick={saveUpdates}
                className="mt-4 p-2 bg-blue-500 text-white rounded"
              >
                Save Updates
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Profile;
