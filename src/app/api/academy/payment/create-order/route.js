import { NextResponse } from "next/server";
import crypto from "crypto";

import connectDB from "@/lib/mongodb";
import Enrollment from "@/models/Enrollment";
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

    const {
      enrollmentId,
      razorpay_payment_id,
      razorpay_order_id,
      razorpay_signature,
    } = body;

    if (
      !enrollmentId ||
      !razorpay_payment_id ||
      !razorpay_order_id ||
      !razorpay_signature
    ) {
      return NextResponse.json(
        {
          success: false,
          message: "Payment verification details are incomplete.",
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

    if (!enrollment.orderId) {
      return NextResponse.json(
        {
          success: false,
          message: "No Razorpay order is associated with this enrollment.",
        },
        { status: 400 }
      );
    }

    if (enrollment.orderId !== razorpay_order_id) {
      return NextResponse.json(
        {
          success: false,
          message: "Payment order does not match this enrollment.",
        },
        { status: 400 }
      );
    }

    if (enrollment.paymentStatus === "paid") {
      return NextResponse.json(
        {
          success: true,
          message: "Payment has already been verified.",
          enrollmentId: enrollment._id.toString(),
        },
        { status: 200 }
      );
    }

    const keySecret = process.env.RAZORPAY_KEY_SECRET;

    if (!keySecret) {
      console.error("RAZORPAY_KEY_SECRET IS MISSING.");

      return NextResponse.json(
        {
          success: false,
          message: "Payment verification is not configured.",
        },
        { status: 500 }
      );
    }

    const generatedSignature = crypto
      .createHmac("sha256", keySecret)
      .update(`${razorpay_order_id}|${razorpay_payment_id}`)
      .digest("hex");

    const expectedBuffer = Buffer.from(generatedSignature, "utf8");
    const receivedBuffer = Buffer.from(razorpay_signature, "utf8");

    const signatureValid =
      expectedBuffer.length === receivedBuffer.length &&
      crypto.timingSafeEqual(expectedBuffer, receivedBuffer);

    if (!signatureValid) {
      console.error("RAZORPAY SIGNATURE VERIFICATION FAILED.");

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
    enrollment.completedLessons = 0;
    enrollment.enrolledAt = new Date();

    await enrollment.save();

    return NextResponse.json(
      {
        success: true,
        message: "Payment verified successfully. Course activated.",
        enrollmentId: enrollment._id.toString(),
        courseSlug: enrollment.courseSlug,
        courseTitle: enrollment.courseTitle,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("ACADEMY PAYMENT VERIFICATION ERROR:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Unable to verify payment.",
      },
      { status: 500 }
    );
  }
}
