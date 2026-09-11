import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";

import connectDB from "@/lib/mongodb";
import Student from "@/models/Student";

export async function POST(request) {
  try {
    const body = await request.json();

    const email = body.email?.trim().toLowerCase();
    const password = body.password;

    if (!email || !password) {
      return NextResponse.json(
        {
          success: false,
          message: "Email and password are required.",
        },
        { status: 400 }
      );
    }

    await connectDB();

    const student = await Student.findOne({
      email: email,
    });

    if (!student) {
      return NextResponse.json(
        {
          success: false,
          message: "Invalid email or password.",
        },
        { status: 401 }
      );
    }

    if (student.isActive === false) {
      return NextResponse.json(
        {
          success: false,
          message: "Your account has been disabled.",
        },
        { status: 403 }
      );
    }

    if (!student.password) {
      return NextResponse.json(
        {
          success: false,
          message: "This account has an invalid password record. Please register again.",
        },
        { status: 401 }
      );
    }

    const passwordMatch = await bcrypt.compare(
      password,
      student.password
    );

    if (!passwordMatch) {
      return NextResponse.json(
        {
          success: false,
          message: "Invalid email or password.",
        },
        { status: 401 }
      );
    }

    return NextResponse.json(
      {
        success: true,
        message: "Login successful.",
        student: {
          id: student._id.toString(),
          fullName: student.fullName,
          email: student.email,
          role: student.role,
        },
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("ACADEMY LOGIN ERROR:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Unable to login. Please try again.",
      },
      { status: 500 }
    );
  }
}
