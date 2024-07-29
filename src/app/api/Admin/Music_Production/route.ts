import { NextRequest, NextResponse } from "next/server";
import MusicProduction from "@/models/Admin/Music_Production";
import { connect } from "@/dbConfig/dbConfig";
import url from "url";
import client from "../../../../client"; // Import Redis client

export async function POST(request: NextRequest) {
  await connect();

  try {
    const { title, status, content, image } = await request.json();

    if (!title || !status || !content || !image) {
      return NextResponse.json(
        { success: false, error: "Missing required fields" },
        { status: 400 }
      );
    }

    const newCourse = new MusicProduction({
      title,
      status,
      content,
      image,
    });

    await newCourse.save();

    // Optionally cache the newly created course in Redis
    await client.set(`course:${newCourse._id}`, JSON.stringify(newCourse));

    return NextResponse.json(
      { success: true, data: newCourse },
      { status: 201 }
    );
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 400 }
    );
  }
}

export async function GET(request: NextRequest) {
  await connect();

  try {
    const { query } = url.parse(request.url, true);
    const id = query.id as string;

    if (id) {
      // Check Redis cache first
      const cachedCourse = await client.get(`course:${id}`);
      if (cachedCourse) {
        return NextResponse.json(
          { success: true, data: JSON.parse(cachedCourse) },
          { status: 200 }
        );
      }

      const course = await MusicProduction.findById(id);

      if (!course) {
        return NextResponse.json(
          { success: false, error: "Course not found" },
          { status: 404 }
        );
      }

      // Cache the fetched course in Redis
      await client.set(`course:${id}`, JSON.stringify(course));

      return NextResponse.json(
        { success: true, data: course },
        { status: 200 }
      );
    } else {
      const courses = await MusicProduction.find();

      return NextResponse.json(
        { success: true, data: courses },
        { status: 200 }
      );
    }
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 400 }
    );
  }
}

export async function DELETE(request: NextRequest) {
  await connect();

  try {
    const { query } = url.parse(request.url, true);
    const id = query.id as string;

    if (!id) {
      return NextResponse.json(
        { success: false, error: "Missing course ID" },
        { status: 400 }
      );
    }

    const deletedCourse = await MusicProduction.findByIdAndDelete(id);

    if (!deletedCourse) {
      return NextResponse.json(
        { success: false, error: "Course not found" },
        { status: 404 }
      );
    }

    // Remove the course from Redis cache
    await client.del(`course:${id}`);

    return NextResponse.json(
      { success: true, message: "Course deleted successfully" },
      { status: 200 }
    );
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 400 }
    );
  }
}

export async function PUT(request: NextRequest) {
  await connect();

  try {
    const { query } = url.parse(request.url, true);
    const id = query.id as string;

    if (!id) {
      return NextResponse.json(
        { success: false, error: "Missing course ID" },
        { status: 400 }
      );
    }

    let body;
    try {
      body = await request.json();
    } catch (error) {
      return NextResponse.json(
        { success: false, error: "Invalid JSON body" },
        { status: 400 }
      );
    }

    const { title, status, content, image } = body;

    if (!title && !status && !content && !image) {
      return NextResponse.json(
        { success: false, error: "Missing fields to update" },
        { status: 400 }
      );
    }

    const updatedCourse = await MusicProduction.findByIdAndUpdate(
      id,
      { title, status, content, image },
      { new: true, runValidators: true }
    );

    if (!updatedCourse) {
      return NextResponse.json(
        { success: false, error: "Course not found" },
        { status: 404 }
      );
    }

    // Update the Redis cache with the updated course
    await client.set(`course:${id}`, JSON.stringify(updatedCourse));

    return NextResponse.json(
      {
        success: true,
        message: "Course updated successfully",
        data: updatedCourse,
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
