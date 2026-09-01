"use client";

import {
Code2,
BrainCircuit,
Building2,
Headphones,
ArrowUpRight,
} from "lucide-react";

const stats = [
{
value: "AI",
suffix: "",
label: "Intelligent Solutions",
description: "Building smarter systems powered by artificial intelligence.",
icon: BrainCircuit,
},
{
value: "24",
suffix: "/7",
label: "Digital Availability",
description: "Technology designed to support modern business operations.",
icon: Headphones,
},
{
value: "∞",
suffix: "",
label: "Scalable Possibilities",
description: "Flexible solutions designed to grow with your business.",
icon: Code2,
},
{
value: "100",
suffix: "%",
label: "Custom Focus",
description: "Solutions designed around your business requirements.",
icon: Building2,
},
];

export default function StatsSection() {
return ( <section
   id="impact"
   className="relative overflow-hidden bg-slate-900 py-24 sm:py-28"
 >
{/* Background Effects */} <div className="absolute inset-0"> <div className="absolute left-1/2 top-1/2 h-[600px] w-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-blue-600/10 blur-[160px]" />

    <div
      className="absolute inset-0 opacity-[0.04]"
      style={{
        backgroundImage:
          "linear-gradient(to right, white 1px, transparent 1px), linear-gradient(to bottom, white 1px, transparent 1px)",
        backgroundSize: "70px 70px",
      }}
    />
  </div>

  <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
    {/* Header */}
    <div className="mx-auto max-w-3xl text-center">
      <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-cyan-500/20 bg-cyan-500/10 px-4 py-2 text-sm font-medium text-cyan-400">
        <span className="h-2 w-2 animate-pulse rounded-full bg-cyan-400" />
        OUR DIGITAL IMPACT
      </div>

      <h2 className="text-4xl font-bold tracking-tight text-white sm:text-5xl lg:text-6xl">
        Built for the
        <span className="block bg-gradient-to-r from-blue-400 via-cyan-300 to-blue-500 bg-clip-text text-transparent">
          Future of Business
        </span>
      </h2>

      <p className="mx-auto mt-6 max-w-2xl text-base leading-8 text-slate-400 sm:text-lg">
        STACKRA TECHNOLOGIES combines modern software development,
        artificial intelligence, and scalable technology to help businesses
        transform digitally.
      </p>
    </div>

    {/* Stats Grid */}
    <div className="mt-16 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
      {stats.map((stat) => {
        const Icon = stat.icon;

        return (
          <div
            key={stat.label}
            className="group relative overflow-hidden rounded-3xl border border-white/10 bg-slate-950/70 p-7 backdrop-blur-xl transition-all duration-500 hover:-translate-y-2 hover:border-blue-500/40"
          >
            {/* Hover Glow */}
            <div className="absolute -right-16 -top-16 h-40 w-40 rounded-full bg-blue-500/10 blur-3xl opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

            <div className="relative">
              {/* Icon */}
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl border border-blue-500/20 bg-blue-500/10 text-blue-400 transition-all duration-300 group-hover:scale-110 group-hover:bg-blue-500 group-hover:text-white">
                <Icon size={26} strokeWidth={1.8} />
              </div>

              {/* Value */}
              <div className="mt-8 flex items-end">
                <span className="text-5xl font-bold tracking-tight text-white">
                  {stat.value}
                </span>

                {stat.suffix && (
                  <span className="mb-1 ml-1 text-xl font-semibold text-cyan-400">
                    {stat.suffix}
                  </span>
                )}
              </div>

              {/* Label */}
              <h3 className="mt-5 text-lg font-semibold text-white">
                {stat.label}
              </h3>

              {/* Description */}
              <p className="mt-3 text-sm leading-6 text-slate-400">
                {stat.description}
              </p>

              {/* Bottom Decoration */}
              <div className="mt-7 flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-blue-400">
                STACKRA TECHNOLOGIES

                <ArrowUpRight
                  size={15}
                  className="transition-transform duration-300 group-hover:-translate-y-1 group-hover:translate-x-1"
                />
              </div>
            </div>
          </div>
        );
      })}
    </div>

    {/* Vision Statement */}
    <div className="relative mt-16 overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-blue-600/10 via-slate-950 to-cyan-500/10 p-8 text-center sm:p-12">
      {/* Decorative circles */}
      <div className="absolute left-0 top-0 h-32 w-32 rounded-full bg-blue-500/10 blur-3xl" />
      <div className="absolute bottom-0 right-0 h-32 w-32 rounded-full bg-cyan-500/10 blur-3xl" />

      <div className="relative mx-auto max-w-3xl">
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-cyan-400">
          Our Vision
        </p>

        <h3 className="mt-5 text-2xl font-bold leading-tight text-white sm:text-3xl lg:text-4xl">
          Empowering businesses through intelligent technology and digital
          innovation.
        </h3>

        <p className="mt-6 leading-8 text-slate-400">
          We believe technology should not just solve today's problems. It
          should prepare businesses for tomorrow's opportunities.
        </p>
      </div>
    </div>
  </div>
</section>

);
}
