"use client";

import {
Search,
Lightbulb,
Palette,
Code2,
Bug,
Rocket,
ArrowRight,
} from "lucide-react";

const processSteps = [
{
number: "01",
title: "Discover",
description:
"We understand your business, goals, challenges, and the problems your software needs to solve.",
icon: Search,
},
{
number: "02",
title: "Strategy",
description:
"We plan the right technology, architecture, features, and roadmap for your digital solution.",
icon: Lightbulb,
},
{
number: "03",
title: "Design",
description:
"We create modern, intuitive, and user-focused interfaces designed for an excellent experience.",
icon: Palette,
},
{
number: "04",
title: "Develop",
description:
"Our development process transforms your ideas into fast, scalable, and powerful software.",
icon: Code2,
},
{
number: "05",
title: "Test",
description:
"We carefully test performance, functionality, responsiveness, and reliability before launch.",
icon: Bug,
},
{
number: "06",
title: "Launch & Grow",
description:
"We deploy your solution and provide continuous support as your business grows.",
icon: Rocket,
},
];

export default function ProcessSection() {
return ( <section
   id="process"
   className="relative overflow-hidden bg-slate-950 py-24 sm:py-28"
 >
{/* Background */} <div className="absolute inset-0"> <div className="absolute left-1/2 top-0 h-[500px] w-[700px] -translate-x-1/2 rounded-full bg-blue-600/10 blur-[150px]" />


    <div
      className="absolute inset-0 opacity-[0.03]"
      style={{
        backgroundImage:
          "radial-gradient(circle, white 1px, transparent 1px)",
        backgroundSize: "28px 28px",
      }}
    />
  </div>

  <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
    {/* Header */}
    <div className="mx-auto max-w-3xl text-center">
      <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-blue-500/20 bg-blue-500/10 px-4 py-2 text-sm font-medium text-blue-400">
        <span className="h-2 w-2 animate-pulse rounded-full bg-blue-400" />
        HOW WE WORK
      </div>

      <h2 className="text-4xl font-bold tracking-tight text-white sm:text-5xl lg:text-6xl">
        From Idea to
        <span className="block bg-gradient-to-r from-blue-400 via-cyan-300 to-blue-500 bg-clip-text text-transparent">
          Digital Reality
        </span>
      </h2>

      <p className="mx-auto mt-6 max-w-2xl text-base leading-8 text-slate-400 sm:text-lg">
        Our structured development process helps transform your ideas into
        powerful, scalable, and reliable digital solutions.
      </p>
    </div>

    {/* Process Timeline */}
    <div className="relative mt-20">
      {/* Desktop Connecting Line */}
      <div className="absolute left-0 right-0 top-[55px] hidden h-px bg-gradient-to-r from-transparent via-blue-500/40 to-transparent lg:block" />

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {processSteps.map((step, index) => {
          const Icon = step.icon;

          return (
            <div
              key={step.number}
              className="group relative rounded-2xl border border-white/10 bg-white/[0.03] p-7 transition-all duration-500 hover:-translate-y-2 hover:border-blue-500/40 hover:bg-white/[0.05]"
            >
              {/* Hover Glow */}
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-blue-500/10 via-transparent to-cyan-500/10 opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

              <div className="relative">
                {/* Top Row */}
                <div className="flex items-center justify-between">
                  {/* Icon */}
                  <div className="relative z-10 flex h-16 w-16 items-center justify-center rounded-2xl border border-blue-500/30 bg-slate-950 text-blue-400 shadow-lg shadow-blue-500/10 transition-all duration-300 group-hover:scale-110 group-hover:border-cyan-400 group-hover:bg-blue-500 group-hover:text-white">
                    <Icon size={28} strokeWidth={1.8} />
                  </div>

                  {/* Step Number */}
                  <span className="text-4xl font-bold text-white/5 transition-colors duration-300 group-hover:text-blue-400/20">
                    {step.number}
                  </span>
                </div>

                {/* Content */}
                <div className="mt-8">
                  <div className="flex items-center gap-3">
                    <span className="text-xs font-semibold uppercase tracking-[0.2em] text-blue-400">
                      Step {step.number}
                    </span>

                    {index !== processSteps.length - 1 && (
                      <ArrowRight
                        size={15}
                        className="text-slate-600"
                      />
                    )}
                  </div>

                  <h3 className="mt-4 text-2xl font-bold text-white">
                    {step.title}
                  </h3>

                  <p className="mt-4 leading-7 text-slate-400">
                    {step.description}
                  </p>
                </div>

                {/* Bottom Progress Line */}
                <div className="mt-8 h-1 w-full overflow-hidden rounded-full bg-white/5">
                  <div className="h-full w-0 rounded-full bg-gradient-to-r from-blue-500 to-cyan-400 transition-all duration-700 group-hover:w-full" />
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>

    {/* Bottom CTA */}
    <div className="mt-20 flex flex-col items-center justify-between gap-8 rounded-3xl border border-blue-500/20 bg-gradient-to-r from-blue-600/10 via-slate-900 to-cyan-500/10 p-8 sm:p-10 lg:flex-row">
      <div>
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-cyan-400">
          Let's Build Together
        </p>

        <h3 className="mt-3 text-2xl font-bold text-white sm:text-3xl">
          Have an idea? Let's turn it into reality.
        </h3>

        <p className="mt-3 max-w-2xl text-slate-400">
          Partner with STACKRA TECHNOLOGIES to build intelligent, modern,
          and scalable digital solutions.
        </p>
      </div>

      <a
        href="#contact"
        className="group inline-flex shrink-0 items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-500 px-7 py-4 font-semibold text-white shadow-lg shadow-blue-500/20 transition-all duration-300 hover:scale-105 hover:shadow-blue-500/40"
      >
        Start Your Project

        <ArrowRight
          size={18}
          className="transition-transform duration-300 group-hover:translate-x-1"
        />
      </a>
    </div>
  </div>
</section>

);
}
