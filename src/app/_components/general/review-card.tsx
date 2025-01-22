import { cn } from "@/lib/utils";
import type { ReactNode } from "react";

type ReviewCardProps = {
  authorName: string;
  score: number;
  children?: ReactNode;
  className?: string;
};

export default function ReviewCard({
  authorName,
  score,
  children,
  className,
}: ReviewCardProps) {
  return (
    <div
      className={cn(
        "border-border max-w-md space-y-5 rounded-md border p-4 shadow-md",
        className,
      )}
    >
      <p className="font-semibold">{children}</p>

      <div className="flex justify-between">
        <p className="text-primary text-sm font-medium">{authorName}</p>

        <div>
          {[...(Array(score) as [])].map((_, i) => (
            <span key={i}>*</span>
          ))}
        </div>
      </div>
    </div>
  );
}
