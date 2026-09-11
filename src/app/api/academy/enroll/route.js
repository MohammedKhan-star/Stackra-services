import { NextResponse } from "next/server";

import connectDB from "@/lib/mongodb";
import Student from "@/models/Student";
import Enrollment from "@/models/Enrollment";

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
    price: 2499,
  },

  "advanced-microsoft-excel": {
    title: "Advanced Microsoft Excel",
    price: 1499,
  },

  "ms-office": {
    title: "MS Office",
    price: 999,
  },

  "typing-mastery": {
    title: "Typing Mastery",
    price: 699,
  },

  "python-programming": {
    title: "Python Programming",
    price: 1999,
  },
};

export async function POST(request) {
  try {
    const token = request.cookies.get("academy_token")?.value;

    if (!token) {
      return NextResponse.json(
        {
          success: false,
          message: "Please login before enrolling in a course.",
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

    /*
     * Import authentication dynamically so the API can load
     * even before ACADEMY_AUTH_SECRET is configured.
     */
    const { verifyAcademyToken } = await import(
      "@/lib/academy-auth"
    );

    const student = await verifyAcademyToken(token);

    if (!student?.studentId) {
      return NextResponse.json(
        {
          success: false,
          message: "Your login session has expired. Please login again.",
        },
        { status: 401 }
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

    if (studentRecord.isActive === false) {
      return NextResponse.json(
        {
          success: false,
          message: "Your account has been disabled.",
        },
        { status: 403 }
      );
    }

    const existingEnrollment = await Enrollment.findOne({
      studentId: studentRecord._id,
      courseSlug,
    });

    if (existingEnrollment) {
      if (
        existingEnrollment.status === "active" ||
        existingEnrollment.status === "completed"
      ) {
        return NextResponse.json(
          {
            success: false,
            message: "You are already enrolled in this course.",
            enrollmentId: existingEnrollment._id.toString(),
          },
          { status: 409 }
        );
      }

      if (existingEnrollment.status === "pending") {
        return NextResponse.json(
          {
            success: true,
            message: "A pending enrollment already exists.",
            enrollmentId: existingEnrollment._id.toString(),
            course: {
              slug: courseSlug,
              title: course.title,
              price: course.price,
              currency: "INR",
            },
          },
          { status: 200 }
        );
      }

      existingEnrollment.status = "pending";
      existingEnrollment.paymentStatus = "pending";
      existingEnrollment.amount = course.price;
      existingEnrollment.currency = "INR";

      await existingEnrollment.save();

      return NextResponse.json(
        {
          success: true,
          message: "Enrollment is ready for payment.",
          enrollmentId: existingEnrollment._id.toString(),
          course: {
            slug: courseSlug,
            title: course.title,
            price: course.price,
            currency: "INR",
          },
        },
        { status: 200 }
      );
    }

    const enrollment = await Enrollment.create({
      studentId: studentRecord._id,

      courseSlug,

      courseTitle: course.title,

      amount: course.price,

      currency: "INR",

      paymentStatus: "pending",

      status: "pending",

      progress: 0,

      completedLessons: 0,

      completedLessonIds: [],

      enrolledAt: null,
    });

    return NextResponse.json(
      {
        success: true,

        message: "Enrollment created successfully.",

        enrollmentId: enrollment._id.toString(),

        course: {
          slug: courseSlug,
          title: course.title,
          price: course.price,
          currency: "INR",
        },
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("ACADEMY ENROLLMENT ERROR:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Unable to create enrollment.",
      },
      { status: 500 }
    );
  }
}
