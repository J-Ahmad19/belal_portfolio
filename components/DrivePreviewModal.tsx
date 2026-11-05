"use client";

import { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { getDrivePreviewUrl, getDriveViewUrl } from "@/lib/drive";

interface DrivePreviewModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  url: string;
}

export default function DrivePreviewModal({
  isOpen,
  onClose,
  title,
  url,
}: DrivePreviewModalProps) {
  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
    }
    if (isOpen) {
      window.addEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "hidden";
    }
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "unset";
    };
  }, [isOpen, onClose]);

  const previewUrl = getDrivePreviewUrl(url);
  const viewUrl = getDriveViewUrl(url);

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-3 xs:p-4 sm:p-6">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-[#0C0C0C]/85 backdrop-blur-md"
          />

          {/* Modal Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 16 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 16 }}
            transition={{ type: "spring", stiffness: 350, damping: 25 }}
            className="relative flex h-[88vh] sm:h-[85vh] w-full max-w-4xl flex-col border border-[var(--line)] bg-surface shadow-2xl rounded-sm overflow-hidden"
          >
            {/* Header */}
            <div className="flex items-center justify-between border-b border-[var(--line)] px-3.5 py-2.5 sm:px-5 sm:py-3 bg-surface">
              <div className="min-w-0 pr-3">
                <h3 className="truncate text-xs sm:text-sm font-bold text-ink max-w-[160px] xs:max-w-xs sm:max-w-md">
                  {title}
                </h3>
                <p className="text-[10px] sm:text-[11px] text-body">Verified Document Preview</p>
              </div>

              <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
                <a
                  href={viewUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 sm:gap-1.5 border border-[var(--line)] px-2.5 sm:px-3 py-1.5 text-[11px] sm:text-xs font-bold uppercase tracking-wider text-ink transition-colors hover:border-brand hover:bg-brand hover:text-[#111110] rounded-sm"
                >
                  <span className="hidden xs:inline">Open in Drive</span>
                  <span className="xs:hidden">Drive ↗</span>
                  <svg
                    className="hidden xs:inline h-3.5 w-3.5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2.5}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                    />
                  </svg>
                </a>

                <button
                  onClick={onClose}
                  aria-label="Close modal"
                  className="flex h-7 w-7 sm:h-8 sm:w-8 items-center justify-center rounded-sm border border-[var(--line)] bg-soft text-ink transition-colors hover:bg-brand hover:text-[#111110] text-sm font-bold"
                >
                  ✕
                </button>
              </div>
            </div>

            {/* Document Iframe */}
            <div className="relative flex-1 bg-soft">
              {previewUrl ? (
                <iframe
                  src={previewUrl}
                  title={title}
                  className="h-full w-full border-0"
                  allow="autoplay"
                />
              ) : (
                <div className="flex h-full items-center justify-center p-6 text-center text-sm text-body">
                  No preview available for this document.
                </div>
              )}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
