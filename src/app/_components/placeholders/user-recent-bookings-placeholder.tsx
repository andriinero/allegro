import { SquarePlusIcon } from "lucide-react";

export default function UserRecentBookingsPlaceholder() {
  return (
    <div className="grid grid-cols-1 gap-4 lg:grid-cols-4">
      <div className="flex h-[268px] animate-pulse items-center justify-center rounded-xl border border-dashed">
        <SquarePlusIcon className="size-5 text-muted-foreground" />
      </div>
      <div className="flex h-[268px] animate-pulse items-center justify-center rounded-xl border border-dashed">
        <SquarePlusIcon className="size-5 text-muted-foreground" />
      </div>
      <div className="flex h-[268px] animate-pulse items-center justify-center rounded-xl border border-dashed">
        <SquarePlusIcon className="size-5 text-muted-foreground" />
      </div>
      <div className="flex h-[268px] animate-pulse items-center justify-center rounded-xl border border-dashed">
        <SquarePlusIcon className="size-5 text-muted-foreground" />
      </div>
    </div>
  );
}
