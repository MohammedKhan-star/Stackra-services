"use client";

import Link from "next/link";
import { useState } from "react";
import {
  ArrowRight,
  CheckCircle2,
  Eye,
  EyeOff,
  GraduationCap,
  Lock,
  Mail,
  User,
} from "lucide-react";

export default function AcademyRegisterPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    agree: false,
  });

  const handleChange = (event) => {
    const { name, value, type, checked } = event.target;

    setForm((previous) => ({
      ...previous,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (form.password !== form.confirmPassword) {
      alert("Passwords do not match.");
      return;
    }

    if (!form.agree) {
      alert("Please accept the terms and policies.");
      return;
    }

    alert("Registration system will be connected to MongoDB next.");
  };

  return (
    <main className="min-h-screen bg-slate-50 text-slate-950">
      {/* HEADER */}

      <header className="border-b border-slate-200 bg-white">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4 lg:px-8">
          <Link
            href="/academy"
            className="flex items-center gap-3"
          >
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-slate-950 text-white">
              <GraduationCap size={21} />
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

          <div className="text-sm text-slate-500">
            Already have an account?
            <Link
              href="/academy/login"
              className="ml-2 font-semibold text-slate-950"
            >
              Login
            </Link>
          </div>
        </div>
      </header>

      {/* CONTENT */}

      <section className="mx-auto flex max-w-6xl justify-center px-6 py-12 lg:py-20">
        <div className="grid w-full overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm lg:grid-cols-2">
          {/* LEFT */}

          <div className="hidden bg-slate-950 p-10 text-white lg:block lg:p-14">
            <div className="flex h-full flex-col justify-between">
              <div>
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-white text-slate-950">
                  <GraduationCap size={28} />
                </div>

                <h1 className="mt-10 text-4xl font-bold leading-tight">
                  Start your
                  <span className="block text-slate-400">
                    technology journey.
                  </span>
                </h1>

                <p className="mt-6 max-w-md leading-7 text-slate-400">
                  Join STACKRA Academy and learn modern technology
                  through practical courses, projects and AI-powered
                  learning.
                </p>
              </div>

              <div className="mt-12 space-y-5">
                <div className="flex gap-4">
                  <CheckCircle2
                    size={21}
                    className="mt-0.5 shrink-0"
                  />

                  <div>
                    <p className="font-semibold">
                      Practical Courses
                    </p>

                    <p className="mt-1 text-sm text-slate-400">
                      Learn through real-world projects.
                    </p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <CheckCircle2
                    size={21}
                    className="mt-0.5 shrink-0"
                  />

                  <div>
                    <p className="font-semibold">
                      Track Your Progress
                    </p>

                    <p className="mt-1 text-sm text-slate-400">
                      Continue learning from your dashboard.
                    </p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <CheckCircle2
                    size={21}
                    className="mt-0.5 shrink-0"
                  />

                  <div>
                    <p className="font-semibold">
                      Earn Certificates
                    </p>

                    <p className="mt-1 text-sm text-slate-400">
                      Get certified after completing courses.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* FORM */}

          <div className="p-7 sm:p-10 lg:p-14">
            <div className="mx-auto max-w-md">
              <p className="text-sm font-bold uppercase tracking-[0.2em] text-slate-500">
                Student Registration
              </p>

              <h2 className="mt-3 text-3xl font-bold tracking-tight">
                Create your account
              </h2>

              <p className="mt-3 text-sm leading-6 text-slate-500">
                Create a STACKRA Academy account to start learning.
              </p>

              <form
                onSubmit={handleSubmit}
                className="mt-8 space-y-5"
              >
                {/* NAME */}

                <div>
                  <label
                    htmlFor="name"
                    className="mb-2 block text-sm font-semibold"
                  >
                    Full Name
                  </label>

                  <div className="relative">
                    <User
                      size={18}
                      className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                    />

                    <input
                      id="name"
                      name="name"
                      type="text"
                      required
                      value={form.name}
                      onChange={handleChange}
                      placeholder="Enter your full name"
                      className="w-full rounded-xl border border-slate-200 bg-white py-3.5 pl-11 pr-4 outline-none transition focus:border-slate-950"
                    />
                  </div>
                </div>

                {/* EMAIL */}

                <div>
                  <label
                    htmlFor="email"
                    className="mb-2 block text-sm font-semibold"
                  >
                    Email Address
                  </label>

                  <div className="relative">
                    <Mail
                      size={18}
                      className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                    />

                    <input
                      id="email"
                      name="email"
                      type="email"
                      required
                      value={form.email}
                      onChange={handleChange}
                      placeholder="you@example.com"
                      className="w-full rounded-xl border border-slate-200 bg-white py-3.5 pl-11 pr-4 outline-none transition focus:border-slate-950"
                    />
                  </div>
                </div>

                {/* PASSWORD */}

                <div>
                  <label
                    htmlFor="password"
                    className="mb-2 block text-sm font-semibold"
                  >
                    Password
                  </label>

                  <div className="relative">
                    <Lock
                      size={18}
                      className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                    />

                    <input
                      id="password"
                      name="password"
                      type={showPassword ? "text" : "password"}
                      required
                      minLength={6}
                      value={form.password}
                      onChange={handleChange}
                      placeholder="Create a password"
                      className="w-full rounded-xl border border-slate-200 bg-white py-3.5 pl-11 pr-12 outline-none transition focus:border-slate-950"
                    />

                    <button
                      type="button"
                      onClick={() =>
                        setShowPassword(!showPassword)
                      }
                      className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-950"
                    >
                      {showPassword ? (
                        <EyeOff size={18} />
                      ) : (
                        <Eye size={18} />
                      )}
                    </button>
                  </div>

                  <p className="mt-2 text-xs text-slate-400">
                    Minimum 6 characters.
                  </p>
                </div>

                {/* CONFIRM PASSWORD */}

                <div>
                  <label
                    htmlFor="confirmPassword"
                    className="mb-2 block text-sm font-semibold"
                  >
                    Confirm Password
                  </label>

                  <div className="relative">
                    <Lock
                      size={18}
                      className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                    />

                    <input
                      id="confirmPassword"
                      name="confirmPassword"
                      type={
                        showConfirmPassword
                          ? "text"
                          : "password"
                      }
                      required
                      value={form.confirmPassword}
                      onChange={handleChange}
                      placeholder="Confirm your password"
                      className="w-full rounded-xl border border-slate-200 bg-white py-3.5 pl-11 pr-12 outline-none transition focus:border-slate-950"
                    />

                    <button
                      type="button"
                      onClick={() =>
                        setShowConfirmPassword(
                          !showConfirmPassword
                        )
                      }
                      className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-950"
                    >
                      {showConfirmPassword ? (
                        <EyeOff size={18} />
                      ) : (
                        <Eye size={18} />
                      )}
                    </button>
                  </div>
                </div>

                {/* TERMS */}

                <label className="flex cursor-pointer items-start gap-3">
                  <input
                    type="checkbox"
                    name="agree"
                    checked={form.agree}
                    onChange={handleChange}
                    className="mt-1 h-4 w-4 rounded border-slate-300"
                  />

                  <span className="text-sm leading-6 text-slate-500">
                    I agree to the STACKRA Academy terms,
                    privacy policy and learning policies.
                  </span>
                </label>

                {/* SUBMIT */}

                <button
                  type="submit"
                  className="flex w-full items-center justify-center gap-2 rounded-xl bg-slate-950 py-4 font-semibold text-white transition hover:bg-slate-800"
                >
                  Create Student Account
                  <ArrowRight size={18} />
                </button>
              </form>

              <div className="mt-8 text-center text-sm text-slate-500">
                Already registered?

                <Link
                  href="/academy/login"
                  className="ml-1 font-semibold text-slate-950"
                >
                  Sign in
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}

      <footer className="border-t border-slate-200 bg-white">
        <div className="mx-auto max-w-6xl px-6 py-7 text-center text-xs text-slate-500">
          © {new Date().getFullYear()} STACKRA TECHNOLOGIES.
          All rights reserved.
        </div>
      </footer>
    </main>
  );
}
