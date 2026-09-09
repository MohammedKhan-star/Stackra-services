import Link from "next/link";
import { ArrowRight, BookOpen, Sparkles } from "lucide-react";

const featuredBooks = [
  {
    title: "Your Book Title",
    description: "Add your book description here.",
    category: "Technology",
    slug: "your-book-slug",
  },
];

export default function BooksPage() {
  return (
    <main className="min-h-screen bg-slate-50">
      {/* Hero */}
      <section className="relative overflow-hidden bg-slate-950 px-6 py-24 text-white">
        <div className="mx-auto max-w-7xl">
          <div className="max-w-3xl">
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-slate-300">
              <Sparkles size={16} />
              STACKRA TECHNOLOGIES
            </div>

            <h1 className="text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
              STACKRA Books
            </h1>

            <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-300">
              Explore technology books, practical guides, and learning
              resources designed to help you learn, build, and grow.
            </p>

            <Link
              href="#books"
              className="mt-8 inline-flex items-center gap-2 rounded-xl bg-indigo-600 px-6 py-3.5 font-semibold text-white transition hover:bg-indigo-500"
            >
              Explore Books
              <ArrowRight size={18} />
            </Link>
          </div>
        </div>
      </section>

      {/* Books */}
      <section id="books" className="px-6 py-20">
        <div className="mx-auto max-w-7xl">
          <div className="mb-10">
            <p className="text-sm font-semibold uppercase tracking-widest text-indigo-600">
              Our Library
            </p>

            <h2 className="mt-2 text-3xl font-bold text-slate-900">
              Explore Our Books
            </h2>

            <p className="mt-3 text-slate-600">
              Learn technology through practical and easy-to-understand
              resources.
            </p>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {featuredBooks.map((book) => (
              <article
                key={book.slug}
                className="group overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-xl"
              >
                <div className="flex h-56 items-center justify-center bg-gradient-to-br from-indigo-600 to-slate-900">
                  <BookOpen
                    size={64}
                    strokeWidth={1.5}
                    className="text-white"
                  />
                </div>

                <div className="p-6">
                  <span className="text-xs font-semibold uppercase tracking-wider text-indigo-600">
                    {book.category}
                  </span>

                  <h3 className="mt-2 text-xl font-bold text-slate-900">
                    {book.title}
                  </h3>

                  <p className="mt-3 line-clamp-3 text-sm leading-6 text-slate-600">
                    {book.description}
                  </p>

                  <Link
                    href={`/books/${book.slug}`}
                    className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-indigo-600 transition group-hover:gap-3"
                  >
                    View Book
                    <ArrowRight size={16} />
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
