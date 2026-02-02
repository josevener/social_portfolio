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
        <ProfileHeader />
        <StatsBar />
        <ProfileActions />
      </div>

      <div className="h-px bg-border my-6" />

      {/* About + Experience */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <AboutMe />

        <div className="lg:col-span-2">
          <SectionHeader
            title="Experience"
            subtitle="Professional work and problem solving"
          />
          <div className="mt-4">
            <ExperienceTimeline experiences={experiences}/>
          </div>
        </div>
      </div>

      <div className="h-px bg-border my-10" />

      {/* Content */}
      <div ref={scrollRef} className="flex-1 min-h-0 overflow-y-auto space-y-12 pr-2">
        <section>
          <SectionHeader
            title="Projects"
            subtitle="Selected implementations and case studies"
          />
          <div className="mt-4 space-y-4">
            {projectPosts.map((post) => (
              <PostCard key={post.id} {...post} type="project"/>
            ))}
          </div>
        </section>

        <section>
          <SectionHeader
            title="Blogs"
            subtitle="Thoughts, learnings, and technical notes"
          />
          <div className="mt-4 space-y-4">
            {blogPosts.map((post) => (
              <PostCard key={post.id} {...post} type="post"/>
            ))}
          </div>
        </section>
      </div>

      <GoToTopButton containerRef={scrollRef} />
    </main>
  );
}