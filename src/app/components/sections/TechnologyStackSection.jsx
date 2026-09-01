"use client";

import {
Atom,
Code2,
Database,
BrainCircuit,
Cloud,
Server,
ShieldCheck,
Layers,
} from "lucide-react";

const technologies = [
{
name: "Next.js",
category: "Frontend Framework",
icon: Layers,
description: "Fast, scalable and modern web applications.",
},
{
name: "React",
category: "User Interface",
icon: Atom,
description: "Interactive and powerful user experiences.",
},
{
name: "Node.js",
category: "Backend Development",
icon: Server,
description: "Reliable APIs and scalable server applications.",
},
{
name: "MongoDB",
category: "Database",
icon: Database,
description: "Flexible and scalable data management.",
},
{
name: "Artificial Intelligence",
category: "Intelligent Systems",
icon: BrainCircuit,
description: "AI-powered automation and smart business solutions.",
},
{
name: "Cloud Technology",
category: "Cloud Infrastructure",
icon: Cloud,
description: "Secure and scalable cloud-based applications.",
},
{
name: "REST APIs",
category: "System Integration",
icon: Code2,
description: "Seamless communication between applications.",
},
{
name: "Cyber Security",
category: "Application Security",
icon: ShieldCheck,
description: "Secure systems designed with protection in mind.",
},
];

export default function TechnologyStackSection() {
return ( <section
   id="technologies"
   className="relative overflow-hidden bg-slate-900 py-24 sm:py-28"
 >
{/* Background Effects */} <div className="absolute inset-0 overflow-hidden"> <div className="absolute left-[-150px] top-1/4 h-[450px] w-[450px] rounded-full bg-blue-600/10 blur-[140px]" />


    <div className="absolute right-[-150px] bottom-0 h-[450px] w-[450px] rounded-full bg-cyan-500/10 blur-[140px]" />

    {/* Grid Pattern */}
    <div
      className="absolute inset-0 opacity-[0.04]"
      style={{
        backgroundImage:
          "linear-gradient(to right, white 1px, transparent 1px), linear-gradient(to bottom, white 1px, transparent 1px)",
        backgroundSize: "60px 60px",
      }}
    />
  </div>

  <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
    {/* Header */}
    <div className="grid items-end gap-8 lg:grid-cols-2">
      <div>
        <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-cyan-500/20 bg-cyan-500/10 px-4 py-2 text-sm font-medium text-cyan-400">
          <span className="h-2 w-2 animate-pulse rounded-full bg-cyan-400" />
          OUR TECHNOLOGY STACK
        </div>

        <h2 className="text-4xl font-bold tracking-tight text-white sm:text-5xl lg:text-6xl">
          Powered by Modern
          <span className="block bg-gradient-to-r from-blue-400 via-cyan-300 to-blue-500 bg-clip-text text-transparent">
            Technologies
          </span>
        </h2>
      </div>

      <p className="max-w-xl text-base leading-8 text-slate-400 sm:text-lg lg:ml-auto">
        We use powerful, modern, and scalable technologies to build
        high-performance digital products designed for the future.
      </p>
    </div>

    {/* Technology Cards */}
    <div className="mt-16 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
      {technologies.map((technology) => {
        const Icon = technology.icon;

        return (
          <div
            key={technology.name}
            className="group relative min-h-[280px] overflow-hidden rounded-2xl border border-white/10 bg-slate-950/50 p-6 backdrop-blur-sm transition-all duration-500 hover:-translate-y-2 hover:border-cyan-400/40"
          >
            {/* Hover Glow */}
            <div className="absolute inset-0 bg-gradient-to-br from-blue-500/0 via-cyan-500/0 to-blue-500/0 opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

            {/* Number */}
            <span className="absolute right-5 top-5 text-xs font-bold tracking-widest text-slate-700">
              STACKRA
            </span>

            <div className="relative flex h-full flex-col">
              {/* Icon */}
              <div className="flex h-14 w-14 items-center justify-center rounded-xl border border-cyan-500/20 bg-cyan-500/10 text-cyan-400 transition-all duration-300 group-hover:scale-110 group-hover:border-cyan-400/50 group-hover:bg-cyan-500 group-hover:text-white">
                <Icon size={27} strokeWidth={1.8} />
              </div>

              {/* Category */}
              <p className="mt-8 text-xs font-semibold uppercase tracking-[0.18em] text-blue-400">
                {technology.category}
              </p>

              {/* Name */}
              <h3 className="mt-3 text-xl font-bold text-white">
                {technology.name}
              </h3>

              {/* Description */}
              <p className="mt-4 text-sm leading-6 text-slate-400">
                {technology.description}
              </p>

              {/* Bottom Line */}
              <div className="mt-auto pt-6">
                <div className="h-px w-full bg-gradient-to-r from-cyan-400/50 via-blue-500/20 to-transparent transition-all duration-500 group-hover:from-cyan-400 group-hover:via-blue-400" />
              </div>
            </div>
          </div>
        );
      })}
    </div>

    {/* Bottom Technology Banner */}
    <div className="relative mt-16 overflow-hidden rounded-3xl border border-white/10 bg-slate-950 p-8 sm:p-12">
      <div className="absolute inset-0 bg-gradient-to-r from-blue-600/10 via-transparent to-cyan-500/10" />

      <div className="relative grid items-center gap-8 lg:grid-cols-[1fr_auto]">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-blue-400">
            Future Ready Technology
          </p>

          <h3 className="mt-4 max-w-2xl text-2xl font-bold text-white sm:text-3xl">
            We build technology that grows with your business.
          </h3>

          <p className="mt-4 max-w-2xl leading-7 text-slate-400">
            From modern web applications to AI-powered business platforms,
            STACKRA TECHNOLOGIES focuses on scalable and intelligent
            digital solutions.
          </p>
        </div>

        {/* Decorative Tech Circle */}
        <div className="flex h-28 w-28 items-center justify-center rounded-full border border-cyan-400/20 bg-cyan-500/10">
          <div className="flex h-20 w-20 items-center justify-center rounded-full border border-blue-400/30 bg-blue-500/10">
            <Code2 className="text-cyan-400" size={34} />
          </div>
        </div>
      </div>
    </div>
  </div>
</section>


);
}
