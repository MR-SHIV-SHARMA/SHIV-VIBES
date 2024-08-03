export default function UserProfile({ params }: any) {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <h1>Profile</h1>
      <hr />
      <p className="text-4xl">
        Profile page
        <span className=" p-2 ml-2 rounded bg-orange-500 text-black">
          {params.id}
        </span>
      </p>
    </div>
  );
}







// "use client";
// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import Image from "next/image";
// import {
//   FaInstagram,
//   FaLinkedin,
//   FaYoutube,
//   FaChevronRight,
// } from "react-icons/fa";
// import { toast, ToastContainer } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";

// const Profile = () => {
//   const [data, setData] = useState({
//     userId: "",
//     profile: "",
//     firstName: "",
//     lastName: "",
//     phone: "",
//     city: "",
//     birthday: "",
//     hobbies: "",
//     studentId: "",
//     genresStyles: "",
//     performanceExperience: "",
//     achievementsAwards: "",
//     musicEducationHistory: "",
//     SocialMediaLinkForInstagram: "",
//     SocialMediaLinkForYoutube: "",
//     SocialMediaLinkForLinkdin: "",
//     bio: "",
//     username: "",
//     email: "",
//   });

//   const [isProfileCreated, setIsProfileCreated] = useState(false);
//   const [loading, setLoading] = useState(true);
//   const [isDropdownOpen, setIsDropdownOpen] = useState(false);
//   const [buttonBgColor, setButtonBgColor] = useState("bg-blue-500");

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const userId = localStorage.getItem("userId");
//         if (userId) {
//           const [profileResponse, signupResponse] = await Promise.all([
//             axios.get(`/api/users/profile?userId=${userId}`),
//             axios.get(`/api/users/signup?userId=${userId}`),
//           ]);

//           if (profileResponse.data.data || signupResponse.data.user) {
//             setData({
//               ...profileResponse.data.data, // Merge profile data
//               ...signupResponse.data.user, // Merge signup data
//             });
//             setIsProfileCreated(true);
//           }
//         } else {
//           toast.error("No user ID found.");
//         }
//       } catch (error) {
//         toast.error("Error fetching profile or signup data.");
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchData();
//   }, []);

//   const toggleDropdown = () => setIsDropdownOpen((prev) => !prev);

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setData((prev) => ({ ...prev, [name]: value }));
//   };

//   const saveProfile = async () => {
//     const userId = localStorage.getItem("userId");

//     if (!userId) {
//       toast.error("User ID not found in local storage.");
//       return;
//     }

//     const profileWithUserId = {
//       ...data,
//       userId,
//     };

//     try {
//       await axios.post(`/api/users/profile`, profileWithUserId, {
//         headers: { "Content-Type": "application/json" },
//       });
//       toast.success("Profile created successfully!");
//       setButtonBgColor("bg-green-500");
//       setIsProfileCreated(true);
//     } catch (error) {
//       toast.error("Failed to create profile.");
//       console.error(error);
//     }
//   };

//   const updateProfile = async () => {
//     const userId = localStorage.getItem("userId");

//     if (!userId) {
//       toast.error("User ID not found in local storage.");
//       return;
//     }

//     try {
//       await axios.put(`/api/users/profile?userId=${userId}`, data, {
//         headers: { "Content-Type": "application/json" },
//       });
//       toast.success("Profile updated successfully!");
//       setButtonBgColor("bg-green-500");
//     } catch (error) {
//       toast.error("Failed to update profile.");
//       console.error(error);
//     }
//   };

//   if (loading) return <p className="text-center mt-4">Loading...</p>;

//   return (
//     <div className="flex items-center justify-center">
//       <ToastContainer />
//       <div className=" w-full flex flex-col lg:flex-row">
//         <div className="flex flex-col bg-customBlue items-center min-h-screen px-16  pt-10 lg:mb-0">
//           {data.profile ? (
//             <Image
//               src={
//                 data.profile.startsWith("http")
//                   ? data.profile
//                   : "/placeholder-image.jpg"
//               }
//               alt="Profile Photo"
//               width={300}
//               height={300}
//               className="object-cover mb-4 "
//             />
//           ) : (
//             <div className="w-40 h-40 border-4 border-gray-600 rounded-full bg-gray-700 mb-4" />
//           )}
//           <div className="text-center">
//             <h2 className="text-3xl font-serif font-bold text-black mb-2">
//               {data.firstName} {data.lastName}
//             </h2>
//             <p className="text-gray-900">{data.city}</p>
//           </div>
//           <hr className="border-t border-white w-28 my-8" />
//         </div>

