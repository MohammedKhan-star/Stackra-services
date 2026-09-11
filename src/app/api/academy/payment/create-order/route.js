import { NextResponse } from "next/server";
import Razorpay from "razorpay";

import connectDB from "@/lib/mongodb";
import Enrollment from "@/models/Enrollment";
import { verifyAcademyToken } from "@/lib/academy-auth";

export async function POST(request) {
  try {
    // -----------------------------------------
    // 1. Get login token
    // -----------------------------------------

    const token = request.cookies.get("academy_token")?.value;

    if (!token) {
      return NextResponse.json(
        {
          success: false,
          message: "Please login to continue.",
        },
        {
          status: 401,
        }
      );
    }

    // -----------------------------------------
    // 2. Verify student
    // -----------------------------------------

    const student = await verifyAcademyToken(token);

    if (!student?.studentId) {
      return NextResponse.json(
        {
          success: false,
          message:
            "Your login session is invalid or expired.",
        },
        {
          status: 401,
        }
      );
    }

    // -----------------------------------------
    // 3. Read request
    // -----------------------------------------

    const body = await request.json();

    const enrollmentId = body.enrollmentId;

    if (!enrollmentId) {
      return NextResponse.json(
        {
          success: false,
          message: "Enrollment ID is required.",
        },
        {
          status: 400,
        }
      );
    }

    // -----------------------------------------
    // 4. Connect MongoDB
    // -----------------------------------------

    await connectDB();

    // -----------------------------------------
    // 5. Find enrollment
    // -----------------------------------------

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
        {
          status: 404,
        }
      );
    }

    // -----------------------------------------
    // 6. Check payment status
    // -----------------------------------------

    if (enrollment.paymentStatus === "paid") {
      return NextResponse.json(
        {
          success: false,
          message: "This course has already been paid for.",
        },
        {
          status: 409,
        }
      );
    }

    // -----------------------------------------
    // 7. Razorpay credentials
    // -----------------------------------------

    const keyId = process.env.RAZORPAY_KEY_ID;
    const keySecret = process.env.RAZORPAY_KEY_SECRET;

    if (!keyId || !keySecret) {
      console.error(
        "RAZORPAY credentials are missing."
      );

      return NextResponse.json(
        {
          success: false,
          message:
            "Payment system is not configured.",
        },
        {
          status: 500,
        }
      );
    }

    // -----------------------------------------
    // 8. Initialize Razorpay
    // -----------------------------------------

    const razorpay = new Razorpay({
      key_id: keyId,
      key_secret: keySecret,
    });

    // -----------------------------------------
    // 9. Create Razorpay order
    // -----------------------------------------

    const order = await razorpay.orders.create({
      amount: Math.round(enrollment.amount * 100),
      currency: enrollment.currency || "INR",
      receipt: `stackra_${enrollment._id.toString()}`,
      notes: {
        enrollmentId: enrollment._id.toString(),
        studentId: student.studentId.toString(),
        courseSlug: enrollment.courseSlug,
      },
    });

    // -----------------------------------------
    // 10. Save order ID
    // -----------------------------------------

    enrollment.orderId = order.id;
    enrollment.paymentStatus = "pending";
    enrollment.status = "pending";

    await enrollment.save();

    // -----------------------------------------
    // 11. Return Razorpay order
    // -----------------------------------------

    return NextResponse.json(
      {
        success: true,

        message: "Payment order created successfully.",

        razorpayKeyId: keyId,

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
          currency: enrollment.currency,
        },
      },
      {
        status: 200,
      }
    );
  } catch (error) {
    console.error(
      "RAZORPAY CREATE ORDER ERROR:",
      error
    );

    return NextResponse.json(
      {
        success: false,
        message:
          error?.error?.description ||
          error?.message ||
          "Unable to create payment order.",
      },
      {
        status: 500,
      }
    );
  }
}
