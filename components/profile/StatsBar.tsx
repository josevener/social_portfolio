import { Separator } from "@/components/ui/separator";
import { posts } from "@/data/posts";
import { projects } from "@/data/projects";
import { experiences } from "@/data/experiences";

export default function StatsBar() {
  const postCount = posts.length;
  const projectCount = projects.length;

  // Calculate years of experience dynamically
  const startYear = 2024; // Earliest start year from data
  const currentYear = new Date().getFullYear();
  const yearsOfExperience = currentYear - startYear;

  return (
    <div className="flex flex-wrap justify-center gap-x-6 gap-y-2 text-sm sm:justify-start">
      <div>
        <span className="font-bold">{postCount}</span> Posts
      </div>

      <div className="hidden sm:block">
        <Separator orientation="vertical" />
      </div>

      <div>
        <span className="font-bold">{projectCount}+</span> Projects
      </div>

      <div className="hidden sm:block">
        <Separator orientation="vertical" />
      </div>

      <div>
        <span className="font-bold">{yearsOfExperience}</span> Years of Experience
      </div>
    </div>
  );
}