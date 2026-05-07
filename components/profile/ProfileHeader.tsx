import { profile } from "@/data/profile";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { BadgeCheck } from "lucide-react";

export default function ProfileHeader() {
  return (
    <div className="flex flex-col items-center text-center gap-4 sm:flex-row sm:items-start sm:text-left">
      <Avatar className="h-28 w-28 sm:h-36 sm:w-36 md:h-40 md:w-40">
        <AvatarImage src={profile.avatar} />
        <AvatarFallback>JR</AvatarFallback>
      </Avatar>

      <div className="space-y-1">
        <div className="flex items-center justify-center gap-2 sm:justify-start">
          <h1 className="text-xl sm:text-2xl font-bold">
            {profile.name}
          </h1>
          {profile.isVerified && (
            <BadgeCheck className="h-5 w-5 fill-blue-500 text-white dark:text-slate-950" />
          )}
        </div>
        <div className="flex items-center justify-center gap-3 sm:justify-start">
          <p className="text-muted-foreground">{profile.handle}</p>
          <div className="flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-green-500/10 border border-green-500/20 text-[10px] font-bold text-green-500 uppercase tracking-wider animate-pulse">
            <div className="h-1.5 w-1.5 rounded-full bg-green-500" />
            Available for work
          </div>
        </div>

        <p className="font-medium">{profile.headline}</p>
        <p className="text-sm text-muted-foreground">
          {profile.subHeadline}
        </p>

        <p className="text-sm mt-2 max-w-prose">
          {profile.bio}
        </p>
        <p className="text-sm text-muted-foreground">
          📍 {profile.location}
        </p>
      </div>
    </div>
  );
}