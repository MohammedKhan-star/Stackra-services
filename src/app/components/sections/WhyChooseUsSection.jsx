"use client";

import {
BrainCircuit,
Code2,
ShieldCheck,
Rocket,
Headphones,
ChartNoAxesCombined,
ArrowUpRight,
} from "lucide-react";

const features = [
{
icon: BrainCircuit,
number: "01",
title: "AI-Powered Solutions",
description:
"We build intelligent software solutions that help businesses automate operations, improve decision-making, and unlock new opportunities.",
},
{
icon: Code2,
number: "02",
title: "Modern Technology",
description:
"We use modern technologies and scalable architectures to build fast, reliable, and future-ready digital products.",
},
{
icon: ShieldCheck,
number: "03",
title: "Secure & Reliable",
description:
"Security and reliability are built into our development process to help protect your business and digital infrastructure.",
},
{
icon: Rocket,
number: "04",
title: "Scalable Growth",
description:
"Our software is designed to grow with your business, from early-stage operations to large-scale digital transformation.",
},
{
icon: Headphones,
number: "05",
title: "Continuous Support",
description:
"We believe great software requires ongoing improvement, maintenance, and reliable technical support.",
},
{
icon: ChartNoAxesCombined,
number: "06",
title: "Business Focused",
description:
"Every solution is designed around real business problems, helping organizations improve efficiency and performance.",
},
];

export default function WhyChooseUsSection() {
return ( <section
   id="why-choose-us"
   className="relative overflow-hidden bg-slate-950 py-24 sm:py-28"
 >
{/* Background Effects */} <div className="absolute inset-0"> <div className="absolute left-1/4 top-0 h-[500px] w-[500px] rounded-full bg-blue-600/10 blur-[140px]" /> <div className="absolute bottom-0 right-1/4 h-[400px] w-[400px] rounded-full bg-cyan-500/10 blur-[140px]" /> </div>

  <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
    {/* Header */}
    <div className="mx-auto mb-16 max-w-3xl text-center">
      <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-blue-500/20 bg-blue-500/10 px-4 py-2 text-sm font-medium text-blue-400">
        <span className="h-2 w-2 animate-pulse rounded-full bg-blue-400" />
        WHY STACKRA TECHNOLOGIES
      </div>

      <h2 className="text-4xl font-bold tracking-tight text-white sm:text-5xl lg:text-6xl">
        Technology Built for
        <span className="block bg-gradient-to-r from-blue-400 via-cyan-300 to-blue-500 bg-clip-text text-transparent">
          Your Business Growth
        </span>
      </h2>

      <p className="mx-auto mt-6 max-w-2xl text-base leading-8 text-slate-400 sm:text-lg">
        We combine technology, innovation, and business strategy to create
        powerful digital solutions that help organizations move forward.
      </p>
    </div>

    {/* Feature Grid */}
    <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
      {features.map((feature) => {
        const Icon = feature.icon;

        return (
          <div
            key={feature.number}
            className="group relative overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03] p-7 transition-all duration-300 hover:-translate-y-2 hover:border-blue-500/40 hover:bg-white/[0.06]"
          >
            {/* Hover Glow */}
            <div className="absolute -right-20 -top-20 h-40 w-40 rounded-full bg-blue-500/10 blur-3xl opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

            <div className="relative">
              {/* Top */}
              <div className="flex items-start justify-between">
                <div className="flex h-14 w-14 items-center justify-center rounded-xl border border-blue-500/20 bg-blue-500/10 text-blue-400 transition-all duration-300 group-hover:scale-110 group-hover:bg-blue-500 group-hover:text-white">
                  <Icon size={26} strokeWidth={1.8} />
                </div>

                <span className="text-sm font-semibold text-slate-600">
                  {feature.number}
                </span>
              </div>

              {/* Content */}
              <h3 className="mt-8 text-xl font-semibold text-white">
                {feature.title}
              </h3>

              <p className="mt-4 leading-7 text-slate-400">
                {feature.description}
              </p>

              {/* Bottom Link */}
              <div className="mt-7 flex items-center gap-2 text-sm font-semibold text-blue-400">
                <span>Explore More</span>

                <ArrowUpRight
                  size={17}
                  className="transition-transform duration-300 group-hover:-translate-y-1 group-hover:translate-x-1"
                />
              </div>
            </div>
          </div>
        );
      })}
    </div>

    {/* Bottom Statement */}
    <div className="mt-16 rounded-2xl border border-white/10 bg-gradient-to-r from-blue-600/10 via-transparent to-cyan-500/10 p-8 text-center sm:p-10">
      <p className="text-xl font-medium text-white sm:text-2xl">
        Building intelligent technology for the next generation of
        businesses.
      </p>

      <p className="mt-3 text-slate-400">
        Innovative software. Intelligent systems. Real business impact.
      </p>
    </div>
  </div>
</section>


);
}
