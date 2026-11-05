"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { motion } from "framer-motion";
import type { StatItem } from "@/lib/content";

gsap.registerPlugin(ScrollTrigger);

interface StatsProps {
  stats: StatItem[];
}

export default function Stats({ stats }: StatsProps) {
  const root = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const ctx = gsap.context(() => {
      root.current!.querySelectorAll<HTMLElement>("[data-v]").forEach((el) => {
        const end = parseFloat(el.dataset.v!);
        const d = parseInt(el.dataset.d || "0", 10);
        const o = { n: reduce ? end : 0 };
        el.textContent = o.n.toFixed(d);
        if (reduce) return;
        gsap.to(o, {
          n: end,
          duration: 1.8,
          ease: "power2.out",
          onUpdate: () => (el.textContent = o.n.toFixed(d)),
          scrollTrigger: { trigger: el, start: "top 85%", once: true },
        });
      });
    }, root);
    return () => ctx.revert();
  }, [stats]);

  if (!stats || stats.length === 0) return null;

  return (
    <section
      ref={root}
      className="border-y border-[var(--line)] bg-soft/40 backdrop-blur-sm"
    >
      <div className="mx-auto grid max-w-6xl grid-cols-2 gap-6 px-4 py-10 xs:px-6 sm:gap-8 sm:py-14 lg:grid-cols-4">
        {stats.map((s, idx) => (
          <motion.div
            key={s.id || s.label}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.45, delay: idx * 0.08 }}
            whileHover={{ y: -3 }}
            className="group border-l-2 border-brand/50 pl-3 sm:pl-5 transition-colors hover:border-brand"
          >
            <p className="text-3xl font-black tracking-tight text-ink xs:text-4xl sm:text-4xl md:text-5xl">
              <span data-v={s.value} data-d={s.decimals}>
                {s.value}
              </span>
              <span className="text-brandStrong ml-0.5">{s.suffix}</span>
            </p>
            <p className="mt-1.5 sm:mt-2 text-xs sm:text-sm font-medium leading-relaxed text-body line-clamp-2">
              {s.label}
            </p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
