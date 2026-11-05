"use client";

import Image from "next/image";
import { motion, useScroll, useSpring } from "framer-motion";
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

  return (
    <header className="fixed inset-x-0 top-0 z-50 bg-surface/85 backdrop-blur-md border-b border-[var(--line)]/80">
      <nav className="mx-auto flex h-16 max-w-6xl items-center justify-between px-6">
        <a
          href="#top"
          className="group flex items-center gap-3 text-base font-black text-ink transition-opacity hover:opacity-90"
        >
          <div className="relative h-8 w-8 shrink-0 overflow-hidden rounded-full ring-1 ring-brand/80 bg-soft shadow-sm transition-transform duration-200 group-hover:scale-105">
            <Image
              src={profile.profilePhoto || "/belal-profile.jpg"}
              alt={profile.name}
              width={32}
              height={32}
              className="h-full w-full object-cover"
            />
          </div>
          <span className="tracking-tight">{profile.name}</span>
        </a>

        <ul className="hidden gap-8 text-sm font-medium md:flex">
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

        <div className="flex items-center gap-3">
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
            className="btn btn-brand py-2 text-xs uppercase tracking-wider"
          >
            CV
          </motion.a>
        </div>
      </nav>
      <motion.div style={{ scaleX: w }} className="h-[2px] origin-left bg-brand" />
    </header>
  );
}
