"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast, Toaster } from "react-hot-toast";
import { useRouter } from "next/navigation";
import { usePathname } from "next/navigation";
import clsx from "clsx";
import Link from "next/link";
import {
  FaHome,
  FaBook,
  FaEnvelope,
  FaUser,
  FaSignOutAlt,
  FaCog, // Admin icon
  FaSignInAlt, // Login icon
} from "react-icons/fa";
import { Menu, MenuItem, HoveredLink } from "./ui/navbar-menu";

function Navbar({ className }: { className?: string }) {
  const [active, setActive] = useState<string | null>(null);
  const [isAdmin, setIsAdmin] = useState(false); // State to manage admin status
  const [isLoggedIn, setIsLoggedIn] = useState(false); // State to manage login status
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const userId = localStorage.getItem("userId");
        if (userId) {
          setIsLoggedIn(true); // User is logged in
          const response = await axios.get(
            `/api/users/signup?userId=${userId}`
          );
          if (response.data.user) {
            setIsAdmin(response.data.user.isAdmin); // Set admin status
          }
        } else {
          setIsLoggedIn(false); // User is not logged in
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchData();
  }, []);

  // List of paths where the navbar should be hidden
  const hiddenPaths = [
    "/Admin",
    "/Admin/Home",
    "/Admin/Courses_Lists",
    "/Admin/All_Courses",
    "/Admin/Music_Production",
    "/Admin/SongWriting",
    "/Admin/Advanced_Composition",
    "/Admin/Basic_Music",
    "/contact",
    "/courses/1",
    "/courses/2",
    "/courses/3",
    "/courses/4",
    "/courses/5",
    "/courses/6",
    "/courses/7",
    "/courses/8",
    "/courses/9",
    "/courses/10",
    "/courses/11",
    "/courses/12",
    "/Songwriting",
    "/Music_Production",
    "/Advanced_Composition",
    "/basic_music",
    "/login",
    "/signup",
    "/Account_verification_email",
    "/profile",
    "/verifyemail",
  ];

  if (hiddenPaths.includes(pathname)) {
    return null; // Do not render the navbar
  }

  const logout = async () => {
    try {
      await axios.post("/api/users/logout");
      localStorage.removeItem("userId");
      localStorage.removeItem("isAdmin"); // Clear admin status on logout
      setIsLoggedIn(false); // Update login status
      toast.success("Logout successful");
  
      // Redirect to the homepage
      router.push("/");
  
      // Optionally use setTimeout to ensure redirection happens before reloading
      setTimeout(() => {
        window.location.reload();
      }, 1); // Delay can be adjusted if needed
    } catch (error: any) {
      console.error("Logout error:", error.message);
      toast.error("Logout failed");
    }
  };
  
  

  return (
    <div
      className={clsx(
        "fixed top-5 px-4 text-2xl inset-x-0 max-w-2xl mx-auto z-50",
        className
      )}
    >
      <Toaster
        position="top-right"
        toastOptions={{
          duration: 4000,
          style: {
            fontSize: "20px",
            color: "#333",
            background: "#fff",
          },
        }}
      />
      <Menu setActive={setActive} isDarkMode={false}>
        <Link href="/">
          <MenuItem
            setActive={setActive}
            active={active}
            item=""
            icon={<FaHome />}
            showOnlyIconOnSmallScreen={true}
          />
        </Link>
        <MenuItem
          setActive={setActive}
          active={active}
          item=" "
          icon={<FaBook />}
          showOnlyIconOnSmallScreen={true}
        >
          <div className="flex flex-col space-y-4 text-sm">
            <HoveredLink href="/NavComponent/courses">All Courses</HoveredLink>
            <HoveredLink href="/NavComponent/basic_music">
              Basic Music Theory
            </HoveredLink>
            <HoveredLink href="/NavComponent/Advanced_Composition">
              Advanced Composition
            </HoveredLink>
            <HoveredLink href="/NavComponent/Songwriting">
              Songwriting
            </HoveredLink>
            <HoveredLink href="/NavComponent/Music_Production">
              Music Production
            </HoveredLink>
          </div>
        </MenuItem>
        <Link href="/contact">
          <MenuItem
            setActive={setActive}
            active={active}
            item=""
            icon={<FaEnvelope />}
            showOnlyIconOnSmallScreen={true}
          />
        </Link>
        <Link href="/profile">
          <MenuItem
            setActive={setActive}
            active={active}
            item=""
            icon={<FaUser />}
            showOnlyIconOnSmallScreen={true}
          />
        </Link>
        {isAdmin && (
          <Link href="/Admin">
            <MenuItem
              setActive={setActive}
              active={active}
              item=""
              icon={<FaCog />} // Admin icon
              showOnlyIconOnSmallScreen={true}
            />
          </Link>
        )}
        {isLoggedIn ? (
          <MenuItem
            setActive={setActive}
            active={active}
            item=""
            icon={<FaSignOutAlt onClick={logout} />}
            showOnlyIconOnSmallScreen={true}
          />
        ) : (
          <Link href="/login">
            <MenuItem
              setActive={setActive}
              active={active}
              item=""
              icon={<FaSignInAlt />} // Login icon
              showOnlyIconOnSmallScreen={true}
            />
          </Link>
        )}
      </Menu>
    </div>
  );
}

export default Navbar;
