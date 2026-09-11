import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";

import connectDB from "@/lib/mongodb";
import Student from "@/models/Student";
import { createAcademyToken } from "@/lib/academy-auth";

export async function POST(request) {
  try {
    // -----------------------------------------
    // 1. Read request body
    // -----------------------------------------

    const body = await request.json();

    const email = body.email?.trim().toLowerCase();
    const password = body.password;

    // -----------------------------------------
    // 2. Validate input
    // -----------------------------------------

    if (!email || !password) {
      return NextResponse.json(
        {
          success: false,
          message: "Email and password are required.",
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
    // 4. Find student
    // -----------------------------------------

    const student = await Student.findOne({
      email,
    });

    if (!student) {
      return NextResponse.json(
        {
          success: false,
          message: "Invalid email or password.",
        },
        {
          status: 401,
        }
      );
    }

    // -----------------------------------------
    // 5. Check account status
    // -----------------------------------------

    if (student.isActive === false) {
      return NextResponse.json(
        {
          success: false,
          message: "Your account has been disabled.",
        },
        {
          status: 403,
        }
      );
    }

    // -----------------------------------------
    // 6. Check password exists
    // -----------------------------------------

    if (!student.password) {
      return NextResponse.json(
        {
          success: false,
          message:
            "Invalid account password. Please register again.",
        },
        {
          status: 401,
        }
      );
    }

    // -----------------------------------------
    // 7. Compare password
    // -----------------------------------------

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
        {
          status: 401,
        }
      );
    }

    // -----------------------------------------
    // 8. Prepare student data
    // -----------------------------------------

    const studentData = {
      id: student._id.toString(),
      fullName: student.fullName,
      email: student.email,
      role: student.role || "student",
    };

    // -----------------------------------------
    // 9. Create JWT token
    // -----------------------------------------

    const token = await createAcademyToken(studentData);

    // -----------------------------------------
    // 10. Create response
    // -----------------------------------------

    const response = NextResponse.json(
      {
        success: true,
        message: "Login successful.",
        student: studentData,
      },
      {
        status: 200,
      }
    );

    // -----------------------------------------
    // 11. Set authentication cookie
    // -----------------------------------------

    response.cookies.set("academy_token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 60 * 60 * 24 * 7,
      path: "/",
    });

    // -----------------------------------------
    // 12. Return response
    // -----------------------------------------

    return response;
  } catch (error) {
    console.error("ACADEMY LOGIN ERROR:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Unable to login. Please try again.",
      },
      {
        status: 500,
      }
    );
  }
}
