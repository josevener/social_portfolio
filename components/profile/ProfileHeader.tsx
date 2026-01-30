import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { profile } from "@/data/profile";

export default function ProfileHeader() {
  return (
    <div className="flex gap-4 items-start">
      <Avatar className="h-40 w-40">
        <AvatarImage src={profile.avatar} />
        <AvatarFallback>JR</AvatarFallback>
      </Avatar>

      <div className="space-y-1">
        <h1 className="text-2xl font-bold">{profile.name}</h1>
        <p className="text-muted-foreground">{profile.handle}</p>

        <p className="font-medium">{profile.headline}</p>
        <p className="text-sm text-muted-foreground">
          {profile.subHeadline}
        </p>

        <p className="text-sm mt-2">{profile.bio}</p>
        <p className="text-sm text-muted-foreground">📍 {profile.location}</p>
      </div>
    </div>
  );
}