
import Link from "next/link";
import {
  ArrowLeft,
  ArrowRight,
  BookOpen,
  Download,
  Eye,
  Share2,
} from "lucide-react";

const books = {
  "featured-book": {
    title: "Featured Book",
    author: "STACKRA TECHNOLOGIES",
    category: "Technology",
    description:
      "A practical technology resource created to help learners understand modern concepts and apply their knowledge to real-world projects.",
    published: "2026",
    pages: "120",
  },

  "ai-and-the-future": {
    title: "AI & The Future",
    author: "STACKRA TECHNOLOGIES",
    category: "Artificial Intelligence",
    description:
      "Explore the fundamentals of artificial intelligence and understand how intelligent technologies are transforming businesses, products and everyday life.",
    published: "2026",
    pages: "150",
  },

  "build-with-technology": {
    title: "Build With Technology",
    author: "STACKRA TECHNOLOGIES",
    category: "Software Development",
    description:
      "Learn the foundations of modern software development and discover how technology can be transformed into useful digital products.",
    published: "2026",
    pages: "135",
  },

  "latest-technology-guide": {
    title: "Latest Technology Guide",
    author: "STACKRA TECHNOLOGIES",
    category: "Technology",
    description:
      "A practical guide covering important concepts and technologies for modern learners and developers.",
    published: "2026",
    pages: "110",
  },

  "introduction-to-ai": {
    title: "Introduction to Artificial Intelligence",
    author: "STACKRA TECHNOLOGIES",
    category: "AI & Machine Learning",
    description:
      "An easy-to-follow introduction to artificial intelligence, intelligent systems and the technologies powering the AI revolution.",
    published: "2026",
    pages: "140",
  },

  "modern-software-development": {
    title: "Modern Software Development",
    author: "STACKRA TECHNOLOGIES",
    category: "Software Development",
    description:
      "Understand modern software development practices, technologies and approaches used to build scalable digital applications.",
    published: "2026",
    pages: "125",
  },
};

