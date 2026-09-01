"use client";

import { motion } from "framer-motion";
import { Check } from "lucide-react";

export default function ServiceCard({ service, index }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05 }}
      viewport={{ once: true }}
      className="group flex flex-col overflow-hidden rounded-3xl border border-gray-100 bg-white transition-all hover:border-indigo-200"
    >
      <div className="relative h-52 w-full overflow-hidden">
        <img
          src={service.image}
          alt={service.title}
          className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
        />
      </div>

      <div className="flex flex-1 flex-col p-10">
        <h3 className="mb-4 text-2xl font-semibold">
          {service.title}
        </h3>

        <p className="mb-8 text-gray-600">
          {service.desc}
        </p>

        <ul className="mt-auto space-y-3">
          {service.points.map((point, i) => (
            <li
              key={i}
              className="flex items-start gap-3 text-gray-700"
            >
              <Check className="mt-0.5 h-5 w-5 flex-shrink-0 text-emerald-500" />

              {point}
            </li>
          ))}
        </ul>
      </div>
    </motion.div>
  );
}