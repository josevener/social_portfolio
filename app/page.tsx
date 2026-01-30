import ProfileHeader from "@/components/profile/ProfileHeader";
import StatsBar from "@/components/profile/StatsBar";
import FeedTabs from "@/components/feed/FeedTabs";
import { ThemeToggle } from "@/components/theme-toggle";
import ProfileActions from "@/components/profile/ProfileActions";

export default function Home() {
  return (
    <main className="max-w-4xl mx-auto h-screen flex flex-col p-6">
      {/* Top bar */}
      <div className="flex justify-end mb-4">
        <ThemeToggle />
      </div>

      {/* Fixed profile section */}
      <div className="space-y-4">
        <ProfileHeader />
        <StatsBar />
        <ProfileActions />
      </div>

      {/* Divider */}
      <div className="h-px bg-border my-4" />

      {/* Scrollable feed */}
      <div className="flex-1 overflow-y-auto pr-2">
        <FeedTabs />
      </div>
    </main>
  );
}