export default async function BookPage({ params }) {
  const { slug } = await params;
  const book = books[slug];

  if (!book) {
    return (
      <main className="flex min-h-[70vh] items-center justify-center bg-white px-6">
        <div className="text-center">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-indigo-50 text-indigo-600">
            <BookOpen size={30} />
          </div>

          <h1 className="mt-6 text-3xl font-bold text-slate-900">
            Book Not Found
          </h1>

          <p className="mt-3 text-slate-500">
            The book you're looking for doesn't exist or may have been moved.
          </p>

          <Link
            href="/books"
            className="mt-7 inline-flex items-center gap-2 rounded-xl bg-indigo-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-indigo-700"
          >
            <ArrowLeft size={17} />
            Back to Books
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-white text-slate-900">
      {/* TOP BAR */}
      <div className="border-b border-slate-200 bg-slate-50">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4 sm:px-8 lg:px-10">
          <Link
            href="/books"
            className="inline-flex items-center gap-2 text-sm font-semibold text-slate-600 transition hover:text-indigo-600"
          >
            <ArrowLeft size={17} />
            Back to STACKRA Books
          </Link>

          <button
            type="button"
            className="inline-flex items-center gap-2 text-sm font-medium text-slate-500 transition hover:text-indigo-600"
          >
            <Share2 size={16} />
            Share
          </button>
        </div>
      </div>

      {/* BOOK HEADER */}
      <section className="border-b border-slate-200">
        <div className="mx-auto grid max-w-7xl gap-12 px-6 py-16 sm:px-8 lg:grid-cols-[380px_1fr] lg:px-10 lg:py-24">
          {/* BOOK COVER */}
          <div className="flex justify-center lg:justify-start">
            <div className="relative aspect-[3/4] w-full max-w-[320px] overflow-hidden rounded-xl bg-slate-950 shadow-2xl">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(99,102,241,0.35),transparent_40%)]" />

              <div className="relative flex h-full flex-col justify-between p-8">
                <div>
                  <p className="text-xs font-bold uppercase tracking-[0.2em] text-indigo-300">
                    STACKRA
                  </p>

                  <div className="mt-3 h-px w-12 bg-indigo-400" />
                </div>

                <div>
                  <BookOpen size={42} className="mb-6 text-indigo-400" />

                  <h2 className="text-3xl font-bold leading-tight text-white">
                    {book.title}
                  </h2>

                  <p className="mt-5 text-sm text-slate-400">
                    {book.author}
                  </p>
                </div>

                <p className="text-xs font-semibold uppercase tracking-widest text-slate-500">
                  STACKRA TECHNOLOGIES
                </p>
              </div>
            </div>
          </div>

          {/* DETAILS */}
          <div className="flex flex-col justify-center">
            <div>
              <span className="inline-flex rounded-full bg-indigo-50 px-3 py-1.5 text-xs font-bold uppercase tracking-wider text-indigo-600">
                {book.category}
              </span>

              <h1 className="mt-5 text-4xl font-bold tracking-tight text-slate-950 sm:text-5xl">
                {book.title}
              </h1>

              <p className="mt-4 text-base font-medium text-slate-500">
                By {book.author}
              </p>

              <p className="mt-7 max-w-2xl text-base leading-8 text-slate-600">
                {book.description}
              </p>
            </div>

            {/* BOOK META */}
            <div className="mt-8 grid max-w-xl grid-cols-2 gap-4 sm:grid-cols-3">
              <div className="rounded-xl border border-slate-200 p-4">
                <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                  Published
                </p>
                <p className="mt-1 font-bold text-slate-900">
                  {book.published}
                </p>
              </div>

              <div className="rounded-xl border border-slate-200 p-4">
                <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                  Pages
                </p>
                <p className="mt-1 font-bold text-slate-900">
                  {book.pages}
                </p>
              </div>

              <div className="rounded-xl border border-slate-200 p-4">
                <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                  Format
                </p>
                <p className="mt-1 font-bold text-slate-900">Digital</p>
              </div>
            </div>

            {/* ACTIONS */}
            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              <button
                type="button"
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-indigo-600 px-6 py-3.5 text-sm font-bold text-white shadow-lg shadow-indigo-600/20 transition hover:bg-indigo-700"
              >
                <Eye size={18} />
                Read Book
              </button>

              <button
                type="button"
                className="inline-flex items-center justify-center gap-2 rounded-xl border border-slate-300 bg-white px-6 py-3.5 text-sm font-bold text-slate-700 transition hover:border-indigo-300 hover:bg-indigo-50 hover:text-indigo-600"
              >
                <Download size={18} />
                Download
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ABOUT BOOK */}
      <section className="px-6 py-20 sm:px-8 lg:px-10">
        <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-[1fr_320px]">
          <article className="max-w-3xl">
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-indigo-600">
              About this book
            </p>

            <h2 className="mt-3 text-3xl font-bold tracking-tight">
              Learn. Understand. Build.
            </h2>

            <p className="mt-6 leading-8 text-slate-600">
              STACKRA Books is designed to make technology knowledge easier to
              understand and apply. Each resource focuses on practical
              concepts, clear explanations and real-world applications.
            </p>

            <p className="mt-5 leading-8 text-slate-600">
              Whether you are a student learning the fundamentals, a developer
              building applications or an entrepreneur exploring technology,
              this book is designed to support your learning journey.
            </p>
          </article>

          <aside className="rounded-2xl border border-slate-200 bg-slate-50 p-6">
            <h3 className="font-bold text-slate-900">Book Information</h3>

            <div className="mt-5 space-y-4 text-sm">
              <div className="flex justify-between gap-4">
                <span className="text-slate-500">Author</span>
                <span className="font-semibold text-slate-900">
                  {book.author}
                </span>
              </div>

              <div className="flex justify-between gap-4">
                <span className="text-slate-500">Category</span>
                <span className="font-semibold text-slate-900">
                  {book.category}
                </span>
              </div>

              <div className="flex justify-between gap-4">
                <span className="text-slate-500">Year</span>
                <span className="font-semibold text-slate-900">
                  {book.published}
                </span>
              </div>

              <div className="flex justify-between gap-4">
                <span className="text-slate-500">Format</span>
                <span className="font-semibold text-slate-900">Digital</span>
              </div>
            </div>
          </aside>
        </div>
      </section>

      {/* RELATED CTA */}
      <section className="border-t border-slate-200 bg-slate-50 px-6 py-16 sm:px-8 lg:px-10">
        <div className="mx-auto flex max-w-7xl flex-col justify-between gap-6 sm:flex-row sm:items-center">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-indigo-600">
              STACKRA Books
            </p>

            <h2 className="mt-2 text-2xl font-bold">
              Discover more technology resources.
            </h2>
          </div>

          <Link
            href="/books"
            className="inline-flex items-center justify-center gap-2 rounded-xl bg-slate-900 px-6 py-3.5 text-sm font-bold text-white transition hover:bg-slate-800"
          >
            Explore Library
            <ArrowRight size={17} />
          </Link>
        </div>
      </section>
    </main>
  );
}
