"use client";

import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  ArrowUpRight,
  Sparkles,
  Code2,
  BrainCircuit,
  Layers3,
} from "lucide-react";

export default function Hero() {
  return (
    <section
      id="home"
      className="relative min-h-screen overflow-hidden bg-[#020812]"
    >
      {/* Hero Background Image */}
      <div className="absolute inset-0">
        <Image
          src="/hero-back.png"
          alt="STACKRA TECHNOLOGIES futuristic technology background"
          fill
          priority
          sizes="100vw"
          className="object-cover object-center"
        />

        {/* Dark overlay for readability */}
        <div className="absolute inset-0 bg-[#020812]/70" />

        {/* Left-side dark gradient */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#020812] via-[#020812]/85 to-transparent" />

        {/* Bottom fade */}
        <div className="absolute inset-x-0 bottom-0 h-64 bg-gradient-to-t from-[#020812] to-transparent" />

        {/* Subtle cyan atmospheric glow */}
        <div className="absolute left-[45%] top-1/3 h-96 w-96 rounded-full bg-cyan-400/5 blur-[140px]" />
      </div>

      {/* Content */}
      <div className="relative z-10 mx-auto flex min-h-screen max-w-7xl items-center px-6 py-28 lg:px-8">
        <div className="grid w-full items-center gap-14 lg:grid-cols-2">

          {/* LEFT CONTENT */}
          <div className="max-w-3xl">

            {/* Badge */}
            <div className="mb-7 inline-flex items-center gap-2 rounded-full border border-cyan-400/25 bg-cyan-400/10 px-4 py-2 backdrop-blur-md">
              <Sparkles
                size={15}
                className="text-cyan-400"
              />

              <span className="text-xs font-bold uppercase tracking-[0.22em] text-cyan-300">
                Technology for a Smarter Tomorrow
              </span>
            </div>

            {/* Main Heading */}
            <h1 className="text-5xl font-black leading-[0.98] tracking-tight text-white sm:text-6xl lg:text-7xl xl:text-8xl">
              Build the
              <span className="block text-cyan-400">
                Future.
              </span>

              <span className="block">
                Automate.
              </span>

              <span className="block text-white/90">
                Grow.
              </span>
            </h1>

            {/* Description */}
            <p className="mt-7 max-w-2xl text-base leading-8 text-slate-300 sm:text-lg">
              STACKRA TECHNOLOGIES builds modern software, AI-powered
              platforms and digital solutions that help businesses
              simplify operations, improve productivity and grow
              in the digital world.
            </p>

            {/* CTA */}
            <div className="mt-9 flex flex-col gap-4 sm:flex-row">

              <Link
                href="#contact"
                className="group inline-flex items-center justify-center gap-2 rounded-full bg-cyan-400 px-7 py-3.5 text-sm font-black text-slate-950 shadow-[0_0_35px_rgba(34,211,238,0.18)] transition duration-300 hover:bg-cyan-300 hover:shadow-[0_0_45px_rgba(34,211,238,0.3)]"
              >
                Start a Project

                <ArrowRight
                  size={17}
                  className="transition-transform duration-300 group-hover:translate-x-1"
                />
              </Link>

              <Link
                href="#products"
                className="inline-flex items-center justify-center gap-2 rounded-full border border-white/15 bg-white/5 px-7 py-3.5 text-sm font-bold text-white backdrop-blur-md transition duration-300 hover:border-cyan-400/40 hover:bg-cyan-400/10 hover:text-cyan-300"
              >
                Explore Products

                <ArrowUpRight size={17} />
              </Link>

            </div>

            {/* Trust / Technology Points */}
            <div className="mt-12 flex flex-wrap gap-7 border-t border-white/10 pt-7">

              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-cyan-400/20 bg-cyan-400/10">
                  <Code2
                    size={19}
                    className="text-cyan-400"
                  />
                </div>

                <div>
                  <p className="text-sm font-bold text-white">
                    Software
                  </p>

                  <p className="text-xs text-slate-500">
                    Modern Solutions
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-cyan-400/20 bg-cyan-400/10">
                  <BrainCircuit
                    size={19}
                    className="text-cyan-400"
                  />
                </div>

                <div>
                  <p className="text-sm font-bold text-white">
                    Artificial Intelligence
                  </p>

                  <p className="text-xs text-slate-500">
                    Intelligent Systems
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-cyan-400/20 bg-cyan-400/10">
                  <Layers3
                    size={19}
                    className="text-cyan-400"
                  />
                </div>

                <div>
                  <p className="text-sm font-bold text-white">
                    Digital Platforms
                  </p>

                  <p className="text-xs text-slate-500">
                    Built to Scale
                  </p>
                </div>
              </div>

            </div>
          </div>

          {/* RIGHT SIDE */}
          <div className="relative hidden min-h-[500px] lg:block">

            {/* Floating glass panel */}
            <div className="absolute right-4 top-1/2 w-[360px] -translate-y-1/2 rounded-3xl border border-cyan-400/15 bg-[#020812]/45 p-6 shadow-2xl backdrop-blur-xl">

              <div className="flex items-center justify-between">
                <div>
                  <p className="text-[10px] font-bold uppercase tracking-[0.25em] text-cyan-400">
                    STACKRA
                  </p>

                  <h2 className="mt-1 text-xl font-black text-white">
                    Digital Innovation
                  </h2>
                </div>

                <div className="flex h-11 w-11 items-center justify-center rounded-2xl border border-cyan-400/20 bg-cyan-400/10">
                  <Sparkles
                    size={21}
                    className="text-cyan-400"
                  />
                </div>
              </div>

              <div className="mt-7 space-y-3">

                <div className="rounded-2xl border border-white/10 bg-white/[0.035] p-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-semibold text-white">
                      AI Solutions
                    </span>

                    <span className="text-xs text-cyan-400">
                      AI
                    </span>
                  </div>

                  <div className="mt-3 h-1.5 overflow-hidden rounded-full bg-white/10">
                    <div className="h-full w-[88%] rounded-full bg-cyan-400" />
                  </div>
                </div>

                <div className="rounded-2xl border border-white/10 bg-white/[0.035] p-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-semibold text-white">
                      Software Development
                    </span>

                    <span className="text-xs text-cyan-400">
                      WEB
                    </span>
                  </div>

                  <div className="mt-3 h-1.5 overflow-hidden rounded-full bg-white/10">
                    <div className="h-full w-[94%] rounded-full bg-cyan-400" />
                  </div>
                </div>

                <div className="rounded-2xl border border-white/10 bg-white/[0.035] p-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-semibold text-white">
                      Business Platforms
                    </span>

                    <span className="text-xs text-cyan-400">
                      SaaS
                    </span>
                  </div>

                  <div className="mt-3 h-1.5 overflow-hidden rounded-full bg-white/10">
                    <div className="h-full w-[82%] rounded-full bg-cyan-400" />
                  </div>
                </div>

              </div>

              <div className="mt-6 border-t border-white/10 pt-5">
                <div className="flex items-center justify-between">
                  <span className="text-xs text-slate-500">
                    BUILD
                  </span>

                  <span className="text-xs text-slate-500">
                    AUTOMATE
                  </span>

                  <span className="text-xs text-slate-500">
                    GROW
                  </span>
                </div>
              </div>

            </div>

          </div>

        </div>
      </div>

      {/* Bottom Brand Strip */}
      <div className="absolute inset-x-0 bottom-0 z-20 border-t border-white/5 bg-[#020812]/50 backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4 lg:px-8">

          <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-slate-500">
            STACKRA TECHNOLOGIES
          </p>

          <div className="hidden items-center gap-5 text-[10px] font-bold uppercase tracking-[0.25em] text-slate-600 sm:flex">
            <span>Software</span>
            <span className="text-cyan-400">•</span>
            <span>AI</span>
            <span className="text-cyan-400">•</span>
            <span>Digital Solutions</span>
          </div>

          <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-cyan-400">
            Build • Automate • Grow
          </p>

        </div>
      </div>
    </section>
  );
}
