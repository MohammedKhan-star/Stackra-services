
import Link from "next/link";
import {
  ArrowRight,
  BookOpen,
  BrainCircuit,
  BriefcaseBusiness,
  Code2,
  GraduationCap,
  Search,
  Sparkles,
} from "lucide-react";

import {
  books,
  categories,
  getFeaturedBooks,
  getPopularBooks,
} from "./data/books";

const featuredBooks = getFeaturedBooks();
const popularBooks = getPopularBooks();
const latestBooks = books.slice(0, 6);

export default function BooksPage() {
  return (
    <main className="min-h-screen bg-white text-slate-900">

      {/* =====================================================
          HERO
      ====================================================== */}
      <section className="relative overflow-hidden border-b border-slate-200 bg-slate-950">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(79,70,229,0.25),transparent_35%)]" />

        <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,rgba(14,165,233,0.12),transparent_30%)]" />

        <div className="relative mx-auto max-w-7xl px-6 py-20 sm:px-8 lg:px-10 lg:py-28">
          <div className="max-w-4xl">

            {/* Brand */}
            <div className="mb-7 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs font-semibold uppercase tracking-[0.18em] text-indigo-300">
              <Sparkles size={15} />
              STACKRA TECHNOLOGIES
            </div>

            {/* Heading */}
            <h1 className="text-4xl font-bold tracking-tight text-white sm:text-5xl lg:text-7xl">
              Knowledge that helps you{" "}
              <span className="text-indigo-400">
                build the future.
              </span>
            </h1>

            {/* Description */}
            <p className="mt-6 max-w-2xl text-base leading-8 text-slate-300 sm:text-lg">
              Welcome to STACKRA Books — a growing digital library of
              technology books, practical guides and learning resources for
              students, developers, entrepreneurs and technology
              professionals.
            </p>

            {/* Search */}
            <div className="mt-9 flex w-full max-w-2xl flex-col gap-3 sm:flex-row">
              <div className="flex flex-1 items-center rounded-xl border border-white/10 bg-white px-4 py-3.5 shadow-xl">
                <Search
                  size={19}
                  className="mr-3 shrink-0 text-slate-400"
                />

                <input
                  type="search"
                  placeholder="Search books, topics or authors..."
                  className="w-full bg-transparent text-sm text-slate-900 outline-none placeholder:text-slate-400"
                />
              </div>

              <button
                type="button"
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-indigo-600 px-6 py-3.5 text-sm font-semibold text-white transition hover:bg-indigo-500"
              >
                Search
                <ArrowRight size={17} />
              </button>
            </div>

            {/* Popular topics */}
            <div className="mt-5 flex flex-wrap gap-x-5 gap-y-2 text-sm text-slate-400">
              <span>✓ Technology</span>
              <span>✓ AI</span>
              <span>✓ Programming</span>
              <span>✓ Computer Science</span>
            </div>
          </div>
        </div>
      </section>

      {/* =====================================================
          FEATURED BOOKS
      ====================================================== */}
      <section className="px-6 py-20 sm:px-8 lg:px-10">
        <div className="mx-auto max-w-7xl">

          <div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.18em] text-indigo-600">
                Featured
              </p>

              <h2 className="mt-2 text-3xl font-bold tracking-tight sm:text-4xl">
                Featured Books
              </h2>

              <p className="mt-3 max-w-2xl text-slate-600">
                Carefully selected resources from the STACKRA Books library.
              </p>
            </div>

            <Link
              href="/books"
              className="inline-flex items-center gap-2 text-sm font-semibold text-indigo-600 transition hover:text-indigo-700"
            >
              View Library
              <ArrowRight size={17} />
            </Link>
          </div>

          <div className="mt-10 grid gap-7 md:grid-cols-2 lg:grid-cols-3">

            {featuredBooks.map((book) => (
              <article
                key={book.id}
                className="group overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-xl"
              >

                {/* Cover */}
                <div className="flex h-72 items-center justify-center bg-slate-100 p-8">
                  <div className="relative flex h-full w-44 items-center justify-center overflow-hidden rounded-lg bg-slate-950 p-6 text-center shadow-2xl transition duration-300 group-hover:scale-105">

                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(99,102,241,0.35),transparent_45%)]" />

                    <div className="relative">
                      <BookOpen
                        size={34}
                        className="mx-auto mb-4 text-indigo-400"
                      />

                      <p className="text-xs font-bold uppercase tracking-widest text-indigo-300">
                        STACKRA
                      </p>

                      <p className="mt-3 text-sm font-bold leading-5 text-white">
                        {book.title}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Details */}
                <div className="p-6">

                  <span className="text-xs font-semibold uppercase tracking-wider text-indigo-600">
                    {book.category}
                  </span>

                  <h3 className="mt-2 text-xl font-bold text-slate-900">
                    {book.title}
                  </h3>

                  <p className="mt-2 text-sm font-medium text-slate-500">
                    {book.author}
                  </p>

                  <p className="mt-4 text-sm leading-6 text-slate-600">
                    {book.description}
                  </p>

                  <Link
                    href={`/books/${book.slug}`}
                    className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-indigo-600 transition-all group-hover:gap-3"
                  >
                    Explore Book
                    <ArrowRight size={16} />
                  </Link>
                </div>
              </article>
            ))}

          </div>
        </div>
      </section>

      {/* =====================================================
          CATEGORIES
      ====================================================== */}
      <section className="border-y border-slate-200 bg-slate-50 px-6 py-20 sm:px-8 lg:px-10">
        <div className="mx-auto max-w-7xl">

          <div className="max-w-2xl">
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-indigo-600">
              Explore by topic
            </p>

            <h2 className="mt-2 text-3xl font-bold tracking-tight sm:text-4xl">
              Find knowledge for your next idea.
            </h2>

            <p className="mt-4 leading-7 text-slate-600">
              Explore books across technology, artificial intelligence,
              software development, computer science and professional skills.
            </p>
          </div>

          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">

            {categories.map((category) => {

              let Icon = BookOpen;

              if (category === "AI & Machine Learning") {
                Icon = BrainCircuit;
              }

              if (category === "Software Development") {
                Icon = Code2;
              }

              if (category === "Business & Technology") {
                Icon = BriefcaseBusiness;
              }

              if (category === "Career & Skills") {
                Icon = GraduationCap;
              }

              return (
                <Link
                  key={category}
                  href={`/books?category=${encodeURIComponent(category)}`}
                  className="group rounded-2xl border border-slate-200 bg-white p-5 transition duration-300 hover:-translate-y-1 hover:border-indigo-200 hover:shadow-lg"
                >
                  <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-indigo-50 text-indigo-600 transition group-hover:bg-indigo-600 group-hover:text-white">
                    <Icon size={20} />
                  </div>

                  <h3 className="mt-5 text-base font-bold text-slate-900">
                    {category}
                  </h3>

                  <p className="mt-2 text-sm leading-6 text-slate-500">
                    Explore resources and books in this category.
                  </p>

                  <span className="mt-4 inline-flex items-center gap-1 text-xs font-semibold text-indigo-600">
                    Explore
                    <ArrowRight size={13} />
                  </span>
                </Link>
              );
            })}

          </div>
        </div>
      </section>

      {/* =====================================================
          LATEST RELEASES
      ====================================================== */}
      <section className="px-6 py-20 sm:px-8 lg:px-10">
        <div className="mx-auto max-w-7xl">

          <div>
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-indigo-600">
              New & Updated
            </p>

            <h2 className="mt-2 text-3xl font-bold tracking-tight sm:text-4xl">
              Latest Releases
            </h2>

            <p className="mt-3 text-slate-600">
              Discover the latest additions to the STACKRA Books library.
            </p>
          </div>

          <div className="mt-10 divide-y divide-slate-200 overflow-hidden rounded-2xl border border-slate-200 bg-white">

            {latestBooks.map((book, index) => (
              <Link
                key={book.id}
                href={`/books/${book.slug}`}
                className="group flex items-center gap-5 p-5 transition hover:bg-slate-50 sm:p-6"
              >

                <div className="flex h-16 w-14 shrink-0 items-center justify-center rounded-lg bg-slate-950">
                  <BookOpen
                    size={23}
                    className="text-indigo-300"
                  />
                </div>

                <div className="min-w-0 flex-1">

                  <p className="text-xs font-semibold uppercase tracking-wider text-indigo-600">
                    {book.category}
                  </p>

                  <h3 className="mt-1 truncate text-base font-bold text-slate-900">
                    {book.title}
                  </h3>

                  <p className="mt-1 text-sm text-slate-500">
                    {book.author}
                  </p>

                </div>

                <div className="hidden text-sm font-semibold text-indigo-600 sm:flex sm:items-center sm:gap-2">
                  View
                  <ArrowRight
                    size={16}
                    className="transition group-hover:translate-x-1"
                  />
                </div>

                <span className="text-xs font-medium text-slate-400">
                  #{String(index + 1).padStart(2, "0")}
                </span>

              </Link>
            ))}

          </div>
        </div>
      </section>

      {/* =====================================================
          POPULAR BOOKS
      ====================================================== */}
      {popularBooks.length > 0 && (
        <section className="border-y border-slate-200 bg-slate-50 px-6 py-20 sm:px-8 lg:px-10">
          <div className="mx-auto max-w-7xl">

            <div>
              <p className="text-xs font-bold uppercase tracking-[0.18em] text-indigo-600">
                Reader Picks
              </p>

              <h2 className="mt-2 text-3xl font-bold tracking-tight sm:text-4xl">
                Popular Books
              </h2>

              <p className="mt-3 text-slate-600">
                Explore resources selected as popular reads in the STACKRA
                library.
              </p>
            </div>

            <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">

              {popularBooks.map((book) => (
                <Link
                  key={book.id}
                  href={`/books/${book.slug}`}
                  className="group rounded-2xl border border-slate-200 bg-white p-5 transition duration-300 hover:-translate-y-1 hover:shadow-lg"
                >
                  <div className="flex h-48 items-center justify-center rounded-xl bg-slate-950">
                    <BookOpen
                      size={38}
                      className="text-indigo-400"
                    />
                  </div>

                  <p className="mt-5 text-xs font-bold uppercase tracking-wider text-indigo-600">
                    {book.category}
                  </p>

                  <h3 className="mt-2 font-bold text-slate-900">
                    {book.title}
                  </h3>

                  <p className="mt-2 text-sm text-slate-500">
                    {book.author}
                  </p>

                  <span className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-indigo-600">
                    View Book
                    <ArrowRight
                      size={15}
                      className="transition group-hover:translate-x-1"
                    />
                  </span>
                </Link>
              ))}

            </div>
          </div>
        </section>
      )}

      {/* =====================================================
          AUTHORS
      ====================================================== */}
      <section className="bg-slate-950 px-6 py-20 text-white sm:px-8 lg:px-10">
        <div className="mx-auto max-w-7xl">

          <div className="grid gap-10 lg:grid-cols-[1fr_2fr] lg:items-center">

            <div>
              <p className="text-xs font-bold uppercase tracking-[0.18em] text-indigo-400">
                Authors & Creators
              </p>

              <h2 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl">
                Knowledge created by people who build.
              </h2>

              <p className="mt-5 leading-7 text-slate-400">
                STACKRA Books brings together practical knowledge from
                technology creators, developers, educators and industry
                professionals.
              </p>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">

              <div className="rounded-2xl border border-white/10 bg-white/5 p-6">

                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-indigo-600 font-bold">
                  ST
                </div>

                <h3 className="mt-5 font-bold">
                  STACKRA TECHNOLOGIES
                </h3>

                <p className="mt-2 text-sm leading-6 text-slate-400">
                  Technology, AI and software knowledge for the next
                  generation of builders.
                </p>

              </div>

              <div className="rounded-2xl border border-white/10 bg-white/5 p-6">

                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-white/10">
                  <GraduationCap size={22} />
                </div>

                <h3 className="mt-5 font-bold">
                  Future Contributors
                </h3>

                <p className="mt-2 text-sm leading-6 text-slate-400">
                  A growing community of authors and technology educators.
                </p>

              </div>

            </div>
          </div>
        </div>
      </section>

      {/* =====================================================
          CTA
      ====================================================== */}
      <section className="px-6 py-20 sm:px-8 lg:px-10">
        <div className="mx-auto max-w-5xl overflow-hidden rounded-3xl bg-indigo-600 px-7 py-14 text-center shadow-2xl sm:px-12">

          <p className="text-xs font-bold uppercase tracking-[0.2em] text-indigo-200">
            Keep Learning
          </p>

          <h2 className="mt-3 text-3xl font-bold tracking-tight text-white sm:text-4xl">
            Your next idea starts with knowledge.
          </h2>

          <p className="mx-auto mt-4 max-w-2xl text-indigo-100">
            Explore the STACKRA Books library and discover resources that help
            you learn, create and build.
          </p>

          <Link
            href="#books"
            className="mt-8 inline-flex items-center gap-2 rounded-xl bg-white px-6 py-3.5 text-sm font-bold text-indigo-700 transition hover:bg-indigo-50"
          >
            Explore STACKRA Books
            <ArrowRight size={17} />
          </Link>

        </div>
      </section>

    </main>
  );
}

