import { cn } from "@/lib/utils";
import type { ComponentProps } from "react";

type PanelWrapperProps = ComponentProps<"div">;

export default function PanelWrapper({
  className,
  ...props
}: PanelWrapperProps) {
  return (
    <div
      className={cn(
        "mx-auto flex w-full min-w-0 max-w-7xl flex-col gap-6",
        className
      )}
      {...props}
    />
  );
}
