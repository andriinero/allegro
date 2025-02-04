import { cn } from "@/lib/utils";

import type { ComponentPropsWithoutRef } from "react";

type PanelHeaderProps = ComponentPropsWithoutRef<"h2">;

export default function PanelHeading({
  className,
  children,
  ...props
}: PanelHeaderProps) {
  return (
    <h2
      className={cn("text-xl font-semibold tracking-tight", className)}
      {...props}
    >
      {children}
    </h2>
  );
}
