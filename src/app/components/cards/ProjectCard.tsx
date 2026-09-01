"use client";

import Image from "next/image";
import { motion } from "framer-motion";

export default function ProjectCard({ project }) {
  return (
    <motion.div
      whileHover={{ y: -8 }}
      className="group bg-white border border-gray-100 rounded-3xl overflow-hidden shadow-sm hover:shadow-xl transition-all"
    >
      <div className="relative h-64">
        <Image
          src={project.image}
          alt={project.title}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-500"
        />
      </div>

      <div className="p-8">
        <h3 className="font-semibold text-2xl mb-4">
          {project.title}
        </h3>

        <div className="flex flex-wrap gap-2 mb-8">
          {project.tech.map((tech) => (
            <span
              key={tech}
              className="text-xs bg-gray-100 px-3 py-1 rounded-full"
            >
              {tech}
            </span>
          ))}
        </div>

        <a
          href={project.live}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center justify-center w-full bg-gray-900 text-white py-3 rounded-2xl hover:bg-black transition"
        >
          View Live Project →
        </a>
      </div>
    </motion.div>
  );
}