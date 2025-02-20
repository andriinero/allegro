import { cn } from "@/lib/utils";
import type { LucideIcon } from "lucide-react";

type InfoFieldProps = {
  icon: LucideIcon;
  value: string;
  className?: string;
};

export default function InfoField({
  icon: Icon,
  value,
  className,
}: InfoFieldProps) {
  return (
    <div className={cn("flex items-center gap-2", className)}>
      <Icon className="size-4 text-muted-foreground" />
      {value}
    </div>
  );
}
