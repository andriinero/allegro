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
import { formatWeekdayDayMonthTime } from "@/lib/date";
import { api } from "@/trpc/react";
import AdminPanelHeading from "../(overview)/admin-panel-heading";
import Link from "next/link";
import { LinkIcon } from "lucide-react";

export default function Page() {
  const { data: lessons } = api.lesson.getAny.useQuery({
    pagination: { take: 10, page: 0 },
    where: { booking: { status: "CONFIRMED" } },
  });

  return (
    <div className="flex flex-col gap-4">
      <AdminPanelHeading
        title="Lessons"
        description="Manage and view all lessons"
      />
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-3"></div>
    </div>
  );
}
