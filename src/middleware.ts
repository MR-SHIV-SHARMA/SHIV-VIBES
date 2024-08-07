import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import axios from "axios";

export async function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname;
  const token = request.cookies.get("token")?.value || "";

  // Define paths that are considered public
  const isPublicPath =
    path === "/login" ||
    path === "/signup" ||
    path === "/verifyemail" ||
    path === "/Account_verification_email";

  // Define patterns for paid course routes, admin routes, and profile page
  const isPaidCoursePath = path.startsWith("/NavComponent/courses/");
  const isAdminPath = path.startsWith("/Admin");
  const isProfilePath = path === "/profile";

  // Fetch user data to check if the user is an admin
  const isAdmin = await checkIfAdmin(token);

  // Redirect logic for paid courses
  if (isPaidCoursePath && !token) {
    // Include the original URL as a query parameter
    const loginUrl = new URL("/login", request.nextUrl);
    loginUrl.searchParams.set("redirect", path);
    return NextResponse.redirect(loginUrl);
  }

  // Redirect logic for admin routes
  if (isAdminPath && (!token || !isAdmin)) {
    // Redirect to login page if attempting to access admin routes without a token or if not an admin
    return NextResponse.redirect(new URL("/login", request.nextUrl));
  }

  // Redirect logic for profile page
  if (isProfilePath && !token) {
    // Redirect to login page if attempting to access profile page without a token
    return NextResponse.redirect(new URL("/login", request.nextUrl));
  }

  // Redirect to home page if accessing a public path with a token
  if (isPublicPath && token) {
    return NextResponse.redirect(new URL("/", request.nextUrl));
  }

  // Allow access to all other paths
  return NextResponse.next();
}

// Function to check if the user is an admin
const checkIfAdmin = async (token: string) => {
  try {
    // Extract userId from the token if it's available
    const userId = getUserIdFromToken(token); // Function to get userId from token

    if (!userId) {
      return false; // No userId found
    }

    const response = await axios.get(`/api/users/signup?userId=${userId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return response.data.isAdmin; // Assuming the API returns { isAdmin: true/false }
  } catch (error) {
    console.error("Error checking admin status:", error);
    return false; // Assume not an admin if there's an error
  }
};

// Helper function to extract userId from token (replace this with your actual implementation)
const getUserIdFromToken = (token: string) => {
  // Implement your logic to extract userId from token
  // For example, decode a JWT token to get userId
  // This is a placeholder function; you need to adjust it based on your token structure
  try {
    const payload = JSON.parse(atob(token.split(".")[1])); // Assuming JWT token
    return payload.userId; // Adjust according to your token structure
  } catch (error) {
    console.error("Error extracting userId from token:", error);
    return null;
  }
};

export const config = {
  matcher: [
    "/",
    "/profile",
    "/login",
    "/signup",
    "/verifyemail",
    "/Account_verification_email",
    "/NavComponent/:path*",
    "/Admin/:path*",
  ],
};
