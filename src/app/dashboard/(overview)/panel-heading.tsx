import { cn } from "@/lib/utils";
import type { ComponentProps } from "react";

type PanelHeadingProps = {
  className?: string;
  title: string;
  description?: string;
} & ComponentProps<"div">;

export default function PanelHeading({
  title,
  description,
  className,
  ...props
}: PanelHeadingProps) {
  return (
    <div className={cn(className)} {...props}>
      <h2 className="text-3xl font-bold tracking-tight">{title}</h2>
      {description && <p className="text-muted-foreground">{description}</p>}
    </div>
  );
}
