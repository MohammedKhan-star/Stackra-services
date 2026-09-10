"use client";

import Link from "next/link";
import {
  ArrowRight,
  BookOpen,
  Brain,
  Code2,
  Database,
  GraduationCap,
  Laptop,
  PlayCircle,
  ShieldCheck,
  Sparkles,
  Trophy,
  Users,
} from "lucide-react";

const categories = [
  {
    title: "Programming",
    description: "Master programming from fundamentals to advanced concepts.",
    icon: Code2,
  },
  {
    title: "Web Development",
    description: "Build modern websites and full-stack applications.",
    icon: Laptop,
  },
  {
    title: "AI & Machine Learning",
    description: "Learn AI, machine learning, automation and intelligent systems.",
    icon: Brain,
  },
  {
    title: "Database",
    description: "Learn SQL, MongoDB, database design and management.",
    icon: Database,
  },
  {
    title: "Cyber Security",
    description: "Understand security, networks and modern protection techniques.",
    icon: ShieldCheck,
  },
  {
    title: "Business & Technology",
    description: "Develop technology and business skills for the modern workplace.",
    icon: Trophy,
  },
];

const courses = [
  {
    title: "Full Stack Web Development",
    description:
      "Learn HTML, CSS, JavaScript, React, Next.js, Node.js, APIs and MongoDB.",
    level: "Beginner to Advanced",
    lessons: "120+ Lessons",
    category: "Web Development",
  },
  {
    title: "JavaScript Mastery",
    description:
      "Build a strong foundation in modern JavaScript and advanced programming concepts.",
    level: "Beginner to Advanced",
    lessons: "80+ Lessons",
    category: "Programming",
  },
  {
    title: "AI & Machine Learning",
    description:
      "Understand artificial intelligence, machine learning and real-world AI applications.",
    level: "Intermediate",
    lessons: "90+ Lessons",
    category: "AI & ML",
  },
  {
    title: "Next.js Development",
    description:
      "Build production-ready modern web applications using Next.js and React.",
    level: "Intermediate to Advanced",
    lessons: "70+ Lessons",
    category: "Web Development",
  },
];

