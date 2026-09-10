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
  ChevronDown,
  Clock3,
  Code2,
  GraduationCap,
  PlayCircle,
  Star,
  Users,
} from "lucide-react";

const courses = {
  "full-stack-web-development": {
    title: "Full Stack Web Development",
    category: "Web Development",
    level: "Beginner to Advanced",
    duration: "35 Hours",
    lessons: 120,
    students: "1,200+",
    rating: "4.9",
    price: "₹4,999",
    oldPrice: "₹9,999",

    description:
      "Learn to build modern, production-ready web applications from frontend to backend using technologies used by modern software companies.",

    learn: [
      "Build responsive websites using HTML and CSS",
      "Master modern JavaScript",
      "Build applications with React.js",
      "Develop applications using Next.js",
      "Create backend APIs with Node.js",
      "Work with MongoDB and Mongoose",
      "Implement authentication and authorization",
      "Deploy applications to production",
      "Build real-world full-stack projects",
    ],

    requirements: [
      "Basic computer knowledge",
      "No previous programming experience required",
      "Laptop or desktop computer",
      "Willingness to practice and build projects",
    ],

    modules: [
      {
        title: "Module 1 — Web Development Fundamentals",
        lessons: [
          "Introduction to Web Development",
          "How Websites Work",
          "HTML Fundamentals",
          "Semantic HTML",
          "Forms and Input Elements",
          "CSS Fundamentals",
          "Responsive Web Design",
        ],
      },
      {
        title: "Module 2 — JavaScript",
        lessons: [
          "JavaScript Fundamentals",
          "Variables and Data Types",
          "Functions",
          "Arrays and Objects",
          "DOM Manipulation",
          "Events",
          "ES6+ Features",
          "Promises",
          "Async/Await",
          "Working with APIs",
        ],
      },
      {
        title: "Module 3 — React.js",
        lessons: [
          "Introduction to React",
          "Components",
          "JSX",
          "Props",
          "State",
          "React Hooks",
          "Forms",
          "API Integration",
          "Routing",
          "React Project",
        ],
      },
      {
        title: "Module 4 — Next.js",
        lessons: [
          "Introduction to Next.js",
          "App Router",
          "Layouts",
          "Pages",
          "Server Components",
          "Client Components",
          "Dynamic Routes",
          "Route Handlers",
          "Authentication",
          "Deployment",
        ],
      },
      {
        title: "Module 5 — Backend Development",
        lessons: [
          "Node.js Fundamentals",
          "Express.js",
          "REST APIs",
          "HTTP Methods",
          "Middleware",
          "Authentication",
          "Error Handling",
          "API Security",
        ],
      },
      {
        title: "Module 6 — MongoDB",
        lessons: [
          "Database Fundamentals",
          "MongoDB Introduction",
          "Collections and Documents",
          "CRUD Operations",
          "Mongoose",
          "Schemas and Models",
          "Database Relationships",
          "API Database Integration",
        ],
      },
      {
        title: "Module 7 — Real-World Projects",
        lessons: [
          "Business Website",
          "Authentication System",
          "Admin Dashboard",
          "REST API Project",
          "Business Management Application",
          "Final Capstone Project",
        ],
      },
    ],
  },

  "javascript-mastery": {
    title: "JavaScript Mastery",
    category: "Programming",
    level: "Beginner to Advanced",
    duration: "24 Hours",
    lessons: 80,
    students: "900+",
    rating: "4.8",
    price: "₹2,999",
    oldPrice: "₹5,999",

    description:
      "Master modern JavaScript from fundamentals to advanced programming concepts through practical examples and projects.",

    learn: [
      "Understand JavaScript fundamentals",
      "Master functions and objects",
      "Work with arrays and advanced methods",
      "Understand asynchronous JavaScript",
      "Use Promises and Async/Await",
      "Work with APIs",
      "Understand modern ES6+ features",
      "Build practical JavaScript applications",
    ],

    requirements: [
      "Basic computer knowledge",
      "No previous JavaScript experience required",
      "Laptop or desktop computer",
    ],

    modules: [
      {
        title: "Module 1 — JavaScript Fundamentals",
        lessons: [
          "Introduction to JavaScript",
          "Variables",
          "Data Types",
          "Operators",
          "Conditions",
          "Loops",
        ],
      },
      {
        title: "Module 2 — Functions and Objects",
        lessons: [
          "Functions",
          "Arrow Functions",
          "Objects",
          "Object Methods",
          "Destructuring",
          "Spread and Rest",
        ],
      },
      {
        title: "Module 3 — Modern JavaScript",
        lessons: [
          "ES6+ Features",
          "Modules",
          "Promises",
          "Async/Await",
          "Fetch API",
          "Error Handling",
        ],
      },
      {
        title: "Module 4 — Projects",
        lessons: [
          "Calculator Application",
          "Todo Application",
          "Weather Application",
          "API Project",
          "Final JavaScript Project",
        ],
      },
    ],
  },

  "react-js-development": {
    title: "React.js Development",
    category: "Web Development",
    level: "Intermediate",
    duration: "20 Hours",
    lessons: 70,
    students: "750+",
    rating: "4.8",
    price: "₹2,999",
    oldPrice: "₹5,999",

    description:
      "Learn React.js from fundamentals to advanced application development with practical projects.",

    learn: [
      "Understand React architecture",
      "Build reusable components",
      "Work with props and state",
      "Master React Hooks",
      "Handle forms",
      "Connect APIs",
      "Build real-world React applications",
    ],

    requirements: [
      "Basic HTML and CSS knowledge",
      "Basic JavaScript knowledge",
      "Laptop or desktop computer",
    ],

    modules: [
      {
        title: "Module 1 — React Fundamentals",
        lessons: [
          "Introduction to React",
          "Project Setup",
          "Components",
          "JSX",
          "Props",
          "State",
        ],
      },
      {
        title: "Module 2 — React Hooks",
        lessons: [
          "useState",
          "useEffect",
          "useContext",
          "useRef",
          "Custom Hooks",
        ],
      },
      {
        title: "Module 3 — Application Development",
        lessons: [
          "Forms",
          "API Integration",
          "Routing",
          "Authentication",
          "State Management",
        ],
      },
      {
        title: "Module 4 — Projects",
        lessons: [
          "Dashboard",
          "E-Commerce Application",
          "API Application",
          "Final React Project",
        ],
      },
    ],
  },
};

