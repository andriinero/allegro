import { Button } from "@/app/_components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/app/_components/ui/card";
import { formatTime, formatWeekdayDayMonth } from "@/lib/date";
import { api, type RouterOutputs } from "@/trpc/react";
import {
  CalendarIcon,
  ClockIcon,
  GuitarIcon,
  HourglassIcon,
  LinkIcon,
} from "lucide-react";
import Link from "next/link";
import { toast } from "sonner";

type UserLessonCardProps = {
  lesson: RouterOutputs["lesson"]["getAll"][number];
};

export default function UserLessonCard({ lesson }: UserLessonCardProps) {
  const utils = api.useUtils();
  const cancelLesson = api.lesson.cancelById.useMutation({
    onSuccess: async () => {
      toast.success("Lesson cancelled");
      await utils.lesson.getAll.invalidate();
    },
    onError: () => {
      toast.error("Failed to cancel lesson");
    },
  });

  function handleCancel() {
    cancelLesson.mutate({ id: lesson.id });
  }

  return (
    <Card key={lesson.id} className="flex flex-col">
      <CardHeader>
        <CardTitle className="flex items-center justify-between gap-2">
          {lesson.title}
          <GuitarIcon className="size-5" />
        </CardTitle>
        <CardDescription>{lesson.booking?.lessonPresence}</CardDescription>
      </CardHeader>

      <CardContent className="flex-1 space-y-1 text-sm">
        <div className="flex items-center gap-2">
          <HourglassIcon className="size-4 text-muted-foreground" />
          {lesson.duration} minutes
        </div>

        <div className="flex items-center gap-2">
          <CalendarIcon className="size-4 text-muted-foreground" />
          {lesson.booking?.date
            ? formatWeekdayDayMonth(lesson.booking.date)
            : "No date"}
        </div>

        <div className="flex items-center gap-2">
          <ClockIcon className="size-4 text-muted-foreground" />
          {lesson.booking?.date ? formatTime(lesson.booking.date) : "No time"}
        </div>

        <Link
          href={lesson.lessonLink ?? ""}
          target="_blank"
          className="flex items-center gap-2 underline"
        >
          <LinkIcon className="size-4 text-muted-foreground" /> Lesson Link
        </Link>

        {lesson.description && (
          <div className="pt-2 text-sm">
            <p className="font-medium">Description:</p>
            {lesson.description}
          </div>
        )}

        {lesson.assignment && (
          <div className="pt-2 text-sm">
            <p className="font-medium">Assignment:</p>
            {lesson.assignment}
          </div>
        )}
      </CardContent>

      <CardFooter className="flex flex-col justify-between gap-2">
        <Button
          onClick={handleCancel}
          disabled={cancelLesson.isPending}
          variant="destructive"
          className="w-full"
        >
          {cancelLesson.isPending ? "Cancelling..." : "Cancel"}
        </Button>
      </CardFooter>
    </Card>
  );
}
