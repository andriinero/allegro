import { cn } from "@/lib/utils";
import type { LucideIcon } from "lucide-react";

type InfoFieldProps = {
  icon: LucideIcon;
  children: React.ReactNode;
  className?: string;
};

export default function InfoField({
  icon: Icon,
  children,
  className,
}: InfoFieldProps) {
  return (
    <div className={cn("flex items-center gap-2", className)}>
      <Icon className="size-4 text-muted-foreground" />
      {children}
    </div>
  );
}
