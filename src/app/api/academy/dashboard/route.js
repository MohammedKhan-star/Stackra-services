import { NextResponse } from "next/server";

import connectDB from "@/lib/mongodb";
import Student from "@/models/Student";
import Enrollment from "@/models/Enrollment";
import { verifyAcademyToken } from "@/lib/academy-auth";

const courseInfo = {
  "full-stack-web-development": {
    level: "Beginner",
    duration: "35 Hours",
    totalLessons: 120,
    category: "Web Development",
  },

  "javascript-mastery": {
    level: "Intermediate",
    duration: "25 Hours",
    totalLessons: 80,
    category: "Programming",
  },

  "react-js-development": {
    level: "Intermediate",
    duration: "20 Hours",
    totalLessons: 60,
    category: "Web Development",
  },

  "next-js-development": {
    level: "Intermediate",
    duration: "20 Hours",
    totalLessons: 60,
    category: "Web Development",
  },

  "ai-machine-learning": {
    level: "Beginner",
    duration: "30 Hours",
    totalLessons: 90,
    category: "AI & Machine Learning",
  },

  "mongodb-database-development": {
    level: "Beginner",
    duration: "15 Hours",
    totalLessons: 45,
    category: "Database",
  },

  "node-js-backend-development": {
    level: "Intermediate",
    duration: "20 Hours",
    totalLessons: 60,
    category: "Web Development",
  },

  "cyber-security-fundamentals": {
    level: "Beginner",
    duration: "18 Hours",
    totalLessons: 50,
    category: "Cyber Security",
  },

  "advanced-microsoft-excel": {
    level: "Intermediate",
    duration: "18 Hours",
    totalLessons: 55,
    category: "Business & Technology",
  },

  "ms-office": {
    level: "Beginner",
    duration: "15 Hours",
    totalLessons: 30,
    category: "Office Productivity",
  },

  "typing-mastery": {
    level: "Beginner",
    duration: "10 Hours",
    totalLessons: 20,
    category: "Computer Skills",
  },

  "python-programming": {
    level: "Beginner",
    duration: "20 Hours",
    totalLessons: 40,
    category: "Programming",
  },
};

export async function GET(request) {
  try {
    const token = request.cookies.get("academy_token")?.value;

    if (!token) {
      return NextResponse.json(
        {
          success: false,
          message: "Please login to access your dashboard.",
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

    await connectDB();

    const studentRecord = await Student.findById(student.studentId).lean();

    if (!studentRecord) {
      return NextResponse.json(
        {
          success: false,
          message: "Student account not found.",
        },
        { status: 404 }
      );
    }

    const enrollments = await Enrollment.find({
      studentId: studentRecord._id,
      status: {
        $in: ["pending", "active", "completed"],
      },
    })
      .sort({ updatedAt: -1 })
      .lean();

    const courses = enrollments.map((enrollment) => {
      const info = courseInfo[enrollment.courseSlug] || {};

      const totalLessons = info.totalLessons || 0;

      const completedLessons =
        totalLessons > 0
          ? Math.round((enrollment.progress / 100) * totalLessons)
          : 0;

      return {
        id: enrollment._id.toString(),
        slug: enrollment.courseSlug,
        title: enrollment.courseTitle,
        category: info.category || "Technology",
        level: info.level || "Beginner",
        duration: info.duration || "Self-paced",
        progress: enrollment.progress || 0,
        completedLessons,
        totalLessons,
        status: enrollment.status,
        paymentStatus: enrollment.paymentStatus,
        enrolledAt: enrollment.enrolledAt,
        updatedAt: enrollment.updatedAt,
      };
    });

    const activeCourses = courses.filter(
      (course) => course.status === "active"
    );

    const completedCourses = courses.filter(
      (course) => course.status === "completed"
    );

    const totalCourses = activeCourses.length;

    const averageProgress =
      totalCourses > 0
        ? Math.round(
            activeCourses.reduce(
              (sum, course) => sum + course.progress,
              0
            ) / totalCourses
          )
        : 0;

    const totalLessonsCompleted = activeCourses.reduce(
      (sum, course) => sum + course.completedLessons,
      0
    );

    const totalLessons = activeCourses.reduce(
      (sum, course) => sum + course.totalLessons,
      0
    );

    const certificates =
      studentRecord.certificates?.length || 0;

    return NextResponse.json(
      {
        success: true,

        student: {
          id: studentRecord._id.toString(),
          fullName: studentRecord.fullName,
          email: studentRecord.email,
          role: studentRecord.role || "student",
        },

        statistics: {
          enrolledCourses: totalCourses,
          averageProgress,
          lessonsCompleted: totalLessonsCompleted,
          totalLessons,
          certificates,
          completedCourses: completedCourses.length,
        },

        courses,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("ACADEMY DASHBOARD ERROR:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Unable to load your dashboard.",
      },
      { status: 500 }
    );
  }
}
