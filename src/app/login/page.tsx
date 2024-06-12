"use client";

import axios from "axios";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import Link from "next/link";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { cn } from "@/utils/cn";

function LoginPage() {
  const router = useRouter();
  const [user, setUser] = useState({
    email: "",
    password: "",
  });
  const [buttonDisabled, setButtonDisabled] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const onLogin = async (event: any) => {
    event.preventDefault();
    setErrorMessage(null); // Clear any existing error message

    try {
      setLoading(true);
      const response = await axios.post("/api/users/login", user);
      console.log("Login success", response.data);
      toast.success("Login success");
      router.replace("/"); // Use replace instead of push
    } catch (error: any) {
      console.log(
        "Login failed",
        error.response?.data?.error || "An error occurred"
      );
      if (error.response?.data?.error === "Email not verified") {
        toast.error("Email not verified. Please verify your email.");
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
      setButtonDisabled(false);
    } else {
      setButtonDisabled(true);
    }
  }, [user]);

  return (
    <div
      className="max-w-md w-full mx-auto rounded-none md:rounded-2xl p-4 md:p-8 shadow-input bg-white dark:bg-gray-800 mt-36 
    flex flex-col items-center justify-center min-h-fit py-2"
    >
      <h2 className="font-bold text-xl mt-4 text-neutral-800 dark:text-neutral-200">
        Welcome to SHIV-WEB
      </h2>

      <h1>{loading ? "Processing" : "Login"}</h1>

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
            className="dark:bg-gray-700 dark:text-white"
          />
        </LabelInputContainer>
        <LabelInputContainer className="mb-4">
          <Label htmlFor="password">Password</Label>
          <Input
            id="password"
            value={user.password}
            onChange={(e) => setUser({ ...user, password: e.target.value })}
            placeholder="••••••••"
            type="password"
            className="dark:bg-gray-700 dark:text-white"
          />
        </LabelInputContainer>

        <button
          className="bg-gradient-to-br relative group/btn from-black dark:from-gray-700 dark:to-gray-600 to-neutral-600 block dark:bg-gray-700 w-full text-white rounded-md h-10 font-medium shadow-[0px_1px_0px_0px_#ffffff40_inset,0px_-1px_0px_0px_#ffffff40_inset] dark:shadow-[0px_1px_0px_0px_var(--gray-800)_inset,0px_-1px_0px_0px_var(--gray-800)_inset]"
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
