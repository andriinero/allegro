import { Card, CardContent } from "@/app/_components/ui/card";
import { getPercentageIncrease } from "@/lib/mathUtils";
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
      <div className="flex items-center justify-between p-6 pb-2">
        <h4 className="text-sm font-medium tracking-tight">{heading}</h4>

        <div className="opacity-60 [&_svg]:size-4">{icon}</div>
      </div>

      <CardContent>
        <div className="text-2xl font-bold">{value ? value : "-"}</div>
        <p className="text-xs text-foreground/80">
          {increase} from the last month
        </p>
      </CardContent>
    </Card>
  );
}
