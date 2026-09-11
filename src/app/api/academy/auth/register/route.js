import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";

import connectDB from "@/lib/mongodb";
import Student from "@/models/Student";

export async function POST(request) {
  try {
    const body = await request.json();

    const fullName = body.fullName?.trim();
    const email = body.email?.trim().toLowerCase();
    const password = body.password;

    if (!fullName) {
      return NextResponse.json(
        {
          success: false,
          message: "Full name is required.",
        },
        { status: 400 }
      );
    }

    if (!email) {
      return NextResponse.json(
        {
          success: false,
          message: "Email address is required.",
        },
        { status: 400 }
      );
    }

    if (!password) {
      return NextResponse.json(
        {
          success: false,
          message: "Password is required.",
        },
        { status: 400 }
      );
    }

    if (password.length < 6) {
      return NextResponse.json(
        {
          success: false,
          message: "Password must contain at least 6 characters.",
        },
        { status: 400 }
      );
    }

    await connectDB();

    const existingStudent = await Student.findOne({ email });

    if (existingStudent) {
      return NextResponse.json(
        {
          success: false,
          message: "An account with this email already exists.",
        },
        { status: 409 }
      );
    }

    const hashedPassword = await bcrypt.hash(password, 12);

    const student = await Student.create({
      fullName,
      email,
      password: hashedPassword,
      role: "student",
      isActive: true,
    });

    return NextResponse.json(
      {
        success: true,
        message: "Student account created successfully.",
        student: {
          id: student._id.toString(),
          fullName: student.fullName,
          email: student.email,
          role: student.role,
        },
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("ACADEMY REGISTRATION ERROR:", error);

    if (error?.code === 11000) {
      return NextResponse.json(
        {
          success: false,
          message: "An account with this email already exists.",
        },
        { status: 409 }
      );
    }

    return NextResponse.json(
      {
        success: false,
        message: "Unable to create your account. Please try again.",
      },
      { status: 500 }
    );
  }
}
