"use client";
import axios from "axios";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { toast, Toaster } from "react-hot-toast";
import Link from "next/link";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { cn } from "@/utils/cn";
import { FaEye, FaEyeSlash } from "react-icons/fa";

function LoginPage() {
  const router = useRouter();
  const [user, setUser] = useState({
    email: "",
    password: "",
  });
  const [buttonDisabled, setButtonDisabled] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [showPassword, setShowPassword] = useState(false); // New state for showing password

  const onLogin = async (event: any) => {
    event.preventDefault();
    setErrorMessage(null); // Clear any existing error message

    try {
      setLoading(true);
      const response = await axios.post("/api/users/login", user);
      console.log("Login success", response.data); // Log the entire response object
      toast.success("Login success", { duration: 4000 });

      // Ensure the response contains the userId and isAdmin property
      const { userId, isAdmin } = response.data;
      if (userId) {
        localStorage.setItem("userId", userId);
        localStorage.setItem("isAdmin", isAdmin); // Save admin status
        console.log(
          "User ID and admin status saved to localStorage:",
          userId,
          isAdmin
        );
      } else {
        console.error("User ID not found in response:", response.data);
      }

      // Reload the page immediately after login
      window.location.reload();
    } catch (error: any) {
      console.log(
        "Login failed",
        error.response?.data?.error || "An error occurred"
      );
      if (error.response?.data?.error === "Email not verified") {
        toast.error("Email not verified. Please verify your email.", {
          duration: 4000,
        });
        setErrorMessage("Email not verified. Please verify your email.");
      } else {
        toast.error(error.response?.data?.error || "An error occurred");
        setErrorMessage(error.response?.data?.error || "An error occurred");
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user.email.length > 0 && user.password.length > 0) {
      console.log(user.email);
      setButtonDisabled(false);
    } else {
      setButtonDisabled(true);
    }
  }, [user]);

  return (
    <div className="flex items-center justify-center min-h-screen bg-transparent bg-gray-600">
      <Toaster
        position="top-right"
        toastOptions={{
          duration: 4000, // Duration in milliseconds
          style: {
            fontSize: "20px", // Customize font size
            color: "#333", // Text color
            background: "#fff", // Background color
          },
        }}
      />
      <div className="max-w-md w-full mx-auto bg-black rounded-none md:rounded-2xl p-4 md:p-8 shadow-input flex flex-col items-center justify-center md:bg-black">
        <h2 className="font-bold text-xl mt-4 text-neutral-800 dark:text-neutral-200">
          Welcome to SHIV-WEB
        </h2>

        <h1 className="text-neutral-200">{loading ? "Processing" : "Login"}</h1>

        {errorMessage && (
          <p className="text-red-500 text-sm mt-2">{errorMessage}</p>
        )}

        <form className="my-8" onSubmit={onLogin}>
          <LabelInputContainer className="mb-4">
            <Label htmlFor="email">Email Address</Label>
            <Input
              id="email"
              value={user.email}
              onChange={(e) => setUser({ ...user, email: e.target.value })}
              placeholder="Shiv@gmail.com"
              type="email"
              className="dark:text-white"
            />
          </LabelInputContainer>
          <LabelInputContainer className="mb-4 relative">
            {" "}
            {/* Make the container relative for positioning */}
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              value={user.password}
              onChange={(e) => setUser({ ...user, password: e.target.value })}
              placeholder="••••••••"
              type={showPassword ? "text" : "password"} // Toggle between text and password
              className="dark:text-white pr-10" // Add padding to the right for the icon
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 text-gray-500 transform -translate-y-1/2" // Position the icon
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}{" "}
              {/* Toggle the icon */}
            </button>
          </LabelInputContainer>

          <button
            className="bg-gradient-to-br relative group/btn from-black to-neutral-600 block dark:bg-gray-700 w-full text-white rounded-md h-10 font-medium shadow-[0px_1px_0px_0px_#ffffff40_inset,0px_-1px_0px_0px_#ffffff40_inset] dark:shadow-[0px_1px_0px_0px_var(--gray-800)_inset,0px_-1px_0px_0px_var(--gray-800)_inset]"
            type="submit"
            disabled={buttonDisabled}
          >
            {loading ? "Loading..." : "Login"}
            <BottomGradient />
          </button>

          <Link className="text-gray-900 dark:text-white" href="/signup">
            <h1 className="mt-2">
              Create a{" "}
              <span className="text-gray-500 dark:text-gray-400">SHIV-WEB</span>{" "}
              Account
            </h1>
          </Link>
        </form>
      </div>
    </div>
  );
}

const BottomGradient = () => {
  return (
    <>
      <span className="group-hover/btn:opacity-100 block transition duration-500 opacity-0 absolute h-px w-full -bottom-px inset-x-0 bg-gradient-to-r from-transparent via-cyan-500 to-transparent" />
      <span className="group-hover/btn:opacity-100 blur-sm block transition duration-500 opacity-0 absolute h-px w-1/2 mx-auto -bottom-px inset-x-10 bg-gradient-to-r from-transparent via-indigo-500 to-transparent" />
    </>
  );
};

const LabelInputContainer = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <div className={cn("flex flex-col space-y-2 w-full", className)}>
      {children}
    </div>
  );
};

export default LoginPage;
