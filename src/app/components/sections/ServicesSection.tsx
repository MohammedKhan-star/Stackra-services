"use client";

import Image from "next/image";
import { ArrowUpRight, CheckCircle2 } from "lucide-react";
import services from "../../data/services";
export default function ServicesSection() {
return ( <section className="relative py-28 bg-slate-50 overflow-hidden">


  {/* Background */}
  <div className="absolute top-0 right-0 w-96 h-96 bg-indigo-100/50 rounded-full blur-3xl" />

  <div className="relative max-w-7xl mx-auto px-6">

    {/* Heading */}
    <div className="max-w-3xl mb-16">

      <div className="inline-flex items-center px-4 py-2 rounded-full bg-indigo-100 text-indigo-700 text-sm font-semibold tracking-wide">
        WHAT WE DO
      </div>

      <h2 className="mt-6 text-4xl md:text-5xl font-extrabold text-slate-900 leading-tight">
        Technology Solutions Built
        <span className="block text-indigo-600">
          For Your Growth.
        </span>
      </h2>

      <p className="mt-6 text-lg leading-relaxed text-slate-600">
        STACKRA TECHNOLOGIES delivers modern digital solutions that help
        businesses build, automate, scale, and innovate using powerful
        software and artificial intelligence.
      </p>

    </div>

    {/* Services Grid */}
    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-7">

      {services.map((service) => (
        <div
          key={service.title}
          className="group relative overflow-hidden bg-white border border-slate-200 rounded-2xl transition-all duration-300 hover:-translate-y-2 hover:shadow-xl hover:border-indigo-200"
        >

          {/* Service Image */}
          <div className="relative h-52 w-full overflow-hidden bg-slate-200">

            <Image
              src={service.image}
              alt={service.title}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-110"
            />

            {/* Image Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/60 via-transparent to-transparent" />

            {/* Arrow */}
            <div className="absolute top-5 right-5 w-10 h-10 flex items-center justify-center rounded-full bg-white/90 text-slate-900 shadow-md transition-all duration-300 group-hover:bg-indigo-600 group-hover:text-white group-hover:translate-x-1 group-hover:-translate-y-1">
              <ArrowUpRight size={20} />
            </div>

          </div>

          {/* Content */}
          <div className="p-7">

            {/* Title */}
            <h3 className="text-xl font-bold text-slate-900">
              {service.title}
            </h3>

            {/* Description */}
            <p className="mt-3 text-sm leading-relaxed text-slate-600">
              {service.desc}
            </p>

            {/* Features */}
            <div className="mt-6 space-y-3">

              {service.points.map((point) => (
                <div
                  key={point}
                  className="flex items-center gap-2 text-sm text-slate-700"
                >
                  <CheckCircle2
                    size={17}
                    className="text-indigo-600 flex-shrink-0"
                  />

                  <span>{point}</span>
                </div>
              ))}

            </div>

          </div>

        </div>
      ))}

    </div>

  </div>
</section>

);
}
