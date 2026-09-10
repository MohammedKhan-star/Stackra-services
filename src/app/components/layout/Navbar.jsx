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
  BookOpen,
  Newspaper,
} from "lucide-react";

const navLinks = [
  {
    name: "Home",
    href: "#home",
  },
  {
    name: "About",
    href: "#about",
  },
  {
    name: "Services",
    href: "#services",
  },
  {
    name: "Technology",
    href: "#technologies",
  },
  {
    name: "Projects",
    href: "#projects",
  },
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
  {
    name: "STACKRA Books",
    description: "Technology books, guides & learning resources",
    href: "/books",
    icon: BookOpen,
  },
  {
    name: "STACKRA Blogs",
    description: "Technology insights, ideas & industry updates",
    href: "/blogs",
    icon: Newspaper,
  },
];

export default function Navbar() {
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [isDesktopEcosystemOpen, setIsDesktopEcosystemOpen] =
    useState(false);
  const [isMobileEcosystemOpen, setIsMobileEcosystemOpen] =
    useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  const desktopDropdownRef = useRef(null);

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
        desktopDropdownRef.current &&
        !desktopDropdownRef.current.contains(event.target)
      ) {
        setIsDesktopEcosystemOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener(
        "mousedown",
        handleClickOutside
      );
    };
  }, []);

  const closeMobileMenu = () => {
    setIsMobileOpen(false);
    setIsMobileEcosystemOpen(false);
  };

  const handleMobileMenuToggle = () => {
    setIsMobileOpen((previous) => !previous);

    setIsDesktopEcosystemOpen(false);
  };

  const handleDesktopEcosystem = () => {
    setIsDesktopEcosystemOpen((previous) => !previous);
  };

  const handleMobileEcosystem = () => {
    setIsMobileEcosystemOpen((previous) => !previous);
  };

  return (
    <header
      className={`sticky top-0 z-50 w-full transition-all duration-300 ${
        isScrolled
          ? "border-b border-indigo-100 bg-white/95 shadow-sm backdrop-blur-xl"
          : "border-b border-slate-100 bg-slate-50"
      }`}
    >
      <nav className="mx-auto flex h-[72px] w-full max-w-[1400px] items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* LOGO */}
        <Link
          href="/"
          onClick={closeMobileMenu}
          className="group flex shrink-0 items-center"
        >
          <Image
            src="/logo/logo10.png"
            alt="STACKRA TECHNOLOGIES"
            width={220}
            height={60}
            priority
            className="h-auto w-[140px] object-contain sm:w-[170px] md:w-[190px]"
          />
        </Link>

        {/* DESKTOP NAVIGATION */}
        <div className="hidden items-center gap-5 lg:flex">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className="whitespace-nowrap text-sm font-medium text-slate-600 transition-colors duration-200 hover:text-indigo-600"
            >
              {link.name}
            </Link>
          ))}

          {/* DESKTOP ECOSYSTEM */}
          <div
            ref={desktopDropdownRef}
            className="relative"
          >
            <button
              type="button"
              onClick={handleDesktopEcosystem}
              aria-expanded={isDesktopEcosystemOpen}
              className="flex items-center gap-1 whitespace-nowrap text-sm font-medium text-slate-600 transition-colors hover:text-indigo-600"
            >
              STACKRA Ecosystem

              <ChevronDown
                size={16}
                className={`transition-transform duration-300 ${
                  isDesktopEcosystemOpen
                    ? "rotate-180"
                    : ""
                }`}
              />
            </button>

            {isDesktopEcosystemOpen && (
              <div className="absolute right-0 top-11 z-[60] w-[340px] overflow-hidden rounded-2xl border border-slate-200 bg-white p-3 shadow-2xl">
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

                <div className="space-y-1">
                  {ecosystemLinks.map((item) => {
                    const Icon = item.icon;

                    return (
                      <Link
                        key={item.name}
                        href={item.href}
                        onClick={() =>
                          setIsDesktopEcosystemOpen(false)
                        }
                        className="group flex items-start gap-3 rounded-xl p-3 transition hover:bg-slate-50"
                      >
                        <div className="mt-0.5 flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-indigo-50 text-indigo-600 transition group-hover:bg-indigo-600 group-hover:text-white">
                          <Icon size={18} />
                        </div>

                        <div className="min-w-0">
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
              </div>
            )}
          </div>

          {/* FAQ */}
          <Link
            href="#faq"
            className="whitespace-nowrap text-sm font-medium text-slate-600 transition-colors hover:text-indigo-600"
          >
            FAQ
          </Link>
        </div>

        {/* DESKTOP CTA */}
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

        {/* MOBILE MENU BUTTON */}
        <button
          type="button"
          onClick={handleMobileMenuToggle}
          aria-label={
            isMobileOpen
              ? "Close navigation menu"
              : "Open navigation menu"
          }
          aria-expanded={isMobileOpen}
          className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-900 transition hover:bg-slate-50 lg:hidden"
        >
          {isMobileOpen ? (
            <X size={22} />
          ) : (
            <Menu size={22} />
          )}
        </button>
      </nav>

      {/* MOBILE NAVIGATION */}
      {isMobileOpen && (
        <div className="max-h-[calc(100vh-72px)] overflow-y-auto border-t border-slate-200 bg-white lg:hidden">
          <div className="space-y-1 px-4 py-4 sm:px-6">
            {/* Mobile Main Links */}
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                onClick={closeMobileMenu}
                className="flex min-h-[48px] items-center rounded-xl px-4 py-3 text-base font-medium text-slate-700 transition active:bg-indigo-100 hover:bg-indigo-50 hover:text-indigo-600"
              >
                {link.name}
              </Link>
            ))}

            {/* MOBILE ECOSYSTEM BUTTON */}
            <button
              type="button"
              onClick={handleMobileEcosystem}
              aria-expanded={isMobileEcosystemOpen}
              className="flex min-h-[48px] w-full items-center justify-between rounded-xl px-4 py-3 text-left text-base font-medium text-slate-700 transition active:bg-indigo-100 hover:bg-indigo-50 hover:text-indigo-600"
            >
              <span>STACKRA Ecosystem</span>

              <ChevronDown
                size={19}
                className={`shrink-0 transition-transform duration-300 ${
                  isMobileEcosystemOpen
                    ? "rotate-180"
                    : ""
                }`}
              />
            </button>

            {/* MOBILE ECOSYSTEM LINKS */}
            {isMobileEcosystemOpen && (
              <div className="mt-1 space-y-1 rounded-2xl border border-slate-200 bg-slate-50 p-2">
                {ecosystemLinks.map((item) => {
                  const Icon = item.icon;

                  return (
                    <Link
                      key={item.name}
                      href={item.href}
                      onClick={closeMobileMenu}
                      className="flex min-h-[64px] w-full items-center gap-3 rounded-xl bg-white px-3 py-3 transition active:bg-indigo-100 hover:bg-indigo-50"
                    >
                      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-indigo-50 text-indigo-600">
                        <Icon size={18} />
                      </div>

                      <div className="min-w-0">
                        <span className="block text-sm font-semibold text-slate-800">
                          {item.name}
                        </span>

                        <span className="mt-1 block text-xs leading-5 text-slate-500">
                          {item.description}
                        </span>
                      </div>

                      <ArrowUpRight
                        size={16}
                        className="ml-auto shrink-0 text-slate-400"
                      />
                    </Link>
                  );
                })}
              </div>
            )}

            {/* FAQ */}
            <Link
              href="#faq"
              onClick={closeMobileMenu}
              className="flex min-h-[48px] items-center rounded-xl px-4 py-3 text-base font-medium text-slate-700 transition active:bg-indigo-100 hover:bg-indigo-50 hover:text-indigo-600"
            >
              FAQ
            </Link>

            {/* MOBILE CTA */}
            <Link
              href="#contact"
              onClick={closeMobileMenu}
              className="mt-3 flex min-h-[50px] items-center justify-center gap-2 rounded-xl bg-indigo-600 px-5 py-3.5 text-sm font-semibold text-white shadow-lg shadow-indigo-600/20 transition active:scale-[0.98] hover:bg-indigo-700"
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
