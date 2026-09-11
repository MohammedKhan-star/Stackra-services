"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { useState } from "react";
import {
  ArrowLeft,
  ArrowRight,
  Award,
  BookOpen,
  CheckCircle2,
  Clock3,
  Code2,
  Database,
  GraduationCap,
  Laptop,
  ShieldCheck,
  Sparkles,
  Users,
} from "lucide-react";

const courses = {
  "full-stack-web-development": {
    title: "Full Stack Web Development",
    category: "Web Development",
    level: "Beginner",
    duration: "35 Hours",
    lessons: 120,
    price: 4999,
    description:
      "Learn modern frontend and backend development by building real-world web applications.",
    topics: [
      "HTML & CSS",
      "JavaScript",
      "React.js",
      "Next.js",
      "Node.js",
      "REST APIs",
      "MongoDB",
      "Real-world projects",
    ],
  },

  "javascript-mastery": {
    title: "JavaScript Mastery",
    category: "Programming",
    level: "Intermediate",
    duration: "25 Hours",
    lessons: 80,
    price: 2999,
    description:
      "Build strong JavaScript fundamentals and learn modern JavaScript development techniques.",
    topics: [
      "JavaScript fundamentals",
      "Functions",
      "Arrays & Objects",
      "DOM",
      "ES6+",
      "Async JavaScript",
      "APIs",
      "Projects",
    ],
  },

  "react-js-development": {
    title: "React.js Development",
    category: "Web Development",
    level: "Intermediate",
    duration: "20 Hours",
    lessons: 60,
    price: 2999,
    description:
      "Learn React.js and build modern interactive web applications using components and hooks.",
    topics: [
      "React fundamentals",
      "Components",
      "Props & State",
      "Hooks",
      "Forms",
      "API integration",
      "Routing",
      "Projects",
    ],
  },

  "next-js-development": {
    title: "Next.js Development",
    category: "Web Development",
    level: "Intermediate",
    duration: "20 Hours",
    lessons: 60,
    price: 3499,
    description:
      "Learn Next.js App Router, server components, APIs and modern full-stack application development.",
    topics: [
      "Next.js fundamentals",
      "App Router",
      "Layouts",
      "Server Components",
      "API Routes",
      "MongoDB",
      "Authentication",
      "Deployment",
    ],
  },

  "ai-machine-learning": {
    title: "AI & Machine Learning",
    category: "AI & Machine Learning",
    level: "Beginner",
    duration: "30 Hours",
    lessons: 90,
    price: 4999,
    description:
      "Understand artificial intelligence and machine learning concepts through practical examples.",
    topics: [
      "AI fundamentals",
      "Machine Learning",
      "Data preparation",
      "Supervised learning",
      "Unsupervised learning",
      "Model evaluation",
      "AI tools",
      "Practical projects",
    ],
  },

  "mongodb-database-development": {
    title: "MongoDB & Database Development",
    category: "Database",
    level: "Beginner",
    duration: "15 Hours",
    lessons: 45,
    price: 2499,
    description:
      "Learn MongoDB database design, CRUD operations, queries and application integration.",
    topics: [
      "MongoDB fundamentals",
      "Collections",
      "Documents",
      "CRUD operations",
      "Queries",
      "Indexes",
      "Mongoose",
      "Application integration",
    ],
  },

  "node-js-backend-development": {
    title: "Node.js Backend Development",
    category: "Web Development",
    level: "Intermediate",
    duration: "20 Hours",
    lessons: 60,
    price: 2999,
    description:
      "Learn backend development using Node.js, APIs, authentication and database integration.",
    topics: [
      "Node.js fundamentals",
      "Express.js",
      "REST APIs",
      "Middleware",
      "Authentication",
      "MongoDB",
      "API security",
      "Backend projects",
    ],
  },

  "cyber-security-fundamentals": {
    title: "Cyber Security Fundamentals",
    category: "Cyber Security",
    level: "Beginner",
    duration: "18 Hours",
    lessons: 50,
    price: 2999,
    description:
      "Understand the fundamentals of cybersecurity, online threats and security best practices.",
    topics: [
      "Cybersecurity basics",
      "Threats",
      "Passwords & authentication",
      "Network security",
      "Web security",
      "Phishing awareness",
      "Data protection",
      "Security practices",
    ],
  },

  "advanced-microsoft-excel": {
    title: "Advanced Microsoft Excel",
    category: "Business & Technology",
    level: "Intermediate",
    duration: "18 Hours",
    lessons: 55,
    price: 1999,
    description:
      "Master advanced Excel formulas, data analysis, charts and professional spreadsheet workflows.",
    topics: [
      "Advanced formulas",
      "Lookup functions",
      "Logical functions",
      "Data cleaning",
      "Sorting & filtering",
      "Pivot Tables",
      "Charts",
      "Practical projects",
    ],
  },

  "ms-office": {
    title: "MS Office",
    category: "Office Productivity",
    level: "Beginner",
    duration: "15 Hours",
    lessons: 30,
    price: 1499,
    description:
      "Master Microsoft Word, Excel and PowerPoint through practical office-based exercises.",
    topics: [
      "Microsoft Word",
      "Document formatting",
      "Tables & page layout",
      "Microsoft Excel",
      "Basic formulas",
      "Charts",
      "Microsoft PowerPoint",
      "Professional presentations",
    ],
  },

  "typing-mastery": {
    title: "Typing Mastery",
    category: "Computer Skills",
    level: "Beginner",
    duration: "10 Hours",
    lessons: 20,
    price: 999,
    description:
      "Improve your typing speed, accuracy and keyboard skills through structured practical training.",
    topics: [
      "Keyboard fundamentals",
      "Finger positioning",
      "Home row",
      "Touch typing",
      "Typing accuracy",
      "Speed improvement",
      "Timed typing tests",
      "Final assessment",
    ],
  },

  "python-programming": {
    title: "Python Programming",
    category: "Programming",
    level: "Beginner",
    duration: "20 Hours",
    lessons: 40,
    price: 2499,
    description:
      "Learn Python programming fundamentals and build practical applications through hands-on exercises.",
    topics: [
      "Python fundamentals",
      "Variables & data types",
      "Operators",
      "Conditions",
      "Loops",
      "Lists & dictionaries",
      "Functions",
      "Projects",
    ],
  },
};

