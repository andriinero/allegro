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
  type LucideIcon,
  TextIcon,
} from "lucide-react";
import Link from "next/link";
import InfoField from "../../_components/general/info-field";

const statusMap = {
  CANCELLED: " (Cancelled)",
  CONFIRMED: " (Confirmed)",
} as const;

type LessonStatusProps = {
  status?: string;
};

function LessonStatus({ status }: LessonStatusProps) {
  if (!status) return null;

  return <>{statusMap[status as keyof typeof statusMap] ?? ""}</>;
}

type LessonDetailsProps = {
  duration: number;
  date?: Date;
  lessonLink?: string | null;
  description?: string | null;
  assignment?: string | null;
};

function LessonDetails({
  duration,
  date,
  lessonLink,
  description,
  assignment,
}: LessonDetailsProps) {
  return (
    <div className="flex-1 space-y-1 text-sm">
      <InfoField icon={HourglassIcon}>{duration} minutes</InfoField>

      <InfoField icon={CalendarIcon}>
        {date ? formatWeekdayDayMonth(date) : "No date"}
      </InfoField>

      <InfoField icon={ClockIcon}>
        {date ? formatTime(date) : "No time"}
      </InfoField>

      {lessonLink && (
        <Link
          href={lessonLink}
          target="_blank"
          className="flex items-center gap-2 underline"
        >
          <InfoField icon={LinkIcon}>Lesson Link</InfoField>
        </Link>
      )}

      <TextSection
        icon={TextIcon}
        title="Description"
        content={description}
        emptyMessage="No lesson description provided yet"
      />

      <TextSection
        icon={FileIcon}
        title="Assignment"
        content={assignment}
        emptyMessage="No practice assignment set for this lesson"
      />
    </div>
  );
}

type TextSectionProps = {
  icon: LucideIcon;
  title: string;
  content?: string | null;
  emptyMessage: string;
};

function TextSection({
  icon: Icon,
  title,
  content,
  emptyMessage,
}: TextSectionProps) {
  return (
    <div className="pt-2 text-sm">
      <InfoField icon={Icon} className="font-medium">
        {title}
      </InfoField>
      {content ? (
        content
      ) : (
        <p className="pt-2 text-sm text-muted-foreground">{emptyMessage}</p>
      )}
    </div>
  );
}

type UserLessonCardProps = {
  lesson: RouterOutputs["lesson"]["getByCurrentUser"][number];
};

export default function UserLessonCard({ lesson }: UserLessonCardProps) {
  const { setOpen, setId } = useDashboard();

  function handleOpenCancelLessonDialog() {
    setId(lesson.id);
    setOpen("cancelLesson");
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
          <LessonStatus status={lesson.booking?.status} />
        </CardDescription>
      </CardHeader>

      <CardContent>
        <LessonDetails
          duration={lesson.duration ?? 0}
          date={lesson.booking?.date}
          lessonLink={lesson.lessonLink}
          description={lesson.description}
          assignment={lesson.assignment}
        />
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
