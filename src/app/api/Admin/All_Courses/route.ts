import { NextRequest, NextResponse } from "next/server";
import Course from "../../../../models/Admin/All_Courses";
import { connect } from "@/dbConfig/dbConfig";
import url from "url";
import client from "../../../../client";

export async function POST(request: NextRequest) {
  await connect();

  try {
    const {
      title,
      status,
      slug,
      description,
      price,
      instructor,
      isFeatured,
      isFree,
      thumbnail,
      videoUrl,
      totalSales,
      totalDuration,
      accessPeriod,
      videos,
      createdAt,
    } = await request.json();

    const formattedVideos = Array.isArray(videos)
      ? videos.map((video: any) => ({
          title: video.title,
          duration: video.duration,
          intro: video.intro,
          description: video.description,
          videoUrl: video.videoUrl,
        }))
      : [];

    const newCourse = new Course({
      title,
      status,
      slug,
      description,
      price,
      instructor,
      isFeatured,
      isFree,
      thumbnail,
      videoUrl,
      totalSales,
      totalDuration,
      accessPeriod,
      videos: formattedVideos,
      createdAt,
    });

    await newCourse.save();

    // Invalidate the cache for all courses
    await client.del("all_courses");
    await client.set(`course_${newCourse._id}`, JSON.stringify(newCourse));

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
      const cacheValue = await client.get(`course_${id}`);

      if (cacheValue) {
        return NextResponse.json(
          { success: true, data: JSON.parse(cacheValue) },
          { status: 200 }
        );
      }

      const course = await Course.findById(id);

      if (!course) {
        return NextResponse.json(
          { success: false, error: "Course not found" },
          { status: 404 }
        );
      }

      await client.set(`course_${id}`, JSON.stringify(course));
      await client.expire(`course_${id}`, 3600);

      return NextResponse.json(
        { success: true, data: course },
        { status: 200 }
      );
    } else {
      const cacheValue = await client.get("all_courses");

      if (cacheValue) {
        return NextResponse.json(
          { success: true, data: JSON.parse(cacheValue) },
          { status: 200 }
        );
      }

      const courses = await Course.find();

      await client.set("all_courses", JSON.stringify(courses));
      await client.expire("all_courses", 3600);

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

    const deletedCourse = await Course.findByIdAndDelete(id);

    if (!deletedCourse) {
      return NextResponse.json(
        { success: false, error: "Course not found" },
        { status: 404 }
      );
    }

    await client.del(`course_${id}`);
    await client.del("all_courses");

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

    const {
      title,
      status,
      slug,
      description,
      price,
      instructor,
      isFeatured,
      isFree,
      thumbnail,
      videoUrl,
      totalSales,
      totalDuration,
      accessPeriod,
      videos,
      createdAt,
    } = body;

    if (
      !title ||
      !slug ||
      !description ||
      !price ||
      !instructor ||
      !thumbnail ||
      !videoUrl
    ) {
      return NextResponse.json(
        { success: false, error: "Missing required fields" },
        { status: 400 }
      );
    }

    const formattedVideos = videos.map((video: any) => ({
      title: video.title,
      duration: video.duration,
      intro: video.intro,
      description: video.description,
      videoUrl: video.videoUrl,
    }));

    const updatedCourse = await Course.findByIdAndUpdate(
      id,
      {
        title,
        status,
        slug,
        description,
        price,
        instructor,
        isFeatured,
        isFree,
        thumbnail,
        videoUrl,
        totalSales,
        totalDuration,
        accessPeriod,
        videos: formattedVideos,
        createdAt,
      },
      { new: true, runValidators: true }
    );

    if (!updatedCourse) {
      return NextResponse.json(
        { success: false, error: "Course not found" },
        { status: 404 }
      );
    }

    await client.del(`course_${id}`);
    await client.del("all_courses");

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
