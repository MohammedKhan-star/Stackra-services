"use client";

import Link from "next/link";
import { ArrowRight, CheckCircle2 } from "lucide-react";

export default function HeroSection() {
return ( <section className="relative min-h-screen flex items-center overflow-hidden bg-slate-950">


  {/* Background Effects */}
  <div className="absolute inset-0">
    <div className="absolute top-20 left-10 w-72 h-72 bg-indigo-600/20 rounded-full blur-3xl" />
    <div className="absolute bottom-10 right-10 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl" />
  </div>

  {/* Grid Background */}
  <div className="absolute inset-0 opacity-[0.08] bg-[linear-gradient(to_right,#ffffff_1px,transparent_1px),linear-gradient(to_bottom,#ffffff_1px,transparent_1px)] bg-[size:60px_60px]" />

  <div className="relative z-10 max-w-7xl mx-auto px-6 py-32 w-full">
    <div className="max-w-4xl">

      {/* Badge */}
      <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-indigo-500/40 bg-indigo-500/10 text-indigo-300 text-sm font-medium mb-8">
        <span className="w-2 h-2 rounded-full bg-indigo-400 animate-pulse" />
        INNOVATION • TECHNOLOGY • AI
      </div>

      {/* Main Heading */}
      <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight text-white leading-[1.05]">
        Building the Future
        <span className="block text-indigo-400">
          With Technology.
        </span>
      </h1>

      {/* Description */}
      <p className="mt-8 max-w-2xl text-lg md:text-xl leading-relaxed text-slate-300">
        STACKRA TECHNOLOGIES helps businesses transform ideas into powerful
        digital experiences through modern websites, custom software,
        AI-powered solutions, and scalable technology platforms.
      </p>

      {/* Feature Points */}
      <div className="mt-8 flex flex-wrap gap-x-6 gap-y-3 text-slate-300">
        <div className="flex items-center gap-2">
          <CheckCircle2 size={18} className="text-indigo-400" />
          Custom Software
        </div>

        <div className="flex items-center gap-2">
          <CheckCircle2 size={18} className="text-indigo-400" />
          AI Solutions
        </div>

        <div className="flex items-center gap-2">
          <CheckCircle2 size={18} className="text-indigo-400" />
          Modern Web Development
        </div>
      </div>

      {/* Buttons */}
      <div className="mt-10 flex flex-col sm:flex-row gap-4">

        <Link
          href="/contact"
          className="inline-flex items-center justify-center gap-2 px-7 py-4 rounded-xl bg-indigo-600 text-white font-semibold transition hover:bg-indigo-500 hover:scale-[1.02]"
        >
          Start Your Project
          <ArrowRight size={20} />
        </Link>

        <Link
          href="/services"
          className="inline-flex items-center justify-center gap-2 px-7 py-4 rounded-xl border border-slate-600 text-white font-semibold transition hover:bg-white/10"
        >
          Explore Our Services
        </Link>

      </div>

      {/* Stats */}
      <div className="mt-16 grid grid-cols-3 max-w-xl border-t border-slate-800 pt-8">

        <div>
          <h3 className="text-2xl md:text-3xl font-bold text-white">
            Web
          </h3>
          <p className="text-sm text-slate-400 mt-1">
            Development
          </p>
        </div>

        <div>
          <h3 className="text-2xl md:text-3xl font-bold text-white">
            AI
          </h3>
          <p className="text-sm text-slate-400 mt-1">
            Solutions
          </p>
        </div>

        <div>
          <h3 className="text-2xl md:text-3xl font-bold text-white">
            SaaS
          </h3>
          <p className="text-sm text-slate-400 mt-1">
            Platforms
          </p>
        </div>

      </div>

    </div>
  </div>

  {/* Bottom Gradient */}
  <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-slate-950 to-transparent" />

</section>

);
}
