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
    <div className={cn("flex items-center gap-2 [&_svg]:size-4", className)}>
      <Icon className="text-muted-foreground" />
      <span className="text-sm">{children}</span>
    </div>
  );
}
