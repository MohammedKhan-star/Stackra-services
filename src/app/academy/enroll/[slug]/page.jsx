"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import {
  ArrowLeft,
  ArrowRight,
  Award,
  BookOpen,
  CheckCircle2,
  Clock3,
  GraduationCap,
  ShieldCheck,
  Users,
} from "lucide-react";

const courses = {
  "full-stack-web-development": {
    title: "Full Stack Web Development",
    category: "Web Development",
    level: "Beginner to Advanced",
    duration: "35 Hours",
    lessons: 120,
    price: 4999,
    oldPrice: 9999,
  },

  "javascript-mastery": {
    title: "JavaScript Mastery",
    category: "Programming",
    level: "Beginner to Advanced",
    duration: "24 Hours",
    lessons: 80,
    price: 2999,
    oldPrice: 5999,
  },

  "react-js-development": {
    title: "React.js Development",
    category: "Web Development",
    level: "Intermediate",
    duration: "20 Hours",
    lessons: 70,
    price: 2999,
    oldPrice: 5999,
  },
};

export default function EnrollmentPage() {
  const { slug } = useParams();

  const course = courses[slug];

  if (!course) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-slate-50 px-6">
        <div className="text-center">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-slate-950 text-white">
            <BookOpen size={28} />
          </div>

          <h1 className="mt-6 text-3xl font-bold">
            Course Not Found
          </h1>

          <p className="mt-3 text-slate-500">
            We could not find this course.
          </p>

          <Link
            href="/academy/courses"
            className="mt-7 inline-flex items-center gap-2 rounded-xl bg-slate-950 px-6 py-3 font-semibold text-white"
          >
            <ArrowLeft size={17} />
            Back to Courses
          </Link>
        </div>
      </main>
    );
  }

  const discount = course.oldPrice - course.price;

  return (
    <main className="min-h-screen bg-slate-50 text-slate-950">
      {/* NAVBAR */}

      <nav className="border-b border-slate-200 bg-white">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4 lg:px-8">
          <Link
            href="/academy"
            className="flex items-center gap-3"
          >
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-slate-950 text-white">
              <GraduationCap size={21} />
            </div>

            <div>
              <div className="font-bold tracking-tight">
                STACKRA
              </div>

              <div className="text-[10px] font-semibold uppercase tracking-[0.2em] text-slate-500">
                Academy
              </div>
            </div>
          </Link>

          <Link
            href="/academy/courses"
            className="text-sm font-semibold text-slate-600 hover:text-slate-950"
          >
            Back to Courses
          </Link>
        </div>
      </nav>

      {/* HEADER */}

      <section className="bg-slate-950 text-white">
        <div className="mx-auto max-w-7xl px-6 py-12 lg:px-8">
          <Link
            href={`/academy/courses/${slug}`}
            className="inline-flex items-center gap-2 text-sm text-slate-400 hover:text-white"
          >
            <ArrowLeft size={16} />
            Back to Course
          </Link>

          <div className="mt-8">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-400">
              Course Enrollment
            </p>

            <h1 className="mt-3 text-4xl font-bold tracking-tight sm:text-5xl">
              Start your learning journey.
            </h1>

            <p className="mt-4 max-w-2xl text-lg text-slate-300">
              You're one step away from joining STACKRA Academy.
            </p>
          </div>
        </div>
      </section>

      {/* MAIN */}

      <section className="mx-auto max-w-7xl px-6 py-12 lg:px-8">
        <div className="grid gap-8 lg:grid-cols-[1fr_400px]">
          {/* LEFT */}

          <div className="space-y-8">
            {/* COURSE */}

            <div className="rounded-2xl border border-slate-200 bg-white p-7">
              <div className="flex flex-col gap-6 sm:flex-row">
                <div className="flex h-28 w-full shrink-0 items-center justify-center rounded-xl bg-slate-950 text-white sm:w-36">
                  <GraduationCap
                    size={48}
                    strokeWidth={1.3}
                  />
                </div>

                <div>
                  <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold">
                    {course.category}
                  </span>

                  <h2 className="mt-4 text-2xl font-bold">
                    {course.title}
                  </h2>

                  <p className="mt-2 text-sm text-slate-500">
                    {course.level}
                  </p>
                </div>
              </div>
            </div>

            {/* WHAT'S INCLUDED */}

            <div className="rounded-2xl border border-slate-200 bg-white p-7">
              <h2 className="text-2xl font-bold">
                Your enrollment includes
              </h2>

              <div className="mt-7 grid gap-5 sm:grid-cols-2">
                <div className="flex gap-4">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-slate-100">
                    <BookOpen size={19} />
                  </div>

                  <div>
                    <h3 className="font-semibold">
                      Complete Course
                    </h3>

                    <p className="mt-1 text-sm text-slate-500">
                      {course.lessons} structured lessons
                    </p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-slate-100">
                    <Clock3 size={19} />
                  </div>

                  <div>
                    <h3 className="font-semibold">
                      Flexible Learning
                    </h3>

                    <p className="mt-1 text-sm text-slate-500">
                      {course.duration} of content
                    </p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-slate-100">
                    <Award size={19} />
                  </div>

                  <div>
                    <h3 className="font-semibold">
                      Certificate
                    </h3>

                    <p className="mt-1 text-sm text-slate-500">
                      Certificate after completion
                    </p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-slate-100">
                    <Users size={19} />
                  </div>

                  <div>
                    <h3 className="font-semibold">
                      Learning Support
                    </h3>

                    <p className="mt-1 text-sm text-slate-500">
                      STACKRA Academy support
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* ACCOUNT */}

            <div className="rounded-2xl border border-slate-200 bg-white p-7">
              <div className="flex items-start gap-4">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-slate-950 text-white">
                  <ShieldCheck size={21} />
                </div>

                <div>
                  <h2 className="text-xl font-bold">
                    Student account required
                  </h2>

                  <p className="mt-2 leading-7 text-slate-600">
                    You'll need a STACKRA Academy student account to
                    complete enrollment and access your course after
                    payment.
                  </p>

                  <div className="mt-5 flex flex-col gap-3 sm:flex-row">
                    <Link
                      href="/login"
                      className="inline-flex items-center justify-center rounded-xl border border-slate-200 px-5 py-3 text-sm font-semibold hover:bg-slate-50"
                    >
                      Login
                    </Link>

                    <Link
                      href="/register"
                      className="inline-flex items-center justify-center rounded-xl bg-slate-950 px-5 py-3 text-sm font-semibold text-white hover:bg-slate-800"
                    >
                      Create Student Account
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* ORDER SUMMARY */}

          <aside>
            <div className="sticky top-8 rounded-2xl border border-slate-200 bg-white p-7 shadow-sm">
              <h2 className="text-xl font-bold">
                Order Summary
              </h2>

              <div className="mt-6 border-b border-slate-200 pb-6">
                <p className="font-semibold">
                  {course.title}
                </p>

                <p className="mt-2 text-sm text-slate-500">
                  {course.level}
                </p>
              </div>

              <div className="space-y-4 border-b border-slate-200 py-6">
                <div className="flex justify-between text-sm">
                  <span className="text-slate-500">
                    Course Price
                  </span>

                  <span className="font-semibold">
                    ₹{course.oldPrice.toLocaleString("en-IN")}
                  </span>
                </div>

                <div className="flex justify-between text-sm">
                  <span className="text-slate-500">
                    Academy Discount
                  </span>

                  <span className="font-semibold">
                    -₹{discount.toLocaleString("en-IN")}
                  </span>
                </div>
              </div>

              <div className="flex items-end justify-between py-6">
                <span className="font-semibold">
                  Total
                </span>

                <span className="text-3xl font-bold">
                  ₹{course.price.toLocaleString("en-IN")}
                </span>
              </div>

              <button
                type="button"
                className="flex w-full items-center justify-center gap-2 rounded-xl bg-slate-950 py-4 font-semibold text-white transition hover:bg-slate-800"
              >
                Continue to Payment
                <ArrowRight size={18} />
              </button>

              <div className="mt-5 flex items-start gap-3 text-xs leading-5 text-slate-500">
                <CheckCircle2
                  size={16}
                  className="mt-0.5 shrink-0"
                />

                <span>
                  Secure enrollment. Payment processing will be
                  connected to Razorpay in the next development
                  phase.
                </span>
              </div>

              <p className="mt-6 text-center text-xs text-slate-400">
                By enrolling, you agree to the STACKRA Academy
                terms and policies.
              </p>
            </div>
          </aside>
        </div>
      </section>

      {/* FOOTER */}

      <footer className="border-t border-slate-200 bg-white">
        <div className="mx-auto max-w-7xl px-6 py-8 text-sm text-slate-500 lg:px-8">
          © {new Date().getFullYear()} STACKRA TECHNOLOGIES.
          All rights reserved.
        </div>
      </footer>
    </main>
  );
}
