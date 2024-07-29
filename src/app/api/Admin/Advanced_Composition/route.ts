import { NextRequest, NextResponse } from "next/server";
import AdvancedComposition from "../../../../models/Admin/Advanced_Composition";
import { connect } from "@/dbConfig/dbConfig";

export async function POST(request: NextRequest) {
  await connect();

  try {
    const {
      Defining_Composition_Structure,
      Starting_Points,
      Planning_and_Parameters,
      Techniques_and_Resources,
      Collaboration_and_Chance,
      Workshops_and_Education,
      Advanced_Music_Theory,
      Experimental_Approaches,
      Cultural_Context,
      Portfolio_Development,
      Performance_and_Interpretation,
      Technology_in_Composition,
      Ethical_Considerations,
    } = await request.json();

    const newComposition = new AdvancedComposition({
      Defining_Composition_Structure,
      Starting_Points,
      Planning_and_Parameters,
      Techniques_and_Resources,
      Collaboration_and_Chance,
      Workshops_and_Education,
      Advanced_Music_Theory,
      Experimental_Approaches,
      Cultural_Context,
      Portfolio_Development,
      Performance_and_Interpretation,
      Technology_in_Composition,
      Ethical_Considerations,
    });

    await newComposition.save();

    return NextResponse.json(
      { success: true, data: newComposition },
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
    const parsedUrl = new URL(request.url);
    const id = parsedUrl.searchParams.get("id");

    if (id) {
      // Fetch the composition from the database
      const composition = await AdvancedComposition.findById(id);

      if (!composition) {
        return NextResponse.json(
          { success: false, error: "Composition not found" },
          { status: 404 }
        );
      }

      return NextResponse.json(
        { success: true, data: composition },
        { status: 200 }
      );
    } else {
      // Fetch all compositions from the database
      const compositions = await AdvancedComposition.find();

      return NextResponse.json(
        { success: true, data: compositions },
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
    const parsedUrl = new URL(request.url);
    const id = parsedUrl.searchParams.get("id");

    if (!id) {
      return NextResponse.json(
        { success: false, error: "Missing composition ID" },
        { status: 400 }
      );
    }

    const deletedComposition = await AdvancedComposition.findByIdAndDelete(id);

    if (!deletedComposition) {
      return NextResponse.json(
        { success: false, error: "Composition not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { success: true, message: "Composition deleted successfully" },
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
    const parsedUrl = new URL(request.url);
    const id = parsedUrl.searchParams.get("id");

    if (!id) {
      return NextResponse.json(
        { success: false, error: "Missing composition ID" },
        { status: 400 }
      );
    }

    const body = await request.json();
    console.log("Request body:", body);

    const {
      Defining_Composition_Structure,
      Starting_Points,
      Planning_and_Parameters,
      Techniques_and_Resources,
      Collaboration_and_Chance,
      Workshops_and_Education,
      Advanced_Music_Theory,
      Experimental_Approaches,
      Cultural_Context,
      Portfolio_Development,
      Performance_and_Interpretation,
      Technology_in_Composition,
      Ethical_Considerations,
    } = body;

    // Validate required fields
    if (
      !Defining_Composition_Structure ||
      !Starting_Points ||
      !Planning_and_Parameters ||
      !Techniques_and_Resources ||
      !Collaboration_and_Chance ||
      !Workshops_and_Education ||
      !Advanced_Music_Theory ||
      !Experimental_Approaches ||
      !Cultural_Context ||
      !Portfolio_Development ||
      !Performance_and_Interpretation ||
      !Technology_in_Composition ||
      !Ethical_Considerations
    ) {
      return NextResponse.json(
        { success: false, error: "Missing required fields" },
        { status: 400 }
      );
    }

    const updatedComposition = await AdvancedComposition.findByIdAndUpdate(
      id,
      {
        Defining_Composition_Structure,
        Starting_Points,
        Planning_and_Parameters,
        Techniques_and_Resources,
        Collaboration_and_Chance,
        Workshops_and_Education,
        Advanced_Music_Theory,
        Experimental_Approaches,
        Cultural_Context,
        Portfolio_Development,
        Performance_and_Interpretation,
        Technology_in_Composition,
        Ethical_Considerations,
      },
      { new: true, runValidators: true }
    );

    if (!updatedComposition) {
      return NextResponse.json(
        { success: false, error: "Composition not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(
      {
        success: true,
        message: "Composition updated successfully",
        data: updatedComposition,
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
