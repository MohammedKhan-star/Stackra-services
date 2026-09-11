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
    // -----------------------------------------
    // 1. Get authentication token
    // -----------------------------------------

    const token = request.cookies.get("academy_token")?.value;

    if (!token) {
      return NextResponse.json(
        {
          success: false,
          message: "Please login before enrolling in a course.",
        },
        {
          status: 401,
        }
      );
    }

    // -----------------------------------------
    // 2. Verify JWT
    // -----------------------------------------

    const student = await verifyAcademyToken(token);

    if (!student?.studentId) {
      return NextResponse.json(
        {
          success: false,
          message:
            "Your login session has expired. Please login again.",
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

    const courseSlug = body.courseSlug?.trim();

    if (!courseSlug) {
      return NextResponse.json(
        {
          success: false,
          message: "Course is required.",
        },
        {
          status: 400,
        }
      );
    }

    // -----------------------------------------
    // 4. Find course
    // -----------------------------------------

    const course = courses[courseSlug];

    if (!course) {
      return NextResponse.json(
        {
          success: false,
          message: "Course not found.",
        },
        {
          status: 404,
        }
      );
    }

    // -----------------------------------------
    // 5. Connect MongoDB
    // -----------------------------------------

    await connectDB();

    // -----------------------------------------
    // 6. Find student
    // -----------------------------------------

    const studentRecord = await Student.findById(
      student.studentId
    );

    if (!studentRecord) {
      return NextResponse.json(
        {
          success: false,
          message: "Student account not found.",
        },
        {
          status: 404,
        }
      );
    }

    if (studentRecord.isActive === false) {
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
    // 7. Check existing enrollment
    // -----------------------------------------

    let enrollment = await Enrollment.findOne({
      studentId: studentRecord._id,
      courseSlug,
    });

    // -----------------------------------------
    // 8. Existing enrollment
    // -----------------------------------------

    if (enrollment) {
      if (
        enrollment.status === "active" ||
        enrollment.status === "completed"
      ) {
        return NextResponse.json(
          {
            success: false,
            message: "You are already enrolled in this course.",
            enrollment: {
              id: enrollment._id.toString(),
              courseSlug: enrollment.courseSlug,
              courseTitle: enrollment.courseTitle,
              amount: enrollment.amount,
              currency: enrollment.currency,
              paymentStatus: enrollment.paymentStatus,
              status: enrollment.status,
            },
          },
          {
            status: 409,
          }
        );
      }

      // Reuse pending/cancelled enrollment
      enrollment.status = "pending";
      enrollment.paymentStatus = "pending";
      enrollment.amount = course.price;
      enrollment.currency = "INR";

      await enrollment.save();

      return NextResponse.json(
        {
          success: true,
          message: "Enrollment is ready for payment.",
          enrollment: {
            id: enrollment._id.toString(),
            courseSlug: enrollment.courseSlug,
            courseTitle: enrollment.courseTitle,
            amount: enrollment.amount,
            currency: enrollment.currency,
            paymentStatus: enrollment.paymentStatus,
            status: enrollment.status,
          },
        },
        {
          status: 200,
        }
      );
    }

    // -----------------------------------------
    // 9. Create new enrollment
    // -----------------------------------------

    enrollment = await Enrollment.create({
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

    // -----------------------------------------
    // 10. Return enrollment
    // -----------------------------------------

    return NextResponse.json(
      {
        success: true,
        message: "Enrollment created successfully.",

        enrollment: {
          id: enrollment._id.toString(),
          courseSlug: enrollment.courseSlug,
          courseTitle: enrollment.courseTitle,
          amount: enrollment.amount,
          currency: enrollment.currency,
          paymentStatus: enrollment.paymentStatus,
          status: enrollment.status,
        },
      },
      {
        status: 201,
      }
    );
  } catch (error) {
    console.error("ACADEMY ENROLLMENT ERROR:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Unable to create enrollment.",
      },
      {
        status: 500,
      }
    );
  }
}
