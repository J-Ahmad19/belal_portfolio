"use client";

import { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import type { ResearchItem, SkillItem, AwardItem, ProfileData } from "@/lib/content";
import { getDriveViewUrl } from "@/lib/drive";
import DrivePreviewModal from "./DrivePreviewModal";

interface ResearchProps {
  items: ResearchItem[];
}

export function Research({ items }: ResearchProps) {
  const [previewDoc, setPreviewDoc] = useState<{ title: string; url: string } | null>(null);

  if (!items || items.length === 0) return null;
  const project = items[0];

  return (
    <section id="research" className="section">
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
              Innovation & Sustainability
            </span>
          </div>
          <h2 className="h2">Research</h2>
        </div>
        <p className="max-w-md text-sm text-body md:text-right">
          Pioneering zero-aeration bio-remediation for heavily contaminated urban rivers.
        </p>
      </motion.div>

      <div className="mt-10 sm:mt-12 grid gap-8 lg:gap-12 lg:grid-cols-2">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="flex flex-col justify-between"
        >
          <div>
            <h3 className="text-xl sm:text-2xl font-bold text-ink">{project.title}</h3>
            <p className="mt-2 text-xs sm:text-sm font-semibold text-ink/75">{project.meta}</p>
            <p className="mt-5 sm:mt-6 text-sm sm:text-base leading-relaxed text-body">{project.description}</p>
            {project.note && (
              <div className="mt-5 sm:mt-6 border-l-2 border-brand/70 bg-soft/60 p-3.5 sm:p-4 text-xs sm:text-sm font-bold text-ink rounded-r-sm">
                {project.note}
              </div>
            )}
          </div>

          {project.certificateLink && (
            <div className="mt-6 sm:mt-8 border-t border-[var(--line)] pt-5 sm:pt-6 flex flex-wrap items-center gap-2.5 sm:gap-3">
              <motion.a
                href={getDriveViewUrl(project.certificateLink)}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.02, y: -2 }}
                whileTap={{ scale: 0.98 }}
                aria-label={`Open ${project.certificateLabel || "Project Certificate"} on Google Drive (new tab)`}
                className="group inline-flex items-center gap-2 border border-[var(--line)] bg-surface px-3.5 sm:px-4 py-2 sm:py-2.5 text-xs font-bold uppercase tracking-wider text-ink transition-all hover:border-brand hover:bg-brand hover:text-[#111110] rounded-sm shadow-sm"
              >
                <svg
                  className="h-4 w-4 shrink-0"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8l-6-6zm1 7V3.5L18.5 7H15zM8 17h8v2H8v-2zm0-4h8v2H8v-2zm0-4h4v2H8V9z" />
                </svg>
                <span>View {project.certificateLabel || "Project Certificate"}</span>
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
                    title: project.certificateLabel || "Project Certificate",
                    url: project.certificateLink!,
                  })
                }
                className="border border-[var(--line)] bg-surface px-3 py-2 sm:py-2.5 text-xs font-semibold text-body hover:text-ink hover:border-brand rounded-sm"
              >
                Preview
              </button>
            </div>
          )}
        </motion.div>

        <div className="grid gap-3.5 sm:gap-4 sm:grid-cols-3 lg:grid-cols-1">
          {project.resultRows.map((r, idx) => (
            <motion.div
              key={r.label}
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: idx * 0.1 }}
              whileHover={{ y: -2 }}
              className="flex items-center justify-between border border-[var(--line)] bg-surface p-4 sm:p-6 shadow-sm rounded-sm"
            >
              <div className="min-w-0 pr-2">
                <p className="font-bold text-ink text-sm sm:text-base">{r.label}</p>
                <p className="text-xs sm:text-sm text-body truncate">{r.range}</p>
              </div>
              <p className="bg-brand px-2.5 sm:px-3 py-1 text-lg sm:text-2xl font-black text-[#111110] rounded-sm shrink-0">
                {r.percentage}
              </p>
            </motion.div>
          ))}
        </div>
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

interface SkillsProps {
  skills: SkillItem[];
}

