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
import { useRef } from "react";
import { GamePreview } from "@/components/games/GamePreview";
import TechStack from "@/components/profile/TechStack";

export default function Home() {
  const blogPosts = posts;
  const projectPosts = projects;

  const scrollRef = useRef<HTMLDivElement>(null);

  return (
    <main className="mx-auto max-w-5xl min-h-dvh flex flex-col px-4 py-4 sm:px-6">
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

      {/* Content with Masonry Grid */}
      <div
        ref={scrollRef}
        className="flex-1 min-h-0 overflow-y-auto space-y-12 pr-2"
      >
        <section className="relative z-10 animate-fade-in-up opacity-0 delay-700">
          <SectionHeader
            title="Projects"
            subtitle="Selected implementations and case studies"
          />
          <div className="mt-4 columns-1 md:columns-2 gap-4 space-y-6">
            {projectPosts.map((post) => (
              <PostCard
                key={post.id}
                {...post}
                type="project"
                image={post.screenshots?.[0]?.src}
              />
            ))}
          </div>
        </section>

        <section className="relative z-10 animate-fade-in-up opacity-0 delay-1000">
          <SectionHeader
            title="Blogs"
            subtitle="Thoughts, learnings, and technical notes"
          />
          <div className="mt-6 columns-1 md:columns-2 lg:columns-3 gap-6 space-y-6">
            {blogPosts.map((post) => (
              <PostCard
                key={post.id}
                {...post}
                type="post"
                image={post.images?.[0]?.src}
              />
            ))}
          </div>
        </section>

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
      </div>

      <GoToTopButton containerRef={scrollRef} />
    </main>
  );
}