"use client";

import {
  ArrowUpRight,
  BookOpen,
  BriefcaseBusiness,
  FolderKanban,
  Megaphone,
  Search,
  SearchX,
  UserRound,
  X,
} from "lucide-react";
import { useEffect, useMemo, useRef, useState } from "react";

import PostCard from "@/components/feed/PostCard";
import ExperienceTimeline from "@/components/feed/ExperienceTimeline";
import GoToTopButton from "@/components/layout/GoToTopButton";
import SectionHeader from "@/components/layout/SectionHeader";
import AboutMe from "@/components/profile/AboutMe";
import ProfileActions from "@/components/profile/ProfileActions";
import ProfileHeader from "@/components/profile/ProfileHeader";
import StatsBar from "@/components/profile/StatsBar";
import TechStack from "@/components/profile/TechStack";
import { ThemeToggle } from "@/components/theme-toggle";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { experiences } from "@/data/experiences";
import { contact } from "@/data/contact";
import { posts } from "@/data/posts";
import { projects } from "@/data/projects";

const NAV_ITEMS = [
  { id: "profile", label: "Profile", icon: UserRound },
  { id: "experience", label: "Experience", icon: BriefcaseBusiness },
  { id: "projects", label: "Projects", icon: FolderKanban },
  { id: "blogs", label: "Blogs", icon: BookOpen },
] as const;

type SectionId = (typeof NAV_ITEMS)[number]["id"];

