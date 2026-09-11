import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";

import connectDB from "@/lib/mongodb";
import Student from "@/models/Student";

export async function POST(request) {
  try {
    // -----------------------------------------
    // 1. Read request body
    // -----------------------------------------

    const body = await request.json();

    const fullName = body.fullName?.trim();
    const email = body.email?.trim().toLowerCase();
    const password = body.password;

    // -----------------------------------------
    // 2. Validate input
    // -----------------------------------------

    if (!fullName) {
      return NextResponse.json(
        {
          success: false,
          message: "Full name is required.",
        },
        {
          status: 400,
        }
      );
    }

    if (!email) {
      return NextResponse.json(
        {
          success: false,
          message: "Email address is required.",
        },
        {
          status: 400,
        }
      );
    }

    if (!password) {
      return NextResponse.json(
        {
          success: false,
          message: "Password is required.",
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

    // -----------------------------------------
    // 3. Connect to MongoDB
    // -----------------------------------------

    await connectDB();

    // -----------------------------------------
    // 4. Check if student already exists
    // -----------------------------------------

    const existingStudent = await Student.findOne({
      email,
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

    // -----------------------------------------
    // 5. Hash password
    // -----------------------------------------

    const hashedPassword = await bcrypt.hash(password, 12);

    // -----------------------------------------
    // 6. Create student
    // -----------------------------------------

    const student = await Student.create({
      fullName,
      email,
      password: hashedPassword,
      role: "student",
      isActive: true,
    });

    // -----------------------------------------
    // 7. Return success response
    // -----------------------------------------

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
      {
        status: 201,
      }
    );
  } catch (error) {
    console.error("ACADEMY REGISTRATION ERROR:", error);

    // -----------------------------------------
    // 8. Handle duplicate email
    // -----------------------------------------

    if (error?.code === 11000) {
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

    // -----------------------------------------
    // 9. Handle server error
    // -----------------------------------------

    return NextResponse.json(
      {
        success: false,
        message: "Unable to create your account. Please try again.",
      },
      {
        status: 500,
      }
    );
  }
}
