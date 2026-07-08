"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useCallback } from "react";
import { About } from "../Sections/About";
import { Skills } from "../Sections/Skills";
import { Projects } from "../Sections/Projects";
import { Contact } from "../Sections/Contact";
import { Resume } from "../Sections/Resume";

export type SectionKey = "about" | "skills" | "projects" | "contact" | "cv";

interface TerminalPopupProps {
  section: SectionKey;
  onClose: () => void;
}

const sectionComponents: Record<SectionKey, React.ReactNode> = {
  about: <About />,
  skills: <Skills />,
  projects: <Projects />,
  contact: <Contact />,
  cv: <Resume />,
};

const sectionLabels: Record<SectionKey, string> = {
  about: "ABOUT",
  skills: "SKILLS",
  projects: "PROJECTS",
  contact: "CONTACT",
  cv: "CV",
};

export function TerminalPopup({ section, onClose }: TerminalPopupProps) {
  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    },
    [onClose],
  );

  useEffect(() => {
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [handleKeyDown]);

  useEffect(() => {
    const originalStyle = window.getComputedStyle(document.body).overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = originalStyle;
    };
  }, []);

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-50 flex items-center justify-center p-0 sm:p-4 overscroll-contain"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        <motion.div
          className="absolute inset-0 bg-black/70"
          onClick={onClose}
        />
        <motion.div
          className="relative w-full h-full sm:h-auto sm:max-h-[85dvh] sm:max-w-180 sm:border sm:border-accent-green bg-bg-surface flex flex-col overflow-hidden"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          transition={{ duration: 0.15 }}
        >
          <div className="sticky top-0 z-10 flex items-center justify-between border-b border-accent-green bg-bg-surface px-4 py-3 flex-shrink-0">
            <span className="text-accent-green text-sm">
              [{sectionLabels[section]}]
            </span>
            <button
              onClick={onClose}
              className="flex items-center justify-center size-10 sm:size-auto text-accent-green hover:text-text-primary text-xl sm:text-sm cursor-pointer rounded hover:bg-white/10 sm:hover:bg-transparent"
              aria-label="Cerrar"
            >
              ✕
            </button>
          </div>
          <div className="p-4 flex-1 overflow-y-auto overscroll-contain">
            {sectionComponents[section]}
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
