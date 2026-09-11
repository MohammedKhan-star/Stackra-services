import { NextResponse } from "next/server";
import Razorpay from "razorpay";

import connectDB from "@/lib/mongodb";
import Enrollment from "@/models/Enrollment";
import { verifyAcademyToken } from "@/lib/academy-auth";

export async function POST(request) {
  try {
    const keyId = process.env.RAZORPAY_KEY_ID;
    const keySecret = process.env.RAZORPAY_KEY_SECRET;

    if (!keyId || !keySecret) {
      console.error("Razorpay environment variables are missing.");

      return NextResponse.json(
        {
          success: false,
          message: "Payment system is not configured yet.",
        },
        { status: 500 }
      );
    }

    const token = request.cookies.get("academy_token")?.value;

    if (!token) {
      return NextResponse.json(
        {
          success: false,
          message: "Please login before making a payment.",
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

    const enrollmentId = body.enrollmentId?.trim();

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

    const enrollment = await Enrollment.findOne({
      _id: enrollmentId,
      studentId: student.studentId,
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

    if (enrollment.paymentStatus === "paid") {
      return NextResponse.json(
        {
          success: false,
          message: "This course has already been paid for.",
        },
        { status: 409 }
      );
    }

    if (!enrollment.amount || enrollment.amount <= 0) {
      return NextResponse.json(
        {
          success: false,
          message: "Invalid enrollment amount.",
        },
        { status: 400 }
      );
    }

    const razorpay = new Razorpay({
      key_id: keyId,
      key_secret: keySecret,
    });

    const amountInPaise = Math.round(enrollment.amount * 100);

    const receipt = `academy_${enrollment._id.toString()}`;

    const order = await razorpay.orders.create({
      amount: amountInPaise,
      currency: "INR",
      receipt,
      notes: {
        enrollmentId: enrollment._id.toString(),
        studentId: student.studentId,
        courseSlug: enrollment.courseSlug,
      },
    });

    enrollment.orderId = order.id;
    enrollment.paymentStatus = "pending";

    await enrollment.save();

    return NextResponse.json(
      {
        success: true,
        message: "Razorpay order created successfully.",
        order: {
          id: order.id,
          amount: order.amount,
          currency: order.currency,
        },
        enrollment: {
          id: enrollment._id.toString(),
          courseSlug: enrollment.courseSlug,
          courseTitle: enrollment.courseTitle,
          amount: enrollment.amount,
        },
        razorpayKeyId: keyId,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("RAZORPAY ORDER CREATION ERROR:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Unable to create payment order.",
      },
      { status: 500 }
    );
  }
}
