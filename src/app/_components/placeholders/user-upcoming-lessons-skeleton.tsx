import { BookOpenIcon } from "lucide-react";

export default function UserUpcomingLessonsSkeleton() {
  return (
    <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
      <div className="flex h-[525px] animate-pulse items-center justify-center rounded-xl border border-dashed">
        <BookOpenIcon className="size-5 text-muted-foreground" />
      </div>
      <div className="flex h-[525px] animate-pulse items-center justify-center rounded-xl border border-dashed">
        <BookOpenIcon className="size-5 text-muted-foreground" />
      </div>
    </div>
  );
}
