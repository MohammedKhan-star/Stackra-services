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
      const searchText = search.toLowerCase();

      const matchesSearch =
        course.title.toLowerCase().includes(searchText) ||
        course.description.toLowerCase().includes(searchText);

      const matchesCategory =
        category === "All" || course.category === category;

      const matchesLevel =
        level === "All" || course.level === level;

      return matchesSearch && matchesCategory && matchesLevel;
    });
  }, [search, category, level]);

  const clearFilters = () => {
    setSearch("");
    setCategory("All");
    setLevel("All");
  };

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
              <div className="font-bold tracking-tight">
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
              Learn modern technology through structured lessons,
              practical projects and hands-on learning.
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
                type="button"
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
          type="button"
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
              <h3 className="font-bold">
                Categories
              </h3>

              <div className="mt-4 space-y-1">
                {categories.map((item) => (
                  <button
                    type="button"
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
              <h3 className="font-bold">
                Level
              </h3>

              <div className="mt-4 space-y-1">
                {[
                  "All",
                  "Beginner",
                  "Intermediate",
                  "Advanced",
                ].map((item) => (
                  <button
                    type="button"
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
                ))}
              </div>
            </div>
          </aside>

          {/* RESULTS */}
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
                <Search
                  className="mx-auto text-slate-400"
                  size={32}
                />

                <h3 className="mt-5 text-xl font-bold">
                  No courses found
                </h3>

                <p className="mt-2 text-slate-500">
                  Try a different search term or category.
                </p>

                <button
                  type="button"
                  onClick={clearFilters}
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
                          <span>
                            {course.lessons} Lessons
                          </span>

                          <span>•</span>

                          <span>
                            {course.duration}
                          </span>
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
            Create your STACKRA Academy account and start
            building your technology skills.
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
