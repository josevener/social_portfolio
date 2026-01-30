import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import { posts } from "@/data/posts";
import PostCard from "./PostCard";
import ExperienceTimeline from "./ExperienceTimeline";

const filterByType = (type: "post" | "project") =>
  posts.filter((p) => p.type === type);

export default function FeedTabs() {
  return (
    <Tabs defaultValue="post" className="relative">
      {/* Sticky Tabs */}
      <TabsList className="sticky top-0 z-10 w-full bg-muted/60 backdrop-blur border-b rounded-none px-2">
        <TabsTrigger value="post">Posts</TabsTrigger>
        <TabsTrigger value="project">Projects</TabsTrigger>
        <TabsTrigger value="experience">Experience</TabsTrigger>
      </TabsList>

      {/* Posts */}
      <TabsContent value="post" className="space-y-4 pt-4">
        {filterByType("post").map((post) => (
          <PostCard key={post.id} {...post} />
        ))}
      </TabsContent>

      {/* Projects */}
      <TabsContent value="project" className="space-y-4 pt-4">
        {filterByType("project").map((post) => (
          <PostCard key={post.id} {...post} />
        ))}
      </TabsContent>

      {/* Experience */}
      <TabsContent value="experience" className="pt-4">
        <ExperienceTimeline />
      </TabsContent>
    </Tabs>
  );
}