import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { notFound } from "next/navigation";
import type { Metadata } from "next";

import { projects } from "@/data/projects";
import ProjectScreenshots from "@/components/projects/ProjectScreenshots";
import TagBadges from "@/components/common/TagBadges";
import TechBadgeOverflow from "@/components/common/TechBadgeOverflow";

/* --------------------------------
  SEO METADATA
--------------------------------- */
export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
  const project = projects.find((p) => p.slug === params.slug);

  if (!project) return {};

  return {
    title: `${project.title} | Projects`,
    description: project.description,
    keywords: project.tags?.join(", "),
  };
}

/* --------------------------------
  PAGE
--------------------------------- */
export default async function ProjectPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  const project = projects.find((p) => p.slug === slug);
  if (!project) notFound();

  return (
    <main className="max-w-5xl mx-auto px-4 py-10 space-y-10">
      {/* Back */}
      <Link
        href="/"
        className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition"
      >
        <ArrowLeft className="h-4 w-4" />
        Back to profile
      </Link>

      {/* Header */}
      <header className="space-y-4">
        <h1 className="text-3xl sm:text-4xl font-bold tracking-tight">
          {project.title}
        </h1>

        <TagBadges tags={project.tags} />

        <p className="text-muted-foreground text-base max-w-3xl">
          {project.description}
        </p>
      </header>

      {/* Screenshots */}
      {Array.isArray(project.screenshots) && project.screenshots.length > 0 && (
        <ProjectScreenshots screenshots={project.screenshots} />
      )}

      {/* Academic Context */}
      {/* {project.context && (
        <div className="rounded-lg border bg-muted/40 p-4 space-y-1">
          <p className="font-medium text-foreground">
            {project.context.program}
          </p>
          <p className="text-sm text-muted-foreground">
            {project.context.institution} | {project.context.period}
          </p>
        </div>
      )} */}

      {/* Long-form Content */}
      {project.content && (
        <section className="space-y-4">
          {project.content.map((paragraph, index) => (
            <p
              key={index}
              className="text-md text-muted-foreground leading-relaxed"
            >
              {paragraph}
            </p>
          ))}
        </section>
      )}

      <div className="h-px bg-border" />

      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        {/* Left */}
        <section className="lg:col-span-2 space-y-8">
          {project.problem && (
            <div>
              <h2 className="text-lg font-semibold mb-2">Problem</h2>
              <p className="text-sm text-muted-foreground leading-relaxed">
                {project.problem}
              </p>
            </div>
          )}

          {project.solution && (
            <div>
              <h2 className="text-lg font-semibold mb-2">Solution</h2>
              <p className="text-sm text-muted-foreground leading-relaxed">
                {project.solution}
              </p>
            </div>
          )}

          {Array.isArray(project.highlights) && project.highlights.length > 0 && (
            <div>
              <h2 className="text-lg font-semibold mb-2">
                Key Highlights
              </h2>
              <ul className="list-disc pl-5 space-y-1 text-sm text-muted-foreground">
                {project.highlights.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
          )}
        </section>

        {/* Right */}
        <aside className="space-y-4">
          <h2 className="text-lg font-semibold">Tech Stack</h2>
          <TechBadgeOverflow tech={project.tech} limit={10} />
        </aside>
      </div>
    </main>
  );
}