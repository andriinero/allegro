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
  FileIcon,
  GuitarIcon,
  HourglassIcon,
  LinkIcon,
  TextIcon,
} from "lucide-react";
import Link from "next/link";
import InfoField from "./info-field";

type UserLessonCardProps = {
  lesson: RouterOutputs["lesson"]["getAll"][number];
};

export default function UserLessonCard({ lesson }: UserLessonCardProps) {
  const { setOpen, setId } = useDashboard();

  function handleOpenCancelLessonDialog() {
    setOpen("cancelLesson");
    setId(lesson.id);
  }

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
        <InfoField icon={HourglassIcon} value={`${lesson?.duration} minutes`} />

        <InfoField
          icon={CalendarIcon}
          value={
            lesson.booking?.date
              ? formatWeekdayDayMonth(lesson.booking.date)
              : "No date"
          }
        />

        <InfoField
          icon={ClockIcon}
          value={
            lesson.booking?.date ? formatTime(lesson.booking.date) : "No time"
          }
        />

        <Link
          href={lesson.lessonLink ?? ""}
          target="_blank"
          className="flex items-center gap-2 underline"
        >
          <LinkIcon className="size-4 text-muted-foreground" /> Lesson Link
        </Link>

        {lesson.description && (
          <div className="pt-2 text-sm">
            <InfoField
              icon={TextIcon}
              value="Description"
              className="font-medium"
            />
            {lesson.description}
          </div>
        )}

        {lesson.assignment && (
          <div className="pt-2 text-sm">
            <InfoField
              icon={FileIcon}
              value="Assignment"
              className="font-medium"
            />
            {lesson.assignment}
          </div>
        )}
      </CardContent>

      {lesson.booking?.status === "CONFIRMED" && (
        <CardFooter className="flex flex-col justify-between gap-2">
          <Button
            onClick={handleOpenCancelLessonDialog}
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
