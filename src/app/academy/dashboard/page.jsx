"use client";

import Link from "next/link";
import { useState } from "react";
import {
  Award,
  BookOpen,
  ChevronRight,
  Clock3,
  Code2,
  LayoutDashboard,
  LogOut,
  Menu,
  PlayCircle,
  Settings,
  ShieldCheck,
  Trophy,
  User,
  X,
} from "lucide-react";

const courses = [
  {
    id: 1,
    slug: "full-stack-web-development",
    title: "Full Stack Web Development",
    category: "Web Development",
    level: "Intermediate",
    progress: 68,
    completedLessons: 34,
    totalLessons: 50,
    duration: "24 Hours",
    icon: Code2,
  },
  {
    id: 2,
    slug: "javascript-mastery",
    title: "JavaScript Mastery",
    category: "Programming",
    level: "Intermediate",
    progress: 42,
    completedLessons: 21,
    totalLessons: 50,
    duration: "18 Hours",
    icon: Code2,
  },
  {
    id: 3,
    slug: "react-js-development",
    title: "React.js Development",
    category: "Frontend Development",
    level: "Advanced",
    progress: 15,
    completedLessons: 6,
    totalLessons: 40,
    duration: "16 Hours",
    icon: LayoutDashboard,
  },
   {
    id: 4,
    slug: "ms-office",
    title: "MS Office",
    category: "Office Productivity",
    level: "Beginner",
    progress: 0,
    completedLessons: 0,
    totalLessons: 30,
    duration: "15 Hours",
    icon: BookOpen,
  },
  {
    id: 5,
    slug: "typing-mastery",
    title: "Typing Mastery",
    category: "Computer Skills",
    level: "Beginner",
    progress: 0,
    completedLessons: 0,
    totalLessons: 20,
    duration: "10 Hours",
    icon: Code2,
  },
  {
    id: 6,
    slug: "python-programming",
    title: "Python Programming",
    category: "Programming",
    level: "Beginner",
    progress: 0,
    completedLessons: 0,
    totalLessons: 40,
    duration: "20 Hours",
    icon: Code2,
  },
];

const activities = [
  {
    title: "Completed JavaScript Functions",
    time: "Today",
  },
  {
    title: "Watched React Components lesson",
    time: "Yesterday",
  },
  {
    title: "Started Full Stack Web Development",
    time: "2 days ago",
  },
];