export default function CoursePage() {
  const { slug } = useParams();

  const course = courses[slug];

  const [openModule, setOpenModule] = useState(0);

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
            The course you are looking for does not exist.
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

  return (
    <main className="min-h-screen bg-white text-slate-950">
      {/* NAVBAR */}

      <nav className="sticky top-0 z-50 border-b border-slate-200 bg-white/95 backdrop-blur">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4 lg:px-8">
          <Link
            href="/academy"
            className="flex items-center gap-3"
          >
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-slate-950 text-white">
              <GraduationCap size={21} />
            </div>

            <div>
              <div className="font-bold">
                STACKRA
              </div>

              <div className="text-[10px] font-semibold uppercase tracking-[0.2em] text-slate-500">
                Academy
              </div>
            </div>
          </Link>

          <div className="hidden items-center gap-8 md:flex">
            <Link
              href="/academy"
              className="text-sm text-slate-500 hover:text-slate-950"
            >
              Home
            </Link>

            <Link
              href="/academy/courses"
              className="text-sm font-semibold text-slate-950"
            >
              Courses
            </Link>
          </div>

          <Link
            href="/login"
            className="rounded-xl border border-slate-200 px-5 py-2.5 text-sm font-semibold hover:bg-slate-50"
          >
            Login
          </Link>
        </div>
      </nav>

      {/* HERO */}

      <section className="bg-slate-950 text-white">
        <div className="mx-auto max-w-7xl px-6 py-16 lg:px-8 lg:py-20">
          <Link
            href="/academy/courses"
            className="inline-flex items-center gap-2 text-sm text-slate-400 hover:text-white"
          >
            <ArrowLeft size={16} />
            All Courses
          </Link>

          <div className="mt-10 grid gap-12 lg:grid-cols-[1fr_380px]">
            <div>
              <div className="flex flex-wrap items-center gap-3">
                <span className="rounded-full bg-white/10 px-4 py-1.5 text-xs font-semibold">
                  {course.category}
                </span>

                <span className="text-sm text-slate-400">
                  {course.level}
                </span>
              </div>

              <h1 className="mt-6 max-w-4xl text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
                {course.title}
              </h1>

              <p className="mt-6 max-w-3xl text-lg leading-8 text-slate-300">
                {course.description}
              </p>

              <div className="mt-8 flex flex-wrap gap-x-6 gap-y-4 text-sm text-slate-300">
                <span className="flex items-center gap-2">
                  <Clock3 size={17} />
                  {course.duration}
                </span>

                <span className="flex items-center gap-2">
                  <BookOpen size={17} />
                  {course.lessons} Lessons
                </span>

                <span className="flex items-center gap-2">
                  <Users size={17} />
                  {course.students}
                </span>

                <span className="flex items-center gap-2">
                  <Star size={17} />
                  {course.rating}
                </span>
              </div>
            </div>

            {/* ENROLL CARD */}

            <div className="rounded-2xl bg-white p-6 text-slate-950 shadow-2xl">
              <div className="flex h-48 items-center justify-center rounded-xl bg-slate-100">
                <Code2
                  size={64}
                  strokeWidth={1.3}
                />
              </div>

              <div className="mt-6">
                <div className="flex items-end gap-3">
                  <span className="text-3xl font-bold">
                    {course.price}
                  </span>

                  <span className="pb-1 text-sm text-slate-400 line-through">
                    {course.oldPrice}
                  </span>
                </div>

                <p className="mt-2 text-sm text-slate-500">
                  One-time course enrollment
                </p>
              </div>

              <Link
                href={`/academy/enroll/${slug}`}
                className="mt-6 flex w-full items-center justify-center gap-2 rounded-xl bg-slate-950 py-3.5 font-semibold text-white hover:bg-slate-800"
              >
                Enroll Now
                <ArrowRight size={18} />
              </Link>

              <div className="mt-6 space-y-3 text-sm text-slate-600">
                <div className="flex items-center gap-3">
                  <CheckCircle2 size={17} />
                  Lifetime course access
                </div>

                <div className="flex items-center gap-3">
                  <CheckCircle2 size={17} />
                  Practical projects
                </div>

                <div className="flex items-center gap-3">
                  <CheckCircle2 size={17} />
                  Certificate included
                </div>

                <div className="flex items-center gap-3">
                  <CheckCircle2 size={17} />
                  STACKRA learning support
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* COURSE CONTENT */}

      <section className="mx-auto max-w-7xl px-6 py-16 lg:px-8">
        <div className="grid gap-14 lg:grid-cols-[1fr_350px]">
          <div>
            {/* WHAT YOU LEARN */}

            <section>
              <h2 className="text-3xl font-bold">
                What you'll learn
              </h2>

              <div className="mt-7 grid gap-4 sm:grid-cols-2">
                {course.learn.map((item) => (
                  <div
                    key={item}
                    className="flex gap-3 rounded-xl border border-slate-200 p-4"
                  >
                    <CheckCircle2
                      size={20}
                      className="mt-0.5 shrink-0"
                    />

                    <span className="text-sm leading-6 text-slate-700">
                      {item}
                    </span>
                  </div>
                ))}
              </div>
            </section>

            {/* CURRICULUM */}

            <section className="mt-16">
              <h2 className="text-3xl font-bold">
                Course Curriculum
              </h2>

              <p className="mt-3 text-slate-500">
                {course.modules.length} modules •{" "}
                {course.lessons} lessons
              </p>

              <div className="mt-7 overflow-hidden rounded-2xl border border-slate-200">
                {course.modules.map((module, index) => {
                  const isOpen = openModule === index;

                  return (
                    <div
                      key={module.title}
                      className="border-b border-slate-200 last:border-b-0"
                    >
                      <button
                        type="button"
                        onClick={() =>
                          setOpenModule(
                            isOpen ? -1 : index
                          )
                        }
                        className="flex w-full items-center justify-between gap-5 bg-white p-5 text-left hover:bg-slate-50"
                      >
                        <div>
                          <p className="text-sm font-bold">
                            {module.title}
                          </p>

                          <p className="mt-1 text-xs text-slate-500">
                            {module.lessons.length} lessons
                          </p>
                        </div>

                        <ChevronDown
                          size={19}
                          className={`shrink-0 transition ${
                            isOpen
                              ? "rotate-180"
                              : ""
                          }`}
                        />
                      </button>

                      {isOpen && (
                        <div className="bg-slate-50 px-5 pb-5">
                          <div className="space-y-2">
                            {module.lessons.map(
                              (lesson, lessonIndex) => (
                                <div
                                  key={lesson}
                                  className="flex items-center gap-3 rounded-lg bg-white px-4 py-3 text-sm"
                                >
                                  <PlayCircle
                                    size={17}
                                    className="shrink-0 text-slate-400"
                                  />

                                  <span className="flex-1 text-slate-700">
                                    {lessonIndex + 1}.{" "}
                                    {lesson}
                                  </span>
                                </div>
                              )
                            )}
                          </div>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </section>

            {/* REQUIREMENTS */}

            <section className="mt-16">
              <h2 className="text-3xl font-bold">
                Requirements
              </h2>

              <div className="mt-6 space-y-3">
                {course.requirements.map(
                  (requirement) => (
                    <div
                      key={requirement}
                      className="flex items-center gap-3 text-slate-600"
                    >
                      <CheckCircle2 size={18} />
                      {requirement}
                    </div>
                  )
                )}
              </div>
            </section>

            {/* CERTIFICATE */}

            <section className="mt-16 rounded-2xl border border-slate-200 bg-slate-50 p-8">
              <div className="flex gap-5">
                <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl bg-slate-950 text-white">
                  <Award size={27} />
                </div>

                <div>
                  <h2 className="text-2xl font-bold">
                    Earn a STACKRA Certificate
                  </h2>

                  <p className="mt-3 leading-7 text-slate-600">
                    Complete the course, projects and
                    required assessments to receive a
                    STACKRA Academy certificate of
                    completion.
                  </p>
                </div>
              </div>
            </section>
          </div>

          {/* SIDEBAR */}

          <aside className="hidden lg:block">
            <div className="sticky top-28 rounded-2xl border border-slate-200 bg-white p-6">
              <h3 className="text-lg font-bold">
                Course Includes
              </h3>

              <div className="mt-6 space-y-5">
                <div className="flex items-center gap-3">
                  <Clock3
                    size={19}
                    className="text-slate-500"
                  />

                  <div>
                    <p className="text-sm font-semibold">
                      {course.duration}
                    </p>

                    <p className="text-xs text-slate-500">
                      Total learning time
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <BookOpen
                    size={19}
                    className="text-slate-500"
                  />

                  <div>
                    <p className="text-sm font-semibold">
                      {course.lessons} Lessons
                    </p>

                    <p className="text-xs text-slate-500">
                      Structured curriculum
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <Code2
                    size={19}
                    className="text-slate-500"
                  />

                  <div>
                    <p className="text-sm font-semibold">
                      Practical Projects
                    </p>

                    <p className="text-xs text-slate-500">
                      Build while learning
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <Award
                    size={19}
                    className="text-slate-500"
                  />

                  <div>
                    <p className="text-sm font-semibold">
                      Certificate
                    </p>

                    <p className="text-xs text-slate-500">
                      After completion
                    </p>
                  </div>
                </div>
              </div>

              <Link
                href={`/academy/enroll/${slug}`}
                className="mt-8 flex w-full items-center justify-center gap-2 rounded-xl bg-slate-950 py-3.5 font-semibold text-white hover:bg-slate-800"
              >
                Enroll Now
                <ArrowRight size={18} />
              </Link>
            </div>
          </aside>
        </div>
      </section>

      {/* FOOTER */}

      <footer className="border-t border-slate-200">
        <div className="mx-auto max-w-7xl px-6 py-8 text-sm text-slate-500 lg:px-8">
          © {new Date().getFullYear()} STACKRA TECHNOLOGIES.
          All rights reserved.
        </div>
      </footer>
    </main>
  );
}
