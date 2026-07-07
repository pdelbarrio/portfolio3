"use client";

interface SkillTagProps {
  label: string;
}

export function SkillTag({ label }: SkillTagProps) {
  return (
    <span className="inline-block border border-accent-green text-accent-green text-xs px-2 py-0.5">
      {label}
    </span>
  );
}