export default function AcademyDashboardPage() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [loggingOut, setLoggingOut] = useState(false);

  const totalCourses = courses.length;

  const averageProgress = Math.round(
    courses.reduce((sum, course) => sum + course.progress, 0) /
      totalCourses
  );

  const totalLessonsCompleted = courses.reduce(
    (sum, course) => sum + course.completedLessons,
    0
  );

  const totalLessons = courses.reduce(
    (sum, course) => sum + course.totalLessons,
    0
  );

  const closeSidebar = () => {
    setSidebarOpen(false);
  };

  const handleLogout = async () => {
    const confirmed = window.confirm(
      "Are you sure you want to logout?"
    );

    if (!confirmed) {
      return;
    }

    try {
      setLoggingOut(true);

      const response = await fetch("/api/academy/auth/logout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        console.error("Logout request failed.");
      }
    } catch (error) {
      console.error("Logout error:", error);
    } finally {
      window.location.href = "/academy/login";
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-white">
      {/* MOBILE OVERLAY */}
      {sidebarOpen && (
        <button
          type="button"
          aria-label="Close sidebar"
          onClick={closeSidebar}
          className="fixed inset-0 z-40 bg-black/60 lg:hidden"
        />
      )}

      {/* SIDEBAR */}
      <aside
        className={`fixed left-0 top-0 z-50 flex h-screen w-72 flex-col border-r border-white/10 bg-slate-950 transition-transform duration-300 ${
          sidebarOpen
            ? "translate-x-0"
            : "-translate-x-full lg:translate-x-0"
        }`}
      >
        {/* LOGO */}
        <div className="flex h-20 items-center justify-between border-b border-white/10 px-6">
          <Link
            href="/academy"
            className="flex items-center gap-3"
            onClick={closeSidebar}
          >
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-blue-500 to-cyan-400">
              <BookOpen className="h-5 w-5" />
            </div>

            <div>
              <div className="text-lg font-bold">STACKRA</div>

              <div className="text-xs font-semibold tracking-wider text-cyan-400">
                ACADEMY
              </div>
            </div>
          </Link>

          <button
            type="button"
            onClick={closeSidebar}
            aria-label="Close menu"
            className="rounded-lg p-2 text-slate-400 hover:bg-white/5 hover:text-white lg:hidden"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* STUDENT PROFILE */}
        <div className="border-b border-white/10 p-5">
          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-full bg-gradient-to-br from-blue-500 to-cyan-400 font-bold">
              SK
            </div>

            <div className="min-w-0">
              <p className="truncate text-sm font-semibold">
                Student
              </p>

              <p className="truncate text-xs text-slate-500">
                Academy Student
              </p>
            </div>
          </div>
        </div>

        {/* NAVIGATION */}
        <nav className="flex-1 space-y-2 overflow-y-auto p-4">
          <p className="mb-3 px-3 text-xs font-semibold uppercase tracking-wider text-slate-600">
            Learning
          </p>

          <Link
            href="/academy/dashboard"
            onClick={closeSidebar}
            className="flex min-h-12 items-center gap-3 rounded-xl bg-blue-500/10 px-4 py-3 text-sm font-medium text-blue-400"
          >
            <LayoutDashboard className="h-5 w-5" />
            Dashboard
          </Link>

          <Link
            href="/academy/courses"
            onClick={closeSidebar}
            className="flex min-h-12 items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium text-slate-400 transition hover:bg-white/5 hover:text-white"
          >
            <BookOpen className="h-5 w-5" />
            Browse Courses
          </Link>

          <Link
            href="/academy/dashboard/certificates"
            onClick={closeSidebar}
            className="flex min-h-12 items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium text-slate-400 transition hover:bg-white/5 hover:text-white"
          >
            <Award className="h-5 w-5" />
            Certificates
          </Link>

          <p className="mb-3 mt-8 px-3 text-xs font-semibold uppercase tracking-wider text-slate-600">
            Account
          </p>

          <Link
            href="/academy/dashboard/profile"
            onClick={closeSidebar}
            className="flex min-h-12 items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium text-slate-400 transition hover:bg-white/5 hover:text-white"
          >
            <User className="h-5 w-5" />
            My Profile
          </Link>

          <Link
            href="/academy/dashboard/settings"
            onClick={closeSidebar}
            className="flex min-h-12 items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium text-slate-400 transition hover:bg-white/5 hover:text-white"
          >
            <Settings className="h-5 w-5" />
            Settings
          </Link>
        </nav>

        {/* LOGOUT */}
        <div className="border-t border-white/10 p-4">
          <button
            type="button"
            onClick={handleLogout}
            disabled={loggingOut}
            className="flex min-h-12 w-full items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium text-slate-400 transition hover:bg-red-500/10 hover:text-red-400 disabled:cursor-not-allowed disabled:opacity-50"
          >
            <LogOut className="h-5 w-5" />

            {loggingOut ? "Logging out..." : "Logout"}
          </button>
        </div>
      </aside>

      {/* MAIN */}
      <div className="lg:pl-72">
        {/* TOPBAR */}
        <header className="sticky top-0 z-30 border-b border-white/10 bg-slate-950/90 backdrop-blur-xl">
          <div className="flex h-20 items-center justify-between px-5 sm:px-8">
            <button
              type="button"
              onClick={() => setSidebarOpen(true)}
              aria-label="Open menu"
              className="rounded-xl border border-white/10 p-2.5 text-slate-300 hover:bg-white/5 lg:hidden"
            >
              <Menu className="h-5 w-5" />
            </button>

            <div className="hidden lg:block">
              <p className="text-sm text-slate-500">
                STACKRA Academy
              </p>

              <h1 className="text-xl font-bold">
                Student Dashboard
              </h1>
            </div>

            <div className="flex items-center gap-3">
              <div className="hidden text-right sm:block">
                <p className="text-sm font-semibold">
                  Welcome back
                </p>

                <p className="text-xs text-slate-500">
                  Keep learning and building.
                </p>
              </div>

              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-blue-500 to-cyan-400 text-sm font-bold">
                SK
              </div>
            </div>
          </div>
        </header>

        {/* CONTENT */}
        <main className="px-5 py-8 sm:px-8">
          <div className="mx-auto max-w-7xl">
            {/* WELCOME */}
            <section className="relative overflow-hidden rounded-3xl border border-blue-400/10 bg-gradient-to-br from-blue-600/20 via-slate-900 to-cyan-500/10 p-7 sm:p-9">
              <div className="absolute -right-20 -top-20 h-60 w-60 rounded-full bg-blue-500/10 blur-3xl" />

              <div className="relative">
                <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-blue-400/20 bg-blue-500/10 px-3 py-1.5 text-xs font-medium text-blue-300">
                  <ShieldCheck className="h-4 w-4" />
                  STACKRA Academy
                </div>

                <h2 className="max-w-2xl text-3xl font-bold leading-tight sm:text-4xl">
                  Welcome back, Student! 👋
                </h2>

                <p className="mt-3 max-w-2xl text-sm leading-6 text-slate-400 sm:text-base">
                  Continue your learning journey, complete your
                  courses, and build the skills you need for the
                  future.
                </p>

                <Link
                  href="/academy/courses"
                  className="mt-6 inline-flex items-center gap-2 rounded-xl bg-blue-600 px-5 py-3 text-sm font-semibold transition hover:bg-blue-500"
                >
                  Explore Courses
                  <ChevronRight className="h-4 w-4" />
                </Link>
              </div>
            </section>

            {/* STATISTICS */}
            <section className="mt-6 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
              <StatCard
                icon={BookOpen}
                title="Enrolled Courses"
                value={totalCourses}
                description="Active learning"
              />

              <StatCard
                icon={Trophy}
                title="Average Progress"
                value={`${averageProgress}%`}
                description="Across your courses"
              />

              <StatCard
                icon={PlayCircle}
                title="Lessons Completed"
                value={totalLessonsCompleted}
                description={`of ${totalLessons} lessons`}
              />

              <StatCard
                icon={Award}
                title="Certificates"
                value="0"
                description="Earn your first one"
              />
            </section>

            {/* MAIN GRID */}
            <div className="mt-8 grid gap-8 xl:grid-cols-[1fr_360px]">
              {/* COURSES */}
              <section>
                <div className="mb-5 flex items-center justify-between">
                  <div>
                    <h2 className="text-xl font-bold">
                      Continue Learning
                    </h2>

                    <p className="mt-1 text-sm text-slate-500">
                      Pick up where you left off.
                    </p>
                  </div>

                  <Link
                    href="/academy/courses"
                    className="hidden items-center gap-1 text-sm font-medium text-blue-400 hover:text-blue-300 sm:flex"
                  >
                    View All
                    <ChevronRight className="h-4 w-4" />
                  </Link>
                </div>

                <div className="space-y-4">
                  {courses.map((course) => {
                    const Icon = course.icon;

                    return (
                      <div
                        key={course.id}
                        className="rounded-2xl border border-white/10 bg-white/[0.03] p-5 transition hover:border-white/20"
                      >
                        <div className="flex gap-4">
                          <div className="hidden h-14 w-14 shrink-0 items-center justify-center rounded-xl bg-blue-500/10 text-blue-400 sm:flex">
                            <Icon className="h-6 w-6" />
                          </div>

                          <div className="min-w-0 flex-1">
                            <div className="flex flex-col justify-between gap-2 sm:flex-row">
                              <div>
                                <p className="text-xs font-medium text-blue-400">
                                  {course.category}
                                </p>

                                <h3 className="mt-1 text-base font-semibold">
                                  {course.title}
                                </h3>
                              </div>

                              <span className="w-fit rounded-full bg-white/5 px-3 py-1 text-xs text-slate-400">
                                {course.level}
                              </span>
                            </div>

                            <div className="mt-5">
                              <div className="mb-2 flex items-center justify-between text-xs">
                                <span className="text-slate-500">
                                  Progress
                                </span>

                                <span className="font-semibold text-white">
                                  {course.progress}%
                                </span>
                              </div>

                              <div className="h-2 overflow-hidden rounded-full bg-slate-800">
                                <div
                                  className="h-full rounded-full bg-gradient-to-r from-blue-500 to-cyan-400 transition-all"
                                  style={{
                                    width: `${course.progress}%`,
                                  }}
                                />
                              </div>
                            </div>

                            <div className="mt-4 flex flex-wrap items-center justify-between gap-3">
                              <div className="flex items-center gap-4 text-xs text-slate-500">
                                <span>
                                  {course.completedLessons}/
                                  {course.totalLessons} lessons
                                </span>

                                <span className="flex items-center gap-1">
                                  <Clock3 className="h-3.5 w-3.5" />
                                  {course.duration}
                                </span>
                              </div>

                              <Link
                                href={`/academy/courses/${course.slug}`}
                                className="inline-flex items-center gap-1 rounded-lg bg-blue-600 px-4 py-2 text-xs font-semibold transition hover:bg-blue-500"
                              >
                                Continue
                                <ChevronRight className="h-3.5 w-3.5" />
                              </Link>
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </section>

              {/* RIGHT COLUMN */}
              <aside className="space-y-6">
                {/* PROGRESS */}
                <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-semibold">
                        Learning Progress
                      </h3>

                      <p className="mt-1 text-xs text-slate-500">
                        Overall completion
                      </p>
                    </div>

                    <div className="flex h-14 w-14 items-center justify-center rounded-full border-4 border-blue-500/30 text-sm font-bold text-blue-400">
                      {averageProgress}%
                    </div>
                  </div>

                  <div className="mt-6 space-y-3">
                    <div className="flex justify-between text-xs">
                      <span className="text-slate-500">
                        Courses
                      </span>

                      <span>{totalCourses}</span>
                    </div>

                    <div className="flex justify-between text-xs">
                      <span className="text-slate-500">
                        Lessons completed
                      </span>

                      <span>{totalLessonsCompleted}</span>
                    </div>

                    <div className="flex justify-between text-xs">
                      <span className="text-slate-500">
                        Certificates
                      </span>

                      <span>0</span>
                    </div>
                  </div>
                </div>

                {/* ACTIVITY */}
                <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-6">
                  <div>
                    <h3 className="font-semibold">
                      Recent Activity
                    </h3>

                    <p className="mt-1 text-xs text-slate-500">
                      Your latest learning activity
                    </p>
                  </div>

                  <div className="mt-5 space-y-5">
                    {activities.map((activity, index) => (
                      <div
                        key={index}
                        className="flex gap-3"
                      >
                        <div className="mt-1 h-2.5 w-2.5 shrink-0 rounded-full bg-blue-500" />

                        <div>
                          <p className="text-sm text-slate-300">
                            {activity.title}
                          </p>

                          <p className="mt-1 text-xs text-slate-600">
                            {activity.time}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* CERTIFICATE */}
                <div className="rounded-2xl border border-yellow-400/10 bg-yellow-500/[0.04] p-6">
                  <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-yellow-500/10 text-yellow-400">
                    <Award className="h-5 w-5" />
                  </div>

                  <h3 className="mt-4 font-semibold">
                    Earn Your Certificate
                  </h3>

                  <p className="mt-2 text-sm leading-6 text-slate-500">
                    Complete your courses and pass the required
                    assessments to earn a STACKRA Academy certificate.
                  </p>

                  <div className="mt-4 flex items-center gap-2 text-xs text-yellow-400">
                    <Trophy className="h-4 w-4" />
                    Keep learning!
                  </div>
                </div>
              </aside>
            </div>
          </div>
        </main>

        {/* FOOTER */}
        <footer className="border-t border-white/10 px-5 py-6 sm:px-8">
          <div className="mx-auto flex max-w-7xl flex-col justify-between gap-3 text-xs text-slate-600 sm:flex-row">
            <span>
              © {new Date().getFullYear()} STACKRA Academy
            </span>

            <span>STACKRA TECHNOLOGIES</span>
          </div>
        </footer>
      </div>
    </div>
  );
}

function StatCard({
  icon: Icon,
  title,
  value,
  description,
}) {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-5 transition hover:border-white/20">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm text-slate-500">
            {title}
          </p>

          <p className="mt-2 text-3xl font-bold">
            {value}
          </p>

          <p className="mt-1 text-xs text-slate-600">
            {description}
          </p>
        </div>

        <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-500/10 text-blue-400">
          <Icon className="h-5 w-5" />
        </div>
      </div>
    </div>
  );
}
