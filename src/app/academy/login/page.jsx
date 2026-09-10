"use client";

import Link from "next/link";
import { useState } from "react";
import {
  ArrowRight,
  BookOpen,
  Eye,
  EyeOff,
  Lock,
  Mail,
  ShieldCheck,
} from "lucide-react";

export default function AcademyLoginPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    email: "",
    password: "",
    remember: false,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.email || !form.password) {
      alert("Please enter your email and password.");
      return;
    }

    setLoading(true);

    // Authentication API will be connected next.
    setTimeout(() => {
      setLoading(false);
      alert("Login system will be connected to MongoDB next.");
    }, 800);
  };

  return (
    <main className="min-h-screen bg-slate-950 text-white">
      {/* Header */}
      <header className="border-b border-white/10 bg-slate-950/90">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5">
          <Link
            href="/academy"
            className="flex items-center gap-3"
          >
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-blue-500 to-cyan-400">
              <BookOpen className="h-5 w-5 text-white" />
            </div>

            <div>
              <div className="text-lg font-bold tracking-tight">
                STACKRA
              </div>
              <div className="text-xs font-medium text-cyan-400">
                ACADEMY
              </div>
            </div>
          </Link>

          <Link
            href="/academy"
            className="text-sm font-medium text-slate-300 transition hover:text-white"
          >
            Back to Academy
          </Link>
        </div>
      </header>

      {/* Main */}
      <section className="relative overflow-hidden">
        <div className="absolute -left-40 top-20 h-80 w-80 rounded-full bg-blue-600/20 blur-3xl" />
        <div className="absolute -right-40 bottom-0 h-96 w-96 rounded-full bg-cyan-500/10 blur-3xl" />

        <div className="relative mx-auto grid min-h-[calc(100vh-81px)] max-w-7xl items-center gap-12 px-6 py-14 lg:grid-cols-2">
          {/* Left */}
          <div className="hidden lg:block">
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-blue-400/20 bg-blue-500/10 px-4 py-2 text-sm text-blue-300">
              <ShieldCheck className="h-4 w-4" />
              Secure Student Portal
            </div>

            <h1 className="max-w-xl text-5xl font-bold leading-tight">
              Continue Your
              <span className="block bg-gradient-to-r from-blue-400 to-cyan-300 bg-clip-text text-transparent">
                Learning Journey.
              </span>
            </h1>

            <p className="mt-6 max-w-xl text-lg leading-8 text-slate-400">
              Sign in to access your courses, learning progress,
              certificates, assignments, and personalized learning
              experience at STACKRA Academy.
            </p>

            <div className="mt-10 grid max-w-lg grid-cols-2 gap-4">
              <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-5">
                <div className="text-2xl font-bold">Courses</div>
                <p className="mt-1 text-sm text-slate-400">
                  Learn practical technology skills.
                </p>
              </div>

              <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-5">
                <div className="text-2xl font-bold">Certificates</div>
                <p className="mt-1 text-sm text-slate-400">
                  Earn certificates after completion.
                </p>
              </div>
            </div>
          </div>

          {/* Login Card */}
          <div className="mx-auto w-full max-w-md">
            <div className="rounded-3xl border border-white/10 bg-white/[0.05] p-6 shadow-2xl backdrop-blur-xl sm:p-8">
              {/* Mobile logo */}
              <div className="mb-7 flex justify-center lg:hidden">
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-500 to-cyan-400">
                  <BookOpen className="h-7 w-7" />
                </div>
              </div>

              <div className="text-center">
                <h2 className="text-3xl font-bold">
                  Welcome Back
                </h2>

                <p className="mt-2 text-sm text-slate-400">
                  Sign in to your STACKRA Academy account
                </p>
              </div>

              <form
                onSubmit={handleSubmit}
                className="mt-8 space-y-5"
              >
                {/* Email */}
                <div>
                  <label
                    htmlFor="email"
                    className="mb-2 block text-sm font-medium text-slate-200"
                  >
                    Email Address
                  </label>

                  <div className="relative">
                    <Mail className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-500" />

                    <input
                      id="email"
                      name="email"
                      type="email"
                      value={form.email}
                      onChange={handleChange}
                      placeholder="you@example.com"
                      autoComplete="email"
                      className="w-full rounded-xl border border-white/10 bg-slate-900/80 py-3.5 pl-12 pr-4 text-sm text-white outline-none transition placeholder:text-slate-600 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
                    />
                  </div>
                </div>

                {/* Password */}
                <div>
                  <div className="mb-2 flex items-center justify-between">
                    <label
                      htmlFor="password"
                      className="block text-sm font-medium text-slate-200"
                    >
                      Password
                    </label>

                    <Link
                      href="/academy/forgot-password"
                      className="text-xs font-medium text-blue-400 transition hover:text-blue-300"
                    >
                      Forgot Password?
                    </Link>
                  </div>

                  <div className="relative">
                    <Lock className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-500" />

                    <input
                      id="password"
                      name="password"
                      type={showPassword ? "text" : "password"}
                      value={form.password}
                      onChange={handleChange}
                      placeholder="Enter your password"
                      autoComplete="current-password"
                      className="w-full rounded-xl border border-white/10 bg-slate-900/80 py-3.5 pl-12 pr-12 text-sm text-white outline-none transition placeholder:text-slate-600 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
                    />

                    <button
                      type="button"
                      onClick={() =>
                        setShowPassword((prev) => !prev)
                      }
                      className="absolute right-3 top-1/2 -translate-y-1/2 rounded-lg p-2 text-slate-500 transition hover:text-white"
                      aria-label={
                        showPassword
                          ? "Hide password"
                          : "Show password"
                      }
                    >
                      {showPassword ? (
                        <EyeOff className="h-5 w-5" />
                      ) : (
                        <Eye className="h-5 w-5" />
                      )}
                    </button>
                  </div>
                </div>

                {/* Remember */}
                <label className="flex cursor-pointer items-center gap-3 text-sm text-slate-400">
                  <input
                    type="checkbox"
                    name="remember"
                    checked={form.remember}
                    onChange={handleChange}
                    className="h-4 w-4 rounded border-slate-700 bg-slate-900 text-blue-500 focus:ring-blue-500"
                  />

                  Remember me
                </label>

                {/* Submit */}
                <button
                  type="submit"
                  disabled={loading}
                  className="flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-500 px-5 py-3.5 text-sm font-semibold text-white shadow-lg shadow-blue-900/20 transition hover:scale-[1.01] hover:from-blue-500 hover:to-cyan-400 disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {loading ? (
                    "Signing in..."
                  ) : (
                    <>
                      Sign In
                      <ArrowRight className="h-4 w-4" />
                    </>
                  )}
                </button>
              </form>

              {/* Register */}
              <div className="mt-7 text-center text-sm text-slate-400">
                Don't have an account?{" "}
                <Link
                  href="/academy/register"
                  className="font-semibold text-blue-400 transition hover:text-blue-300"
                >
                  Create Account
                </Link>
              </div>

              {/* Security */}
              <div className="mt-7 flex items-center justify-center gap-2 border-t border-white/10 pt-6 text-xs text-slate-500">
                <ShieldCheck className="h-4 w-4" />
                Your account information is securely protected.
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-white/10 py-6">
        <div className="mx-auto max-w-7xl px-6 text-center text-xs text-slate-500">
          © {new Date().getFullYear()} STACKRA Academy — STACKRA
          TECHNOLOGIES
        </div>
      </footer>
    </main>
  );
}
