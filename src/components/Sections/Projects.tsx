"use client";

import { useTranslations } from "next-intl";
import { ProjectCard } from "../Projects/ProjectCard";
import { ProjectDetail } from "../Projects/ProjectDetail";
import { VideoModal } from "../Projects/VideoModal";
import { useState } from "react";

export interface ProjectLink {
  label: string;
  url: string;
}

export interface ProjectItem {
  title: string;
  shortDescription: string;
  fullDescription: string;
  image: string | null;
  tags: string[];
  links: ProjectLink[];
  status: string;
}

type ProjectId = "atbcn" | "plants" | "intrathecapp" | "getoutbcn";

export function Projects() {
  const t = useTranslations("projects");
  const [selectedProject, setSelectedProject] = useState<ProjectId | null>(null);
  const [videoUrl, setVideoUrl] = useState<string | null>(null);

  const projectIds: ProjectId[] = ["atbcn", "plants", "intrathecapp", "getoutbcn"];

  const items = projectIds.map((id) => ({
    id,
    data: t.raw(`items.${id}`) as ProjectItem,
  }));

  if (selectedProject) {
    const project = items.find((p) => p.id === selectedProject)!.data;
    return (
      <>
        <ProjectDetail
          project={project}
          onBack={() => setSelectedProject(null)}
          onPlayVideo={(url) => setVideoUrl(url)}
        />
        {videoUrl && (
          <VideoModal url={videoUrl} onClose={() => setVideoUrl(null)} />
        )}
      </>
    );
  }

  return (
    <div className="space-y-4">
      {items.map(({ id, data }) => (
        <ProjectCard
          key={id}
          title={data.title}
          shortDescription={data.shortDescription}
          status={data.status}
          onClick={() => setSelectedProject(id)}
        />
      ))}
    </div>
  );
}
