"use client";

import dynamic from "next/dynamic";
import Image from "next/image";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { motion } from "framer-motion";
import type { ProfileData } from "@/lib/content";

const Hero3D = dynamic(() => import("./Hero3D"), { ssr: false });

interface HeroProps {
  profile: ProfileData;
  credentialsCount: number;
}

export default function Hero({ profile, credentialsCount }: HeroProps) {
  const root = useRef<HTMLElement>(null);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const ctx = gsap.context(() => {
      gsap
        .timeline({ defaults: { ease: "power4.out" } })
        .from(".h-avatar", { scale: 0.8, opacity: 0, duration: 1, ease: "back.out(1.8)" })
        .from(".h-line", { yPercent: 110, duration: 1, stagger: 0.12 }, "-=0.7")
        .from(".h-fade", { opacity: 0, y: 16, duration: 0.7, stagger: 0.08 }, "-=0.5")
        .from(".h-3d", { opacity: 0, scale: 0.96, duration: 1.2 }, "-=0.6");
    }, root);
    return () => ctx.revert();
  }, []);

  // Split headline dynamically into balanced lines for the GSAP overflow mask reveal
  const getHeadlineLines = (text: string): string[] => {
    if (!text) return [];
    if (text.includes("\n")) {
      return text.split("\n").map((l) => l.trim()).filter(Boolean);
    }
    const sentences = text.split(/(?<=\.)\s+/).map((l) => l.trim()).filter(Boolean);
    if (sentences.length > 1) return sentences;

    const words = text.split(/\s+/).filter(Boolean);
    if (words.length <= 4) return [text];

    const line1 = words.slice(0, 2).join(" ");
    const line2 = words.slice(2, 4).join(" ");
    const line3 = words.slice(4).join(" ");
    return [line1, line2, line3].filter(Boolean);
  };

  const headlineLines = getHeadlineLines(profile.headline);

  return (
    <section
      ref={root}
      id="top"
      className="mx-auto grid max-w-6xl items-center gap-12 px-6 pb-20 pt-28 md:grid-cols-2 md:pt-36"
    >
      <div>
        {/* Profile Avatar & Status */}
        <div className="h-avatar mb-8 flex items-center gap-4">
          <div className="relative shrink-0">
            <div className="relative h-20 w-20 md:h-24 md:w-24 overflow-hidden rounded-full ring-2 ring-brand ring-offset-4 ring-offset-surface shadow-md transition-transform duration-300 hover:scale-105">
              <Image
                src={profile.profilePhoto || "/belal-profile.jpg"}
                alt={profile.name}
                width={192}
                height={192}
                priority
                quality={95}
                className="h-full w-full object-cover"
              />
            </div>
          </div>

          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="inline-block h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
              <span className="text-[11px] font-bold uppercase tracking-widest text-ink/80">
                {profile.availability}
              </span>
            </div>
            <p className="text-xl font-black tracking-tight text-ink">{profile.name}</p>
            <p className="text-xs font-medium text-body">
              {profile.degree}
            </p>
          </div>
        </div>

        {/* Headline */}
        <h1 className="text-5xl font-black leading-[1.02] tracking-tight text-ink md:text-7xl">
          {headlineLines.map((line) => (
            <span key={line} className="block overflow-hidden">
              <span className="h-line block">{line}</span>
            </span>
          ))}
        </h1>

        <p className="h-fade mt-8 max-w-md text-lg leading-relaxed text-body">
          {profile.sub}
        </p>

        {/* Action Buttons */}
        <div className="h-fade mt-8 flex flex-wrap gap-3 sm:gap-4">
          <motion.a
            whileHover={{ scale: 1.02, y: -2 }}
            whileTap={{ scale: 0.98 }}
            href="#experience"
            className="btn btn-brand"
          >
            View experience
          </motion.a>
          <motion.a
            whileHover={{ scale: 1.02, y: -2 }}
            whileTap={{ scale: 0.98 }}
            href="#credentials"
            className="btn border border-[var(--line)] bg-surface text-ink hover:border-brand hover:bg-brand hover:text-[#111110]"
          >
            Verified Credentials ({credentialsCount})
          </motion.a>
          <motion.a
            whileHover={{ scale: 1.02, y: -2 }}
            whileTap={{ scale: 0.98 }}
            href={profile.cvLink || "/Md_Belal_Ashraf_cv.pdf"}
            download
            className="btn btn-ink"
          >
            Download CV
          </motion.a>
        </div>

        {/* Trust verification pill */}
        {profile.trustBadge && (
          <div className="h-fade mt-6 flex items-center gap-2 text-xs font-semibold tracking-wide text-ink/75">
            <span className="inline-block h-2 w-2 rounded-full bg-brand" />
            <span>{profile.trustBadge}</span>
          </div>
        )}
      </div>

      {/* Floating 3D Building Model - Seamless with page background */}
      <div className="h-3d relative flex h-[480px] w-full items-center justify-center md:h-[600px] cursor-grab active:cursor-grabbing">
        <Hero3D />
      </div>
    </section>
  );
}
