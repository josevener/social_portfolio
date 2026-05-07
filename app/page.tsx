"use client";

import GoToTopButton from "@/components/layout/GoToTopButton";
import ProfileHeader from "@/components/profile/ProfileHeader";
import StatsBar from "@/components/profile/StatsBar";
import ProfileActions from "@/components/profile/ProfileActions";
import AboutMe from "@/components/profile/AboutMe";
import ExperienceTimeline from "@/components/feed/ExperienceTimeline";
import PostCard from "@/components/feed/PostCard";
import SectionHeader from "@/components/layout/SectionHeader";
import { posts } from "@/data/posts";
import { projects } from "@/data/projects";
import { ThemeToggle } from "@/components/theme-toggle";
import { experiences } from "@/data/experiences";
import { useRef, useState, useMemo } from "react";
import { GamePreview } from "@/components/games/GamePreview";
import TechStack from "@/components/profile/TechStack";
import { Input } from "@/components/ui/input";
import { Search, X } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function Home() {
  const [searchQuery, setSearchQuery] = useState("");
  const scrollRef = useRef<HTMLDivElement>(null);

  const filteredProjects = useMemo(() => {
    if (!searchQuery) return projects;
    const query = searchQuery.toLowerCase();
    return projects.filter(
      (p) =>
        (p.title?.toLowerCase() || "").includes(query) ||
        (p.description?.toLowerCase() || "").includes(query) ||
        p.tech?.some((t) => (t?.toLowerCase() || "").includes(query)) ||
        p.tags?.some((t) => (t?.toLowerCase() || "").includes(query))
    );
  }, [searchQuery]);

  const filteredBlogs = useMemo(() => {
    if (!searchQuery) return posts;
    const query = searchQuery.toLowerCase();
    return posts.filter(
      (p) =>
        (p.title?.toLowerCase() || "").includes(query) ||
        (p.description?.toLowerCase() || "").includes(query) ||
        p.tech?.some((t) => (t?.toLowerCase() || "").includes(query))
    );
  }, [searchQuery]);

  return (
    <main className="mx-auto max-w-5xl min-h-dvh flex flex-col px-4 py-4 sm:px-6 relative z-10">
      <div className="flex justify-end mb-4">
        <ThemeToggle />
      </div>

      {/* Profile */}
      <div className="space-y-4">
        <div className="animate-fade-in-up opacity-0"><ProfileHeader /></div>
        <div className="animate-fade-in-up opacity-0 delay-100"><StatsBar /></div>
        <div className="animate-fade-in-up opacity-0 delay-200"><ProfileActions /></div>
      </div>

      <div className="h-px bg-border my-6 animate-fade-in-up opacity-0 delay-300" />

      {/* About + Experience */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="space-y-6 animate-fade-in-up opacity-0 delay-300">
          <AboutMe />
          <TechStack />
        </div>

        <div className="lg:col-span-2 animate-fade-in-up opacity-0 delay-500">
          <SectionHeader
            title="Experience"
            subtitle="Professional work and problem solving"
          />
          <div className="mt-4">
            <ExperienceTimeline experiences={experiences} />
          </div>
        </div>
      </div>

      <div className="h-px bg-border my-10 animate-fade-in-up opacity-0 delay-700" />

      {/* Search Bar */}
      <div className="relative max-w-md mx-auto w-full mb-12 animate-fade-in-up opacity-0 delay-700">
        <div className="relative group">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground group-focus-within:text-primary transition-colors" />
          <Input
            placeholder="Search projects, blogs, or tech stack..."
            className="pl-10 pr-10 glass-card border-none focus-visible:ring-1 focus-visible:ring-primary/50"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery("")}
              className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground hover:text-foreground transition-colors"
            >
              <X className="h-4 w-4" />
            </button>
          )}
        </div>
      </div>

      {/* Content with Masonry Grid */}
      <div
        ref={scrollRef}
        className="flex-1 min-h-0 space-y-16"
      >
        {(filteredProjects.length > 0 || !searchQuery) && (
          <section className="relative z-10 animate-fade-in-up opacity-0 delay-700">
            <SectionHeader
              title="Projects"
              subtitle={searchQuery ? `Found ${filteredProjects.length} results` : "Selected implementations and case studies"}
            />
            <div className="mt-4 columns-1 md:columns-2 gap-4 space-y-6">
              {filteredProjects.map((post) => (
                <PostCard
                  key={post.id}
                  {...post}
                  type="project"
                  image={post.screenshots?.[0]?.src}
                />
              ))}
            </div>
          </section>
        )}

        {(filteredBlogs.length > 0 || !searchQuery) && (
          <section className="relative z-10 animate-fade-in-up opacity-0 delay-1000">
            <SectionHeader
              title="Blogs"
              subtitle={searchQuery ? `Found ${filteredBlogs.length} results` : "Thoughts, learnings, and technical notes"}
            />
            <div className="mt-6 columns-1 md:columns-2 lg:columns-3 gap-6 space-y-6">
              {filteredBlogs.map((post) => (
                <PostCard
                  key={post.id}
                  {...post}
                  type="post"
                  image={post.images?.[0]?.src}
                />
              ))}
            </div>
          </section>
        )}

        {!searchQuery && (
          <section className="relative z-10 animate-fade-in-up opacity-0 delay-[1300ms]">
            <SectionHeader
              title="Games"
              subtitle="Playground projects built for logic and fun"
            />
            <div className="mt-6">
              <GamePreview
                title="Sudoku"
                description="Configurable grid puzzle game"
                url="https://zentrix-sudoku.vercel.app"
                thumbnail="/images/games/sudoku/thumbnail.png"
              />
            </div>
          </section>
        )}

        {searchQuery && filteredProjects.length === 0 && filteredBlogs.length === 0 && (
          <div className="text-center py-20 animate-fade-in">
            <p className="text-muted-foreground">No results found for "{searchQuery}"</p>
            <Button
              variant="link"
              onClick={() => setSearchQuery("")}
              className="mt-2"
            >
              Clear search
            </Button>
          </div>
        )}
      </div>

      <GoToTopButton containerRef={scrollRef} />
    </main>
  );
}
