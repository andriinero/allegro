import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/app/_components/ui/card";
import { getPercentageIncrease } from "@/lib/math-utils";
import type { ReactNode } from "react";

type MetricCardProps = {
  heading: string;
  icon: ReactNode;
  value?: number;
  previousMonth?: number;
  currentMonth?: number;
};

export default function MetricCard({
  heading,
  icon,
  value,
  previousMonth,
  currentMonth,
}: MetricCardProps) {
  const increase =
    previousMonth !== undefined && currentMonth !== undefined
      ? getPercentageIncrease(previousMonth, currentMonth)
      : "+0%";

  return (
    <Card className="basis-1/4">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium tracking-tight">
          {heading}
        </CardTitle>

        <div className="opacity-60 [&_svg]:size-4">{icon}</div>
      </CardHeader>

      <CardContent>
        <div className="text-2xl font-bold">{value ? value : "-"}</div>
        <p className="text-xs text-muted-foreground">
          {increase} from the last month
        </p>
      </CardContent>
    </Card>
  );
}
