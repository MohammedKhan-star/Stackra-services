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
  Laptop,
  ShieldCheck,
  Trophy,
} from "lucide-react";

const courses = {
  "full-stack-web-development": {
    title: "Full Stack Web Development",
    category: "Web Development",
    level: "Beginner",
    duration: "35 Hours",
    lessons: 120,
    description:
      "Learn HTML, CSS, JavaScript, React, Next.js, Node.js, APIs and MongoDB by building real-world applications.",
    icon: Laptop,
    outcomes: [
      "Build responsive websites with HTML and CSS",
      "Master modern JavaScript",
      "Build React and Next.js applications",
      "Create backend APIs with Node.js",
      "Connect applications with MongoDB",
      "Deploy full-stack applications",
    ],
    curriculum: [
      "HTML & Web Fundamentals",
      "CSS & Responsive Design",
      "JavaScript Fundamentals",
      "Modern JavaScript & ES6+",
      "React.js",
      "Next.js",
      "Node.js & Express",
      "REST APIs",
      "MongoDB & Mongoose",
      "Authentication",
      "Full Stack Project",
      "Deployment",
    ],
  },

  "javascript-mastery": {
    title: "JavaScript Mastery",
    category: "Programming",
    level: "Intermediate",
    duration: "24 Hours",
    lessons: 80,
    description:
      "Master modern JavaScript, ES6+, asynchronous programming, DOM, APIs and advanced programming concepts.",
    icon: Code2,
    outcomes: [
      "Understand JavaScript fundamentals",
      "Use modern ES6+ features",
      "Work with arrays and objects",
      "Understand asynchronous JavaScript",
      "Work with APIs and JSON",
      "Build practical JavaScript applications",
    ],
    curriculum: [
      "JavaScript Fundamentals",
      "Variables & Data Types",
      "Functions",
      "Arrays & Objects",
      "DOM Manipulation",
      "Events",
      "ES6+ Features",
      "Destructuring & Spread",
      "Promises",
      "Async/Await",
      "Fetch API",
      "JavaScript Projects",
    ],
  },

  "react-js-development": {
    title: "React.js Development",
    category: "Web Development",
    level: "Intermediate",
    duration: "20 Hours",
    lessons: 70,
    description:
      "Build modern interactive web applications using React components, hooks, state management and APIs.",
    icon: Code2,
    outcomes: [
      "Understand React fundamentals",
      "Build reusable components",
      "Work with props and state",
      "Use React hooks",
      "Connect applications to APIs",
      "Build practical React projects",
    ],
    curriculum: [
      "React Fundamentals",
      "Components",
      "JSX",
      "Props",
      "State",
      "Event Handling",
      "useState",
      "useEffect",
      "Forms",
      "API Integration",
      "Routing",
      "React Project",
    ],
  },

  "next-js-development": {
    title: "Next.js Development",
    category: "Web Development",
    level: "Advanced",
    duration: "26 Hours",
    lessons: 75,
    description:
      "Learn Next.js App Router, server components, APIs, authentication, database integration and deployment.",
    icon: Laptop,
    outcomes: [
      "Understand Next.js architecture",
      "Build applications with App Router",
      "Create API route handlers",
      "Work with server and client components",
      "Connect MongoDB databases",
      "Deploy Next.js applications",
    ],
    curriculum: [
      "Next.js Fundamentals",
      "App Router",
      "Layouts & Pages",
      "Server Components",
      "Client Components",
      "Dynamic Routes",
      "Route Handlers",
      "Forms & Validation",
      "Authentication",
      "MongoDB Integration",
      "Performance",
      "Vercel Deployment",
    ],
  },

  "ai-machine-learning": {
    title: "AI & Machine Learning",
    category: "AI & Machine Learning",
    level: "Intermediate",
    duration: "30 Hours",
    lessons: 90,
    description:
      "Understand artificial intelligence, machine learning fundamentals, models, datasets and practical AI applications.",
    icon: BookOpen,
    outcomes: [
      "Understand AI fundamentals",
      "Understand machine learning concepts",
      "Work with datasets",
      "Understand training and testing",
      "Explore practical AI applications",
      "Build introductory AI projects",
    ],
    curriculum: [
      "Introduction to AI",
      "Machine Learning Fundamentals",
      "Types of Machine Learning",
      "Datasets",
      "Data Preparation",
      "Features & Labels",
      "Model Training",
      "Model Evaluation",
      "Classification",
      "Regression",
      "AI Applications",
      "Practical AI Project",
    ],
  },

  "mongodb-database-development": {
    title: "MongoDB & Database Development",
    category: "Database",
    level: "Intermediate",
    duration: "16 Hours",
    lessons: 55,
    description:
      "Learn database fundamentals, MongoDB, Mongoose, schemas, queries, relationships and APIs.",
    icon: Database,
    outcomes: [
      "Understand database fundamentals",
      "Work with MongoDB collections",
      "Create schemas with Mongoose",
      "Write database queries",
      "Build relationships between data",
      "Connect MongoDB with APIs",
    ],
    curriculum: [
      "Database Fundamentals",
      "MongoDB Introduction",
      "Databases & Collections",
      "Documents",
      "CRUD Operations",
      "Queries",
      "Indexes",
      "Mongoose",
      "Schemas & Models",
      "Relationships",
      "MongoDB with APIs",
      "Database Project",
    ],
  },

  "node-js-backend-development": {
    title: "Node.js Backend Development",
    category: "Programming",
    level: "Intermediate",
    duration: "19 Hours",
    lessons: 65,
    description:
      "Build scalable backend applications using Node.js, Express, REST APIs and authentication.",
    icon: Code2,
    outcomes: [
      "Understand Node.js",
      "Build Express applications",
      "Create REST APIs",
      "Work with middleware",
      "Connect databases",
      "Implement authentication",
    ],
    curriculum: [
      "Node.js Fundamentals",
      "Modules",
      "NPM",
      "Express.js",
      "Routing",
      "Middleware",
      "REST APIs",
      "Request & Response",
      "MongoDB Integration",
      "Authentication",
      "API Security",
      "Backend Project",
    ],
  },

  "cyber-security-fundamentals": {
    title: "Cyber Security Fundamentals",
    category: "Cyber Security",
    level: "Beginner",
    duration: "18 Hours",
    lessons: 60,
    description:
      "Learn cybersecurity fundamentals, networks, threats, vulnerabilities and security best practices.",
    icon: ShieldCheck,
    outcomes: [
      "Understand cybersecurity fundamentals",
      "Understand common cyber threats",
      "Learn basic network security",
      "Understand vulnerabilities",
      "Learn security best practices",
      "Develop security awareness",
    ],
    curriculum: [
      "Cybersecurity Introduction",
      "Computer Networks",
      "Network Security",
      "Threats & Attacks",
      "Malware",
      "Phishing",
      "Passwords & Authentication",
      "Data Protection",
      "Web Security",
      "Security Best Practices",
      "Incident Awareness",
      "Security Project",
    ],
  },

  "advanced-microsoft-excel": {
    title: "Advanced Microsoft Excel",
    category: "Business & Technology",
    level: "Advanced",
    duration: "14 Hours",
    lessons: 50,
    description:
      "Master advanced Excel formulas, lookup functions, data analysis, dashboards and automation.",
    icon: BookOpen,
    outcomes: [
      "Master advanced Excel formulas",
      "Use lookup functions",
      "Analyze business data",
      "Create professional dashboards",
      "Work with PivotTables",
      "Improve spreadsheet productivity",
    ],
    curriculum: [
      "Excel Fundamentals Review",
      "Advanced Formulas",
      "IF Functions",
      "XLOOKUP",
      "INDEX & MATCH",
      "Text Functions",
      "Date & Time Functions",
      "Data Validation",
      "Conditional Formatting",
      "PivotTables",
      "Charts & Dashboards",
      "Excel Business Project",
    ],
  },

  "ms-office": {
    title: "MS Office",
    category: "Office Productivity",
    level: "Beginner",
    duration: "15 Hours",
    lessons: 30,
    description:
      "Master Microsoft Word, Excel and PowerPoint through practical exercises and real-world office tasks.",
    icon: BookOpen,
    outcomes: [
      "Create professional documents in Word",
      "Use Excel for everyday office work",
      "Create presentations in PowerPoint",
      "Format documents professionally",
      "Use essential Excel formulas",
      "Build professional presentations",
    ],
    curriculum: [
      "Introduction to MS Office",
      "Microsoft Word Basics",
      "Document Formatting",
      "Tables & Page Layout",
      "Headers & Footers",
      "Microsoft Excel Basics",
      "Rows, Columns & Cells",
      "Basic Excel Formulas",
      "Sorting & Filtering",
      "Charts",
      "Microsoft PowerPoint",
      "Slides & Layouts",
      "Presentation Design",
      "Animations & Transitions",
      "Practical Office Project",
    ],
  },

  "typing-mastery": {
    title: "Typing Mastery",
    category: "Computer Skills",
    level: "Beginner",
    duration: "10 Hours",
    lessons: 20,
    description:
      "Improve your typing speed, accuracy and keyboard skills through structured practical training.",
    icon: Code2,
    outcomes: [
      "Understand proper keyboard positioning",
      "Improve typing accuracy",
      "Increase typing speed",
      "Learn touch typing techniques",
      "Reduce typing mistakes",
      "Build consistent typing habits",
    ],
    curriculum: [
      "Keyboard Fundamentals",
      "Home Row Keys",
      "Finger Positioning",
      "Top Row Keys",
      "Bottom Row Keys",
      "Capital Letters",
      "Numbers & Symbols",
      "Words & Sentences",
      "Typing Accuracy",
      "Typing Speed Practice",
      "Timed Typing Tests",
      "Final Typing Assessment",
    ],
  },

  "python-programming": {
    title: "Python Programming",
    category: "Programming",
    level: "Beginner",
    duration: "20 Hours",
    lessons: 40,
    description:
      "Learn Python programming from the fundamentals to practical applications through hands-on exercises and projects.",
    icon: Code2,
    outcomes: [
      "Understand Python fundamentals",
      "Write Python programs",
      "Work with variables and data types",
      "Use conditions and loops",
      "Create functions",
      "Work with lists and dictionaries",
      "Build practical Python projects",
    ],
    curriculum: [
      "Introduction to Python",
      "Installing Python",
      "Python Syntax",
      "Variables & Data Types",
      "Operators",
      "Input & Output",
      "Conditional Statements",
      "Loops",
      "Lists & Tuples",
      "Dictionaries & Sets",
      "Functions",
      "Modules",
      "File Handling",
      "Error Handling",
      "Object-Oriented Programming",
      "Python Project",
    ],
  },
};

