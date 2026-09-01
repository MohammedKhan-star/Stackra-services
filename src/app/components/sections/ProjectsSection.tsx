"use client";

import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight, Code2 } from "lucide-react";

const projects = [
{
title: "STACKRA AI",
category: "AI Business Management Platform",
description:
"An intelligent business management platform designed to help organizations manage customers, sales, finance, projects, operations, and AI-powered workflows from one place.",
image: "/projects/stackra-ai.jpg",
technologies: ["Next.js", "MongoDB", "AI"],
    status: "In Development",
},
{
title: "Business Management System",
category: "Custom Software",
description:
"A centralized platform for managing customers, employees, invoices, projects, sales, and business operations efficiently.",
image: "/projects/business-management.jpg",
technologies: ["Next.js", "Node.js", "MongoDB"],
},
{
title: "AI Invoice & Billing System",
category: "AI & SaaS",
description:
"A smart invoicing platform that helps businesses generate invoices, manage payments, track customers, and automate billing workflows.",
image: "/projects/ai-invoice.jpg",
technologies: ["AI", "Razorpay", "MongoDB"],
    status: "In Development",
},
{
title: "School Management Platform",
category: "Education Technology",
description:
"A digital platform for managing students, admissions, attendance, fees, results, teachers, and school administration.",
image: "/projects/school-management.jpg",
technologies: ["Next.js", "Database", "Dashboard"],
},
{
title: "Restaurant Digital Platform",
category: "Web Application",
description:
"A modern digital solution for restaurants featuring online menus, table booking, ordering, customer management, and business analytics.",
image: "/projects/restaurant.jpg",
technologies: ["Web", "Payments", "Analytics"],
},
{
title: "Custom Business Website",
category: "Web Development",
description:
"High-performance, modern websites designed to build strong digital presence and generate leads for businesses.",
image: "/projects/business-website.jpg",
technologies: ["Next.js", "SEO", "UI/UX"],
},
];

export default function ProjectsSection() {
return ( <section className="py-28 bg-white"> <div className="max-w-7xl mx-auto px-6">


    {/* Heading */}
    <div className="max-w-3xl mb-16">
      <div className="flex items-center gap-2 text-indigo-600 font-semibold text-sm tracking-widest uppercase">
        <Code2 size={18} />
        Our Work
      </div>

      <h2 className="mt-4 text-4xl md:text-5xl font-bold text-slate-900">
        Projects Built for the
        <span className="text-indigo-600"> Digital Future.</span>
      </h2>

      <p className="mt-6 text-lg text-slate-600 leading-relaxed">
        Explore innovative digital solutions developed by STACKRA
        TECHNOLOGIES across artificial intelligence, business software,
        SaaS platforms, education technology, and modern web development.
      </p>
    </div>

    {/* Projects Grid */}
    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">

      {projects.map((project) => (
        <div
          key={project.title}
          className="group rounded-2xl overflow-hidden border border-slate-200 bg-white shadow-sm transition duration-300 hover:-translate-y-2 hover:shadow-xl"
        >

          {/* Project Image */}
          <div className="relative h-56 overflow-hidden bg-slate-100">

            <Image
              src={project.image}
              alt={project.title}
              fill
              className="object-cover transition duration-500 group-hover:scale-110"
            />

            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition" />

            <div className="absolute top-4 right-4 w-10 h-10 rounded-full bg-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition">
              <ArrowUpRight
                size={20}
                className="text-slate-900"
              />
            </div>

          </div>

          {/* Content */}
          <div className="p-6">

            <p className="text-sm font-semibold text-indigo-600">
              {project.category}
            </p>

            <h3 className="mt-2 text-xl font-bold text-slate-900">
              {project.title}
            </h3>

            <p className="mt-3 text-slate-600 text-sm leading-relaxed">
              {project.description}
            </p>

            {/* Technologies */}
            <div className="mt-5 flex flex-wrap gap-2">
              {project.technologies.map((tech) => (
                <span
                  key={tech}
                  className="px-3 py-1 rounded-full bg-indigo-50 text-indigo-700 text-xs font-medium"
                >
                  {tech}
                </span>
              ))}
            </div>

          </div>

        </div>
      ))}

    </div>

    {/* CTA */}
    <div className="mt-16 text-center">

      <h3 className="text-2xl md:text-3xl font-bold text-slate-900">
        Have a project in mind?
      </h3>

      <p className="mt-3 text-slate-600">
        Let's turn your idea into a powerful digital solution.
      </p>

      <Link
        href="/contact"
        className="inline-flex items-center gap-2 mt-7 px-7 py-4 rounded-xl bg-indigo-600 text-white font-semibold transition hover:bg-indigo-700"
      >
        Start Your Project
        <ArrowUpRight size={20} />
      </Link>

    </div>

  </div>
</section>


);
}