function getCourseIcon(category) {
  if (category === "AI & Machine Learning") return Sparkles;
  if (category === "Database") return Database;
  if (category === "Cyber Security") return ShieldCheck;
  if (category === "Programming") return Code2;
  if (category === "Web Development") return Laptop;

  return BookOpen;
}

export default function EnrollmentPage() {
  const params = useParams();
  const slug = params?.slug;

  const course = courses[slug];

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [success, setSuccess] = useState(false);

  if (!course) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-slate-50 px-4">
        <div className="text-center">
          <h1 className="text-3xl font-extrabold text-slate-900">
            Course Not Found
          </h1>

          <p className="mt-3 text-slate-500">
            The course you are looking for does not exist.
          </p>

          <Link
            href="/academy/courses"
            className="mt-6 inline-flex items-center gap-2 rounded-xl bg-blue-600 px-5 py-3 font-bold text-white hover:bg-blue-700"
          >
            <ArrowLeft size={18} />
            Back to Courses
          </Link>
        </div>
      </main>
    );
  }

  const Icon = getCourseIcon(course.category);

  const verifyPayment = async ({
    enrollmentId,
    razorpay_order_id,
    razorpay_payment_id,
    razorpay_signature,
  }) => {
    const response = await fetch("/api/academy/payment/verify", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        enrollmentId,
        razorpay_order_id,
        razorpay_payment_id,
        razorpay_signature,
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || "Payment verification failed.");
    }

    return data;
  };

  const openRazorpayCheckout = async (enrollment) => {
    if (!window.Razorpay) {
      throw new Error(
        "Razorpay Checkout has not loaded. Please refresh the page and try again."
      );
    }

    const orderResponse = await fetch(
      "/api/academy/payment/create-order",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          enrollmentId: enrollment.id,
        }),
      }
    );

    const orderData = await orderResponse.json();

    if (!orderResponse.ok) {
      throw new Error(
        orderData.message || "Unable to create payment order."
      );
    }

    const options = {
      key: orderData.razorpayKeyId,
      amount: orderData.order.amount,
      currency: orderData.order.currency,
      name: "STACKRA Academy",
      description: enrollment.courseTitle,
      order_id: orderData.order.id,

      handler: async function (paymentResponse) {
        try {
          setLoading(true);
          setMessage("Verifying your payment...");

          await verifyPayment({
            enrollmentId: enrollment.id,
            razorpay_order_id: paymentResponse.razorpay_order_id,
            razorpay_payment_id: paymentResponse.razorpay_payment_id,
            razorpay_signature: paymentResponse.razorpay_signature,
          });

          setSuccess(true);
          setMessage(
            "Payment successful! Your course is now active."
          );

          setTimeout(() => {
            window.location.href = "/academy/dashboard";
          }, 1500);
        } catch (error) {
          console.error("Payment verification error:", error);

          setMessage(
            error.message ||
              "Payment was received but verification failed. Please contact support."
          );
        } finally {
          setLoading(false);
        }
      },

      modal: {
        ondismiss: function () {
          setLoading(false);
          setMessage(
            "Payment window closed. Your enrollment is still pending."
          );
        },
      },

      theme: {
        color: "#2563eb",
      },
    };

    const razorpay = new window.Razorpay(options);

    razorpay.on("payment.failed", function (response) {
      console.error("RAZORPAY PAYMENT FAILED:", response.error);

      setLoading(false);

      setMessage(
        response.error?.description ||
          "Payment failed. Please try again."
      );
    });

    razorpay.open();
  };

  const handleEnrollment = async () => {
    try {
      setLoading(true);
      setMessage("");
      setSuccess(false);

      const enrollmentResponse = await fetch("/api/academy/enroll", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          courseSlug: slug,
        }),
      });

      const enrollmentData = await enrollmentResponse.json();

      if (enrollmentResponse.status === 401) {
        window.location.href =
          `/academy/login?redirect=/academy/enroll/${slug}`;

        return;
      }

      if (!enrollmentResponse.ok) {
        throw new Error(
          enrollmentData.message || "Unable to start enrollment."
        );
      }

      const enrollment = enrollmentData.enrollment;

      if (!enrollment?.id) {
        throw new Error("Enrollment information is missing.");
      }

      await openRazorpayCheckout(enrollment);
    } catch (error) {
      console.error("Enrollment/payment error:", error);

      setMessage(
        error.message ||
          "Unable to start the enrollment process. Please try again."
      );

      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-slate-50 text-slate-900">
      {/* Header */}
      <header className="border-b border-slate-200 bg-white">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
          <Link
            href="/academy/courses"
            className="inline-flex items-center gap-2 text-sm font-semibold text-slate-600 hover:text-blue-600"
          >
            <ArrowLeft size={18} />
            Back to Courses
          </Link>

          <Link
            href="/academy"
            className="text-lg font-extrabold tracking-tight text-slate-900"
          >
            STACKRA <span className="text-blue-600">Academy</span>
          </Link>
        </div>
      </header>

      <section className="mx-auto max-w-7xl px-4 py-8 sm:px-6 sm:py-12 lg:px-8">
        <div className="grid gap-8 lg:grid-cols-[1fr_400px]">
          {/* Course information */}
          <div>
            <div className="mb-6 rounded-3xl bg-gradient-to-br from-blue-700 via-indigo-700 to-purple-800 p-6 text-white shadow-xl sm:p-10">
              <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-white/15">
                <Icon size={32} />
              </div>

              <div className="mb-4 flex flex-wrap gap-2">
                <span className="rounded-full bg-white/15 px-3 py-1 text-xs font-semibold">
                  {course.category}
                </span>

                <span className="rounded-full bg-white/15 px-3 py-1 text-xs font-semibold">
                  {course.level}
                </span>
              </div>

              <h1 className="max-w-3xl text-3xl font-extrabold tracking-tight sm:text-4xl lg:text-5xl">
                Enroll in {course.title}
              </h1>

              <p className="mt-5 max-w-2xl text-sm leading-7 text-blue-100 sm:text-base">
                {course.description}
              </p>

              <div className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-3">
                <div className="rounded-2xl bg-white/10 p-4">
                  <Clock3 size={20} />
                  <p className="mt-2 text-xs text-blue-100">
                    Duration
                  </p>
                  <p className="mt-1 font-bold">{course.duration}</p>
                </div>

                <div className="rounded-2xl bg-white/10 p-4">
                  <BookOpen size={20} />
                  <p className="mt-2 text-xs text-blue-100">
                    Lessons
                  </p>
                  <p className="mt-1 font-bold">{course.lessons}</p>
                </div>

                <div className="rounded-2xl bg-white/10 p-4">
                  <GraduationCap size={20} />
                  <p className="mt-2 text-xs text-blue-100">
                    Certificate
                  </p>
                  <p className="mt-1 font-bold">Included</p>
                </div>
              </div>
            </div>

            <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
              <h2 className="text-2xl font-extrabold">
                What you will learn
              </h2>

              <p className="mt-2 text-sm text-slate-500">
                Practical skills designed to help you learn and build
                with confidence.
              </p>

              <div className="mt-6 grid gap-4 sm:grid-cols-2">
                {course.topics.map((topic) => (
                  <div
                    key={topic}
                    className="flex items-start gap-3 rounded-2xl bg-slate-50 p-4"
                  >
                    <CheckCircle2
                      className="mt-0.5 shrink-0 text-green-600"
                      size={20}
                    />

                    <span className="text-sm font-semibold text-slate-700">
                      {topic}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-6 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
              <h2 className="text-2xl font-extrabold">
                Your enrollment includes
              </h2>

              <div className="mt-6 grid gap-5 sm:grid-cols-2">
                <div className="flex gap-4">
                  <BookOpen className="text-blue-600" size={24} />
                  <div>
                    <h3 className="font-bold">
                      Structured Lessons
                    </h3>
                    <p className="mt-1 text-sm text-slate-500">
                      Follow a structured learning path.
                    </p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <Laptop className="text-purple-600" size={24} />
                  <div>
                    <h3 className="font-bold">
                      Practical Learning
                    </h3>
                    <p className="mt-1 text-sm text-slate-500">
                      Learn through practical exercises and projects.
                    </p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <Award className="text-green-600" size={24} />
                  <div>
                    <h3 className="font-bold">
                      Course Certificate
                    </h3>
                    <p className="mt-1 text-sm text-slate-500">
                      Certificate after successful completion.
                    </p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <Users className="text-orange-600" size={24} />
                  <div>
                    <h3 className="font-bold">
                      Student Dashboard
                    </h3>
                    <p className="mt-1 text-sm text-slate-500">
                      Track your learning progress.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Payment card */}
          <aside className="lg:sticky lg:top-6 lg:h-fit">
            <div className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-xl">
              <div className="bg-slate-900 p-6 text-white">
                <p className="text-sm text-slate-300">
                  Course Enrollment
                </p>

                <h2 className="mt-2 text-xl font-extrabold">
                  {course.title}
                </h2>
              </div>

              <div className="p-6">
                <div className="border-b border-slate-200 pb-6">
                  <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                    Course Fee
                  </p>

                  <p className="mt-1 text-4xl font-extrabold text-slate-900">
                    ₹{course.price.toLocaleString("en-IN")}
                  </p>
                </div>

                <div className="space-y-4 py-6">
                  <div className="flex justify-between text-sm">
                    <span className="text-slate-500">
                      Course
                    </span>

                    <span className="max-w-[200px] text-right font-semibold">
                      {course.title}
                    </span>
                  </div>

                  <div className="flex justify-between text-sm">
                    <span className="text-slate-500">
                      Duration
                    </span>

                    <span className="font-semibold">
                      {course.duration}
                    </span>
                  </div>

                  <div className="flex justify-between text-sm">
                    <span className="text-slate-500">
                      Certificate
                    </span>

                    <span className="font-semibold text-green-600">
                      Included
                    </span>
                  </div>
                </div>

                {message && (
                  <div
                    className={`mb-5 rounded-2xl p-4 ${
                      success
                        ? "bg-green-50 text-green-800"
                        : "bg-blue-50 text-blue-800"
                    }`}
                  >
                    <p className="text-sm font-semibold leading-6">
                      {message}
                    </p>
                  </div>
                )}

                <button
                  type="button"
                  onClick={handleEnrollment}
                  disabled={loading}
                  className="flex w-full items-center justify-center gap-2 rounded-xl bg-blue-600 px-5 py-4 text-sm font-bold text-white shadow-lg shadow-blue-600/20 transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {loading
                    ? "Processing..."
                    : `Pay ₹${course.price.toLocaleString("en-IN")}`}

                  {!loading && <ArrowRight size={18} />}
                </button>

                <p className="mt-4 text-center text-xs leading-5 text-slate-500">
                  Secure payment powered by Razorpay.
                </p>

                <div className="mt-6 border-t border-slate-200 pt-5">
                  <p className="text-center text-xs leading-5 text-slate-500">
                    Your course will become active only after the payment
                    is successfully verified.
                  </p>
                </div>

                <Link
                  href="/academy/courses"
                  className="mt-5 block text-center text-xs font-semibold text-slate-500 hover:text-blue-600"
                >
                  Choose a different course
                </Link>
              </div>
            </div>
          </aside>
        </div>
      </section>
    </main>
  );
}
