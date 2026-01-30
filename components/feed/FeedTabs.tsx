import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import { posts } from "@/data/posts";
import PostCard from "./PostCard";

const filterByType = (type?: string) => {
  if (!type || type === "all") return posts;
  return posts.filter((post) => post.type === type);
};

export default function FeedTabs() {
  return (
    <Tabs defaultValue="all" className="relative">
      {/* Sticky Tabs */}
      <TabsList className="sticky top-0 z-10 w-full bg-muted/60 backdrop-blur border-b rounded-none px-2">
        <TabsTrigger value="all">All</TabsTrigger>
        <TabsTrigger value="post">Posts</TabsTrigger>
        <TabsTrigger value="project">Projects</TabsTrigger>
        <TabsTrigger value="experience">Experience</TabsTrigger>
      </TabsList>

      {/* Feed Content */}
      {["all", "project", "experience", "post"].map((tab) => (
        <TabsContent
          key={tab}
          value={tab}
          className="space-y-4 pt-4"
        >
          {filterByType(tab).map((post) => (
            <PostCard key={post.id} {...post} />
          ))}
        </TabsContent>
      ))}
    </Tabs>
  );
}