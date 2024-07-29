"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import Link from "next/link";
import Image from "next/image";
import {
  FaCity,
  FaGlobe,
  FaHome,
  FaInstagram,
  FaLinkedin,
  FaMedal,
  FaMusic,
  FaPhone,
  FaScroll,
  FaTrophy,
  FaUser,
  FaYoutube,
} from "react-icons/fa";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

type SocialMediaLink = {
  icon: JSX.Element;
  url: string;
  displayText: string;
};

type ProfileType = {
  userId: string;
  profile: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  city: string;
  hobbies: string;
  studentId: string;
  isDarkMode: boolean;
  theme: string;
  genresStyles: string;
  performanceExperience: string;
  achievementsAwards: string;
  musicEducationHistory: string;
  socialMediaLinks: SocialMediaLink[];
  bio: string;
};

const Profile: React.FC = () => {
  const [profile, setProfile] = useState<ProfileType | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [buttonBgColor, setButtonBgColor] = useState("bg-blue-500");

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = localStorage.getItem("loggedInEmail");
        const response = await axios.get(
          `http://localhost:3000/api/users/profile?email=${token}`
        );
        setProfile(response.data.data);
        setLoading(false);
      } catch (error: any) {
        setError(error.response ? error.response.data.error : error.message);
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  const toggleDropdown = () => {
    setIsDropdownOpen((prev) => !prev);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (profile) {
      const { name, value } = e.target;
      setProfile({ ...profile, [name]: value });
    }
  };

  const handleSocialMediaLinksChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    if (profile) {
      const newLinks = e.target.value.split(",").map((item) => {
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
      setProfile({ ...profile, socialMediaLinks: newLinks });
    }
  };

  const saveUpdates = async () => {
    if (profile) {
      const data = JSON.stringify(profile);
      const config = {
        method: "put",
        maxBodyLength: Infinity,
        url: "http://localhost:3000/api/users/profile",
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
    }
  };

  if (loading) return <p className="text-center mt-4">Loading...</p>;
  if (error) return <p className="text-center mt-4">Error: {error}</p>;

  return (
    <div className="min-h-screen mx-auto sm:px-6 sm:py-1.5">
      <ToastContainer />
      {profile ? (
        <div className="shadow-md rounded-lg p-6">
          <div className="flex flex-row justify-between ">
            <Link href="/">
              <FaHome size={24} />
            </Link>
          </div>
          <div className="flex flex-col md:flex-col items-center md:items-center">
            <div className="relative w-32 h-32 md:w-40 md:h-40">
              <Image
                src={profile.profile}
                alt="Profile Photo"
                layout="fill"
                className="rounded-full object-cover"
              />
            </div>
            <div className="md:ml-6 mt-4 md:mt-0 text-center md:text-left">
              <h2 className="text-xl text-center p-2 font-semibold">
                {profile.firstName} {profile.lastName}
              </h2>
              <p className="text-gray-400 text-center"> {profile.email}</p>
            </div>
          </div>
          <div className="mx-auto flex flex-col lg:flex-row justify-between">
            <div className="mt-2">
              <p className="flex items-center">
                <FaPhone className="mr-2" />{" "}
                <span className="font-bold mr-1">Phone : </span> {profile.phone}
              </p>
              <p className="flex items-center">
                <FaCity className="mr-2" />{" "}
                <span className="font-bold mr-1">City : </span> {profile.city}
              </p>
              <p className="flex items-center">
                <FaMusic className="mr-2" />{" "}
                <span className="font-bold mr-1">Hobbies : </span>{" "}
                {profile.hobbies}
              </p>
              <p className="flex items-center">
                <FaUser className="mr-2" />{" "}
                <span className="font-bold mr-1">Student ID : </span>{" "}
                {profile.studentId}
              </p>
              <p className="flex items-center">
                <span className="font-bold mr-1">Bio : {profile.bio}</span>{" "}
              </p>
            </div>
            <div className="">
              <h1 className="my-2 lg:hidden font-semibold text-xl">
                Musical Details
              </h1>
              <p className="flex items-center flex-col lg:flex-row mt-2">
                <FaMusic size={54} className="mr-2 md:hidden" />
                <FaMusic size={20} className="mr-2 hidden md:inline-block" />
                <span className="font-bold mr-1">Styles:</span>{" "}
                {profile.genresStyles}
              </p>
              <p className="flex items-center flex-col lg:flex-row mt-2">
                <FaTrophy size={54} className="mr-2 md:hidden" />
                <FaTrophy size={22} className="mr-2 hidden md:inline-block" />
                <span className="font-bold mr-1">Experience:</span>
                {profile.performanceExperience}
              </p>
              <p className="flex items-center flex-col lg:flex-row mt-2">
                <FaMedal size={54} className="mr-2 md:hidden" />
                <FaMedal size={22} className="mr-2 hidden md:inline-block" />
                <span className="font-bold mr-1">Awards: </span>{" "}
                {profile.achievementsAwards}
              </p>
              <p className="flex items-center flex-col lg:flex-row mt-2">
                <FaScroll size={54} className="mr-2 md:hidden" />{" "}
                <FaScroll size={22} className="mr-2 hidden md:inline-block" />
                <span className="font-bold mr-1">Music History: </span>
                {profile.musicEducationHistory}
              </p>
              {/* <div className="flex items-center flex-wrap mt-2">
                <FaGlobe size={22} className="mr-2" />
                <span className="font-bold">Social Media:</span>
                <div className="flex flex-wrap ml-2">
                  {profile.socialMediaLinks.map((link, index) => (
                    <div key={index} className="flex items-center mr-4">
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
              </div> */}
            </div>
          </div>
          <div className="mt-4">
            <span
              className="text-lg font-semibold cursor-pointer bg-green-500 px-6 py-3 rounded-full mt-4"
              onClick={toggleDropdown}
            >
              Update Profile
            </span>
            {isDropdownOpen && (
              <div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-3">
                  <input
                    type="text"
                    name="profile"
                    placeholder="profile img"
                    value={profile.profile}
                    onChange={handleInputChange}
                    className="p-2 mt-2 border rounded bg-gray-200 dark:bg-gray-700 text-black dark:text-white"
                  />
                  <input
                    type="text"
                    name="firstName"
                    placeholder="First Name"
                    value={profile.firstName}
                    onChange={handleInputChange}
                    className="p-2 mt-2 border rounded bg-gray-200 dark:bg-gray-700 text-black dark:text-white"
                  />
                  <input
                    type="text"
                    name="lastName"
                    placeholder="Last Name"
                    value={profile.lastName}
                    onChange={handleInputChange}
                    className="p-2 mt-2 border rounded bg-gray-200 dark:bg-gray-700 text-black dark:text-white"
                  />
                  <input
                    type="text"
                    name="email"
                    placeholder="Email"
                    value={profile.email}
                    onChange={handleInputChange}
                    className="p-2 mt-2 border rounded bg-gray-200 dark:bg-gray-700 text-black dark:text-white"
                  />
                  <input
                    type="text"
                    name="phone"
                    placeholder="Phone"
                    value={profile.phone}
                    onChange={handleInputChange}
                    className="p-2 mt-2 border rounded bg-gray-200 dark:bg-gray-700 text-black dark:text-white"
                  />
                  <input
                    type="text"
                    name="city"
                    placeholder="City"
                    value={profile.city}
                    onChange={handleInputChange}
                    className="p-2 mt-2 border rounded bg-gray-200 dark:bg-gray-700 text-black dark:text-white"
                  />
                  <input
                    type="text"
                    name="hobbies"
                    placeholder="Hobbies"
                    value={profile.hobbies}
                    onChange={handleInputChange}
                    className="p-2 mt-2 border rounded bg-gray-200 dark:bg-gray-700 text-black dark:text-white"
                  />
                  <input
                    type="text"
                    name="studentId"
                    placeholder="Student ID"
                    value={profile.studentId}
                    onChange={handleInputChange}
                    className="p-2 mt-2 border rounded bg-gray-200 dark:bg-gray-700 text-black dark:text-white"
                  />
                  <input
                    type="text"
                    name="genresStyles"
                    placeholder="Genres Styles"
                    value={profile.genresStyles}
                    onChange={handleInputChange}
                    className="p-2 mt-2 border rounded bg-gray-200 dark:bg-gray-700 text-black dark:text-white"
                  />
                  <input
                    type="text"
                    name="performanceExperience"
                    placeholder="Performance Experience"
                    value={profile.performanceExperience}
                    onChange={handleInputChange}
                    className="p-2 mt-2 border rounded bg-gray-200 dark:bg-gray-700 text-black dark:text-white"
                  />
                  <input
                    type="text"
                    name="achievementsAwards"
                    placeholder="Achievements Awards"
                    value={profile.achievementsAwards}
                    onChange={handleInputChange}
                    className="p-2 mt-2 border rounded bg-gray-200 dark:bg-gray-700 text-black dark:text-white"
                  />
                  <input
                    type="text"
                    name="musicEducationHistory"
                    placeholder="Music Education History"
                    value={profile.musicEducationHistory}
                    onChange={handleInputChange}
                    className="p-2 mt-2 border rounded bg-gray-200 dark:bg-gray-700 text-black dark:text-white"
                  />
                  {/* <input
                    type="text"
                    name="socialMediaLinks"
                    placeholder="Social Media Links (comma-separated)"
                    onChange={handleSocialMediaLinksChange}
                    className="p-2 mt-2 border rounded bg-gray-200 dark:bg-gray-700 text-black dark:text-white"
                  /> */}
                  <input
                    name="bio"
                    placeholder="Bio"
                    value={profile.bio}
                    onChange={handleInputChange}
                    className="p-2 mt-2 border rounded bg-gray-200 dark:bg-gray-700 text-black dark:text-white"
                  />
                </div>
                <button
                  onClick={saveUpdates}
                  className={`mt-4 text-white px-4 py-2 rounded hover:bg-blue-600 ${buttonBgColor}`}
                >
                  Save Changes
                </button>
              </div>
            )}
          </div>
        </div>
      ) : (
        <p>No profile data available.</p>
      )}
    </div>
  );
};

export default Profile;
function setButtonBgColor(arg0: string) {
  throw new Error("Function not implemented.");
}
