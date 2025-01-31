import { cn } from "@/lib/utils";

import type { ComponentPropsWithoutRef } from "react";

type PanelHeadingWrapperProps = ComponentPropsWithoutRef<"div">;

export default function PanelHeaderWrapper({
  className,
  children,
  ...props
}: PanelHeadingWrapperProps) {
  return (
    <div className={cn("", className)} {...props}>
      {children}
    </div>
  );
}
