import { cn } from "@/lib/utils";
import { LoaderCircle } from "lucide-react";
import type { ComponentProps } from "react";

type SpinnerProps = ComponentProps<typeof LoaderCircle>;

export default function Spinner({ className, ...props }: SpinnerProps) {
  return (
    <div className="flex h-full w-full items-center justify-center gap-3 font-medium">
      <LoaderCircle className={cn("animate-spin", className)} {...props} />
      Loading...
    </div>
  );
}