export default function AcademyPage() {
  return (
    <main className="min-h-screen bg-white text-slate-900">
      {/* NAVBAR */}
      <nav className="sticky top-0 z-50 border-b border-slate-200 bg-white/90 backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4 lg:px-8">
          <Link href="/academy" className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-slate-950 text-white">
              <GraduationCap size={24} />
            </div>

            <div>
              <div className="text-lg font-bold tracking-tight">
                STACKRA
              </div>
              <div className="text-xs font-medium uppercase tracking-[0.2em] text-slate-500">
                Academy
              </div>
            </div>
          </Link>

          <div className="hidden items-center gap-8 md:flex">
            <Link
              href="/academy"
              className="text-sm font-medium text-slate-900"
            >
              Home
            </Link>

            <Link
              href="/academy/courses"
              className="text-sm font-medium text-slate-600 transition hover:text-slate-950"
            >
              Courses
            </Link>

            <Link
              href="/academy/categories"
              className="text-sm font-medium text-slate-600 transition hover:text-slate-950"
            >
              Categories
            </Link>

            <Link
              href="/academy/about"
              className="text-sm font-medium text-slate-600 transition hover:text-slate-950"
            >
              About
            </Link>
          </div>

          <div className="flex items-center gap-3">
            <Link
              href="/login"
              className="hidden rounded-lg px-4 py-2 text-sm font-semibold text-slate-700 transition hover:bg-slate-100 sm:block"
            >
              Login
            </Link>

            <Link
              href="/register"
              className="rounded-lg bg-slate-950 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-slate-800"
            >
              Get Started
            </Link>
          </div>
        </div>
      </nav>

      {/* HERO */}
      <section className="relative overflow-hidden bg-slate-950">
        <div className="absolute inset-0">
          <div className="absolute left-1/4 top-0 h-96 w-96 rounded-full bg-blue-500/20 blur-3xl" />
          <div className="absolute right-0 top-1/3 h-96 w-96 rounded-full bg-purple-500/20 blur-3xl" />
        </div>

        <div className="relative mx-auto grid max-w-7xl items-center gap-16 px-6 py-24 lg:grid-cols-2 lg:px-8 lg:py-32">
          <div>
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-slate-300">
              <Sparkles size={16} />
              AI-Powered Technology Learning
            </div>

            <h1 className="max-w-4xl text-5xl font-bold leading-tight tracking-tight text-white sm:text-6xl lg:text-7xl">
              Learn Technology.
              <span className="block text-slate-400">
                Build the Future.
              </span>
            </h1>

            <p className="mt-7 max-w-2xl text-lg leading-8 text-slate-300">
              Master modern technology through practical courses, real-world
              projects and AI-powered learning with STACKRA Academy.
            </p>

            <div className="mt-9 flex flex-col gap-4 sm:flex-row">
              <Link
                href="/academy/courses"
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-white px-6 py-3.5 font-semibold text-slate-950 transition hover:bg-slate-200"
              >
                Explore Courses
                <ArrowRight size={18} />
              </Link>

              <Link
                href="/register"
                className="inline-flex items-center justify-center gap-2 rounded-xl border border-white/20 bg-white/5 px-6 py-3.5 font-semibold text-white transition hover:bg-white/10"
              >
                <PlayCircle size={18} />
                Start Learning
              </Link>
            </div>

            <div className="mt-12 grid max-w-xl grid-cols-3 gap-6 border-t border-white/10 pt-8">
              <div>
                <div className="text-2xl font-bold text-white">50+</div>
                <div className="mt-1 text-sm text-slate-400">Courses</div>
              </div>

              <div>
                <div className="text-2xl font-bold text-white">1000+</div>
                <div className="mt-1 text-sm text-slate-400">Lessons</div>
              </div>

              <div>
                <div className="text-2xl font-bold text-white">24/7</div>
                <div className="mt-1 text-sm text-slate-400">Learning</div>
              </div>
            </div>
          </div>

          {/* HERO CARD */}
          <div className="relative">
            <div className="rounded-3xl border border-white/10 bg-white/5 p-5 shadow-2xl backdrop-blur-xl">
              <div className="rounded-2xl bg-white p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-slate-500">
                      Continue Learning
                    </p>

                    <h3 className="mt-1 text-xl font-bold text-slate-950">
                      Full Stack Development
                    </h3>
                  </div>

                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-slate-950 text-white">
                    <Code2 size={22} />
                  </div>
                </div>

                <div className="mt-8">
                  <div className="mb-2 flex justify-between text-sm">
                    <span className="font-medium text-slate-600">
                      Course Progress
                    </span>
                    <span className="font-bold text-slate-950">68%</span>
                  </div>

                  <div className="h-2 overflow-hidden rounded-full bg-slate-200">
                    <div className="h-full w-[68%] rounded-full bg-slate-950" />
                  </div>
                </div>

                <div className="mt-8 grid grid-cols-2 gap-4">
                  <div className="rounded-xl bg-slate-100 p-4">
                    <BookOpen size={20} />
                    <p className="mt-3 text-lg font-bold">42</p>
                    <p className="text-sm text-slate-500">Lessons</p>
                  </div>

                  <div className="rounded-xl bg-slate-100 p-4">
                    <Trophy size={20} />
                    <p className="mt-3 text-lg font-bold">8</p>
                    <p className="text-sm text-slate-500">Projects</p>
                  </div>
                </div>

                <button className="mt-6 flex w-full items-center justify-center gap-2 rounded-xl bg-slate-950 py-3 font-semibold text-white">
                  Continue Learning
                  <ArrowRight size={17} />
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CATEGORIES */}
      <section className="mx-auto max-w-7xl px-6 py-24 lg:px-8">
        <div className="max-w-2xl">
          <p className="text-sm font-bold uppercase tracking-widest text-slate-500">
            Explore
          </p>

          <h2 className="mt-3 text-4xl font-bold tracking-tight">
            Learn what matters.
          </h2>

          <p className="mt-4 text-lg leading-8 text-slate-600">
            Choose a technology path and develop practical skills that you can
            use in real projects.
          </p>
        </div>

        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {categories.map((category) => {
            const Icon = category.icon;

            return (
              <Link
                key={category.title}
                href="/academy/courses"
                className="group rounded-2xl border border-slate-200 bg-white p-6 transition duration-300 hover:-translate-y-1 hover:border-slate-400 hover:shadow-xl"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-slate-100 transition group-hover:bg-slate-950 group-hover:text-white">
                  <Icon size={22} />
                </div>

                <h3 className="mt-6 text-xl font-bold">
                  {category.title}
                </h3>

                <p className="mt-3 leading-7 text-slate-600">
                  {category.description}
                </p>

                <div className="mt-5 flex items-center gap-2 text-sm font-semibold">
                  Explore
                  <ArrowRight
                    size={16}
                    className="transition group-hover:translate-x-1"
                  />
                </div>
              </Link>
            );
          })}
        </div>
      </section>

      {/* FEATURED COURSES */}
      <section className="bg-slate-50">
        <div className="mx-auto max-w-7xl px-6 py-24 lg:px-8">
          <div className="flex flex-col justify-between gap-6 sm:flex-row sm:items-end">
            <div>
              <p className="text-sm font-bold uppercase tracking-widest text-slate-500">
                Featured Courses
              </p>

              <h2 className="mt-3 text-4xl font-bold tracking-tight">
                Start building real skills.
              </h2>
            </div>

            <Link
              href="/academy/courses"
              className="inline-flex items-center gap-2 font-semibold"
            >
              View All Courses
              <ArrowRight size={17} />
            </Link>
          </div>

          <div className="mt-12 grid gap-6 md:grid-cols-2">
            {courses.map((course) => (
              <Link
                key={course.title}
                href="/academy/courses"
                className="group overflow-hidden rounded-2xl border border-slate-200 bg-white transition duration-300 hover:-translate-y-1 hover:shadow-xl"
              >
                <div className="h-2 bg-slate-950" />

                <div className="p-7">
                  <div className="flex items-center justify-between gap-4">
                    <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold">
                      {course.category}
                    </span>

                    <BookOpen size={20} className="text-slate-400" />
                  </div>

                  <h3 className="mt-6 text-2xl font-bold">
                    {course.title}
                  </h3>

                  <p className="mt-3 leading-7 text-slate-600">
                    {course.description}
                  </p>

                  <div className="mt-6 flex flex-wrap gap-3 text-sm text-slate-500">
                    <span>{course.level}</span>
                    <span>•</span>
                    <span>{course.lessons}</span>
                  </div>

                  <div className="mt-7 flex items-center gap-2 font-semibold">
                    View Course
                    <ArrowRight
                      size={17}
                      className="transition group-hover:translate-x-1"
                    />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* WHY STACKRA */}
      <section className="mx-auto max-w-7xl px-6 py-24 lg:px-8">
        <div className="grid gap-16 lg:grid-cols-2 lg:items-center">
          <div>
            <p className="text-sm font-bold uppercase tracking-widest text-slate-500">
              Why STACKRA Academy
            </p>

            <h2 className="mt-3 text-4xl font-bold tracking-tight sm:text-5xl">
              Don't just learn.
              <span className="block text-slate-500">
                Build something.
              </span>
            </h2>

            <p className="mt-6 text-lg leading-8 text-slate-600">
              STACKRA Academy focuses on practical technology education.
              Learn concepts, practice them, build projects and develop
              skills that can be applied in the real world.
            </p>

            <Link
              href="/academy/about"
              className="mt-8 inline-flex items-center gap-2 rounded-xl bg-slate-950 px-6 py-3.5 font-semibold text-white"
            >
              Discover Academy
              <ArrowRight size={18} />
            </Link>
          </div>

          <div className="grid gap-5 sm:grid-cols-2">
            <div className="rounded-2xl border border-slate-200 p-6">
              <Code2 size={25} />
              <h3 className="mt-5 text-xl font-bold">Practical Learning</h3>
              <p className="mt-3 leading-7 text-slate-600">
                Learn by building projects and solving practical problems.
              </p>
            </div>

            <div className="rounded-2xl border border-slate-200 p-6">
              <Brain size={25} />
              <h3 className="mt-5 text-xl font-bold">AI-Powered</h3>
              <p className="mt-3 leading-7 text-slate-600">
                Get intelligent learning assistance and personalized guidance.
              </p>
            </div>

            <div className="rounded-2xl border border-slate-200 p-6">
              <Users size={25} />
              <h3 className="mt-5 text-xl font-bold">Student Focused</h3>
              <p className="mt-3 leading-7 text-slate-600">
                Track your learning journey from one centralized dashboard.
              </p>
            </div>

            <div className="rounded-2xl border border-slate-200 p-6">
              <GraduationCap size={25} />
              <h3 className="mt-5 text-xl font-bold">Certification</h3>
              <p className="mt-3 leading-7 text-slate-600">
                Complete your learning journey and earn STACKRA certificates.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="mx-auto max-w-7xl px-6 pb-24 lg:px-8">
        <div className="overflow-hidden rounded-3xl bg-slate-950 px-8 py-16 text-center sm:px-16">
          <Sparkles className="mx-auto text-white" size={30} />

          <h2 className="mx-auto mt-6 max-w-3xl text-4xl font-bold tracking-tight text-white sm:text-5xl">
            Your technology journey starts here.
          </h2>

          <p className="mx-auto mt-5 max-w-2xl text-lg leading-8 text-slate-400">
            Learn modern technology, build real projects and prepare yourself
            for the future.
          </p>

          <Link
            href="/academy/courses"
            className="mt-8 inline-flex items-center gap-2 rounded-xl bg-white px-7 py-3.5 font-semibold text-slate-950 transition hover:bg-slate-200"
          >
            Explore Courses
            <ArrowRight size={18} />
          </Link>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="border-t border-slate-200">
        <div className="mx-auto flex max-w-7xl flex-col gap-4 px-6 py-8 text-sm text-slate-500 sm:flex-row sm:items-center sm:justify-between lg:px-8">
          <div>
            © {new Date().getFullYear()} STACKRA TECHNOLOGIES. All rights
            reserved.
          </div>

          <div className="flex gap-6">
            <Link href="/" className="hover:text-slate-950">
              STACKRA Technologies
            </Link>

            <Link href="/academy" className="hover:text-slate-950">
              Academy
            </Link>
          </div>
        </div>
      </footer>
    </main>
  );
}
After adding it

Commit the file to GitHub and open:

https://www.stackratechnologies.com/academy

If your project already has lucide-react, this should work directly.

Next development step

After this homepage is working, don't jump to MongoDB yet.

We'll build:

/academy/courses

with:

Course search
Category filtering
Course cards
Difficulty
Lessons
Duration
Course detail navigation
Responsive mobile UI

Then we'll connect the courses to MongoDB later so you can manage them from the Academy Admin Panel.

next
Next: Build the Course Listing Page

Create:

app/academy/courses/page.jsx

This will turn Academy from a landing page into an actual learning platform.

"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import {
  ArrowRight,
  BookOpen,
  Brain,
  Code2,
  Database,
  Filter,
  Laptop,
  Search,
  ShieldCheck,
  X,
} from "lucide-react";

