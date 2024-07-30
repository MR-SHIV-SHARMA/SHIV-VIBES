import { NextRequest, NextResponse } from "next/server";
import Course from "@/models/Admin/All_Courses";
import { connect } from "@/dbConfig/dbConfig";
import client from "../../../../client";

// Helper function to handle JSON response
const jsonResponse = (success: boolean, data: any, status: number) =>
  NextResponse.json({ success, ...data }, { status });

// Helper function to format videos
const formatVideos = (videos: any[]) =>
  videos?.map((video) => ({
    title: video.title,
    duration: video.duration,
    intro: video.intro,
    description: video.description,
    videoUrl: video.videoUrl,
  })) || [];

// Cache key constants
const CACHE_KEY = {
  COURSE: (id: string) => `course_${id}`,
  ALL_COURSES: "all_courses",
};

async function fetchCourseFromCache(id: string) {
  const cacheValue = await client.get(CACHE_KEY.COURSE(id));
  return cacheValue ? JSON.parse(cacheValue) : null;
}

async function fetchAllCoursesFromCache() {
  const cacheValue = await client.get(CACHE_KEY.ALL_COURSES);
  return cacheValue ? JSON.parse(cacheValue) : null;
}

async function updateCache(id?: string) {
  if (id) {
    const course = await Course.findById(id);
    if (course) {
      await client.set(CACHE_KEY.COURSE(id), JSON.stringify(course));
      await client.expire(CACHE_KEY.COURSE(id), 3600); // 1 hour
    }
  }
  await client.del(CACHE_KEY.ALL_COURSES);
}

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
      videos: formatVideos(videos),
      createdAt,
    });

    await newCourse.save();
    await updateCache(newCourse._id.toString());

    return jsonResponse(true, { data: newCourse }, 201);
  } catch (error: any) {
    return jsonResponse(false, { error: error.message }, 400);
  }
}

export async function GET(request: NextRequest) {
  await connect();

  try {
    const urlObj = new URL(request.url);
    const id = urlObj.searchParams.get('id');

    if (id) {
      const cachedCourse = await fetchCourseFromCache(id);
      if (cachedCourse) {
        return jsonResponse(true, { data: cachedCourse }, 200);
      }

      const course = await Course.findById(id);
      if (!course) {
        return jsonResponse(false, { error: "Course not found" }, 404);
      }

      await updateCache(id);
      return jsonResponse(true, { data: course }, 200);
    } else {
      const cachedCourses = await fetchAllCoursesFromCache();
      if (cachedCourses) {
        return jsonResponse(true, { data: cachedCourses }, 200);
      }

      const courses = await Course.find();
      await client.set(CACHE_KEY.ALL_COURSES, JSON.stringify(courses));
      await client.expire(CACHE_KEY.ALL_COURSES, 3600); // 1 hour

      return jsonResponse(true, { data: courses }, 200);
    }
  } catch (error: any) {
    return jsonResponse(false, { error: error.message }, 400);
  }
}

export async function DELETE(request: NextRequest) {
  await connect();

  try {
    const urlObj = new URL(request.url);
    const id = urlObj.searchParams.get('id');

    if (!id) {
      return jsonResponse(false, { error: "Missing course ID" }, 400);
    }

    const deletedCourse = await Course.findByIdAndDelete(id);
    if (!deletedCourse) {
      return jsonResponse(false, { error: "Course not found" }, 404);
    }

    await client.del(CACHE_KEY.COURSE(id));
    await client.del(CACHE_KEY.ALL_COURSES);

    return jsonResponse(true, { message: "Course deleted successfully" }, 200);
  } catch (error: any) {
    return jsonResponse(false, { error: error.message }, 400);
  }
}

export async function PUT(request: NextRequest) {
  await connect();

  try {
    const urlObj = new URL(request.url);
    const id = urlObj.searchParams.get('id');

    if (!id) {
      return jsonResponse(false, { error: "Missing course ID" }, 400);
    }

    const body = await request.json();

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

    if (!title || !slug || !description || !price || !instructor || !thumbnail || !videoUrl) {
      return jsonResponse(false, { error: "Missing required fields" }, 400);
    }

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
        videos: formatVideos(videos),
        createdAt,
      },
      { new: true, runValidators: true }
    );

    if (!updatedCourse) {
      return jsonResponse(false, { error: "Course not found" }, 404);
    }

    await updateCache(id);
    return jsonResponse(true, { message: "Course updated successfully", data: updatedCourse }, 200);
  } catch (error: any) {
    return jsonResponse(false, { error: error.message }, 400);
  }
}
