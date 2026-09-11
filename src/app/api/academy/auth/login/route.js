"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useState } from "react";
import {
  ArrowLeft,
  ArrowRight,
  Eye,
  EyeOff,
  GraduationCap,
  Lock,
  Mail,
} from "lucide-react";

export default function AcademyLoginPage() {
  const searchParams = useSearchParams();

  const requestedRedirect =
    searchParams.get("redirect") || "/academy/dashboard";

  const redirect = requestedRedirect.startsWith("/academy/")
    ? requestedRedirect
    : "/academy/dashboard";

  const [form, setForm] = useState({
    email: "",
    password: "",
    remember: false,
  });

  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChange = (event) => {
    const { name, value, type, checked } = event.target;

    setForm((current) => ({
      ...current,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!form.email.trim()) {
      alert("Please enter your email address.");
      return;
    }

    if (!form.password) {
      alert("Please enter your password.");
      return;
    }

    try {
      setLoading(true);

      const response = await fetch("/api/academy/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: form.email.trim(),
          password: form.password,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        alert(data.message || "Login failed.");
        return;
      }

      window.location.href = redirect;
    } catch (error) {
      console.error("Login error:", error);
      alert("Unable to connect to the server. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const registerUrl = redirect.startsWith("/academy/enroll/")
    ? `/academy/register?course=${redirect.split("/").pop()}`
    : "/academy/register";

  return (
    <main className="min-h-screen bg-slate-50">
      <div className="grid min-h-screen lg:grid-cols-2">
        {/* Left Section */}
        <section className="hidden bg-gradient-to-br from-blue-700 via-indigo-700 to-purple-800 p-10 text-white lg:flex lg:flex-col lg:justify-between xl:p-16">
          <div>
            <Link
              href="/academy"
              className="inline-flex items-center gap-2 text-lg font-extrabold"
            >
              <GraduationCap size={28} />
              STACKRA Academy
            </Link>

            <div className="mt-24 max-w-xl">
              <p className="text-sm font-bold uppercase tracking-[0.2em] text-blue-200">
                Welcome Back
              </p>

              <h1 className="mt-4 text-5xl font-extrabold leading-tight">
                Continue your
                <br />
                learning journey.
              </h1>

              <p className="mt-6 text-lg leading-8 text-blue-100">
                Login to your STACKRA Academy account and continue learning
                practical technology skills.
              </p>

              <div className="mt-10 space-y-4">
                {[
                  "Access your student dashboard",
                  "Continue your enrolled courses",
                  "Track learning progress",
                  "Earn course certificates",
                ].map((item) => (
                  <div key={item} className="flex items-center gap-3">
                    <div className="h-2 w-2 rounded-full bg-white" />
                    <span className="text-sm font-semibold text-blue-50">
                      {item}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <p className="text-sm text-blue-200">
            © {new Date().getFullYear()} STACKRA Academy
          </p>
        </section>

        {/* Right Section */}
        <section className="flex items-center justify-center px-4 py-8 sm:px-6 lg:px-12">
          <div className="w-full max-w-md">
            <Link
              href="/academy"
              className="mb-8 inline-flex items-center gap-2 text-sm font-semibold text-slate-500 transition hover:text-blue-600"
            >
              <ArrowLeft size={17} />
              Back to Academy
            </Link>

            <div className="mb-8 lg:hidden">
              <Link
                href="/academy"
                className="text-xl font-extrabold text-slate-900"
              >
                STACKRA <span className="text-blue-600">Academy</span>
              </Link>
            </div>

            {redirect.startsWith("/academy/enroll/") && (
              <div className="mb-6 rounded-2xl border border-blue-100 bg-blue-50 p-4">
                <p className="text-xs font-bold uppercase tracking-wider text-blue-600">
                  Enrollment
                </p>

                <p className="mt-1 text-sm font-semibold text-blue-900">
                  After login, you will return to your selected course.
                </p>
              </div>
            )}

            <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-xl sm:p-8">
              <div className="mb-8">
                <h2 className="text-3xl font-extrabold tracking-tight text-slate-900">
                  Welcome back
                </h2>

                <p className="mt-2 text-sm leading-6 text-slate-500">
                  Login to continue to STACKRA Academy.
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-5">
                {/* Email */}
                <div>
                  <label
                    htmlFor="email"
                    className="mb-2 block text-sm font-bold text-slate-700"
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
                      value={form.email}
                      onChange={handleChange}
                      placeholder="you@example.com"
                      autoComplete="email"
                      disabled={loading}
                      className="w-full rounded-xl border border-slate-300 bg-white py-3.5 pl-11 pr-4 text-sm outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-100 disabled:bg-slate-50"
                    />
                  </div>
                </div>

                {/* Password */}
                <div>
                  <div className="mb-2 flex items-center justify-between">
                    <label
                      htmlFor="password"
                      className="block text-sm font-bold text-slate-700"
                    >
                      Password
                    </label>

                    <button
                      type="button"
                      onClick={() =>
                        alert("Password recovery will be added soon.")
                      }
                      className="text-xs font-semibold text-blue-600 hover:text-blue-700"
                    >
                      Forgot Password?
                    </button>
                  </div>

                  <div className="relative">
                    <Lock
                      size={18}
                      className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                    />

                    <input
                      id="password"
                      name="password"
                      type={showPassword ? "text" : "password"}
                      value={form.password}
                      onChange={handleChange}
                      placeholder="Enter your password"
                      autoComplete="current-password"
                      disabled={loading}
                      className="w-full rounded-xl border border-slate-300 bg-white py-3.5 pl-11 pr-12 text-sm outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-100 disabled:bg-slate-50"
                    />

                    <button
                      type="button"
                      onClick={() => setShowPassword((value) => !value)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 rounded-lg p-2 text-slate-400 hover:text-slate-700"
                      aria-label={
                        showPassword ? "Hide password" : "Show password"
                      }
                    >
                      {showPassword ? (
                        <EyeOff size={18} />
                      ) : (
                        <Eye size={18} />
                      )}
                    </button>
                  </div>
                </div>

                {/* Remember */}
                <label className="flex cursor-pointer items-center gap-3">
                  <input
                    type="checkbox"
                    name="remember"
                    checked={form.remember}
                    onChange={handleChange}
                    disabled={loading}
                    className="h-4 w-4 rounded border-slate-300 text-blue-600 focus:ring-blue-500"
                  />

                  <span className="text-sm text-slate-500">
                    Remember me
                  </span>
                </label>

                {/* Submit */}
                <button
                  type="submit"
                  disabled={loading}
                  className="flex w-full items-center justify-center gap-2 rounded-xl bg-blue-600 px-5 py-3.5 text-sm font-bold text-white shadow-lg shadow-blue-600/20 transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {loading ? "Signing In..." : "Login to Academy"}

                  {!loading && <ArrowRight size={18} />}
                </button>
              </form>

              <div className="my-6 flex items-center gap-3">
                <div className="h-px flex-1 bg-slate-200" />
                <span className="text-xs text-slate-400">OR</span>
                <div className="h-px flex-1 bg-slate-200" />
              </div>

              <p className="text-center text-sm text-slate-500">
                Don't have an account?{" "}
                <Link
                  href={registerUrl}
                  className="font-bold text-blue-600 hover:text-blue-700"
                >
                  Create Account
                </Link>
              </p>
            </div>

            <p className="mt-6 text-center text-xs leading-5 text-slate-400">
              STACKRA Academy provides practical technology learning for
              students and professionals.
            </p>
          </div>
        </section>
      </div>
    </main>
  );
}
