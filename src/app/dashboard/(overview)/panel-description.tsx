import { cn } from "@/lib/utils";

import type { ComponentPropsWithoutRef } from "react";

type PanelDescriptionProps = ComponentPropsWithoutRef<"div">;

export default function PanelDescription({
  className,
  children,
  ...props
}: PanelDescriptionProps) {
  return (
    <p className={cn("text-muted-foreground", className)} {...props}>
      {children}
    </p>
  );
}