export function Skills({ skills }: SkillsProps) {
  if (!skills || skills.length === 0) return null;

  return (
    <section id="skills" className="section">
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
              Core Competencies
            </span>
          </div>
          <h2 className="h2">Skills</h2>
        </div>
        <p className="max-w-md text-sm text-body md:text-right">
          Applied across IS codes, CPWD specifications, drafting, rate analysis, and QA/QC management.
        </p>
      </motion.div>

      <div className="mt-10 sm:mt-12 grid gap-5 sm:gap-6 grid-cols-1 md:grid-cols-2">
        {skills.map((g, idx) => (
          <motion.div
            key={g.id || g.groupName}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: idx * 0.08 }}
            className="border border-[var(--line)] bg-surface p-5 sm:p-7 rounded-sm shadow-sm"
          >
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-base sm:text-lg font-bold text-ink">{g.groupName}</h3>
              {g.certificateLink && (
                <a
                  href={getDriveViewUrl(g.certificateLink)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-[11px] font-bold text-brandStrong hover:underline"
                >
                  <span>{g.certificateLabel || "Certificate ↗"}</span>
                </a>
              )}
            </div>
            <ul className="flex flex-wrap gap-1.5 sm:gap-2">
              {g.skills.map((s) => (
                <motion.li
                  key={s}
                  whileHover={{ scale: 1.04, y: -1 }}
                  transition={{ type: "spring", stiffness: 350 }}
                  className="border border-[var(--line)] bg-soft/70 px-2.5 sm:px-3 py-1 sm:py-1.5 text-[11px] sm:text-xs font-semibold text-ink transition-colors hover:border-brand hover:bg-brand hover:text-[#111110] rounded-sm"
                >
                  {s}
                </motion.li>
              ))}
            </ul>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

interface AwardsProps {
  awards: AwardItem[];
}

export function Awards({ awards }: AwardsProps) {
  const [previewDoc, setPreviewDoc] = useState<{ title: string; url: string } | null>(null);

  if (!awards || awards.length === 0) return null;

  return (
    <section id="awards" className="section">
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
              Honors & Endorsements
            </span>
          </div>
          <h2 className="h2">Recognition</h2>
        </div>
        <p className="max-w-md text-sm text-body md:text-right">
          Recommendations and honors earned for technical precision, leadership, and public innovation.
        </p>
      </motion.div>

      <ul className="mt-8 border-t border-[var(--line)]">
        {awards.map((award, idx) => (
          <motion.li
            key={award.id || award.title}
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: idx * 0.06 }}
            className="flex flex-col sm:grid sm:grid-cols-[1fr_2fr] md:grid-cols-[1.2fr_2fr_auto] gap-3 sm:gap-4 border-b border-[var(--line)] py-5 sm:py-6 transition-colors hover:bg-soft/30 items-start md:items-center px-1 sm:px-3"
          >
            <span className="text-base font-bold text-ink">{award.title}</span>
            <span className="text-xs sm:text-sm leading-relaxed text-body">
              {award.description}
            </span>
            {award.driveLink ? (
              <div className="flex items-center gap-2 mt-2 sm:mt-0 md:self-center">
                <motion.a
                  href={getDriveViewUrl(award.driveLink)}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.02, y: -1 }}
                  whileTap={{ scale: 0.98 }}
                  aria-label={`Open ${award.linkText || "Document"} on Google Drive (new tab)`}
                  className="group inline-flex items-center justify-center gap-1.5 border border-[var(--line)] bg-surface px-3 py-1.5 text-xs font-bold uppercase tracking-wider text-ink transition-all hover:border-brand hover:bg-brand hover:text-[#111110] rounded-sm shadow-sm"
                >
                  <span>{award.linkText || "View Document"}</span>
                  <svg
                    className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2.5}
                    aria-hidden="true"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M10 6H6a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8l-6-6zm1 7V3.5L18.5 7H15zM8 17h8v2H8v-2zm0-4h8v2H8v-2zm0-4h4v2H8V9z"
                    />
                  </svg>
                </motion.a>
                <button
                  type="button"
                  onClick={() =>
                    setPreviewDoc({
                      title: award.title,
                      url: award.driveLink!,
                    })
                  }
                  className="border border-[var(--line)] bg-surface px-2.5 py-1.5 text-xs font-semibold text-body hover:text-ink hover:border-brand rounded-sm"
                >
                  Preview
                </button>
              </div>
            ) : (
              <span className="hidden md:block" />
            )}
          </motion.li>
        ))}
      </ul>

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

interface ContactProps {
  profile: ProfileData;
}

export function Contact({ profile }: ContactProps) {
  return (
    <section id="contact" className="bg-[#111110] text-[#FFFFFF]">
      <div className="mx-auto max-w-6xl px-4 py-16 xs:px-6 sm:py-24">
        {/* Profile Card Header in Contact */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-8 sm:mb-10 flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-5 border-b border-white/10 pb-8 sm:pb-10"
        >
          <div className="relative h-16 w-16 sm:h-20 sm:w-20 md:h-24 md:w-24 shrink-0 overflow-hidden rounded-full ring-2 ring-brand ring-offset-2 ring-offset-[#111110] shadow-xl">
            <Image
              src={profile.profilePhoto || "/belal-profile.jpg"}
              alt={profile.name}
              width={160}
              height={160}
              quality={95}
              className="h-full w-full object-cover"
            />
          </div>
          <div className="min-w-0">
            <div className="mb-1.5 flex items-center gap-2">
              <span className="inline-block h-2 w-2 shrink-0 rounded-full bg-emerald-400 animate-pulse" />
              <span className="text-[10px] sm:text-[11px] font-bold uppercase tracking-widest text-brand truncate">
                {profile.availability}
              </span>
            </div>
            <h3 className="text-xl sm:text-2xl font-black text-white tracking-tight truncate">
              {profile.name}
            </h3>
            <p className="mt-1 text-xs text-white/70 max-w-xl leading-relaxed">
              {profile.sub}
            </p>
          </div>
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="max-w-2xl text-3xl font-black tracking-tight text-white sm:text-4xl md:text-5xl break-words"
        >
          Hiring for site, QA/QC or quantity surveying? Let's talk.
        </motion.h2>

        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mt-8 sm:mt-10 flex flex-col xs:flex-row flex-wrap gap-2.5 sm:gap-4"
        >
          <motion.a
            whileHover={{ scale: 1.03, y: -2 }}
            whileTap={{ scale: 0.97 }}
            className="btn btn-brand w-full xs:w-auto text-center"
            href={`mailto:${profile.email}`}
          >
            Email Belal
          </motion.a>
          {profile.linkedin && (
            <motion.a
              whileHover={{ scale: 1.03, y: -2 }}
              whileTap={{ scale: 0.97 }}
              className="btn bg-white/10 text-white hover:bg-white/20 border border-white/15 w-full xs:w-auto text-center"
              href={profile.linkedin}
              target="_blank"
              rel="noreferrer"
            >
              LinkedIn
            </motion.a>
          )}
          <motion.a
            whileHover={{ scale: 1.03, y: -2 }}
            whileTap={{ scale: 0.97 }}
            className="btn border border-white/20 text-white/90 hover:border-brand hover:text-brand w-full xs:w-auto text-center"
            href="#credentials"
          >
            View All Credentials
          </motion.a>
          <motion.a
            whileHover={{ scale: 1.03, y: -2 }}
            whileTap={{ scale: 0.97 }}
            className="btn border border-white/20 text-white/90 hover:border-brand hover:text-brand w-full xs:w-auto text-center"
            href={profile.cvLink || "/Md_Belal_Ashraf_cv.pdf"}
            download
          >
            Download CV
          </motion.a>
        </motion.div>

        <p className="mt-10 sm:mt-12 text-xs text-white/50 border-t border-white/10 pt-6 leading-relaxed">
          {profile.email} · {profile.phone} · {profile.location}
        </p>
      </div>
    </section>
  );
}
