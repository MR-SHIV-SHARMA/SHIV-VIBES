import { NextRequest, NextResponse } from "next/server";
import Section from "@/models/Admin/SectionModel";
import { connect } from "@/dbConfig/dbConfig";
import client from "../../../../client";

export async function POST(request: NextRequest) {
  await connect();

  try {
    const { title, status, content, image, examples, tips } =
      await request.json();

    if (!title) {
      return NextResponse.json(
        { success: false, error: "Missing required fields" },
        { status: 400 }
      );
    }

    const newCourse = new Section({
      title,
      status,
      content,
      image,
      examples,
      tips,
    });

    await newCourse.save();
    await client.set(`course:${newCourse._id}`, JSON.stringify(newCourse));

    return NextResponse.json(
      { success: true, data: newCourse },
      { status: 201 }
    );
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}

export async function GET(request: NextRequest) {
  await connect();

  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");

    if (id) {
      const cachedCourse = await client.get(`course:${id}`);
      if (cachedCourse) {
        return NextResponse.json(
          { success: true, data: JSON.parse(cachedCourse) },
          { status: 200 }
        );
      }

      const course = await Section.findById(id);
      if (!course) {
        return NextResponse.json(
          { success: false, error: "Course not found" },
          { status: 404 }
        );
      }

      await client.set(`course:${id}`, JSON.stringify(course));

      return NextResponse.json(
        { success: true, data: course },
        { status: 200 }
      );
    } else {
      const courses = await Section.find();
      return NextResponse.json(
        { success: true, data: courses },
        { status: 200 }
      );
    }
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}

export async function DELETE(request: NextRequest) {
  await connect();

  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json(
        { success: false, error: "Missing course ID" },
        { status: 400 }
      );
    }

    const deletedCourse = await Section.findByIdAndDelete(id);
    if (!deletedCourse) {
      return NextResponse.json(
        { success: false, error: "Course not found" },
        { status: 404 }
      );
    }

    // await client.del(`course:${id}`);
    await client.del(`course:${id}`);

    return NextResponse.json(
      { success: true, message: "Course deleted successfully" },
      { status: 200 }
    );
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}

export async function PUT(request: NextRequest) {
  await connect();

  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");

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

    const { title, status, content, image, examples, tips } = body;

    if (!title && !status && !examples && !content && !image && !tips) {
      return NextResponse.json(
        { success: false, error: "Missing fields to update" },
        { status: 400 }
      );
    }

    const updatedCourse = await Section.findByIdAndUpdate(
      id,
      { title, status, content, image, examples, tips },
      { new: true, runValidators: true }
    );

    if (!updatedCourse) {
      return NextResponse.json(
        { success: false, error: "Course not found" },
        { status: 404 }
      );
    }

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
      { status: 500 }
    );
  }
}
