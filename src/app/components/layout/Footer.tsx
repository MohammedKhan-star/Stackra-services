"use client";

import Image from "next/image";
import {
  Linkedin,
  Instagram,
  Phone,
} from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-gray-950 text-gray-400 py-20">
      <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-12">
        
        {/* Company Info */}
        <div>
          <div className="flex items-center gap-3 mb-6">
            <Image
              src="/logo/logo6.png"
              alt="STACKRA TECHNOLOGIES"
              width={50}
              height={50}
              className="rounded-xl"
            />

            <span className="text-white font-bold text-2xl tracking-tight">
              STACKRA TECHNOLOGIES
            </span>
          </div>

          <p className="max-w-md">
            Premium web development and AI solutions company based in India.
            Building the future of digital experiences.
          </p>
        </div>

        {/* Social Links */}
        <div className="flex flex-col md:items-end gap-8">
          <div className="flex gap-6">
            
            <a
              href="https://www.linkedin.com/company/stackra-technologies"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-white transition"
              aria-label="LinkedIn"
            >
              <Linkedin />
            </a>

            <a
              href="https://www.instagram.com/stackra_technologies"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-white transition"
              aria-label="Instagram"
            >
              <Instagram />
            </a>

            <a
              href="https://wa.me/919618563743"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-white transition"
              aria-label="WhatsApp"
            >
              <Phone />
            </a>
          </div>

          <div className="md:text-right">
            <p>
              © {new Date().getFullYear()} STACKRA TECHNOLOGIES. All Rights
              Reserved.
            </p>

            <p className="text-xs mt-2">
              Designed & Developed by Mohammed Khan
            </p>
          </div>
        </div>

      </div>
    </footer>
  );
}