import { cn } from "@/lib/utils";
import type { ComponentProps } from "react";

type PageContentWrapperProps = ComponentProps<"div">;
export default function ContentWrapper({
  className,
  children,
  ...props
}: PageContentWrapperProps) {
  return (
    <div
      className={cn("flex w-full max-w-screen-xl p-4", className)}
      {...props}
    >
      {children}
    </div>
  );
}
