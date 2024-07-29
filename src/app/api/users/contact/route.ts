import { connect } from "@/dbConfig/dbConfig";
import Contact from "@/models/contact.models";
import User from "@/models/users/user.models";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  await connect();

  try {
    const { email, message } = await request.json();

    const user = await User.findOne({ email: email });
    if (!user) {
      return NextResponse.json(
        {
          success: false,
          error: "User not found",
        },
        { status: 404 }
      );
    }

    const contact = new Contact({
      email: user._id,
      message,
    });

    await contact.save();

    return NextResponse.json({ success: true, data: contact }, { status: 201 });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 400 }
    );
  }
}
