"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useState } from "react";
import {
  ArrowLeft,
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
  const searchParams = useSearchParams();

  const selectedCourse = searchParams.get("course") || "";

  const [form, setForm] = useState({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
    agree: false,
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
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

    if (!form.fullName.trim()) {
      alert("Please enter your full name.");
      return;
    }

    if (!form.email.trim()) {
      alert("Please enter your email address.");
      return;
    }

    if (form.password.length < 6) {
      alert("Password must contain at least 6 characters.");
      return;
    }

    if (form.password !== form.confirmPassword) {
      alert("Passwords do not match.");
      return;
    }

    if (!form.agree) {
      alert("Please accept the terms and policies.");
      return;
    }

    try {
      setLoading(true);

      const response = await fetch("/api/academy/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          fullName: form.fullName.trim(),
          email: form.email.trim(),
          password: form.password,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        alert(data.message || "Registration failed.");
        return;
      }

      alert("Student account created successfully!");

      if (selectedCourse) {
        window.location.href = `/academy/login?redirect=/academy/enroll/${selectedCourse}`;
      } else {
        window.location.href = "/academy/login";
      }
    } catch (error) {
      console.error("Registration error:", error);
      alert("Unable to connect to the server. Please try again.");
    } finally {
      setLoading(false);
    }
  };

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
                Start Learning
              </p>

              <h1 className="mt-4 text-5xl font-extrabold leading-tight">
                Build skills.
                <br />
                Build your future.
              </h1>

              <p className="mt-6 text-lg leading-8 text-blue-100">
                Create your student account and start learning practical
                technology skills through STACKRA Academy.
              </p>

              <div className="mt-10 space-y-4">
                {[
                  "Practical technology courses",
                  "Structured learning paths",
                  "Student dashboard",
                  "Course completion certificates",
                ].map((item) => (
                  <div key={item} className="flex items-center gap-3">
                    <CheckCircle2 size={20} />
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
              href={
                selectedCourse
                  ? `/academy/enroll/${selectedCourse}`
                  : "/academy"
              }
              className="mb-8 inline-flex items-center gap-2 text-sm font-semibold text-slate-500 transition hover:text-blue-600"
            >
              <ArrowLeft size={17} />
              Back
            </Link>

            <div className="mb-8 lg:hidden">
              <Link
                href="/academy"
                className="text-xl font-extrabold text-slate-900"
              >
                STACKRA <span className="text-blue-600">Academy</span>
              </Link>
            </div>

            {selectedCourse && (
              <div className="mb-6 rounded-2xl border border-blue-100 bg-blue-50 p-4">
                <p className="text-xs font-bold uppercase tracking-wider text-blue-600">
                  Course Enrollment
                </p>

                <p className="mt-1 text-sm font-semibold text-blue-900">
                  Your selected course will be preserved after registration.
                </p>
              </div>
            )}

            <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-xl sm:p-8">
              <div className="mb-8">
                <h2 className="text-3xl font-extrabold tracking-tight text-slate-900">
                  Create your account
                </h2>

                <p className="mt-2 text-sm leading-6 text-slate-500">
                  Join STACKRA Academy and start your learning journey.
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-5">
                {/* Full Name */}
                <div>
                  <label
                    htmlFor="fullName"
                    className="mb-2 block text-sm font-bold text-slate-700"
                  >
                    Full Name
                  </label>

                  <div className="relative">
                    <User
                      size={18}
                      className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                    />

                    <input
                      id="fullName"
                      name="fullName"
                      type="text"
                      value={form.fullName}
                      onChange={handleChange}
                      placeholder="Enter your full name"
                      autoComplete="name"
                      className="w-full rounded-xl border border-slate-300 bg-white py-3.5 pl-11 pr-4 text-sm outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
                      disabled={loading}
                    />
                  </div>
                </div>

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
                      className="w-full rounded-xl border border-slate-300 bg-white py-3.5 pl-11 pr-4 text-sm outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
                      disabled={loading}
                    />
                  </div>
                </div>

                {/* Password */}
                <div>
                  <label
                    htmlFor="password"
                    className="mb-2 block text-sm font-bold text-slate-700"
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
                      value={form.password}
                      onChange={handleChange}
                      placeholder="Minimum 6 characters"
                      autoComplete="new-password"
                      className="w-full rounded-xl border border-slate-300 bg-white py-3.5 pl-11 pr-12 text-sm outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
                      disabled={loading}
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

                {/* Confirm Password */}
                <div>
                  <label
                    htmlFor="confirmPassword"
                    className="mb-2 block text-sm font-bold text-slate-700"
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
                      type={showConfirmPassword ? "text" : "password"}
                      value={form.confirmPassword}
                      onChange={handleChange}
                      placeholder="Re-enter your password"
                      autoComplete="new-password"
                      className="w-full rounded-xl border border-slate-300 bg-white py-3.5 pl-11 pr-12 text-sm outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
                      disabled={loading}
                    />

                    <button
                      type="button"
                      onClick={() =>
                        setShowConfirmPassword((value) => !value)
                      }
                      className="absolute right-3 top-1/2 -translate-y-1/2 rounded-lg p-2 text-slate-400 hover:text-slate-700"
                      aria-label={
                        showConfirmPassword
                          ? "Hide confirm password"
                          : "Show confirm password"
                      }
                    >
                      {showConfirmPassword ? (
                        <EyeOff size={18} />
                      ) : (
                        <Eye size={18} />
                      )}
                    </button>
                  </div>
                </div>

                {/* Terms */}
                <label className="flex cursor-pointer items-start gap-3">
                  <input
                    type="checkbox"
                    name="agree"
                    checked={form.agree}
                    onChange={handleChange}
                    disabled={loading}
                    className="mt-1 h-4 w-4 rounded border-slate-300 text-blue-600 focus:ring-blue-500"
                  />

                  <span className="text-xs leading-5 text-slate-500">
                    I agree to the STACKRA Academy terms and policies.
                  </span>
                </label>

                {/* Submit */}
                <button
                  type="submit"
                  disabled={loading}
                  className="flex w-full items-center justify-center gap-2 rounded-xl bg-blue-600 px-5 py-3.5 text-sm font-bold text-white shadow-lg shadow-blue-600/20 transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {loading ? "Creating Account..." : "Create Student Account"}

                  {!loading && <ArrowRight size={18} />}
                </button>
              </form>

              <div className="my-6 flex items-center gap-3">
                <div className="h-px flex-1 bg-slate-200" />
                <span className="text-xs text-slate-400">OR</span>
                <div className="h-px flex-1 bg-slate-200" />
              </div>

              <p className="text-center text-sm text-slate-500">
                Already have an account?{" "}
                <Link
                  href={
                    selectedCourse
                      ? `/academy/login?redirect=/academy/enroll/${selectedCourse}`
                      : "/academy/login"
                  }
                  className="font-bold text-blue-600 hover:text-blue-700"
                >
                  Login
                </Link>
              </p>
            </div>

            <p className="mt-6 text-center text-xs leading-5 text-slate-400">
              Your account information is securely stored for your STACKRA
              Academy learning experience.
            </p>
          </div>
        </section>
      </div>
    </main>
  );
}
