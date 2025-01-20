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
      className={cn("flex w-full max-w-screen-lg justify-between", className)}
      {...props}
    >
      {children}
    </div>
  );
}