const courses = [
  {
    id: 1,
    title: "Full Stack Web Development",
    slug: "full-stack-web-development",
    description:
      "Learn HTML, CSS, JavaScript, React, Next.js, Node.js, APIs and MongoDB by building real applications.",
    category: "Web Development",
    level: "Beginner",
    lessons: 120,
    duration: "35 Hours",
  },
  {
    id: 2,
    title: "JavaScript Mastery",
    slug: "javascript-mastery",
    description:
      "Master modern JavaScript, ES6+, asynchronous programming, DOM, APIs and advanced concepts.",
    category: "Programming",
    level: "Intermediate",
    lessons: 80,
    duration: "24 Hours",
  },
  {
    id: 3,
    title: "React.js Development",
    slug: "react-js-development",
    description:
      "Build modern interactive web applications using React components, hooks, state and APIs.",
    category: "Web Development",
    level: "Intermediate",
    lessons: 70,
    duration: "20 Hours",
  },
  {
    id: 4,
    title: "Next.js Development",
    slug: "next-js-development",
    description:
      "Learn Next.js App Router, server components, APIs, authentication, database integration and deployment.",
    category: "Web Development",
    level: "Advanced",
    lessons: 75,
    duration: "26 Hours",
  },
  {
    id: 5,
    title: "AI & Machine Learning",
    slug: "ai-machine-learning",
    description:
      "Understand artificial intelligence, machine learning fundamentals, models, datasets and practical AI applications.",
    category: "AI & Machine Learning",
    level: "Intermediate",
    lessons: 90,
    duration: "30 Hours",
  },
  {
    id: 6,
    title: "MongoDB & Database Development",
    slug: "mongodb-database-development",
    description:
      "Learn database fundamentals, MongoDB, Mongoose, schemas, queries, relationships and APIs.",
    category: "Database",
    level: "Intermediate",
    lessons: 55,
    duration: "16 Hours",
  },
  {
    id: 7,
    title: "Node.js Backend Development",
    slug: "node-js-backend-development",
    description:
      "Build scalable backend applications using Node.js, Express, REST APIs and authentication.",
    category: "Programming",
    level: "Intermediate",
    lessons: 65,
    duration: "19 Hours",
  },
  {
    id: 8,
    title: "Cyber Security Fundamentals",
    slug: "cyber-security-fundamentals",
    description:
      "Learn cybersecurity fundamentals, networks, threats, vulnerabilities and security best practices.",
    category: "Cyber Security",
    level: "Beginner",
    lessons: 60,
    duration: "18 Hours",
  },
  {
    id: 9,
    title: "Advanced Microsoft Excel",
    slug: "advanced-microsoft-excel",
    description:
      "Master advanced Excel formulas, lookup functions, data analysis, dashboards and automation.",
    category: "Business & Technology",
    level: "Advanced",
    lessons: 50,
    duration: "14 Hours",
  },
];

