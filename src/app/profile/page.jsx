"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
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
  FaEnvelope,
} from "react-icons/fa";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Link from "next/link";

const Profile = () => {
  const [profile, setProfile] = useState({
    userId: "",
    username: "",
    profile: "",
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    city: "",
    hobbies: "",
    studentId: "",
    isDarkMode: false,
    theme: "",
    genresStyles: "",
    performanceExperience: "",
    achievementsAwards: "",
    musicEducationHistory: "",
    SocialMediaLinkForInstagram: "",
    SocialMediaLinkForYoutube: "",
    SocialMediaLinkForLinkdin: "",
    bio: "",
  });

  const [loading, setLoading] = useState(true);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [buttonBgColor, setButtonBgColor] = useState("bg-blue-500");
  const [isProfileCreated, setIsProfileCreated] = useState(false);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const userId = localStorage.getItem("userId");
        if (userId) {
          const response = await axios.get(
            `/api/users/profile?userId=${userId}`
          );
          if (response.data.data) {
            setProfile(response.data.data);
            setIsProfileCreated(true); // Profile exists
          }
        } else {
          toast.error("No user ID found.");
        }
      } catch (error) {
        toast.error("Failed to fetch profile.");
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  const toggleDropdown = () => setIsDropdownOpen((prev) => !prev);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProfile((prev) => ({ ...prev, [name]: value }));
  };

  const saveProfile = async () => {
    const userId = localStorage.getItem("userId");

    if (!userId) {
      toast.error("User ID not found in local storage.");
      return;
    }

    const profileWithUserId = {
      ...profile,
      userId,
    };

    const config = {
      method: "POST",
      url: `/api/users/profile`,
      headers: {
        "Content-Type": "application/json",
      },
      data: profileWithUserId,
    };

    try {
      const response = await axios.request(config);
      toast.success("Profile created successfully!");
      setButtonBgColor("bg-green-500");
      setIsProfileCreated(true); // Set profile as created
      console.log(JSON.stringify(response.data));
    } catch (error) {
      toast.error("Failed to create profile.");
      console.log(error);
    }
  };

  const updateProfile = async () => {
    const userId = localStorage.getItem("userId");

    if (!userId) {
      toast.error("User ID not found in local storage.");
      return;
    }

    const config = {
      method: "PUT",
      url: `/api/users/profile?userId=${userId}`,
      headers: {
        "Content-Type": "application/json",
      },
      data: {
        ...profile,
        userId,
      },
    };

    try {
      const response = await axios.request(config);
      toast.success("Profile updated successfully!");
      setButtonBgColor("bg-green-500");
      console.log(JSON.stringify(response.data));
    } catch (error) {
      toast.error("Failed to update profile.");
      console.log(error);
    }
  };

  if (loading) return <p className="text-center mt-4">Loading...</p>;

  return (
    <div className="min-h-screen bg-gray-900 text-white flex items-center justify-center">
      <ToastContainer />

      <div className="shadow-md rounded-lg p-6 max-w-5xl w-full bg-gray-800">
        <div className="flex flex-row justify-between mb-4">
          <Link href="/">
            <FaHome size={24} className="text-gray-300" />
          </Link>
        </div>
        <div className="flex flex-col items-center">
          <div className="relative w-32 h-32 md:w-40 md:h-40">
            {profile?.profile ? (
              <Image
                src={
                  profile.profile.startsWith("http")
                    ? profile.profile
                    : "/placeholder-image.jpg"
                }
                alt="Profile Photo"
                layout="fill"
                className="rounded-full object-cover"
              />
            ) : (
              <div className="w-full h-full border-4 border-gray-600 rounded-full bg-gray-700" />
            )}
          </div>
          <div className="mt-2 text-center">
            <h2 className="text-xl font-semibold">
              {profile?.firstName} {profile?.lastName}
            </h2>
            <p className="text-gray-400">{profile?.username}</p>
          </div>
        </div>
        <div className="mt-4 mx-auto flex flex-col lg:flex-row lg:justify-between">
          <div className="mt-2 space-y-2">
            <p className="flex items-center">
              <FaEnvelope className="mr-2" />{" "}
              <span className="font-bold mr-1">Email:</span> {profile?.email}
            </p>
            <p className="flex items-center">
              <FaPhone className="mr-2" />{" "}
              <span className="font-bold mr-1">Phone:</span> {profile?.phone}
            </p>
            <p className="flex items-center">
              <FaCity className="mr-2" />{" "}
              <span className="font-bold mr-1">City:</span> {profile?.city}
            </p>
            <p className="flex items-center">
              <FaMusic className="mr-2" />{" "}
              <span className="font-bold mr-1">Hobbies:</span>{" "}
              {profile?.hobbies}
            </p>
            <p className="flex items-center">
              <FaUser className="mr-2" />{" "}
              <span className="font-bold mr-1">Student ID:</span>{" "}
              {profile?.studentId}
            </p>
            <p className="flex items-center">
              <span className="font-bold mr-1">Bio:</span> {profile?.bio}
            </p>
          </div>
          <div className="mt-4 lg:mt-0 space-y-2">
            <h1 className="text-xl font-semibold lg:hidden">Musical Details</h1>
            <p className="flex items-center">
              <FaMusic size={20} className="mr-2" />
              <span className="font-bold mr-1">Styles:</span>{" "}
              {profile?.genresStyles}
            </p>
            <p className="flex items-center">
              <FaTrophy size={20} className="mr-2" />
              <span className="font-bold mr-1">Experience:</span>
              {profile?.performanceExperience}
            </p>
            <p className="flex items-center">
              <FaMedal size={20} className="mr-2" />
              <span className="font-bold mr-1">Awards:</span>{" "}
              {profile?.achievementsAwards}
            </p>
            <p className="flex items-center">
              <FaScroll size={20} className="mr-2" />
              <span className="font-bold mr-1">Music History:</span>
              {profile?.musicEducationHistory}
            </p>
            <div className="flex flex-wrap items-center">
              <FaGlobe size={22} className="mr-2" />
              <span className="font-bold">Social Media:</span>
              <div className="flex flex-wrap ml-2 space-y-2">
                {profile?.SocialMediaLinkForInstagram && (
                  <p className="flex items-center">
                    <FaInstagram size={20} className="mr-2" />
                    {profile?.SocialMediaLinkForInstagram}
                  </p>
                )}
                {profile?.SocialMediaLinkForYoutube && (
                  <p className="flex items-center">
                    <FaYoutube size={20} className="mr-2" />
                    {profile?.SocialMediaLinkForYoutube}
                  </p>
                )}
                {profile?.SocialMediaLinkForLinkdin && (
                  <p className="flex items-center">
                    <FaLinkedin size={20} className="mr-2" />
                    {profile?.SocialMediaLinkForLinkdin}
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>
        <div className="mt-4 flex flex-col items-center w-full">
          {!isProfileCreated ? (
            <button
              onClick={saveProfile}
              className={`mt-4 text-white px-4 py-2 rounded hover:bg-blue-600 ${buttonBgColor}`}
            >
              Create Profile
            </button>
          ) : (
            <div className="flex flex-col items-center w-full">
              <span
                className="text-lg font-semibold border hover:bg-blue-600 cursor-pointer px-6 py-2 rounded-full mt-4"
                onClick={toggleDropdown}
              >
                Update Profile
              </span>
              {isDropdownOpen && (
                <div className="mt-3 w-full max-w-5xl">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {/* Form fields for profile editing */}
                    {[
                      { name: "profile", placeholder: "Profile Image URL" },
                      { name: "username", placeholder: "username" },
                      { name: "firstName", placeholder: "First Name" },
                      { name: "lastName", placeholder: "Last Name" },
                      { name: "email", placeholder: "Email" },
                      { name: "phone", placeholder: "Phone" },
                      { name: "city", placeholder: "City" },
                      { name: "hobbies", placeholder: "Hobbies" },
                      { name: "studentId", placeholder: "Student ID" },
                      { name: "genresStyles", placeholder: "Genres Styles" },
                      {
                        name: "performanceExperience",
                        placeholder: "Performance Experience",
                      },
                      {
                        name: "achievementsAwards",
                        placeholder: "Achievements Awards",
                      },
                      {
                        name: "musicEducationHistory",
                        placeholder: "Music Education History",
                      },
                      {
                        name: "SocialMediaLinkForInstagram",
                        placeholder: "Instagram",
                      },
                      {
                        name: "SocialMediaLinkForYoutube",
                        placeholder: "Youtube",
                      },
                      {
                        name: "SocialMediaLinkForLinkdin",
                        placeholder: "LinkedIn",
                      },
                      { name: "bio", placeholder: "Bio" },
                    ].map(({ name, placeholder }) => (
                      <input
                        key={name}
                        type="text"
                        name={name}
                        placeholder={placeholder}
                        value={profile[name]}
                        onChange={handleInputChange}
                        className="p-2 mt-2 border rounded bg-gray-700 text-white w-full max-w-lg"
                      />
                    ))}
                  </div>
                  <button
                    onClick={updateProfile}
                    className={`mt-4 text-white px-4 py-2 rounded hover:bg-blue-600 ${buttonBgColor}`}
                  >
                    Save Changes
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Profile;
