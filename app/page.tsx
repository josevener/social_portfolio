import FeedTabs from "@/components/feed/FeedTabs";
import ProfileActions from "@/components/profile/ProfileActions";
import ProfileHeader from "@/components/profile/ProfileHeader";
import StatsBar from "@/components/profile/StatsBar";
import { ThemeToggle } from "@/components/theme-toggle";

export default function Home() {
  return (
    <main className="mx-auto max-w-4xl min-h-dvh flex flex-col px-4 py-4 sm:px-6">
      {/* Top bar */}
      <div className="flex justify-end mb-3 sm:mb-4">
        <ThemeToggle />
      </div>

      {/* Profile section */}
      <div className="space-y-4">
        <ProfileHeader />
        <StatsBar />
        <ProfileActions />
      </div>

      {/* Divider */}
      <div className="h-px bg-border my-4 sm:my-6" />

      {/* Scrollable feed */}
      <div className="flex-1 overflow-y-auto">
        <FeedTabs />
      </div>
    </main>
  );
}