"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import type { ExperienceItem } from "@/lib/content";
import { getDriveViewUrl } from "@/lib/drive";
import DrivePreviewModal from "./DrivePreviewModal";

interface ExperienceProps {
  experiences: ExperienceItem[];
}

export default function Experience({ experiences }: ExperienceProps) {
  const [open, setOpen] = useState(0);
  const [previewDoc, setPreviewDoc] = useState<{ title: string; url: string } | null>(null);

  if (!experiences || experiences.length === 0) return null;

  return (
    <section id="experience" className="section">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="flex flex-col justify-between gap-4 border-b border-[var(--line)] pb-6 md:flex-row md:items-end"
      >
        <div>
          <div className="mb-2 flex items-center gap-2">
            <span className="inline-block h-2 w-2 rounded-full bg-brand" />
            <span className="text-[11px] font-bold uppercase tracking-widest text-ink/75">
              Track Record
            </span>
          </div>
          <h2 className="h2">Industry experience</h2>
        </div>
        <p className="max-w-md text-sm text-body md:text-right">
          QA/QC, site inspections, rate analysis, and project controls on real-world infrastructure and data center projects.
        </p>
      </motion.div>

      <div className="mt-8 border-t border-[var(--line)]">
        {experiences.map((e, i) => {
          const hasCert = Boolean(e.certificateLink);
          const hasLor = Boolean(e.lorLink);

          return (
            <motion.div
              key={e.id || e.organisation}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.08 }}
              className="border-b border-[var(--line)]"
            >
              <button
                onClick={() => setOpen(open === i ? -1 : i)}
                aria-expanded={open === i}
                className="group flex w-full items-center justify-between gap-4 sm:gap-6 py-6 sm:py-7 text-left transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand"
              >
                <span className="min-w-0 flex-1">
                  <span className="flex flex-wrap items-center gap-2 sm:gap-3">
                    <span className="text-xl font-bold text-ink transition-colors group-hover:text-ink sm:text-2xl md:text-3xl">
                      {e.organisation}
                    </span>
                    {(hasCert || hasLor) && (
                      <span className="inline-flex items-center gap-1.5 sm:gap-2">
                        {hasCert && (
                          <span className="inline-flex items-center gap-1 border border-[var(--line)] bg-soft px-1.5 sm:px-2 py-0.5 text-[10px] sm:text-[11px] font-semibold text-ink/80 rounded-sm">
                            <span className="h-1.5 w-1.5 rounded-full bg-brand" />
                            Certificate
                          </span>
                        )}
                        {hasLor && (
                          <span className="inline-flex items-center gap-1 border border-[var(--line)] bg-soft px-1.5 sm:px-2 py-0.5 text-[10px] sm:text-[11px] font-semibold text-ink/80 rounded-sm">
                            <span className="h-1.5 w-1.5 rounded-full bg-brand" />
                            LOR
                          </span>
                        )}
                      </span>
                    )}
                  </span>
                  <span className="mt-1 block text-xs sm:text-sm text-body">
                    {e.role} · <span className="text-ink/80">{e.location}</span>
                    <span className="ml-2 font-bold text-brandStrong sm:hidden">({e.year})</span>
                  </span>
                </span>

                <span className="flex items-center gap-4 sm:gap-6 shrink-0">
                  <span className="hidden text-sm font-bold text-ink/80 sm:block">{e.year}</span>
                  <motion.span
                    animate={{ rotate: open === i ? 45 : 0 }}
                    transition={{ type: "spring", stiffness: 350, damping: 25 }}
                    className={`flex h-8 w-8 sm:h-9 sm:w-9 items-center justify-center rounded-full text-lg sm:text-xl font-bold text-[#111110] transition-colors ${
                      open === i ? "bg-brand" : "bg-soft group-hover:bg-brand"
                    }`}
                    aria-hidden="true"
                  >
                    +
                  </motion.span>
                </span>
              </button>

              <AnimatePresence initial={false}>
                {open === i && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.38, ease: [0.16, 1, 0.3, 1] }}
                    className="max-w-4xl overflow-hidden pb-6 sm:pb-8"
                  >
                    <ul className="space-y-2.5 sm:space-y-3">
                      {e.bulletPoints.map((p, pIdx) => (
                        <motion.li
                          key={pIdx}
                          initial={{ opacity: 0, x: -8 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ duration: 0.25, delay: pIdx * 0.05 }}
                          className="border-l-2 border-brand/70 bg-soft/60 p-3 sm:p-4 text-xs sm:text-sm md:text-base leading-relaxed text-body rounded-r-sm"
                        >
                          {p}
                        </motion.li>
                      ))}
                    </ul>

                    {(hasCert || hasLor) && (
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3, delay: 0.15 }}
                        className="mt-6 flex flex-col xs:flex-row flex-wrap items-start xs:items-center gap-3 border-t border-[var(--line)] pt-5"
                      >
                        <span className="text-[11px] sm:text-xs font-bold uppercase tracking-wider text-ink/75">
                          Verified Records:
                        </span>

                        <div className="flex flex-wrap items-center gap-2 sm:gap-3 w-full xs:w-auto">
                          {hasCert && e.certificateLink && (
                            <div className="inline-flex items-center gap-1.5 flex-wrap">
                              <motion.a
                                href={getDriveViewUrl(e.certificateLink)}
                                target="_blank"
                                rel="noopener noreferrer"
                                whileHover={{ scale: 1.02, y: -1 }}
                                whileTap={{ scale: 0.98 }}
                                aria-label={`Open ${e.certificateLabel || "Certificate"} on Google Drive (new tab)`}
                                className="group inline-flex items-center gap-1.5 sm:gap-2 border border-[var(--line)] bg-surface px-3 sm:px-3.5 py-1.5 sm:py-2 text-xs font-bold uppercase tracking-wider text-ink transition-all hover:border-brand hover:bg-brand hover:text-[#111110] rounded-sm shadow-sm"
                              >
                                <svg
                                  className="h-3.5 w-3.5 shrink-0"
                                  fill="currentColor"
                                  viewBox="0 0 24 24"
                                  aria-hidden="true"
                                >
                                  <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8l-6-6zm1 7V3.5L18.5 7H15zM8 17h8v2H8v-2zm0-4h8v2H8v-2zm0-4h4v2H8V9z" />
                                </svg>
                                <span>{e.certificateLabel || "View Certificate"}</span>
                                <svg
                                  className="h-3.5 w-3.5 shrink-0 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                                  fill="none"
                                  viewBox="0 0 24 24"
                                  stroke="currentColor"
                                  strokeWidth={2.5}
                                  aria-hidden="true"
                                >
                                  <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                                  />
                                </svg>
                              </motion.a>
                              <button
                                type="button"
                                onClick={() =>
                                  setPreviewDoc({
                                    title: e.certificateLabel || "Certificate",
                                    url: e.certificateLink!,
                                  })
                                }
                                className="border border-[var(--line)] bg-surface px-2.5 py-1.5 sm:py-2 text-xs font-semibold text-body hover:text-ink hover:border-brand rounded-sm"
                                title="Preview in modal"
                              >
                                Preview
                              </button>
                            </div>
                          )}

                          {hasLor && e.lorLink && (
                            <div className="inline-flex items-center gap-1.5 flex-wrap">
                              <motion.a
                                href={getDriveViewUrl(e.lorLink)}
                                target="_blank"
                                rel="noopener noreferrer"
                                whileHover={{ scale: 1.02, y: -1 }}
                                whileTap={{ scale: 0.98 }}
                                aria-label={`Open ${e.lorLabel || "Letter of Recommendation"} on Google Drive (new tab)`}
                                className="group inline-flex items-center gap-1.5 sm:gap-2 border border-[var(--line)] bg-surface px-3 sm:px-3.5 py-1.5 sm:py-2 text-xs font-bold uppercase tracking-wider text-ink transition-all hover:border-brand hover:bg-brand hover:text-[#111110] rounded-sm shadow-sm"
                              >
                                <svg
                                  className="h-3.5 w-3.5 shrink-0"
                                  fill="currentColor"
                                  viewBox="0 0 24 24"
                                  aria-hidden="true"
                                >
                                  <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8l-6-6zm1 7V3.5L18.5 7H15zM8 17h8v2H8v-2zm0-4h8v2H8v-2zm0-4h4v2H8V9z" />
                                </svg>
                                <span>{e.lorLabel || "View Recommendation"}</span>
                                <svg
                                  className="h-3.5 w-3.5 shrink-0 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                                  fill="none"
                                  viewBox="0 0 24 24"
                                  stroke="currentColor"
                                  strokeWidth={2.5}
                                  aria-hidden="true"
                                >
                                  <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                                  />
                                </svg>
                              </motion.a>
                              <button
                                type="button"
                                onClick={() =>
                                  setPreviewDoc({
                                    title: e.lorLabel || "Letter of Recommendation",
                                    url: e.lorLink!,
                                  })
                                }
                                className="border border-[var(--line)] bg-surface px-2.5 py-1.5 sm:py-2 text-xs font-semibold text-body hover:text-ink hover:border-brand rounded-sm"
                                title="Preview in modal"
                              >
                                Preview
                              </button>
                            </div>
                          )}
                        </div>
                      </motion.div>
                    )}
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          );
        })}
      </div>

      {previewDoc && (
        <DrivePreviewModal
          isOpen={Boolean(previewDoc)}
          onClose={() => setPreviewDoc(null)}
          title={previewDoc.title}
          url={previewDoc.url}
        />
      )}
    </section>
  );
}
