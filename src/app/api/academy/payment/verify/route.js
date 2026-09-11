import crypto from "crypto";
import { NextResponse } from "next/server";

import connectDB from "@/lib/mongodb";
import Enrollment from "@/models/Enrollment";
import { verifyAcademyToken } from "@/lib/academy-auth";

export async function POST(request) {
  try {
    const keySecret = process.env.RAZORPAY_KEY_SECRET;

    if (!keySecret) {
      return NextResponse.json(
        {
          success: false,
          message: "Payment system is not configured.",
        },
        { status: 500 }
      );
    }

    const token = request.cookies.get("academy_token")?.value;

    if (!token) {
      return NextResponse.json(
        {
          success: false,
          message: "Please login again.",
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

    const {
      enrollmentId,
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature,
    } = body;

    if (
      !enrollmentId ||
      !razorpay_order_id ||
      !razorpay_payment_id ||
      !razorpay_signature
    ) {
      return NextResponse.json(
        {
          success: false,
          message: "Incomplete payment information.",
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

    if (enrollment.orderId !== razorpay_order_id) {
      return NextResponse.json(
        {
          success: false,
          message: "Payment order does not match the enrollment.",
        },
        { status: 400 }
      );
    }

    const generatedSignature = crypto
      .createHmac("sha256", keySecret)
      .update(`${razorpay_order_id}|${razorpay_payment_id}`)
      .digest("hex");

    const signaturesMatch = crypto.timingSafeEqual(
      Buffer.from(generatedSignature),
      Buffer.from(razorpay_signature)
    );

    if (!signaturesMatch) {
      return NextResponse.json(
        {
          success: false,
          message: "Payment verification failed.",
        },
        { status: 400 }
      );
    }

    enrollment.paymentId = razorpay_payment_id;
    enrollment.paymentStatus = "paid";
    enrollment.status = "active";
    enrollment.progress = 0;
    enrollment.enrolledAt = new Date();

    await enrollment.save();

    return NextResponse.json(
      {
        success: true,
        message: "Payment verified successfully.",
        enrollment: {
          id: enrollment._id.toString(),
          courseSlug: enrollment.courseSlug,
          courseTitle: enrollment.courseTitle,
          status: enrollment.status,
          paymentStatus: enrollment.paymentStatus,
          progress: enrollment.progress,
          enrolledAt: enrollment.enrolledAt,
        },
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("RAZORPAY PAYMENT VERIFICATION ERROR:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Unable to verify payment.",
      },
      { status: 500 }
    );
  }
}
