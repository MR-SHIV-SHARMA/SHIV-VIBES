import { NextRequest, NextResponse } from "next/server";
import Basic_Music from "@/models/Admin/Basic_Music";
import { connect } from "@/dbConfig/dbConfig";
import url from "url";
import client from "../../../../client"; // Import Redis client

export async function POST(request: NextRequest) {
  await connect();

  try {
    const body = await request.json();

    const {
      title,
      status,
      description,
      key_elements,
      additional_topics,
      tips_for_beginners,
      resources,
      conclusion,
    } = body;

    const newCourse = new Basic_Music({
      title,
      status,
      description,
      key_elements,
      additional_topics,
      tips_for_beginners,
      resources,
      conclusion,
    });

    await newCourse.save();

    // Cache the newly created course in Redis
    await client.set(`basicMusic:${newCourse._id}`, JSON.stringify(newCourse));

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
    const id = query.id as string; // Assuming 'id' is the query parameter name

    if (id) {
      // Check Redis cache first
      const cachedCourse = await client.get(`basicMusic:${id}`);
      if (cachedCourse) {
        return NextResponse.json(
          { success: true, data: JSON.parse(cachedCourse) },
          { status: 200 }
        );
      }

      const course = await Basic_Music.findById(id);

      if (!course) {
        return NextResponse.json(
          { success: false, error: "Course not found" },
          { status: 404 }
        );
      }

      // Cache the fetched course in Redis
      await client.set(`basicMusic:${id}`, JSON.stringify(course));

      return NextResponse.json(
        { success: true, data: course },
        { status: 200 }
      );
    } else {
      const courses = await Basic_Music.find();
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
    const id = query.id as string; // Assuming 'id' is the query parameter name

    if (!id) {
      return NextResponse.json(
        { success: false, error: "Missing course ID" },
        { status: 400 }
      );
    }

    const deletedCourse = await Basic_Music.findByIdAndDelete(id);

    if (!deletedCourse) {
      return NextResponse.json(
        { success: false, error: "Course not found" },
        { status: 404 }
      );
    }

    // Remove the course from Redis cache
    await client.del(`basicMusic:${id}`);

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
    const id = query.id as string; // Assuming 'id' is the query parameter name

    if (!id) {
      return NextResponse.json(
        { success: false, error: "Missing course ID" },
        { status: 400 }
      );
    }

    // Parse the JSON body
    let body;
    try {
      body = await request.json();
      console.log("Request body:", body);
    } catch (error) {
      console.error("Error parsing JSON body:", error);
      return NextResponse.json(
        { success: false, error: "Invalid JSON body" },
        { status: 400 }
      );
    }

    const {
      title,
      status,
      description,
      key_elements,
      additional_topics,
      tips_for_beginners,
      resources,
      conclusion,
    } = body;

    if (
      !title ||
      !status ||
      !description ||
      !key_elements ||
      !additional_topics ||
      !tips_for_beginners ||
      !resources ||
      !conclusion
    ) {
      return NextResponse.json(
        { success: false, error: "Missing required fields" },
        { status: 400 }
      );
    }

    const updatedCourse = await Basic_Music.findByIdAndUpdate(
      id,
      {
        title,
        status,
        description,
        key_elements,
        additional_topics,
        tips_for_beginners,
        resources,
        conclusion,
      },
      { new: true, runValidators: true }
    );

    if (!updatedCourse) {
      return NextResponse.json(
        { success: false, error: "Course not found" },
        { status: 404 }
      );
    }

    // Update the Redis cache with the updated course
    await client.set(`basicMusic:${id}`, JSON.stringify(updatedCourse));

    return NextResponse.json(
      {
        success: true,
        message: "Course updated successfully",
        data: updatedCourse,
      },
      { status: 200 }
    );
  } catch (error: any) {
    console.error("Error in PUT request:", error);
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 400 }
    );
  }
}
