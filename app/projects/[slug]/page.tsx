import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { projects } from "@/data/projects";
import { notFound } from "next/navigation";
import ProjectScreenshots from "@/components/projects/ProjectScreenshots";

export default async function ProjectPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  const project = projects.find(
    (p) => p.slug === slug
  );

  if (!project) notFound();

  return (
    <main className="max-w-4xl mx-auto px-4 py-10 space-y-8">
      {/* Back */}
      <Link
        href="/"
        className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition"
      >
        <ArrowLeft className="h-4 w-4" />
        Back to profile
      </Link>

      {/* Header */}
      <header className="space-y-3">
        <h1 className="text-3xl sm:text-4xl font-bold tracking-tight">
          {project.title}
        </h1>

        <p className="text-muted-foreground text-base max-w-2xl">
          {project.description}
        </p>
      </header>

      <ProjectScreenshots screenshots={project.screenshots} />

      <div className="h-px bg-border" />

      {/* Content */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Left: Overview */}
        <section className="md:col-span-2 space-y-6">
          <div>
            <h2 className="font-semibold mb-2">
              Overview
            </h2>
            <p className="text-sm text-muted-foreground leading-relaxed">
              This project was built with a focus on reliability,
              maintainability, and real-world usage. The architecture
              emphasizes clean separation of concerns and practical
              problem-solving.
            </p>
          </div>

          <div>
            <h2 className="font-semibold mb-2">
              Highlights
            </h2>
            <ul className="list-disc pl-5 text-sm space-y-1 text-muted-foreground">
              <li>Production-ready implementation</li>
              <li>Reusable and scalable architecture</li>
              <li>Security-focused design decisions</li>
            </ul>
          </div>
        </section>

        {/* Right: Tech */}
        <aside className="space-y-3">
          <h2 className="font-semibold">
            Tech Stack
          </h2>

          <div className="flex flex-wrap gap-2">
            {project.tech.map((t) => (
              <span
                key={t}
                className="text-xs bg-muted px-2 py-1 rounded"
              >
                {t}
              </span>
            ))}
          </div>
        </aside>
      </div>
    </main>
  );
}