export default async function CourseDetailsPage({ params }) {
  const { slug } = await params;

  const course = courses[slug];

  if (!course) {
    notFound();
  }

  const Icon = course.icon;

  return (
    <main className="min-h-screen bg-slate-50 text-slate-950">
      {/* NAVBAR */}
      <nav className="border-b border-slate-200 bg-white">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4 sm:px-6 lg:px-8">
          <Link
            href="/academy"
            className="flex items-center gap-3"
          >
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

          <Link
            href="/academy/courses"
            className="flex items-center gap-2 text-sm font-semibold text-slate-600 transition hover:text-slate-950"
          >
            <ArrowLeft size={17} />
            <span className="hidden sm:inline">
              All Courses
            </span>
          </Link>
        </div>
      </nav>

      {/* HERO */}
      <section className="border-b border-slate-200 bg-white">
        <div className="mx-auto max-w-7xl px-5 py-12 sm:px-6 sm:py-16 lg:px-8">
          <div className="grid gap-10 lg:grid-cols-[1fr_380px] lg:items-center">
            <div>
              <div className="flex flex-wrap items-center gap-3">
                <span className="rounded-full bg-slate-100 px-3 py-1.5 text-xs font-semibold">
                  {course.category}
                </span>

                <span className="text-sm text-slate-500">
                  {course.level}
                </span>
              </div>

              <h1 className="mt-5 max-w-3xl text-4xl font-bold tracking-tight sm:text-5xl">
                {course.title}
              </h1>

              <p className="mt-5 max-w-3xl text-base leading-7 text-slate-600 sm:text-lg sm:leading-8">
                {course.description}
              </p>

              <div className="mt-7 flex flex-wrap gap-5 text-sm text-slate-500">
                <span className="flex items-center gap-2">
                  <BookOpen size={17} />
                  {course.lessons} Lessons
                </span>

                <span className="flex items-center gap-2">
                  <Clock3 size={17} />
                  {course.duration}
                </span>

                <span className="flex items-center gap-2">
                  <Award size={17} />
                  Certificate
                </span>
              </div>
            </div>

            {/* COURSE CARD */}
            <div className="overflow-hidden rounded-3xl border border-slate-200 bg-slate-950 text-white shadow-xl">
              <div className="flex h-48 items-center justify-center bg-gradient-to-br from-slate-900 to-slate-800">
                <Icon
                  size={78}
                  strokeWidth={1.2}
                />
              </div>

              <div className="p-7">
                <p className="text-sm text-slate-400">
                  Start learning today
                </p>

                <h2 className="mt-2 text-2xl font-bold">
                  {course.title}
                </h2>

                <Link
                  href={`/academy/enroll/${course.slug}`}
                  className="mt-7 flex w-full items-center justify-center gap-2 rounded-xl bg-white px-5 py-3.5 text-sm font-bold text-slate-950 transition hover:bg-slate-200"
                >
                  Enroll Now
                  <ArrowRight size={18} />
                </Link>

                <p className="mt-4 text-center text-xs text-slate-500">
                  Learn at your own pace.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CONTENT */}
      <section className="mx-auto max-w-7xl px-5 py-12 sm:px-6 lg:px-8">
        <div className="grid gap-10 lg:grid-cols-[1fr_320px]">
          {/* MAIN */}
          <div>
            {/* WHAT YOU WILL LEARN */}
            <section>
              <h2 className="text-2xl font-bold">
                What you will learn
              </h2>

              <div className="mt-6 grid gap-4 sm:grid-cols-2">
                {course.outcomes.map((outcome) => (
                  <div
                    key={outcome}
                    className="flex gap-3 rounded-xl border border-slate-200 bg-white p-4"
                  >
                    <CheckCircle2
                      size={20}
                      className="mt-0.5 shrink-0 text-green-600"
                    />

                    <span className="text-sm leading-6 text-slate-700">
                      {outcome}
                    </span>
                  </div>
                ))}
              </div>
            </section>

            {/* CURRICULUM */}
            <section className="mt-12">
              <h2 className="text-2xl font-bold">
                Course Curriculum
              </h2>

              <p className="mt-2 text-sm text-slate-500">
                {course.lessons} lessons covering the complete
                learning path.
              </p>

              <div className="mt-6 overflow-hidden rounded-2xl border border-slate-200 bg-white">
                {course.curriculum.map((item, index) => (
                  <div
                    key={item}
                    className="flex items-center gap-4 border-b border-slate-100 px-5 py-4 last:border-b-0"
                  >
                    <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-slate-100 text-xs font-bold text-slate-600">
                      {index + 1}
                    </div>

                    <span className="text-sm font-medium text-slate-700">
                      {item}
                    </span>
                  </div>
                ))}
              </div>
            </section>

            {/* CERTIFICATE */}
            <section className="mt-12 rounded-3xl border border-yellow-200 bg-yellow-50 p-7 sm:p-9">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-yellow-100 text-yellow-700">
                <Trophy size={23} />
              </div>

              <h2 className="mt-5 text-2xl font-bold">
                Earn a STACKRA Academy Certificate
              </h2>

              <p className="mt-3 max-w-2xl text-sm leading-7 text-slate-600">
                Complete the course requirements and assessments
                to earn a certificate from STACKRA Academy.
              </p>
            </section>
          </div>

          {/* SIDEBAR */}
          <aside className="h-fit rounded-2xl border border-slate-200 bg-white p-6 lg:sticky lg:top-8">
            <h3 className="font-bold">
              Course Information
            </h3>

            <div className="mt-5 space-y-4">
              <div className="flex items-center justify-between gap-4 text-sm">
                <span className="text-slate-500">
                  Level
                </span>

                <span className="font-semibold">
                  {course.level}
                </span>
              </div>

              <div className="flex items-center justify-between gap-4 text-sm">
                <span className="text-slate-500">
                  Lessons
                </span>

                <span className="font-semibold">
                  {course.lessons}
                </span>
              </div>

              <div className="flex items-center justify-between gap-4 text-sm">
                <span className="text-slate-500">
                  Duration
                </span>

                <span className="font-semibold">
                  {course.duration}
                </span>
              </div>

              <div className="flex items-center justify-between gap-4 text-sm">
                <span className="text-slate-500">
                  Certificate
                </span>

                <span className="font-semibold">
                  Included
                </span>
              </div>
            </div>

            <Link
              href={`/academy/enroll/${course.slug}`}
              className="mt-7 flex w-full items-center justify-center gap-2 rounded-xl bg-slate-950 px-5 py-3.5 text-sm font-semibold text-white transition hover:bg-slate-800"
            >
              Enroll Now
              <ArrowRight size={17} />
            </Link>
          </aside>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="border-t border-slate-200 bg-white">
        <div className="mx-auto max-w-7xl px-5 py-8 text-center text-sm text-slate-500 sm:px-6 lg:px-8">
          © {new Date().getFullYear()} STACKRA TECHNOLOGIES.
          All rights reserved.
        </div>
      </footer>
    </main>
  );
}
