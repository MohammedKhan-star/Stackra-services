import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";

import connectDB from "@/lib/mongodb";
import Student from "@/models/Student";

export async function POST(request) {
  try {
    const body = await request.json();

    const { fullName, email, password } = body;

    if (!fullName || !email || !password) {
      return NextResponse.json(
        {
          success: false,
          message: "All fields are required.",
        },
        {
          status: 400,
        }
      );
    }

    if (password.length < 6) {
      return NextResponse.json(
        {
          success: false,
          message: "Password must contain at least 6 characters.",
        },
        {
          status: 400,
        }
      );
    }

    await connectDB();

    const normalizedEmail = email.trim().toLowerCase();

    const existingStudent = await Student.findOne({
      email: normalizedEmail,
    });

    if (existingStudent) {
      return NextResponse.json(
        {
          success: false,
          message: "An account with this email already exists.",
        },
        {
          status: 409,
        }
      );
    }

    const hashedPassword = await bcrypt.hash(password, 12);

    const student = await Student.create({
      fullName: fullName.trim(),
      email: normalizedEmail,
      password: hashedPassword,
    });

    return NextResponse.json(
      {
        success: true,
        message: "Student account created successfully.",
        student: {
          id: student._id,
          fullName: student.fullName,
          email: student.email,
          role: student.role,
        },
      },
      {
        status: 201,
      }
    );
  } catch (error) {
    console.error("ACADEMY REGISTRATION ERROR:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Something went wrong while creating the account.",
      },
      {
        status: 500,
      }
    );
  }
}
