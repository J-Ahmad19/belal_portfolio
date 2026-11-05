"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import type { CredentialItem } from "@/lib/content";
import { getDriveViewUrl } from "@/lib/drive";
import DrivePreviewModal from "./DrivePreviewModal";

function getCategoryBadge(category: CredentialItem["category"]) {
  switch (category) {
    case "Internship Certificate":
      return "bg-brand/20 text-[#111110] dark:text-brand border border-brand/40";
    case "Letter of Recommendation":
      return "bg-ink text-onink";
    case "Professional Certification":
      return "bg-emerald-500/15 text-emerald-700 dark:text-emerald-400 border border-emerald-500/30";
    case "Project Certificate":
      return "border border-[var(--line)] text-ink bg-soft";
    case "Appreciation Certificate":
      return "bg-soft border border-[var(--line)] text-ink";
    default:
      return "bg-soft border border-[var(--line)] text-ink";
  }
}

interface CredentialsProps {
  credentials: CredentialItem[];
}

export default function Credentials({ credentials }: CredentialsProps) {
  const [previewDoc, setPreviewDoc] = useState<{ title: string; url: string } | null>(null);

  if (!credentials || credentials.length === 0) return null;

  return (
    <section id="credentials" className="section">
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
              Official Documentation
            </span>
          </div>
          <h2 className="h2">Verified Credentials</h2>
        </div>
        <p className="max-w-md text-sm leading-relaxed text-body md:text-right">
          Original certificates, letters of recommendation, and professional technical qualifications from DLF, ONGC, IIT Delhi, and ASCE.
        </p>
      </motion.div>

      <div className="mt-10 sm:mt-12 grid gap-5 sm:gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
        {credentials.map((item, index) => {
          const hasLink = Boolean(item.driveLink);
          const viewUrl = hasLink ? getDriveViewUrl(item.driveLink) : "";

          return (
            <motion.article
              key={item.id || item.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.45, delay: index * 0.05 }}
              whileHover={{ y: -4 }}
              className="group flex flex-col justify-between border border-[var(--line)] bg-surface p-5 sm:p-6 shadow-sm transition-all duration-300 hover:border-brand hover:shadow-md rounded-sm"
            >
              <div>
                <div className="flex items-center justify-between gap-2">
                  <span
                    className={`px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider rounded-sm truncate max-w-[170px] ${getCategoryBadge(
                      item.category
                    )}`}
                  >
                    {item.category}
                  </span>
                  <span className="text-xs font-bold text-ink/70 shrink-0">{item.date}</span>
                </div>

                <h3 className="mt-3.5 text-base sm:text-lg font-bold leading-snug text-ink transition-colors group-hover:text-ink">
                  {item.title}
                </h3>

                <p className="mt-1 text-[11px] sm:text-xs font-semibold uppercase tracking-wider text-ink/70">
                  {item.issuer}
                </p>

                {item.credentialId && (
                  <p className="mt-1 text-[10px] sm:text-[11px] font-mono text-body truncate">
                    ID: {item.credentialId}
                  </p>
                )}

                <p className="mt-2.5 text-xs leading-relaxed text-body line-clamp-4">
                  {item.description}
                </p>
              </div>

              {hasLink && (
                <div className="mt-5 border-t border-[var(--line)] pt-4 flex items-center gap-2">
                  <motion.a
                    href={viewUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    aria-label={`Open ${item.title} on Google Drive (new tab)`}
                    className="inline-flex flex-1 items-center justify-between border border-[var(--line)] bg-soft/60 px-3 py-1.5 sm:px-3.5 sm:py-2 text-[11px] sm:text-xs font-bold uppercase tracking-wider text-ink transition-all hover:border-brand hover:bg-brand hover:text-[#111110] rounded-sm"
                  >
                    <span className="flex items-center gap-1.5 truncate">
                      <svg
                        className="h-3.5 w-3.5 shrink-0"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                        aria-hidden="true"
                      >
                        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8l-6-6zm1 7V3.5L18.5 7H15zM8 17h8v2H8v-2zm0-4h8v2H8v-2zm0-4h4v2H8V9z" />
                      </svg>
                      <span className="truncate">View Doc</span>
                    </span>
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
                        title: item.title,
                        url: item.driveLink,
                      })
                    }
                    className="border border-[var(--line)] bg-surface px-2.5 py-1.5 sm:py-2 text-[11px] sm:text-xs font-semibold text-body hover:text-ink hover:border-brand rounded-sm shrink-0"
                    title="Quick preview modal"
                  >
                    Preview
                  </button>
                </div>
              )}
            </motion.article>
          );
        })}
      </div>

      <motion.div
        initial={{ opacity: 0, y: 15 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.45, delay: 0.15 }}
        className="mt-8 flex flex-col items-start justify-between gap-4 border border-[var(--line)] bg-surface p-5 sm:p-6 sm:flex-row sm:items-center rounded-sm shadow-sm"
      >
        <div className="flex items-start sm:items-center gap-3">
          <span className="flex h-8 w-8 items-center justify-center rounded-full bg-brand text-[#111110] font-bold text-sm shrink-0 mt-0.5 sm:mt-0">
            ✓
          </span>
          <div>
            <p className="text-sm font-bold text-ink">
              All {credentials.length} credentials independently verifiable
            </p>
            <p className="text-xs text-body mt-0.5 leading-relaxed">
              Stored securely on Google Drive with permanent read access for recruiters, project heads & HR.
            </p>
          </div>
        </div>
        <motion.a
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
          href="/Md_Belal_Ashraf_cv.pdf"
          download
          className="btn btn-ink w-full sm:w-auto py-2 text-center text-xs uppercase tracking-wider shrink-0"
        >
          Download Complete CV
        </motion.a>
      </motion.div>

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
