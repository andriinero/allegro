"use client";

import { Button } from "@/app/_components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/app/_components/ui/card";
import { useDashboard } from "@/hooks/use-dashboard";
import { formatTime, formatWeekdayDayMonth } from "@/lib/date";
import { cn } from "@/lib/utils";
import { type RouterOutputs } from "@/trpc/react";
import {
  CalendarIcon,
  ClockIcon,
  GuitarIcon,
  HourglassIcon,
  LinkIcon,
} from "lucide-react";
import Link from "next/link";

type UserLessonCardProps = {
  lesson: RouterOutputs["lesson"]["getAll"][number];
};

export default function UserLessonCard({ lesson }: UserLessonCardProps) {
  const { setOpen, setId } = useDashboard();

  return (
    <Card
      key={lesson.id}
      className={cn(
        "flex flex-col",
        lesson.booking?.status === "CANCELLED" && "opacity-50",
      )}
    >
      <CardHeader>
        <CardTitle className="flex items-center justify-between gap-2">
          {lesson.title}
          <GuitarIcon className="size-5" />
        </CardTitle>
        <CardDescription>
          {lesson.booking?.lessonPresence}
          {lesson.booking?.status === "CANCELLED" && " (Cancelled)"}
          {lesson.booking?.status === "COMPLETED" && " (Completed)"}
        </CardDescription>
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

      {lesson.booking?.status === "CONFIRMED" && (
        <CardFooter className="flex flex-col justify-between gap-2">
          <Button
            onClick={() => {
              setOpen("cancelLesson");
              setId(lesson.id);
            }}
            variant="destructive"
            className="w-full"
          >
            Cancel
          </Button>
        </CardFooter>
      )}
    </Card>
  );
}