export default function Home() {
  const [searchQuery, setSearchQuery] = useState("");
  const [submittedSearchQuery, setSubmittedSearchQuery] = useState("");
  const [activeSection, setActiveSection] = useState<SectionId>("profile");
  const navigationLockRef = useRef<SectionId | null>(null);
  const navigationTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const normalizedSearchQuery = submittedSearchQuery.trim().toLocaleLowerCase();
  const hasSearchQuery = normalizedSearchQuery.length > 0;

  const filteredProjects = useMemo(() => {
    if (!normalizedSearchQuery) {
      return projects;
    }

    return projects.filter(
      (project) =>
        project.title.toLocaleLowerCase().includes(normalizedSearchQuery) ||
        project.description.toLocaleLowerCase().includes(normalizedSearchQuery) ||
        project.tech.some((item) =>
          item.toLocaleLowerCase().includes(normalizedSearchQuery)
        ) ||
        project.tags?.some((item) =>
          item.toLocaleLowerCase().includes(normalizedSearchQuery)
        )
    );
  }, [normalizedSearchQuery]);

  const filteredBlogs = useMemo(() => {
    if (!normalizedSearchQuery) {
      return posts;
    }

    return posts.filter(
      (post) =>
        post.title.toLocaleLowerCase().includes(normalizedSearchQuery) ||
        post.description.toLocaleLowerCase().includes(normalizedSearchQuery) ||
        post.tech.some((item) =>
          item.toLocaleLowerCase().includes(normalizedSearchQuery)
        ) ||
        post.tags?.some((item) =>
          item.toLocaleLowerCase().includes(normalizedSearchQuery)
        )
    );
  }, [normalizedSearchQuery]);

  const totalResults = filteredProjects.length + filteredBlogs.length;

  const handleSearchSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    // Search only after submit so the icon button and Enter key have a clear purpose.
    setSubmittedSearchQuery(searchQuery);
  };

  const clearSearch = () => {
    setSearchQuery("");
    setSubmittedSearchQuery("");
  };

  useEffect(() => {
    let animationFrameId = 0;

    // One activation line avoids competing section events near layout boundaries.
    const updateActiveSection = () => {
      animationFrameId = 0;

      if (navigationLockRef.current) {
        return;
      }

      const activationLine = window.innerHeight * 0.32;
      let currentSection: SectionId = "profile";

      NAV_ITEMS.forEach(({ id }) => {
        const section = document.getElementById(id);

        if (section && section.getBoundingClientRect().top <= activationLine) {
          currentSection = id;
        }
      });

      setActiveSection((previousSection) =>
        previousSection === currentSection ? previousSection : currentSection
      );
    };

    const scheduleUpdate = () => {
      if (!animationFrameId) {
        animationFrameId = window.requestAnimationFrame(updateActiveSection);
      }
    };

    const finishNavigation = () => {
      navigationLockRef.current = null;
      scheduleUpdate();
    };

    updateActiveSection();
    window.addEventListener("scroll", scheduleUpdate, { passive: true });
    window.addEventListener("resize", scheduleUpdate);
    window.addEventListener("scrollend", finishNavigation);

    return () => {
      window.removeEventListener("scroll", scheduleUpdate);
      window.removeEventListener("resize", scheduleUpdate);
      window.removeEventListener("scrollend", finishNavigation);
      window.cancelAnimationFrame(animationFrameId);

      if (navigationTimeoutRef.current) {
        clearTimeout(navigationTimeoutRef.current);
      }
    };
  }, [normalizedSearchQuery]);

  const navigateToSection = (sectionId: SectionId) => {
    // Keep the clicked tab selected while smooth scrolling crosses intermediate sections.
    navigationLockRef.current = sectionId;
    setActiveSection(sectionId);

    if (navigationTimeoutRef.current) {
      clearTimeout(navigationTimeoutRef.current);
    }

    document.getElementById(sectionId)?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });

    // This fallback releases the lock where the scrollend event is unavailable.
    navigationTimeoutRef.current = setTimeout(() => {
      navigationLockRef.current = null;
      window.dispatchEvent(new Event("scroll"));
    }, 1200);
  };

  return (
    <main className="relative z-10 mx-auto flex min-h-dvh max-w-5xl flex-col px-4 py-4 pb-28 sm:px-6">
      <div className="mb-4 flex justify-end">
        <ThemeToggle />
      </div>

      <div id="profile" className="space-y-4 scroll-mt-24">
        <div className="animate-fade-in-up opacity-0">
          <ProfileHeader />
        </div>
        <div className="animate-fade-in-up opacity-0 delay-100">
          <StatsBar />
        </div>
        <div className="animate-fade-in-up opacity-0 delay-200">
          <ProfileActions />
        </div>
      </div>

      <div className="my-6 h-px bg-border animate-fade-in-up opacity-0 delay-300" />

      <div id="experience" className="grid scroll-mt-24 grid-cols-1 gap-6 lg:grid-cols-3">
        <div className="flex h-full flex-col gap-6 animate-fade-in-up opacity-0 delay-300">
          <AboutMe />
          <TechStack />
        </div>

        <div className="flex h-full flex-col animate-fade-in-up opacity-0 delay-500 lg:col-span-2">
          <SectionHeader
            title="Experience"
            subtitle="Professional work and problem solving"
          />
          <div className="mt-4">
            <ExperienceTimeline experiences={experiences} />
          </div>
          {/* This sponsored placement turns the open timeline area into a clear partnership opportunity. */}
          <aside
            className="glass-card ad-space-card relative mt-8 flex-1 overflow-hidden rounded-2xl border-none p-6 sm:p-7"
            aria-labelledby="advertise-heading"
          >
            <div className="absolute -right-12 -top-12 size-40 rounded-full bg-primary/10 blur-2xl" />
            <div className="relative flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
              <div className="max-w-xl">
                <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.16em] text-primary">
                  <span className="grid size-8 place-items-center rounded-lg bg-primary/10">
                    <Megaphone className="size-4" aria-hidden="true" />
                  </span>
                  Sponsor this space
                </div>
                <h3 id="advertise-heading" className="mt-4 text-xl font-semibold tracking-tight">
                  Put your product in front of builders
                </h3>
                <p className="mt-2 text-sm leading-6 text-muted-foreground">
                  Have a developer tool, service, or opportunity to share? This placement is available for relevant advertising and partnerships.
                </p>
              </div>
              <Button asChild className="shrink-0 rounded-xl shadow-lg shadow-primary/15">
                <a href={`mailto:${contact.email}?subject=Advertising%20and%20partnership%20inquiry`}>
                  Advertise here
                  <ArrowUpRight className="size-4" aria-hidden="true" />
                </a>
              </Button>
            </div>
          </aside>
        </div>
      </div>

      <div className="my-6 h-px bg-border" />

      <section className="mb-8">
        <div className="glass-card rounded-[24px] border-none px-5 py-4 sm:px-7">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="text-sm font-medium text-foreground">Search the portfolio</p>
              <p className="text-xs text-muted-foreground sm:text-sm">
                {hasSearchQuery
                  ? `${totalResults} result${totalResults === 1 ? "" : "s"} matching "${submittedSearchQuery.trim()}"`
                  : `Browse ${projects.length} projects and ${posts.length} blog posts.`}
              </p>
            </div>
            <form
              className="group relative mx-auto w-full max-w-2xl"
              onSubmit={handleSearchSubmit}
            >
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground transition-colors group-focus-within:text-primary" />
              <Input
                placeholder="Search projects, blogs, or tech stack..."
                aria-label="Search projects, blogs, or technologies"
                className="h-11 rounded-2xl border-none bg-background/80 pl-10 pr-40 focus-visible:ring-1 focus-visible:ring-primary/50"
                value={searchQuery}
                onChange={(event) => setSearchQuery(event.target.value)}
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={clearSearch}
                  className="absolute right-24 top-1/2 grid size-10 -translate-y-1/2 cursor-pointer place-items-center rounded-full text-muted-foreground transition-colors hover:bg-muted hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                  aria-label="Clear search"
                >
                  <X className="h-4 w-4" />
                </button>
              )}
              <Button
                type="submit"
                size="sm"
                className="absolute right-2 top-1/2 h-10 -translate-y-1/2 rounded-xl"
              >
                <Search className="h-4 w-4" />
                Search
              </Button>
            </form>
          </div>
        </div>
      </section>

      {/* Grid layouts make the portfolio easier to scan and keep the visual rhythm more consistent. */}
      <div className="min-h-0 flex-1 space-y-16">
        {(filteredProjects.length > 0 || !hasSearchQuery) && (
          <section
            id="projects"
            className="relative z-10 scroll-mt-24 animate-fade-in-up opacity-0 delay-700"
          >
            <SectionHeader
              title="Projects"
              subtitle={
                hasSearchQuery
                  ? `Found ${filteredProjects.length} results`
                  : "Selected implementations and case studies"
              }
            />
            <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-2">
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

        {(filteredBlogs.length > 0 || !hasSearchQuery) && (
          <section
            id="blogs"
            className="relative z-10 scroll-mt-24 animate-fade-in-up opacity-0 delay-1000"
          >
            <SectionHeader
              title="Blogs"
              subtitle={
                hasSearchQuery
                  ? `Found ${filteredBlogs.length} results`
                  : "Thoughts, learnings, and technical notes"
              }
            />
            <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
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

        {hasSearchQuery &&
          filteredProjects.length === 0 &&
          filteredBlogs.length === 0 && (
            <div
              className="glass-card animate-fade-in flex min-h-[360px] items-center justify-center rounded-[28px] px-6 py-16 text-center"
              role="status"
            >
              <div className="max-w-md">
                <div className="mx-auto grid size-14 place-items-center rounded-2xl bg-primary/10 text-primary">
                  <SearchX className="size-7" aria-hidden="true" />
                </div>
                <h2 className="mt-5 text-xl font-semibold tracking-tight">
                  No matching work found
                </h2>
                <p className="mt-2 text-sm leading-6 text-muted-foreground">
                  We couldn&apos;t find anything for &quot;{submittedSearchQuery.trim()}&quot;.
                  Try a project name, technology, or a broader keyword.
                </p>
                <Button onClick={clearSearch} className="mt-6 rounded-xl">
                  Show all work
                </Button>
              </div>
            </div>
          )}
      </div>

      <div className="fixed bottom-4 left-1/2 z-30 w-[calc(100%-2rem)] max-w-md -translate-x-1/2 sm:bottom-5 sm:w-auto sm:max-w-none">
        <nav
          className="glass-card grid grid-cols-4 items-center gap-1 rounded-2xl border border-white/20 p-1.5 shadow-2xl sm:flex sm:rounded-full sm:px-2 sm:py-2"
          aria-label="Portfolio sections"
        >
          {NAV_ITEMS.map(({ id, label, icon: Icon }) => (
            <button
              key={id}
              type="button"
              onClick={() => navigateToSection(id)}
              className={`inline-flex min-h-11 min-w-11 flex-col cursor-pointer items-center justify-center gap-0.5 rounded-xl px-1 py-1.5 text-[10px] font-medium transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 sm:min-h-10 sm:flex-none sm:flex-row sm:gap-2 sm:rounded-full sm:px-3 sm:py-2 sm:text-sm ${
                activeSection === id
                  ? "bg-primary text-primary-foreground shadow-md shadow-primary/20"
                  : "text-muted-foreground hover:bg-primary/10 hover:text-primary"
              }`}
              aria-label={`Go to ${label}`}
              aria-current={activeSection === id ? "location" : undefined}
            >
              <Icon className="h-4 w-4" aria-hidden="true" />
              <span>{label}</span>
            </button>
          ))}
        </nav>
      </div>

      <GoToTopButton />
    </main>
  );
}
