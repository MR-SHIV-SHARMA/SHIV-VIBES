"use client";

import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";
import { usePathname } from "next/navigation";
import clsx from "clsx"; // Import clsx
import Link from "next/link";
import {
  FaHome,
  FaBook,
  FaEnvelope,
  FaUser,
  FaSignOutAlt,
} from "react-icons/fa"; // Import icons
import { Menu, MenuItem, HoveredLink } from "./ui/navbar-menu"; // Import components

function Navbar({ className }: { className?: string }) {
  const [active, setActive] = useState<string | null>(null);
  const pathname = usePathname();
  const router = useRouter();

  // Determine if dark mode is enabled (replace with your dynamic logic)
  const isDarkMode = false;

  // List of paths where the navbar should be hidden
  const hiddenPaths = [
    // "/courses",
    // "/about",
    // "/blog",
    // "/news",
    // "/faq",
    // "/team",
    // "/careers",
    // "/blog/post",
    // "/blog/category",
    // "/blog/tag",
    // "/search",
    // "/404",
    // "/admin",
    // "/admin/dashboard",
    // "/admin/users",
    // "/admin/courses",
    // "/admin/categories",
    // "/admin/tags",
    // "/admin/orders",
    // "/admin/reports",
    // "/admin/settings",
    // "/admin/edit-user/[id]",
    // "/admin/edit-course/[id]",
    // "/admin/edit-category/[id]",
    // "/admin/edit-tag/[id]",
    // "/admin/edit-order/[id]",
    // "/admin/edit-report/[id]",
    // "/admin/edit-setting/[id,
    // "/admin/edit-setting/[key]",
    // "/admin/add-user",
    // "/admin/add-course",
    // "/admin/add-category",
    // "/admin/add-tag",
    // "/admin/add-order",
    // "/admin/add-report",
    // "/admin/add-setting",
    // "/about",
    // "/blog",
    // "/news",
    // "/faq",
    // "/team",
    // "/careers",
    // "/blog/post/[slug]",
    // "/blog/category/[slug]",
    // "/blog/tag/[slug]",
    // "/search",
    // "/404",
    // "/contact",
    // "/payment",
    // "/payment-success",
    // "/payment-cancelled",
    // "/payment-failed",
    // "/admin",
    // "/admin/dashboard",
    // "/admin/users",
    // "/admin/courses",
    // "/admin/categories",
    // "/admin/tags",
    // "/admin/orders",
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
    "/login",
    "/signup",
    "/Account_verification_email",
    "/profile",
    "/verifyemail",
  ];

  // Check if the current pathname is in the hiddenPaths list
  if (hiddenPaths.includes(pathname)) {
    return null; // Do not render the navbar
  }

  // Logout function
  const logout = async () => {
    try {
      await axios.post("/api/users/logout");
      toast.success("Logout successful");
      router.push("/login");
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
      <Menu setActive={setActive} isDarkMode={isDarkMode}>
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
            <HoveredLink href="/courses">All Courses</HoveredLink>
            <HoveredLink href="/basic_music">Basic Music Theory</HoveredLink>
            <HoveredLink href="/Advanced_Composition">
              Advanced Composition
            </HoveredLink>
            <HoveredLink href="/Songwriting">Songwriting</HoveredLink>
            <HoveredLink href="/Music_Production">Music Production</HoveredLink>
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
        <MenuItem
          setActive={setActive}
          active={active}
          item=""
          icon={<FaSignOutAlt onClick={logout} />}
          showOnlyIconOnSmallScreen={true}
        />
      </Menu>
    </div>
  );
}

export default Navbar;
