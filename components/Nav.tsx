"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { motion, useScroll, useSpring, AnimatePresence } from "framer-motion";
import type { ProfileData } from "@/lib/content";

const links = [
  { id: "experience", label: "Experience" },
  { id: "research", label: "Research" },
  { id: "credentials", label: "Credentials" },
  { id: "skills", label: "Skills" },
  { id: "awards", label: "Recognition" },
  { id: "contact", label: "Contact" },
];

interface NavProps {
  profile: ProfileData;
}

export default function Nav({ profile }: NavProps) {
  const { scrollYProgress } = useScroll();
  const w = useSpring(scrollYProgress, { stiffness: 120, damping: 24 });
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Close mobile menu on resize to desktop
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) setMobileMenuOpen(false);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Prevent background scrolling when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [mobileMenuOpen]);

  return (
    <header className="fixed inset-x-0 top-0 z-50 bg-surface/90 backdrop-blur-md border-b border-[var(--line)]/80">
      <nav className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6">
        {/* Brand Link */}
        <a
          href="#top"
          onClick={() => setMobileMenuOpen(false)}
          className="group flex items-center gap-2.5 sm:gap-3 text-sm sm:text-base font-black text-ink transition-opacity hover:opacity-90"
        >
          <div className="relative h-8 w-8 shrink-0 overflow-hidden rounded-full ring-1 ring-brand/80 bg-soft shadow-sm transition-transform duration-200 group-hover:scale-105">
            <Image
              src={profile.profilePhoto || "/belal-profile.jpg"}
              alt={profile.name}
              width={32}
              height={32}
              priority
              className="h-full w-full object-cover"
            />
          </div>
          <span className="tracking-tight truncate max-w-[140px] xs:max-w-none">
            {profile.name}
          </span>
        </a>

        {/* Desktop Nav Links */}
        <ul className="hidden gap-6 lg:gap-8 text-sm font-medium md:flex">
          {links.map((l) => (
            <li key={l.id}>
              <a
                href={`#${l.id}`}
                className="text-body transition-colors hover:text-ink"
              >
                {l.label}
              </a>
            </li>
          ))}
        </ul>

        {/* Action Buttons & Mobile Toggle */}
        <div className="flex items-center gap-2 sm:gap-3">
          <motion.a
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            href="#credentials"
            className="hidden sm:inline-flex items-center gap-1.5 border border-[var(--line)] bg-surface px-3 py-1.5 text-xs font-bold uppercase tracking-wider text-ink transition-all hover:border-brand hover:bg-brand hover:text-[#111110] rounded-sm"
          >
            <span className="h-1.5 w-1.5 rounded-full bg-brand" />
            Certificates
          </motion.a>

          <motion.a
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            href={profile.cvLink || "/Md_Belal_Ashraf_cv.pdf"}
            download
            className="btn btn-brand px-3 sm:px-5 py-1.5 sm:py-2 text-xs uppercase tracking-wider"
          >
            CV
          </motion.a>

          {/* Mobile Hamburger Toggle */}
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
            aria-expanded={mobileMenuOpen}
            className="flex h-9 w-9 items-center justify-center rounded-sm border border-[var(--line)] bg-surface text-ink transition-colors hover:border-brand hover:bg-brand hover:text-[#111110] md:hidden"
          >
            {mobileMenuOpen ? (
              <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )}
          </button>
        </div>
      </nav>

      {/* Progress Bar */}
      <motion.div style={{ scaleX: w }} className="h-[2px] origin-left bg-brand" />

      {/* Mobile Drawer Navigation */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25, ease: "easeInOut" }}
            className="border-b border-[var(--line)] bg-surface/98 backdrop-blur-xl md:hidden overflow-hidden"
          >
            <div className="flex flex-col px-6 py-6 space-y-4">
              <div className="flex items-center gap-2 pb-2 border-b border-[var(--line)] text-xs font-bold uppercase tracking-widest text-ink/70">
                <span className="h-1.5 w-1.5 rounded-full bg-brand" />
                Portfolio Navigation
              </div>

              {links.map((l) => (
                <a
                  key={l.id}
                  href={`#${l.id}`}
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center justify-between py-2 text-base font-bold text-ink transition-colors hover:text-brand"
                >
                  <span>{l.label}</span>
                  <span className="text-xs text-body font-mono">→</span>
                </a>
              ))}

              <div className="pt-4 border-t border-[var(--line)] flex flex-col gap-2.5">
                <a
                  href="#credentials"
                  onClick={() => setMobileMenuOpen(false)}
                  className="btn border border-[var(--line)] bg-soft text-ink text-center text-xs uppercase tracking-wider py-2.5 font-bold"
                >
                  Verified Credentials
                </a>
                <a
                  href="/admin"
                  className="text-center text-[11px] font-semibold text-body hover:text-ink pt-2"
                >
                  Admin CMS Portal 🔒
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
