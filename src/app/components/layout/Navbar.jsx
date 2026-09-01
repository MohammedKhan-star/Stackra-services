"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";

import {
  ArrowUpRight,
  ChevronDown,
  Menu,
  X,
  Sparkles,
  MonitorSmartphone,
  BrainCircuit,
  GraduationCap,
} from "lucide-react";

const navLinks = [
  { name: "Home", href: "#home" },
  { name: "About", href: "#about" },
  { name: "Services", href: "#services" },
  { name: "Technology", href: "#technologies" },
  { name: "Projects", href: "#projects" },
];

const ecosystemLinks = [
  {
    name: "STACKRA WebApp",
    description: "Smart business software & digital platforms",
    href: "/webapp",
    icon: MonitorSmartphone,
  },
  {
    name: "STACKRA AI",
    description: "Intelligent AI-powered technology solutions",
    href: "/ai",
    icon: BrainCircuit,
  },
  {
    name: "STACKRA Academy",
    description: "Learn technology and build future skills",
    href: "/academy",
    icon: GraduationCap,
  },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isEcosystemOpen, setIsEcosystemOpen] = useState(false);

  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target)
      ) {
        setIsEcosystemOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const closeMobileMenu = () => {
    setIsOpen(false);
    setIsEcosystemOpen(false);
  };

  return (
    <header
  className={`sticky top-0 z-50 w-full transition-all duration-300 ${
    isScrolled
      ? "border-b border-indigo-100 bg-white/90 shadow-sm backdrop-blur-xl"
      : "border-b border-slate-100 bg-slate-50"
  }`}
>
<nav className="mx-auto flex h-[72px] w-full max-w-[1400px] items-center justify-between px-6 lg:px-8">        
        {/* Logo */}
        <Link
          href="#home"
          onClick={closeMobileMenu}
          className="group flex items-center"
        >
          <Image
            src="/logo/logo10.png"
            alt="STACKRA TECHNOLOGIES"
            width={220}
            height={60}
            priority
            className="h-auto w-[150px] object-contain sm:w-[180px] md:w-[200px]"
          />

        </Link>

        {/* Desktop Navigation */}
        <div className="hidden items-center gap-6 lg:flex">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className="text-sm font-medium text-slate-600 transition-colors duration-200 hover:text-indigo-600"
            >
              {link.name}
            </Link>
          ))}

          {/* Ecosystem Dropdown */}
          <div ref={dropdownRef} className="relative">
            <button
              onClick={() =>
                setIsEcosystemOpen(!isEcosystemOpen)
              }
              className="flex items-center gap-1 text-sm font-medium text-slate-600 transition-colors hover:text-indigo-600"
            >
              Ecosystem

              <ChevronDown
                size={16}
                className={`transition-transform duration-300 ${
                  isEcosystemOpen ? "rotate-180" : ""
                }`}
              />
            </button>

            {isEcosystemOpen && (
              <div className="absolute right-0 top-10 w-80 overflow-hidden rounded-2xl border border-slate-200 bg-white p-3 shadow-2xl">
                
                <div className="mb-2 px-3 py-2">
                  <div className="flex items-center gap-2">
                    <Sparkles
                      size={14}
                      className="text-indigo-600"
                    />

                    <p className="text-xs font-semibold uppercase tracking-widest text-indigo-600">
                      STACKRA ECOSYSTEM
                    </p>
                  </div>
                </div>

                {ecosystemLinks.map((item) => {
                  const Icon = item.icon;

                  return (
                    <Link
                      key={item.name}
                      href={item.href}
                      onClick={() =>
                        setIsEcosystemOpen(false)
                      }
                      className="group flex items-start gap-3 rounded-xl p-3 transition hover:bg-slate-50"
                    >
                      <div className="mt-0.5 flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-indigo-50 text-indigo-600 transition group-hover:bg-indigo-600 group-hover:text-white">
                        <Icon size={18} />
                      </div>

                      <div>
                        <p className="font-semibold text-slate-900 transition group-hover:text-indigo-600">
                          {item.name}
                        </p>

                        <p className="mt-1 text-xs leading-5 text-slate-500">
                          {item.description}
                        </p>
                      </div>
                    </Link>
                  );
                })}
              </div>
            )}
          </div>

          <Link
            href="#faq"
            className="text-sm font-medium text-slate-600 transition-colors hover:text-indigo-600"
          >
            FAQ
          </Link>
        </div>

        {/* CTA */}
        <div className="hidden lg:block">
          <Link
            href="#contact"
            className="group inline-flex items-center gap-2 rounded-xl bg-indigo-600 px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-indigo-600/20 transition-all duration-200 hover:-translate-y-0.5 hover:bg-indigo-700"
          >
            Start a Project

            <ArrowUpRight
              size={17}
              className="transition-transform duration-300 group-hover:-translate-y-1 group-hover:translate-x-1"
            />
          </Link>
        </div>

        {/* Mobile Button */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="flex h-10 w-10 items-center justify-center rounded-lg border border-slate-200 text-slate-900 transition hover:bg-slate-50 lg:hidden"
          aria-label="Toggle navigation menu"
        >
          {isOpen ? <X size={21} /> : <Menu size={21} />}
        </button>
      </nav>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="border-t border-slate-200 bg-white lg:hidden">
          <div className="space-y-1 px-4 py-4 sm:px-6">
            
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                onClick={closeMobileMenu}
                className="block rounded-lg px-4 py-3 text-sm font-medium text-slate-700 transition hover:bg-indigo-50 hover:text-indigo-600"
              >
                {link.name}
              </Link>
            ))}

            {/* Mobile Ecosystem */}
            <button
              onClick={() =>
                setIsEcosystemOpen(!isEcosystemOpen)
              }
              className="flex w-full items-center justify-between rounded-lg px-4 py-3 text-left text-sm font-medium text-slate-700"
            >
              STACKRA Ecosystem

              <ChevronDown
                size={17}
                className={`transition-transform duration-300 ${
                  isEcosystemOpen ? "rotate-180" : ""
                }`}
              />
            </button>

            {isEcosystemOpen && (
              <div className="space-y-1 rounded-xl bg-slate-50 p-2">
                {ecosystemLinks.map((item) => (
                  <Link
                    key={item.name}
                    href={item.href}
                    onClick={closeMobileMenu}
                    className="block rounded-lg px-4 py-3 transition hover:bg-white"
                  >
                    <span className="block text-sm font-semibold text-slate-800">
                      {item.name}
                    </span>

                    <span className="mt-1 block text-xs text-slate-500">
                      {item.description}
                    </span>
                  </Link>
                ))}
              </div>
            )}

            <Link
              href="#faq"
              onClick={closeMobileMenu}
              className="block rounded-lg px-4 py-3 text-sm font-medium text-slate-700 transition hover:bg-indigo-50 hover:text-indigo-600"
            >
              FAQ
            </Link>

            <Link
              href="#contact"
              onClick={closeMobileMenu}
              className="mt-4 flex items-center justify-center gap-2 rounded-xl bg-indigo-600 px-5 py-3.5 text-sm font-semibold text-white shadow-lg shadow-indigo-600/20"
            >
              Start a Project
              <ArrowUpRight size={18} />
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}