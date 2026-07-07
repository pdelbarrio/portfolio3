"use client";

interface ProjectCardProps {
  title: string;
  shortDescription: string;
  status?: string;
  onClick: () => void;
}

export function ProjectCard({ title, shortDescription, status, onClick }: ProjectCardProps) {
  return (
    <button
      onClick={onClick}
      className="w-full text-left border border-bg-border hover:border-accent-green px-4 py-3 transition-colors cursor-pointer"
    >
      <div className="flex items-center justify-between mb-1">
        <span className="text-accent-green text-sm">{title}</span>
        {status && (
          <span className="text-accent-amber text-xs">{status}</span>
        )}
      </div>
      <p className="text-text-secondary text-xs leading-relaxed">{shortDescription}</p>
    </button>
  );
}
