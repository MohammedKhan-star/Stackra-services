import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";

import connectDB from "@/lib/mongodb";
import Student from "@/models/Student";

export async function POST(request) {
  try {
    // Read request body
    const body = await request.json();

    const fullName = body.fullName?.trim();
    const email = body.email?.trim().toLowerCase();
    const password = body.password;

    // Validate required fields
    if (!fullName || !email || !password) {
      return NextResponse.json(
        {
          success: false,
          message: "Full name, email, and password are required.",
        },
        {
          status: 400,
        }
      );
    }

    // Validate name
    if (fullName.length < 2) {
      return NextResponse.json(
        {
          success: false,
          message: "Full name must contain at least 2 characters.",
        },
        {
          status: 400,
        }
      );
    }

    // Validate password
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

    // Connect to MongoDB
    await connectDB();

    // Check whether student already exists
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

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 12);

    // Create student
    const student = await Student.create({
      fullName,
      email,
      password: hashedPassword,
      role: "student",
      isActive: true,
    });

    // Return successful response
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
    console.error(
      "ACADEMY REGISTRATION ERROR:",
      error
    );

    // Handle duplicate email race condition
    if (error.code === 11000) {
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

    return NextResponse.json(
      {
        success: false,
        message: "Unable to create student account.",
      },
      {
        status: 500,
      }
    );
  }
}
