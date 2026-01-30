import { profile } from "@/data/profile";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";

export default function ProfileHeader() {
  return (
    <div className="flex flex-col items-center text-center gap-4 sm:flex-row sm:items-start sm:text-left">
      <Avatar className="h-28 w-28 sm:h-36 sm:w-36 md:h-40 md:w-40">
        <AvatarImage src={profile.avatar} />
        <AvatarFallback>JR</AvatarFallback>
      </Avatar>

      <div className="space-y-1">
        <h1 className="text-xl sm:text-2xl font-bold">
          {profile.name}
        </h1>
        <p className="text-muted-foreground">{profile.handle}</p>

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