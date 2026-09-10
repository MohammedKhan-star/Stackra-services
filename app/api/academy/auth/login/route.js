import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";

import connectDB from "@/lib/mongodb";
import Student from "@/models/Student";

export async function POST(request) {
  try {
    const body = await request.json();

    const { email, password } = body;

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

    await connectDB();

    const normalizedEmail = email.trim().toLowerCase();

    const student = await Student.findOne({
      email: normalizedEmail,
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

    if (!student.isActive) {
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

    const response = NextResponse.json(
      {
        success: true,
        message: "Login successful.",
        student: {
          id: student._id,
          fullName: student.fullName,
          email: student.email,
          role: student.role,
        },
      },
      {
        status: 200,
      }
    );

    /*
     * Temporary authentication cookie.
     *
     * We will upgrade this to a proper secure
     * session system when we build the protected
     * student dashboard.
     */
    response.cookies.set("academy_student", String(student._id), {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: 60 * 60 * 24 * 7,
    });

    return response;
  } catch (error) {
    console.error("ACADEMY LOGIN ERROR:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Something went wrong while logging in.",
      },
      {
        status: 500,
      }
    );
  }
}
