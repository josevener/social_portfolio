import { Separator } from "@/components/ui/separator";

export default function StatsBar() {
  return (
    <div className="flex gap-6 text-sm mt-6">
      <div>
        <span className="font-bold">3</span> Posts
      </div>
      <Separator orientation="vertical" />
      <div>
        <span className="font-bold">2+</span> Projects
      </div>
      <Separator orientation="vertical" />
      <div>
        <span className="font-bold">1+</span> Year Exp
      </div>
    </div>
  );
}