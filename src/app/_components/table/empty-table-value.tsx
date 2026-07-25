import { cn } from "@/lib/utils";
import type { LucideIcon } from "lucide-react";
import type { ComponentProps } from "react";

type EmptyTableValueProps = ComponentProps<"span"> & {
  icon: LucideIcon;
};

export default function EmptyTableValue({
  icon: Icon,
  className,
  children,
  ...props
}: EmptyTableValueProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 whitespace-nowrap text-xs text-muted-foreground/80",
        className
      )}
      {...props}
    >
      <Icon className="size-3.5 opacity-60" aria-hidden="true" />
      {children}
    </span>
  );
}
