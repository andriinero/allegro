import { Badge } from "@/app/_components/ui/badge";
import { type BookingStatus } from "@prisma/client";
import {
  Circle,
  CircleCheck,
  CircleDashed,
  CircleX,
  type LucideIcon,
} from "lucide-react";

type BookingStatusBadgeProps = {
  status: BookingStatus;
};

const statusIconMap: Record<BookingStatus, LucideIcon> = {
  PENDING: CircleDashed,
  CONFIRMED: Circle,
  COMPLETED: CircleCheck,
  CANCELLED: CircleX,
};

const statusClassNameMap: Record<BookingStatus, string> = {
  PENDING:
    "border-amber-200 bg-amber-50 text-amber-700 dark:border-amber-900 dark:bg-amber-950/40 dark:text-amber-300",
  CONFIRMED:
    "border-blue-200 bg-blue-50 text-blue-700 dark:border-blue-900 dark:bg-blue-950/40 dark:text-blue-300",
  COMPLETED:
    "border-emerald-200 bg-emerald-50 text-emerald-700 dark:border-emerald-900 dark:bg-emerald-950/40 dark:text-emerald-300",
  CANCELLED:
    "border-red-200 bg-red-50 text-red-700 dark:border-red-900 dark:bg-red-950/40 dark:text-red-300",
};

export default function BookingStatusBadge({
  status,
}: BookingStatusBadgeProps) {
  const Icon = statusIconMap[status];

  return (
    <Badge
      variant="outline"
      className={`gap-1.5 font-medium capitalize ${statusClassNameMap[status]}`}
    >
      <Icon className="size-3.5" aria-hidden="true" />
      {status.toLowerCase()}
    </Badge>
  );
}
