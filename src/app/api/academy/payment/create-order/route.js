import { NextResponse } from "next/server";

import connectDB from "@/lib/mongodb";
import Enrollment from "@/models/Enrollment";
import Student from "@/models/Student";
import { verifyAcademyToken } from "@/lib/academy-auth";

export async function POST(request) {
  try {
    const token = request.cookies.get("academy_token")?.value;

    if (!token) {
      return NextResponse.json(
        {
          success: false,
          message: "Please login to continue.",
        },
        { status: 401 }
      );
    }

    const student = await verifyAcademyToken(token);

    if (!student?.studentId) {
      return NextResponse.json(
        {
          success: false,
          message: "Your login session is invalid or expired.",
        },
        { status: 401 }
      );
    }

    const body = await request.json();
    const enrollmentId = body.enrollmentId;

    if (!enrollmentId) {
      return NextResponse.json(
        {
          success: false,
          message: "Enrollment ID is required.",
        },
        { status: 400 }
      );
    }

    await connectDB();

    const dbStudent = await Student.findById(student.studentId);

    if (!dbStudent) {
      return NextResponse.json(
        {
          success: false,
          message: "Student account not found.",
        },
        { status: 404 }
      );
    }

    if (dbStudent.isActive === false) {
      return NextResponse.json(
        {
          success: false,
          message: "Your student account is disabled.",
        },
        { status: 403 }
      );
    }

    const enrollment = await Enrollment.findOne({
      _id: enrollmentId,
      studentId: dbStudent._id,
    });

    if (!enrollment) {
      return NextResponse.json(
        {
          success: false,
          message: "Enrollment not found.",
        },
        { status: 404 }
      );
    }

    if (
      enrollment.status === "active" ||
      enrollment.status === "completed" ||
      enrollment.paymentStatus === "paid"
    ) {
      return NextResponse.json(
        {
          success: false,
          message: "This course has already been paid for.",
        },
        { status: 409 }
      );
    }

    const keyId = process.env.RAZORPAY_KEY_ID;
    const keySecret = process.env.RAZORPAY_KEY_SECRET;

    if (!keyId || !keySecret) {
      console.error("RAZORPAY ENVIRONMENT VARIABLES ARE MISSING.");

      return NextResponse.json(
        {
          success: false,
          message: "Payment gateway is not configured.",
        },
        { status: 500 }
      );
    }

    const amountInPaise = Math.round(enrollment.amount * 100);

    const receipt = `stackra_${enrollment._id
      .toString()
      .slice(-20)}_${Date.now().toString().slice(-8)}`;

    const auth = Buffer.from(`${keyId}:${keySecret}`).toString("base64");

    const razorpayResponse = await fetch(
      "https://api.razorpay.com/v1/orders",
      {
        method: "POST",
        headers: {
          Authorization: `Basic ${auth}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          amount: amountInPaise,
          currency: enrollment.currency || "INR",
          receipt,
          notes: {
            studentId: dbStudent._id.toString(),
            enrollmentId: enrollment._id.toString(),
            courseSlug: enrollment.courseSlug,
            courseTitle: enrollment.courseTitle,
          },
        }),
      }
    );

    const razorpayData = await razorpayResponse.json();

    if (!razorpayResponse.ok) {
      console.error("RAZORPAY ORDER ERROR:", razorpayData);

      return NextResponse.json(
        {
          success: false,
          message:
            razorpayData?.error?.description ||
            "Unable to create Razorpay order.",
        },
        { status: 500 }
      );
    }

    enrollment.orderId = razorpayData.id;
    enrollment.paymentStatus = "pending";
    enrollment.status = "pending";

    await enrollment.save();

    return NextResponse.json(
      {
        success: true,
        message: "Razorpay order created successfully.",
        orderId: razorpayData.id,
        amount: amountInPaise,
        currency: enrollment.currency || "INR",
        keyId,
        enrollmentId: enrollment._id.toString(),
        courseTitle: enrollment.courseTitle,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("ACADEMY CREATE PAYMENT ORDER ERROR:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Unable to create payment order.",
      },
      { status: 500 }
    );
  }
}
