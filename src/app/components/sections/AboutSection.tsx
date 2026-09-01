"use client";

import Link from "next/link";
import {
  ArrowUpRight,
  BadgeCheck,
  BrainCircuit,
  Code2,
  Globe2,
  Layers3,
  Rocket,
  ShieldCheck,
} from "lucide-react";

const capabilities = [
  {
    icon: Code2,
    title: "Software Engineering",
    description:
      "Scalable web applications and custom software built for modern businesses.",
  },
  {
    icon: BrainCircuit,
    title: "Artificial Intelligence",
    description:
      "Intelligent solutions designed to automate workflows and unlock new possibilities.",
  },
  {
    icon: Layers3,
    title: "Digital Products",
    description:
      "Powerful platforms and digital experiences designed for growth and performance.",
  },
];

export default function AboutSection() {
  return (
    <section
      id="about"
      className="relative overflow-hidden bg-white py-24 sm:py-32"
    >
      {/* Background */}
      <div className="absolute inset-0">
        <div className="absolute left-0 top-20 h-72 w-72 rounded-full bg-blue-500/10 blur-3xl" />
        <div className="absolute bottom-0 right-0 h-96 w-96 rounded-full bg-cyan-500/10 blur-3xl" />
      </div>

      <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
        {/* Top Label */}
        <div className="mb-16 max-w-3xl">
          <div className="inline-flex items-center gap-2 rounded-full border border-blue-200 bg-blue-50 px-4 py-2 text-sm font-semibold text-blue-700">
            <BadgeCheck size={17} />
            ABOUT STACKRA TECHNOLOGIES
          </div>

          <h2 className="mt-6 text-4xl font-bold tracking-tight text-slate-950 sm:text-5xl lg:text-6xl">
            Building Technology
            <span className="block bg-gradient-to-r from-blue-600 via-indigo-600 to-cyan-500 bg-clip-text text-transparent">
              That Moves Businesses Forward.
            </span>
          </h2>

          <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-600">
            STACKRA TECHNOLOGIES is a modern technology company focused on
            building powerful software, intelligent digital products, and
            scalable solutions for businesses ready to grow in a digital-first
            world.
          </p>
        </div>

        <div className="grid items-center gap-12 lg:grid-cols-[1.05fr_0.95fr]">
          {/* Left Content */}
          <div>
            <div className="grid gap-5 sm:grid-cols-2">
              <div className="rounded-3xl border border-slate-200 bg-slate-950 p-7 text-white shadow-xl">
                <Rocket className="mb-8 text-cyan-400" size={32} />

                <h3 className="text-xl font-bold">Innovation Driven</h3>

                <p className="mt-3 text-sm leading-6 text-slate-400">
                  We combine creativity, technology, and strategic thinking to
                  build solutions designed for the future.
                </p>
              </div>

              <div className="rounded-3xl border border-slate-200 bg-white p-7 shadow-sm transition hover:-translate-y-1 hover:shadow-xl">
                <ShieldCheck className="mb-8 text-blue-600" size={32} />

                <h3 className="text-xl font-bold text-slate-950">
                  Built for Trust
                </h3>

                <p className="mt-3 text-sm leading-6 text-slate-600">
                  Reliable technology, secure systems, and professional
                  solutions built with long-term growth in mind.
                </p>
              </div>
            </div>

            <div className="mt-5 rounded-3xl border border-slate-200 bg-gradient-to-br from-blue-50 to-cyan-50 p-8">
              <div className="flex flex-col gap-6 sm:flex-row sm:items-start">
                <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-blue-600 text-white shadow-lg">
                  <Globe2 size={28} />
                </div>

                <div>
                  <h3 className="text-xl font-bold text-slate-950">
                    Technology Without Limits
                  </h3>

                  <p className="mt-3 leading-7 text-slate-600">
                    From business websites to advanced web applications and
                    AI-powered platforms, we help transform ideas into powerful
                    digital experiences.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Content - Capabilities */}
          <div className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-xl sm:p-8">
            <div className="mb-8">
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-blue-600">
                What We Build
              </p>

              <h3 className="mt-3 text-3xl font-bold text-slate-950">
                Technology designed for real-world impact.
              </h3>
            </div>

            <div className="space-y-4">
              {capabilities.map((item) => {
                const Icon = item.icon;

                return (
                  <div
                    key={item.title}
                    className="group flex gap-5 rounded-2xl border border-slate-200 p-5 transition duration-300 hover:border-blue-300 hover:bg-blue-50"
                  >
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-slate-950 text-cyan-400 transition group-hover:scale-110">
                      <Icon size={24} />
                    </div>

                    <div>
                      <h4 className="font-bold text-slate-950">
                        {item.title}
                      </h4>

                      <p className="mt-2 text-sm leading-6 text-slate-600">
                        {item.description}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>

            <Link
              href="/about"
              className="group mt-8 inline-flex items-center gap-2 font-semibold text-blue-600 transition hover:text-blue-700"
            >
              Discover Our Story
              <ArrowUpRight
                size={18}
                className="transition-transform group-hover:translate-x-1 group-hover:-translate-y-1"
              />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}