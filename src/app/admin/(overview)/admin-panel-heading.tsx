import { cn } from "@/lib/utils";
import type { ComponentProps } from "react";

type AdminPanelHeadingProps = {
  className?: string;
  title: string;
  description?: string;
} & ComponentProps<"div">;

export default function AdminPanelHeading({
  title,
  description,
  className,
  ...props
}: AdminPanelHeadingProps) {
  return (
    <div className={cn(className)} {...props}>
      <h2 className="text-2xl font-bold tracking-tight">{title}</h2>
      {description && <p className="text-muted-foreground">{description}</p>}
    </div>
  );
}