const categories = [
  "All",
  "Programming",
  "Web Development",
  "AI & Machine Learning",
  "Database",
  "Cyber Security",
  "Business & Technology",
];

const categoryIcons = {
  Programming: Code2,
  "Web Development": Laptop,
  "AI & Machine Learning": Brain,
  Database: Database,
  "Cyber Security": ShieldCheck,
  "Business & Technology": BookOpen,
};

export default function CoursesPage() {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [level, setLevel] = useState("All");
  const [mobileFilter, setMobileFilter] = useState(false);

  const filteredCourses = useMemo(() => {
    return courses.filter((course) => {
      const matchesSearch =
        course.title.toLowerCase().includes(search.toLowerCase()) ||
        course.description.toLowerCase().includes(search.toLowerCase());

      const matchesCategory =
        category === "All" || course.category === category;

      const matchesLevel = level === "All" || course.level === level;

      return matchesSearch && matchesCategory && matchesLevel;
    });
  }, [search, category, level]);

  return (
    <main className="min-h-screen bg-slate-50 text-slate-950">
      {/* NAVBAR */}
      <nav className="sticky top-0 z-50 border-b border-slate-200 bg-white/95 backdrop-blur">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4 lg:px-8">
          <Link href="/academy" className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-slate-950 text-white">
              <BookOpen size={21} />
            </div>

            <div>
              <div className="font-bold tracking-tight">STACKRA</div>
              <div className="text-[10px] font-semibold uppercase tracking-[0.2em] text-slate-500">
                Academy
              </div>
            </div>
          </Link>

          <div className="hidden items-center gap-8 md:flex">
            <Link
              href="/academy"
              className="text-sm font-medium text-slate-500 hover:text-slate-950"
            >
              Home
            </Link>

            <Link
              href="/academy/courses"
              className="text-sm font-semibold text-slate-950"
            >
              Courses
            </Link>

            <Link
              href="/academy/categories"
              className="text-sm font-medium text-slate-500 hover:text-slate-950"
            >
              Categories
            </Link>
          </div>

          <Link
            href="/register"
            className="rounded-xl bg-slate-950 px-5 py-2.5 text-sm font-semibold text-white"
          >
            Get Started
          </Link>
        </div>
      </nav>

      {/* HEADER */}
      <section className="border-b border-slate-200 bg-white">
        <div className="mx-auto max-w-7xl px-6 py-16 lg:px-8">
          <div className="max-w-3xl">
            <p className="text-sm font-bold uppercase tracking-[0.2em] text-slate-500">
              STACKRA Academy
            </p>

            <h1 className="mt-4 text-4xl font-bold tracking-tight sm:text-5xl">
              Explore our courses.
            </h1>

            <p className="mt-5 text-lg leading-8 text-slate-600">
              Learn modern technology through structured lessons, practical
              projects and hands-on learning.
            </p>
          </div>

          {/* SEARCH */}
          <div className="relative mt-10 max-w-3xl">
            <Search
              size={21}
              className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400"
            />

            <input
              type="text"
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder="Search courses..."
              className="w-full rounded-2xl border border-slate-200 bg-slate-50 py-4 pl-14 pr-12 outline-none transition focus:border-slate-950 focus:bg-white"
            />

            {search && (
              <button
                onClick={() => setSearch("")}
                className="absolute right-4 top-1/2 -translate-y-1/2 rounded-full p-2 hover:bg-slate-200"
              >
                <X size={17} />
              </button>
            )}
          </div>
        </div>
      </section>

      {/* CONTENT */}
      <section className="mx-auto max-w-7xl px-6 py-12 lg:px-8">
        {/* MOBILE FILTER */}
        <button
          onClick={() => setMobileFilter(!mobileFilter)}
          className="mb-6 flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm font-semibold lg:hidden"
        >
          <Filter size={17} />
          Filters
        </button>

        <div className="grid gap-10 lg:grid-cols-[250px_1fr]">
          {/* FILTERS */}
          <aside
            className={`${
              mobileFilter ? "block" : "hidden"
            } rounded-2xl border border-slate-200 bg-white p-6 lg:block`}
          >
            <div>
              <h3 className="font-bold">Categories</h3>

              <div className="mt-4 space-y-1">
                {categories.map((item) => (
                  <button
                    key={item}
                    onClick={() => setCategory(item)}
                    className={`w-full rounded-lg px-3 py-2.5 text-left text-sm transition ${
                      category === item
                        ? "bg-slate-950 font-semibold text-white"
                        : "text-slate-600 hover:bg-slate-100"
                    }`}
                  >
                    {item}
                  </button>
                ))}
              </div>
            </div>

            <div className="mt-8 border-t border-slate-200 pt-8">
              <h3 className="font-bold">Level</h3>

              <div className="mt-4 space-y-1">
                {["All", "Beginner", "Intermediate", "Advanced"].map(
                  (item) => (
                    <button
                      key={item}
                      onClick={() => setLevel(item)}
                      className={`w-full rounded-lg px-3 py-2.5 text-left text-sm transition ${
                        level === item
                          ? "bg-slate-950 font-semibold text-white"
                          : "text-slate-600 hover:bg-slate-100"
                      }`}
                    >
                      {item}
                    </button>
                  )
                )}
              </div>
            </div>
          </aside>

          {/* COURSE RESULTS */}
          <div>
            <div className="mb-6 flex items-center justify-between">
              <p className="text-sm text-slate-500">
                Showing{" "}
                <span className="font-semibold text-slate-950">
                  {filteredCourses.length}
                </span>{" "}
                courses
              </p>
            </div>

            {filteredCourses.length === 0 ? (
              <div className="rounded-2xl border border-slate-200 bg-white p-16 text-center">
                <Search className="mx-auto text-slate-400" size={32} />

                <h3 className="mt-5 text-xl font-bold">
                  No courses found
                </h3>

                <p className="mt-2 text-slate-500">
                  Try a different search term or category.
                </p>

                <button
                  onClick={() => {
                    setSearch("");
                    setCategory("All");
                    setLevel("All");
                  }}
                  className="mt-6 rounded-xl bg-slate-950 px-5 py-3 text-sm font-semibold text-white"
                >
                  Clear Filters
                </button>
              </div>
            ) : (
              <div className="grid gap-6 md:grid-cols-2">
                {filteredCourses.map((course) => {
                  const Icon =
                    categoryIcons[course.category] || BookOpen;

                  return (
                    <Link
                      key={course.id}
                      href={`/academy/courses/${course.slug}`}
                      className="group overflow-hidden rounded-2xl border border-slate-200 bg-white transition duration-300 hover:-translate-y-1 hover:shadow-xl"
                    >
                      <div className="flex h-40 items-center justify-center bg-slate-950 text-white">
                        <Icon
                          size={54}
                          strokeWidth={1.4}
                          className="transition duration-300 group-hover:scale-110"
                        />
                      </div>

                      <div className="p-6">
                        <div className="flex items-center justify-between gap-3">
                          <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold">
                            {course.category}
                          </span>

                          <span className="text-xs font-medium text-slate-500">
                            {course.level}
                          </span>
                        </div>

                        <h2 className="mt-5 text-xl font-bold tracking-tight">
                          {course.title}
                        </h2>

                        <p className="mt-3 line-clamp-3 text-sm leading-6 text-slate-600">
                          {course.description}
                        </p>

                        <div className="mt-6 flex items-center gap-4 border-t border-slate-100 pt-5 text-sm text-slate-500">
                          <span>{course.lessons} Lessons</span>
                          <span>•</span>
                          <span>{course.duration}</span>
                        </div>

                        <div className="mt-6 flex items-center gap-2 text-sm font-bold">
                          View Course
                          <ArrowRight
                            size={17}
                            className="transition group-hover:translate-x-1"
                          />
                        </div>
                      </div>
                    </Link>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="mx-auto max-w-7xl px-6 pb-20 lg:px-8">
        <div className="rounded-3xl bg-slate-950 px-8 py-14 text-center text-white sm:px-16">
          <h2 className="text-3xl font-bold sm:text-4xl">
            Ready to start learning?
          </h2>

          <p className="mx-auto mt-4 max-w-2xl leading-7 text-slate-400">
            Create your STACKRA Academy account and start building your
            technology skills.
          </p>

          <Link
            href="/register"
            className="mt-7 inline-flex items-center gap-2 rounded-xl bg-white px-6 py-3.5 font-semibold text-slate-950"
          >
            Create Account
            <ArrowRight size={18} />
          </Link>
        </div>
      </section>
    </main>
  );
}
