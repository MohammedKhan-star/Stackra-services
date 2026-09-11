"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import {
  Award,
  BookOpen,
  ChevronRight,
  Clock3,
  Code2,
  Database,
  GraduationCap,
  LayoutDashboard,
  Laptop,
  LogOut,
  Menu,
  PlayCircle,
  Settings,
  ShieldCheck,
  Sparkles,
  Trophy,
  User,
  X,
} from "lucide-react";

function getCourseIcon(category) {
  if (category === "AI & Machine Learning") {
    return Sparkles;
  }

  if (category === "Database") {
    return Database;
  }

  if (category === "Cyber Security") {
    return ShieldCheck;
  }

  if (category === "Programming") {
    return Code2;
  }

  if (category === "Web Development") {
    return Laptop;
  }

  return BookOpen;
}

function formatDate(date) {
  if (!date) {
    return "";
  }

  return new Date(date).toLocaleDateString("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

export default function AcademyDashboardPage() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [loggingOut, setLoggingOut] = useState(false);

  const [student, setStudent] = useState(null);
  const [statistics, setStatistics] = useState({
    enrolledCourses: 0,
    averageProgress: 0,
    lessonsCompleted: 0,
    totalLessons: 0,
    certificates: 0,
    completedCourses: 0,
  });

  const [courses, setCourses] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    const loadDashboard = async () => {
      try {
        setLoading(true);
        setError("");

        const response = await fetch(
          "/api/academy/dashboard",
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
            cache: "no-store",
          }
        );

        const data = await response.json();

        if (response.status === 401) {
          window.location.href =
            "/academy/login?redirect=/academy/dashboard";
          return;
        }

        if (!response.ok) {
          throw new Error(
            data.message || "Unable to load dashboard."
          );
        }

        setStudent(data.student);
        setStatistics(data.statistics);
        setCourses(data.courses || []);
      } catch (dashboardError) {
        console.error(
          "Dashboard loading error:",
          dashboardError
        );

        setError(
          dashboardError.message ||
            "Unable to load your dashboard."
        );
      } finally {
        setLoading(false);
      }
    };

    loadDashboard();
  }, []);

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

      await fetch("/api/academy/auth/logout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      });
    } catch (logoutError) {
      console.error("Logout error:", logoutError);
    } finally {
      window.location.href = "/academy/login";
    }
  };

  const recentCourses = useMemo(() => {
    return courses.slice(0, 3);
  }, [courses]);

  const initials = student?.fullName
    ? student.fullName
        .split(" ")
        .filter(Boolean)
        .slice(0, 2)
        .map((name) => name[0])
        .join("")
        .toUpperCase()
    : "ST";

  return (
    <div className="min-h-screen bg-slate-950 text-white">
      {/* Mobile Overlay */}
      {sidebarOpen && (
        <button
          type="button"
          aria-label="Close sidebar"
          onClick={closeSidebar}
          className="fixed inset-0 z-40 bg-black/60 lg:hidden"
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed left-0 top-0 z-50 flex h-screen w-72 flex-col border-r border-white/10 bg-slate-950 transition-transform duration-300 ${
          sidebarOpen
            ? "translate-x-0"
            : "-translate-x-full lg:translate-x-0"
        }`}
      >
        {/* Logo */}
        <div className="flex h-20 items-center justify-between border-b border-white/10 px-6">
          <Link
            href="/academy"
            className="flex items-center gap-3"
          >
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-blue-500 to-cyan-400">
              <BookOpen className="h-5 w-5" />
            </div>

            <div>
              <div className="text-lg font-bold">
                STACKRA
              </div>

              <div className="text-xs font-semibold tracking-wider text-cyan-400">
                ACADEMY
              </div>
            </div>
          </Link>

          <button
            type="button"
            onClick={closeSidebar}
            className="rounded-lg p-2 text-slate-400 hover:bg-white/5 hover:text-white lg:hidden"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Student Profile */}
        <div className="border-b border-white/10 p-5">
          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-full bg-gradient-to-br from-blue-500 to-cyan-400 font-bold">
              {initials}
            </div>

            <div className="min-w-0">
              <p className="truncate text-sm font-semibold">
                {loading
                  ? "Loading..."
                  : student?.fullName || "Student"}
              </p>

              <p className="truncate text-xs text-slate-500">
                Academy Student
              </p>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 space-y-2 overflow-y-auto p-4">
          <p className="mb-3 px-3 text-xs font-semibold uppercase tracking-wider text-slate-600">
            Learning
          </p>

          <Link
            href="/academy/dashboard"
            onClick={closeSidebar}
            className="flex items-center gap-3 rounded-xl bg-blue-500/10 px-4 py-3 text-sm font-medium text-blue-400"
          >
            <LayoutDashboard className="h-5 w-5" />
            Dashboard
          </Link>

          <Link
            href="/academy/courses"
            onClick={closeSidebar}
            className="flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium text-slate-400 transition hover:bg-white/5 hover:text-white"
          >
            <BookOpen className="h-5 w-5" />
            Browse Courses
          </Link>

          <Link
            href="/academy/dashboard/certificates"
            onClick={closeSidebar}
            className="flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium text-slate-400 transition hover:bg-white/5 hover:text-white"
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
            className="flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium text-slate-400 transition hover:bg-white/5 hover:text-white"
          >
            <User className="h-5 w-5" />
            My Profile
          </Link>

          <Link
            href="/academy/dashboard/settings"
            onClick={closeSidebar}
            className="flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium text-slate-400 transition hover:bg-white/5 hover:text-white"
          >
            <Settings className="h-5 w-5" />
            Settings
          </Link>
        </nav>

        {/* Logout */}
        <div className="border-t border-white/10 p-4">
          <button
            type="button"
            onClick={handleLogout}
            disabled={loggingOut}
            className="flex w-full items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium text-slate-400 transition hover:bg-red-500/10 hover:text-red-400 disabled:opacity-50"
          >
            <LogOut className="h-5 w-5" />

            {loggingOut ? "Logging out..." : "Logout"}
          </button>
        </div>
      </aside>

      {/* Main */}
      <div className="lg:pl-72">
        {/* Topbar */}
        <header className="sticky top-0 z-30 border-b border-white/10 bg-slate-950/90 backdrop-blur-xl">
          <div className="flex h-20 items-center justify-between px-5 sm:px-8">
            <button
              type="button"
              onClick={() => setSidebarOpen(true)}
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
                  {student?.fullName
                    ? `Welcome, ${student.fullName}`
                    : "Welcome back"}
                </p>

                <p className="text-xs text-slate-500">
                  Keep learning and building.
                </p>
              </div>

              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-blue-500 to-cyan-400 text-sm font-bold">
                {initials}
              </div>
            </div>
          </div>
        </header>

        {/* Content */}
        <main className="px-5 py-8 sm:px-8">
          <div className="mx-auto max-w-7xl">
            {/* Error */}
            {error && (
              <div className="mb-6 rounded-2xl border border-red-400/20 bg-red-500/10 p-5">
                <p className="text-sm font-semibold text-red-300">
                  {error}
                </p>

                <button
                  type="button"
                  onClick={() => window.location.reload()}
                  className="mt-3 rounded-lg bg-red-500/20 px-4 py-2 text-xs font-bold text-red-200 hover:bg-red-500/30"
                >
                  Try Again
                </button>
              </div>
            )}

            {/* Welcome */}
            <section className="relative overflow-hidden rounded-3xl border border-blue-400/10 bg-gradient-to-br from-blue-600/20 via-slate-900 to-cyan-500/10 p-7 sm:p-9">
              <div className="absolute -right-20 -top-20 h-60 w-60 rounded-full bg-blue-500/10 blur-3xl" />

              <div className="relative">
                <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-blue-400/20 bg-blue-500/10 px-3 py-1.5 text-xs font-medium text-blue-300">
                  <ShieldCheck className="h-4 w-4" />
                  STACKRA Academy
                </div>

                <h2 className="max-w-2xl text-3xl font-bold leading-tight sm:text-4xl">
                  Welcome back
                  {student?.fullName
                    ? `, ${student.fullName.split(" ")[0]}`
                    : ""}
                  ! 👋
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

            {/* Statistics */}
            <section className="mt-6 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
              <StatCard
                icon={BookOpen}
                title="Enrolled Courses"
                value={statistics.enrolledCourses}
                description="Active learning"
              />

              <StatCard
                icon={Trophy}
                title="Average Progress"
                value={`${statistics.averageProgress}%`}
                description="Across active courses"
              />

              <StatCard
                icon={PlayCircle}
                title="Lessons Completed"
                value={statistics.lessonsCompleted}
                description={`of ${statistics.totalLessons} lessons`}
              />

              <StatCard
                icon={Award}
                title="Certificates"
                value={statistics.certificates}
                description={
                  statistics.certificates > 0
                    ? "Certificates earned"
                    : "Earn your first one"
                }
              />
            </section>

            {/* Main Grid */}
            <div className="mt-8 grid gap-8 xl:grid-cols-[1fr_360px]">
              {/* Courses */}
              <section>
                <div className="mb-5 flex items-center justify-between">
                  <div>
                    <h2 className="text-xl font-bold">
                      Continue Learning
                    </h2>

                    <p className="mt-1 text-sm text-slate-500">
                      Your enrolled courses.
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

                {loading ? (
                  <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-8 text-center">
                    <p className="text-sm text-slate-500">
                      Loading your courses...
                    </p>
                  </div>
                ) : recentCourses.length === 0 ? (
                  <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-8 text-center">
                    <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-500/10 text-blue-400">
                      <GraduationCap className="h-7 w-7" />
                    </div>

                    <h3 className="mt-5 text-lg font-bold">
                      No courses yet
                    </h3>

                    <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-slate-500">
                      You haven't enrolled in a course yet. Explore
                      STACKRA Academy and choose your first course.
                    </p>

                    <Link
                      href="/academy/courses"
                      className="mt-6 inline-flex items-center gap-2 rounded-xl bg-blue-600 px-5 py-3 text-sm font-semibold hover:bg-blue-500"
                    >
                      Browse Courses
                      <ChevronRight className="h-4 w-4" />
                    </Link>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {recentCourses.map((course) => {
                      const Icon = getCourseIcon(course.category);

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

                                <span
                                  className={`w-fit rounded-full px-3 py-1 text-xs ${
                                    course.status === "completed"
                                      ? "bg-green-500/10 text-green-400"
                                      : course.status === "active"
                                        ? "bg-blue-500/10 text-blue-400"
                                        : "bg-yellow-500/10 text-yellow-400"
                                  }`}
                                >
                                  {course.status}
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
                                <div className="flex flex-wrap items-center gap-4 text-xs text-slate-500">
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
                )}
              </section>

              {/* Right Column */}
              <aside className="space-y-6">
                {/* Progress */}
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
                      {statistics.averageProgress}%
                    </div>
                  </div>

                  <div className="mt-6 space-y-3">
                    <div className="flex justify-between text-xs">
                      <span className="text-slate-500">
                        Active courses
                      </span>

                      <span>
                        {statistics.enrolledCourses}
                      </span>
                    </div>

                    <div className="flex justify-between text-xs">
                      <span className="text-slate-500">
                        Lessons completed
                      </span>

                      <span>
                        {statistics.lessonsCompleted}
                      </span>
                    </div>

                    <div className="flex justify-between text-xs">
                      <span className="text-slate-500">
                        Completed courses
                      </span>

                      <span>
                        {statistics.completedCourses}
                      </span>
                    </div>

                    <div className="flex justify-between text-xs">
                      <span className="text-slate-500">
                        Certificates
                      </span>

                      <span>
                        {statistics.certificates}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Recent Enrollment */}
                {courses.length > 0 && (
                  <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-6">
                    <h3 className="font-semibold">
                      Recent Enrollment
                    </h3>

                    <p className="mt-1 text-xs text-slate-500">
                      Your latest course
                    </p>

                    <div className="mt-5 rounded-xl bg-white/[0.03] p-4">
                      <p className="text-sm font-semibold">
                        {courses[0].title}
                      </p>

                      <p className="mt-2 text-xs text-slate-500">
                        Enrolled{" "}
                        {formatDate(courses[0].enrolledAt)}
                      </p>

                      <div className="mt-4 h-1.5 overflow-hidden rounded-full bg-slate-800">
                        <div
                          className="h-full rounded-full bg-blue-500"
                          style={{
                            width: `${courses[0].progress}%`,
                          }}
                        />
                      </div>

                      <p className="mt-2 text-right text-xs text-blue-400">
                        {courses[0].progress}% complete
                      </p>
                    </div>
                  </div>
                )}

                {/* Certificate */}
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

        {/* Footer */}
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