//         <div className="bg-white rounded-lg flex-1 flex flex-col items-center justify-end">
//           <div className="bg-customBeige p-6 relative flex flex-col items-start mt-10 w-full max-w-4xl">
//             <h3 className="text-4xl font-serif pl-16 absolute -top-5">
//               User Profile
//             </h3>

//             <div className="space-y-1 mt-5 pl-16 w-full">
//               <div className="flex gap-20 items-center">
//                 <span className="font-medium w-1/3 text-left">Username</span>
//                 <span className="w-2/3 text-left font-serif">
//                   {data.username}
//                 </span>
//               </div>
//               <div className="flex gap-20 items-center">
//                 <span className="font-medium w-1/3 text-left">Phone</span>
//                 <span className="w-2/3 text-left font-serif">{data.phone}</span>
//               </div>
//               <div className="flex gap-20 items-center">
//                 <span className="font-medium w-1/3 text-left">Email</span>
//                 <span className="w-2/3 text-left font-serif">{data.email}</span>
//               </div>
//               <div className="flex gap-20 items-center">
//                 <span className="font-medium w-1/3 text-left">Birthday</span>
//                 <span className="w-2/3 text-left font-serif">
//                   {data.birthday}
//                 </span>
//               </div>
//               <div className="flex gap-20 items-center">
//                 <span className="font-medium w-1/3 text-left">Bio</span>
//                 <span className="w-2/3 text-left font-serif">{data.bio}</span>
//               </div>
//               <div className="flex gap-20 items-center">
//                 <span className="font-medium w-1/3 text-left">Hobbies</span>
//                 <span className="w-2/3 text-left font-serif">
//                   {data.hobbies}
//                 </span>
//               </div>
//               <div className="flex gap-20 items-center">
//                 <span className="font-medium w-1/3 text-left">Student ID</span>
//                 <span className="w-2/3 text-left font-serif">
//                   {data.studentId}
//                 </span>
//               </div>
//               <div className="flex gap-20 items-center">
//                 <span className="font-medium w-1/3 text-left">Styles</span>
//                 <span className="w-2/3 text-left font-serif">
//                   {data.genresStyles}
//                 </span>
//               </div>
//               <div className="flex gap-20 items-center">
//                 <span className="font-medium w-1/3 text-left">Experience</span>
//                 <span className="w-2/3 text-left font-serif">
//                   {data.performanceExperience}
//                 </span>
//               </div>
//               <div className="flex gap-20 items-center">
//                 <span className="font-medium w-1/3 text-left">Awards</span>
//                 <span className="w-2/3 text-left font-serif">
//                   {data.achievementsAwards}
//                 </span>
//               </div>
//               <div className="flex gap-20 items-center">
//                 <span className="font-medium w-1/3 text-left">
//                   Music History
//                 </span>
//                 <span className="w-2/3 text-left font-serif">
//                   {data.musicEducationHistory}
//                 </span>
//               </div>
//               <div className="flex gap-20 items-center">
//                 <span className="font-medium w-1/3 text-left flex items-center">
//                   <FaInstagram size={20} className="mr-2" />
//                   Instagram
//                 </span>
//                 <span className="w-2/3 text-left font-serif">
//                   {data.SocialMediaLinkForInstagram}
//                 </span>
//               </div>
//               <div className="flex gap-20 items-center">
//                 <span className="font-medium w-1/3 text-left  flex items-center">
//                   <FaYoutube size={20} className="mr-2" />
//                   Youtube
//                 </span>
//                 <span className="w-2/3 text-left font-serif">
//                   {data.SocialMediaLinkForYoutube}
//                 </span>
//               </div>
//               <div className="flex gap-20 items-center">
//                 <span className="font-medium w-1/3 text-left  flex items-center">
//                   <FaLinkedin size={20} className="mr-2" />
//                   Linkdin
//                 </span>
//                 <span className="w-2/3 text-left font-serif">
//                   {data.SocialMediaLinkForLinkdin}
//                 </span>
//               </div>
//             </div>
//           </div>
//           <div className="flex w-full justify-end ">
//             <p className="text-gray-600 text-sm">
//               <button className="text-gray-900 py-3 px-6 rounded-lg w-full lg:w-auto">
//                 {!isProfileCreated ? (
//                   <button
//                     className={`mt-4 text-white py-3 px-6 hover:bg-blue-600 font-serif flex items-center ${buttonBgColor}`}
//                     onClick={saveProfile}
//                   >
//                     Create Profile
//                     <hr className="border-t border-black w-10 ml-2" />
//                     <FaChevronRight className="text-gray-500 ml-2" />
//                   </button>
//                 ) : (
//                   <div className="flex flex-col items-end w-full">
//                     <span
//                       className="text-lg font-semibold py-3 px-6 font-serif cursor-pointer flex items-center hover:bg-blue-600"
//                       onClick={toggleDropdown}
//                     >
//                       Update Profile
//                       <hr className="border-t border-black w-10 ml-2" />
//                       <FaChevronRight className="text-gray-500" />
//                     </span>
//                   </div>
//                 )}
//               </button>
//             </p>
//           </div>
//           {isDropdownOpen && (
//             <div className="fixed inset-0 flex items-center justify-center bg-gray-500 bg-opacity-50">
//               <div className="bg-white text-black p-8 rounded w-1/2 max-h-screen overflow-y-auto">
//                 <h2 className="text-xl font-semibold mb-4">Edit Product</h2>
//                 <form>
//                   <div className="mt-4 w-full max-w-full">
//                     <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//                       {[
//                         { name: "profile", placeholder: "Profile Image URL" },
//                         { name: "firstName", placeholder: "First Name" },
//                         { name: "lastName", placeholder: "Last Name" },
//                         { name: "birthday", placeholder: "Birthday" },
//                         { name: "phone", placeholder: "Phone" },
//                         { name: "city", placeholder: "City" },
//                         { name: "hobbies", placeholder: "Hobbies" },
//                         { name: "studentId", placeholder: "Student ID" },
//                         { name: "genresStyles", placeholder: "Genres Styles" },
//                         {
//                           name: "performanceExperience",
//                           placeholder: "Performance Experience",
//                         },
//                         {
//                           name: "achievementsAwards",
//                           placeholder: "Achievements Awards",
//                         },
//                         {
//                           name: "musicEducationHistory",
//                           placeholder: "Music Education History",
//                         },
//                         {
//                           name: "SocialMediaLinkForInstagram",
//                           placeholder: "Instagram",
//                         },
//                         {
//                           name: "SocialMediaLinkForYoutube",
//                           placeholder: "YouTube",
//                         },
//                         {
//                           name: "SocialMediaLinkForLinkdin",
//                           placeholder: "LinkedIn",
//                         },
//                         { name: "bio", placeholder: "Bio" },
//                       ].map(({ name, placeholder }) => (
//                         <input
//                           key={name}
//                           type="text"
//                           name={name}
//                           placeholder={placeholder}
//                           value={data[name] || ""}
//                           onChange={handleInputChange}
//                           className="p-2 mt-2 border rounded bg-gray-700 text-white w-full"
//                         />
//                       ))}
//                     </div>
//                     <div className="flex justify-end mt-4">
//                       <button
//                         type="button"
//                         onClick={toggleDropdown}
//                         className="bg-gray-500 text-white px-4 py-2 rounded mr-2"
//                       >
//                         Cancel
//                       </button>
//                       <button
//                         type="submit"
//                         className="bg-blue-500 text-white px-4 py-2 rounded"
//                         onClick={updateProfile}
//                       >
//                         Save
//                       </button>
//                     </div>
//                   </div>
//                 </form>
//               </div>
//             </div>
//           )}
//           <div className="flex items-center pb-8 px-12 w-full justify-end">
//             <hr className="border-t border-black w-28 mr-2" />
//             <p className="m-0">SHIV-VIBES</p>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Profile;
