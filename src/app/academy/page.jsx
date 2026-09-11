
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
              href="/academy/login"
              className="hidden rounded-lg px-4 py-2 text-sm font-semibold text-slate-700 transition hover:bg-slate-100 sm:block"
            >
              Login
            </Link>

            <Link
              href="/academy/register"
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
