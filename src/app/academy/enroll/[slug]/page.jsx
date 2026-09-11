import Link from "next/link";
import { notFound } from "next/navigation";
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

export default async function EnrollmentPage({ params }) {
  const { slug } = await params;

  const course = courses[slug];

  if (!course) {
    notFound();
  }

  const Icon = getCourseIcon(course.category);

  return (
    <main className="min-h-screen bg-slate-50 text-slate-900">
      {/* Header */}
      <header className="border-b border-slate-200 bg-white">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
          <Link
            href="/academy/courses"
            className="inline-flex items-center gap-2 text-sm font-semibold text-slate-600 transition hover:text-blue-600"
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

      {/* Main */}
      <section className="mx-auto max-w-7xl px-4 py-8 sm:px-6 sm:py-12 lg:px-8">
        <div className="grid gap-8 lg:grid-cols-[1fr_400px]">
          {/* Course Information */}
          <div>
            <div className="mb-6 rounded-3xl bg-gradient-to-br from-blue-700 via-indigo-700 to-purple-800 p-6 text-white shadow-xl sm:p-10">
              <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-white/15 backdrop-blur">
                <Icon size={32} />
              </div>

              <div className="mb-4 flex flex-wrap gap-2">
                <span className="rounded-full bg-white/15 px-3 py-1 text-xs font-semibold backdrop-blur">
                  {course.category}
                </span>

                <span className="rounded-full bg-white/15 px-3 py-1 text-xs font-semibold backdrop-blur">
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
                <div className="rounded-2xl bg-white/10 p-4 backdrop-blur">
                  <Clock3 size={20} />
                  <p className="mt-2 text-xs text-blue-100">Duration</p>
                  <p className="mt-1 font-bold">{course.duration}</p>
                </div>

                <div className="rounded-2xl bg-white/10 p-4 backdrop-blur">
                  <BookOpen size={20} />
                  <p className="mt-2 text-xs text-blue-100">Lessons</p>
                  <p className="mt-1 font-bold">{course.lessons}</p>
                </div>

                <div className="rounded-2xl bg-white/10 p-4 backdrop-blur">
                  <GraduationCap size={20} />
                  <p className="mt-2 text-xs text-blue-100">Certificate</p>
                  <p className="mt-1 font-bold">Included</p>
                </div>
              </div>
            </div>

            {/* What You Will Learn */}
            <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
              <h2 className="text-2xl font-extrabold">
                What you will learn
              </h2>

              <p className="mt-2 text-sm text-slate-500">
                Practical skills designed to help you learn and build with
                confidence.
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

            {/* Included */}
            <div className="mt-6 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
              <h2 className="text-2xl font-extrabold">
                Your enrollment includes
              </h2>

              <div className="mt-6 grid gap-5 sm:grid-cols-2">
                <div className="flex gap-4">
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
                    <BookOpen size={22} />
                  </div>

                  <div>
                    <h3 className="font-bold">Structured Lessons</h3>
                    <p className="mt-1 text-sm leading-6 text-slate-500">
                      Follow a structured learning path from fundamentals to
                      practical skills.
                    </p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-purple-50 text-purple-600">
                    <Laptop size={22} />
                  </div>

                  <div>
                    <h3 className="font-bold">Practical Learning</h3>
                    <p className="mt-1 text-sm leading-6 text-slate-500">
                      Learn through exercises, examples and project-based
                      activities.
                    </p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-green-50 text-green-600">
                    <Award size={22} />
                  </div>

                  <div>
                    <h3 className="font-bold">Course Certificate</h3>
                    <p className="mt-1 text-sm leading-6 text-slate-500">
                      Earn a certificate after successfully completing the
                      course requirements.
                    </p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-orange-50 text-orange-600">
                    <Users size={22} />
                  </div>

                  <div>
                    <h3 className="font-bold">Student Dashboard</h3>
                    <p className="mt-1 text-sm leading-6 text-slate-500">
                      Access your enrolled courses and learning progress from
                      your academy dashboard.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Enrollment Card */}
          <aside className="lg:sticky lg:top-6 lg:h-fit">
            <div className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-xl">
              <div className="bg-slate-900 p-6 text-white">
                <p className="text-sm text-slate-300">Course Enrollment</p>

                <h2 className="mt-2 text-xl font-extrabold">
                  {course.title}
                </h2>
              </div>

              <div className="p-6">
                <div className="flex items-end justify-between border-b border-slate-200 pb-6">
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                      Course Fee
                    </p>

                    <p className="mt-1 text-4xl font-extrabold text-slate-900">
                      ₹{course.price.toLocaleString("en-IN")}
                    </p>
                  </div>

                  <span className="rounded-full bg-green-50 px-3 py-1 text-xs font-bold text-green-700">
                    One-time
                  </span>
                </div>

                <div className="space-y-4 py-6">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-slate-500">Course</span>
                    <span className="font-semibold text-slate-800">
                      {course.title}
                    </span>
                  </div>

                  <div className="flex items-center justify-between text-sm">
                    <span className="text-slate-500">Duration</span>
                    <span className="font-semibold text-slate-800">
                      {course.duration}
                    </span>
                  </div>

                  <div className="flex items-center justify-between text-sm">
                    <span className="text-slate-500">Lessons</span>
                    <span className="font-semibold text-slate-800">
                      {course.lessons}
                    </span>
                  </div>

                  <div className="flex items-center justify-between text-sm">
                    <span className="text-slate-500">Certificate</span>
                    <span className="font-semibold text-green-600">
                      Included
                    </span>
                  </div>
                </div>

                <div className="rounded-2xl bg-blue-50 p-4">
                  <p className="text-sm font-bold text-blue-900">
                    Student account required
                  </p>

                  <p className="mt-1 text-xs leading-5 text-blue-700">
                    Create your STACKRA Academy account or login before
                    continuing with enrollment.
                  </p>
                </div>

                <div className="mt-6 space-y-3">
                  <Link
                    href={`/academy/register?course=${course.slug}`}
                    className="flex w-full items-center justify-center gap-2 rounded-xl bg-blue-600 px-5 py-3.5 text-sm font-bold text-white transition hover:bg-blue-700"
                  >
                    Create Student Account
                    <ArrowRight size={18} />
                  </Link>

                  <Link
                    href={`/academy/login?redirect=/academy/enroll/${course.slug}`}
                    className="flex w-full items-center justify-center rounded-xl border border-slate-300 px-5 py-3.5 text-sm font-bold text-slate-700 transition hover:bg-slate-50"
                  >
                    Already have an account? Login
                  </Link>
                </div>

                <div className="mt-6 border-t border-slate-200 pt-5">
                  <p className="text-center text-xs leading-5 text-slate-500">
                    Secure online payment will be connected in the next
                    enrollment stage.
                  </p>
                </div>
              </div>
            </div>
          </aside>
        </div>
      </section>
    </main>
  );
}
