import { NextResponse } from "next/server";

import connectDB from "@/lib/mongodb";
import Student from "@/models/Student";
import Enrollment from "@/models/Enrollment";
import { verifyAcademyToken } from "@/lib/academy-auth";

const courses = {
  "full-stack-web-development": {
    title: "Full Stack Web Development",
    price: 4999,
  },

  "javascript-mastery": {
    title: "JavaScript Mastery",
    price: 2999,
  },

  "react-js-development": {
    title: "React.js Development",
    price: 2999,
  },

  "next-js-development": {
    title: "Next.js Development",
    price: 3499,
  },

  "ai-machine-learning": {
    title: "AI & Machine Learning",
    price: 4999,
  },

  "mongodb-database-development": {
    title: "MongoDB & Database Development",
    price: 2499,
  },

  "node-js-backend-development": {
    title: "Node.js Backend Development",
    price: 2999,
  },

  "cyber-security-fundamentals": {
    title: "Cyber Security Fundamentals",
    price: 2999,
  },

  "advanced-microsoft-excel": {
    title: "Advanced Microsoft Excel",
    price: 1999,
  },

  "ms-office": {
    title: "MS Office",
    price: 1499,
  },

  "typing-mastery": {
    title: "Typing Mastery",
    price: 999,
  },

  "python-programming": {
    title: "Python Programming",
    price: 2499,
  },
};

export async function POST(request) {
  try {
    const token = request.cookies.get("academy_token")?.value;

    if (!token) {
      return NextResponse.json(
        {
          success: false,
          message: "Please login to enroll in a course.",
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

    const courseSlug = body.courseSlug?.trim();

    if (!courseSlug) {
      return NextResponse.json(
        {
          success: false,
          message: "Course is required.",
        },
        { status: 400 }
      );
    }

    const course = courses[courseSlug];

    if (!course) {
      return NextResponse.json(
        {
          success: false,
          message: "Course not found.",
        },
        { status: 404 }
      );
    }

    await connectDB();

    const existingEnrollment = await Enrollment.findOne({
      studentId: student.studentId,
      courseSlug,
    });

    if (existingEnrollment) {
      return NextResponse.json(
        {
          success: true,
          alreadyEnrolled: true,
          message: "You already have an enrollment for this course.",
          enrollment: {
            id: existingEnrollment._id.toString(),
            courseSlug: existingEnrollment.courseSlug,
            courseTitle: existingEnrollment.courseTitle,
            amount: existingEnrollment.amount,
            status: existingEnrollment.status,
            paymentStatus: existingEnrollment.paymentStatus,
            progress: existingEnrollment.progress,
          },
        },
        { status: 200 }
      );
    }

    const studentRecord = await Student.findById(student.studentId);

    if (!studentRecord) {
      return NextResponse.json(
        {
          success: false,
          message: "Student account not found.",
        },
        { status: 404 }
      );
    }

    const enrollment = await Enrollment.create({
      studentId: studentRecord._id,
      courseSlug,
      courseTitle: course.title,
      amount: course.price,
      status: "pending",
      paymentStatus: "pending",
      progress: 0,
    });

    return NextResponse.json(
      {
        success: true,
        alreadyEnrolled: false,
        message: "Enrollment created successfully.",
        enrollment: {
          id: enrollment._id.toString(),
          courseSlug: enrollment.courseSlug,
          courseTitle: enrollment.courseTitle,
          amount: enrollment.amount,
          status: enrollment.status,
          paymentStatus: enrollment.paymentStatus,
          progress: enrollment.progress,
        },
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("ACADEMY ENROLLMENT ERROR:", error);

    if (error.code === 11000) {
      return NextResponse.json(
        {
          success: false,
          message: "You are already enrolled in this course.",
        },
        { status: 409 }
      );
    }

    return NextResponse.json(
      {
        success: false,
        message: "Unable to create enrollment.",
      },
      { status: 500 }
    );
  }
}
