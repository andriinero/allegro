import { BookOpen } from "lucide-react";

export default function CompletedLessonsPlaceholder() {
  return (
    <div className="flex h-full flex-col items-center justify-center gap-2">
      <BookOpen className="size-6 text-muted-foreground" />

      <div className="flex flex-col items-center gap-1">
        <h5 className="text-sm font-semibold">
          No completed lessons for this month
        </h5>

        <p className="text-sm text-muted-foreground">
          You haven&apos;t taught any students this month yet.
        </p>
      </div>
    </div>
  );
}
