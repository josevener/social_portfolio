import { Separator } from "@/components/ui/separator";

export default function StatsBar() {
  return (
    <div className="flex flex-wrap justify-center gap-x-6 gap-y-2 text-sm sm:justify-start">
      <div>
        <span className="font-bold">3</span> Posts
      </div>

      <div className="hidden sm:block">
        <Separator orientation="vertical" />
      </div>

      <div>
        <span className="font-bold">10+</span> Projects
      </div>

      <div className="hidden sm:block">
        <Separator orientation="vertical" />
      </div>

      <div>
        <span className="font-bold">1+</span> Year Exp
      </div>
    </div>
  );
}