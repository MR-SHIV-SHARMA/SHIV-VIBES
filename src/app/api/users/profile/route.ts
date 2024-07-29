import mongoose, { Schema } from "mongoose";
import { NextApiRequest, NextApiResponse } from 'next';
import { NextRequest, NextResponse } from "next/server";
import { connect } from "@/dbConfig/dbConfig";
import User from "@/models/users/user.models";

// Define SocialMediaLink schema
const SocialMediaLinkSchema = new Schema({
  icon: { type: String, required: true },
  url: { type: String, required: true },
  displayText: { type: String, required: true },
});

// Define Profile schema
const ProfileSchema = new Schema({
  userId: { type: mongoose.Types.ObjectId, required: true, ref: "User" },
  profile: { type: String, required: true },
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String, required: true },
  city: { type: String, required: true },
  hobbies: { type: String, required: true },
  studentId: { type: String, required: true },
  isDarkMode: { type: Boolean, required: true },
  theme: { type: String, required: true },
  genresStyles: { type: String, required: true },
  performanceExperience: { type: String, required: true },
  achievementsAwards: { type: String, required: true },
  musicEducationHistory: { type: String, required: true },
  bio: { type: String, required: true },
  socialMediaLinks: { type: [SocialMediaLinkSchema], required: true },
});

// Create Profile model if it doesn't already exist
const Profile = mongoose.models.Profile || mongoose.model("Profile", ProfileSchema);

// Handle POST request to create a new profile
export async function POST(request: NextRequest) {
  await connect(); // Connect to the database

  try {
    const body = await request.text(); // Read request body as text
    if (!body) {
      return NextResponse.json(
        { success: false, error: "Request body is empty" },
        { status: 400 }
      );
    }

    const data = JSON.parse(body); // Parse the JSON data

    const {
      profile,
      firstName,
      lastName,
      email,
      phone,
      city,
      hobbies,
      studentId,
      isDarkMode,
      theme,
      genresStyles,
      performanceExperience,
      achievementsAwards,
      musicEducationHistory,
      socialMediaLinks,
      bio,
    } = data;

    const user = await User.findOne({ email: email }); // Find user by email
    if (!user) {
      return NextResponse.json(
        { success: false, error: "User not found" },
        { status: 404 }
      );
    }

    // Create a new profile with the user's ID and provided data
    const newProfile = new Profile({
      userId: user._id,
      profile,
      firstName,
      lastName,
      email,
      phone,
      city,
      hobbies,
      studentId,
      isDarkMode,
      theme,
      genresStyles,
      performanceExperience,
      achievementsAwards,
      musicEducationHistory,
      socialMediaLinks,
      bio,
    });

    await newProfile.save(); // Save the new profile to the database

    return NextResponse.json(
      { success: true, data: newProfile },
      { status: 201 }
    );
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 400 }
    );
  }
}

// Handle PUT request to update an existing profile
export async function PUT(request: NextRequest) {
  await connect(); // Connect to the database

  try {
    const body = await request.text(); // Read request body as text
    if (!body) {
      return NextResponse.json(
        { success: false, error: "Request body is empty" },
        { status: 400 }
      );
    }

    const data = JSON.parse(body); // Parse the JSON data

    const {
      profile,
      firstName,
      lastName,
      email,
      phone,
      city,
      hobbies,
      studentId,
      isDarkMode,
      theme,
      genresStyles,
      performanceExperience,
      achievementsAwards,
      musicEducationHistory,
      socialMediaLinks,
      bio,
    } = data;

    const user = await User.findOne({ email: email }); // Find user by email
    if (!user) {
      return NextResponse.json(
        { success: false, error: "User not found" },
        { status: 404 }
      );
    }

    // Find the existing profile by user ID and update it
    const updatedProfile = await Profile.findOneAndUpdate(
      { userId: user._id },
      {
        profile,
        firstName,
        lastName,
        email,
        phone,
        city,
        hobbies,
        studentId,
        isDarkMode,
        theme,
        genresStyles,
        performanceExperience,
        achievementsAwards,
        musicEducationHistory,
        socialMediaLinks,
        bio,
      },
      { new: true, runValidators: true } // Return the updated document
    );

    if (!updatedProfile) {
      return NextResponse.json(
        { success: false, error: "Profile not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(
      {
        success: true,
        message: "Profile updated successfully",
        data: updatedProfile,
      },
      { status: 200 }
    );
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 400 }
    );
  }
}

// Handle GET request to fetch a profile by email
export async function GET(req: NextRequest) {
  await connect(); // Connect to the database

  try {
    const { searchParams } = new URL(req.url);
    const email = searchParams.get('email');
    console.log(`Received GET request for email: ${email}`);

    if (!email) {
      console.log("Email query parameter is missing");
      return NextResponse.json(
        { success: false, error: "Email query parameter is missing" },
        { status: 400 }
      );
    }

    const user = await User.findOne({ email });
    if (!user) {
      console.log(`User not found for email: ${email}`);
      return NextResponse.json(
        { success: false, error: 'User not found' },
        { status: 404 }
      );
    }

    const profile = await Profile.findOne({ userId: user._id });
    if (!profile) {
      console.log(`Profile not found for user ID: ${user._id}`);
      return NextResponse.json(
        { success: false, error: 'Profile not found' },
        { status: 404 }
      );
    }

    console.log("Profile retrieved successfully");
    return NextResponse.json({ success: true, data: profile });
  } catch (error: any) {
    console.error("Error fetching profile:", error.message);
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 400 }
    );
  }
}
