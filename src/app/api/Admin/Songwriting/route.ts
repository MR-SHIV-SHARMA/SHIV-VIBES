import { NextRequest, NextResponse } from "next/server";
import Section from "@/models/Admin/SectionModel";
import { connect } from "@/dbConfig/dbConfig";
import { client, connectRedis } from "@/client"; // Import Redis client utilities

// Helper function to handle JSON responses
const jsonResponse = (success: boolean, data: any, status: number) =>
  NextResponse.json({ success, ...data }, { status });

// Helper function to parse JSON body
async function parseJsonBody(request: NextRequest) {
  try {
    return await request.json();
  } catch (error) {
    console.error("Error parsing JSON body:", error);
    throw new Error("Invalid JSON body");
  }
}

export async function POST(request: NextRequest) {
  await connect(); // Ensure database is connected
  await connectRedis(); // Ensure Redis is connected

  try {
    const body = await parseJsonBody(request);
    const { title, status, content, image, examples, tips } = body;

    if (!title) {
      return jsonResponse(false, { error: "Missing required fields" }, 400);
    }

    const newSection = new Section({
      title,
      status,
      content,
      image,
      examples,
      tips,
    });

    await newSection.save();
    await client.set(`section:${newSection._id}`, JSON.stringify(newSection));

    return jsonResponse(true, { data: newSection }, 201);
  } catch (error: any) {
    console.error("Error in POST request:", error);
    return jsonResponse(false, { error: error.message }, 500);
  }
}

export async function GET(request: NextRequest) {
  await connect(); // Ensure database is connected
  await connectRedis(); // Ensure Redis is connected

  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");

    if (id) {
      // Check Redis cache first
      const cachedSection = await client.get(`section:${id}`);
      if (cachedSection) {
        return jsonResponse(true, { data: JSON.parse(cachedSection) }, 200);
      }

      const section = await Section.findById(id);
      if (!section) {
        return jsonResponse(false, { error: "Section not found" }, 404);
      }

      // Cache the fetched section in Redis
      await client.set(`section:${id}`, JSON.stringify(section));

      return jsonResponse(true, { data: section }, 200);
    } else {
      const sections = await Section.find();
      return jsonResponse(true, { data: sections }, 200);
    }
  } catch (error: any) {
    console.error("Error in GET request:", error);
    return jsonResponse(false, { error: error.message }, 500);
  }
}

export async function DELETE(request: NextRequest) {
  await connect(); // Ensure database is connected
  await connectRedis(); // Ensure Redis is connected

  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");

    if (!id) {
      return jsonResponse(false, { error: "Missing section ID" }, 400);
    }

    const deletedSection = await Section.findByIdAndDelete(id);
    if (!deletedSection) {
      return jsonResponse(false, { error: "Section not found" }, 404);
    }

    // Remove the section from Redis cache
    await client.del(`section:${id}`);

    return jsonResponse(true, { message: "Section deleted successfully" }, 200);
  } catch (error: any) {
    console.error("Error in DELETE request:", error);
    return jsonResponse(false, { error: error.message }, 500);
  }
}

export async function PUT(request: NextRequest) {
  await connect(); // Ensure database is connected
  await connectRedis(); // Ensure Redis is connected

  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");

    if (!id) {
      return jsonResponse(false, { error: "Missing section ID" }, 400);
    }

    const body = await parseJsonBody(request);

    const { title, status, content, image, examples, tips } = body;

    if (!title && !status && !content && !image && !examples && !tips) {
      return jsonResponse(false, { error: "Missing fields to update" }, 400);
    }

    const updatedSection = await Section.findByIdAndUpdate(
      id,
      { title, status, content, image, examples, tips },
      { new: true, runValidators: true }
    );

    if (!updatedSection) {
      return jsonResponse(false, { error: "Section not found" }, 404);
    }

    // Update the Redis cache with the updated section
    await client.set(`section:${id}`, JSON.stringify(updatedSection));

    return jsonResponse(
      true,
      { message: "Section updated successfully", data: updatedSection },
      200
    );
  } catch (error: any) {
    console.error("Error in PUT request:", error);
    return jsonResponse(false, { error: error.message }, 500);
  }
}
