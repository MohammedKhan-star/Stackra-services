"use client";

import {
  Activity,
  BriefcaseBusiness,
  Code2,
  Rocket,
} from "lucide-react";

const stats = [
  {
    icon: BriefcaseBusiness,
    value: "10+",
    label: "Digital Projects",
    description: "Innovative solutions built across modern technologies.",
  },
  {
    icon: Code2,
    value: "20+",
    label: "Technologies",
    description: "Modern tools and frameworks powering our development.",
  },
  {
    icon: Rocket,
    value: "100%",
    label: "Growth Focused",
    description: "Every solution is designed with scalability in mind.",
  },
  {
    icon: Activity,
    value: "24/7",
    label: "Digital Vision",
    description: "Always exploring technology, innovation, and possibilities.",
  },
];

export default function StatsSection() {
  return (
    <section className="relative overflow-hidden bg-slate-950 py-20">
      {/* Background Effects */}
      <div className="absolute inset-0">
        <div className="absolute left-1/4 top-0 h-72 w-72 rounded-full bg-blue-600/20 blur-3xl" />

        <div className="absolute bottom-0 right-1/4 h-72 w-72 rounded-full bg-cyan-500/10 blur-3xl" />

        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:60px_60px]" />
      </div>

      <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
        {/* Header */}
        <div className="mb-12 max-w-2xl">
          <p className="text-sm font-semibold uppercase tracking-[0.25em] text-cyan-400">
            STACKRA BY THE NUMBERS
          </p>

          <h2 className="mt-4 text-3xl font-bold text-white sm:text-4xl">
            Building the future, one solution at a time.
          </h2>
        </div>

        {/* Stats */}
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat) => {
            const Icon = stat.icon;

            return (
              <div
                key={stat.label}
                className="group relative overflow-hidden rounded-3xl border border-white/10 bg-white/[0.04] p-7 backdrop-blur-xl transition duration-300 hover:-translate-y-2 hover:border-cyan-400/40 hover:bg-white/[0.07]"
              >
                {/* Hover Glow */}
                <div className="absolute -right-10 -top-10 h-28 w-28 rounded-full bg-blue-500/10 blur-2xl transition group-hover:bg-cyan-400/20" />

                <div className="relative">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-blue-500/20 to-cyan-400/10 text-cyan-400">
                    <Icon size={23} />
                  </div>

                  <div className="mt-7 text-4xl font-bold tracking-tight text-white">
                    {stat.value}
                  </div>

                  <h3 className="mt-3 text-base font-semibold text-white">
                    {stat.label}
                  </h3>

                  <p className="mt-3 text-sm leading-6 text-slate-400">
                    {stat.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom Statement */}
        <div className="mt-12 flex flex-col justify-between gap-6 border-t border-white/10 pt-8 sm:flex-row sm:items-center">
          <p className="max-w-2xl text-sm leading-6 text-slate-400">
            We are building an ecosystem focused on software, artificial
            intelligence, digital innovation, and technology education.
          </p>

          <div className="flex items-center gap-2 text-sm font-semibold text-cyan-400">
            <span className="h-2 w-2 animate-pulse rounded-full bg-cyan-400" />
            Building the future of STACKRA
          </div>
        </div>
      </div>
    </section>
  );
}