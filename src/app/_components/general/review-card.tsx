import { cn } from "@/lib/utils";
import { Quote, Star } from "lucide-react";
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
        "border-primary max-w-md space-y-2 rounded-md border p-4 shadow-md",
        className,
      )}
    >
      <Quote className="text-primary size-4" />
      <p className="font-semibold">{children}</p>

      <div className="flex justify-between pt-2">
        <p className="text-primary text-sm font-medium">{authorName}</p>

        <div className="flex gap-0.5">
          {[...(Array(score) as [])].map((_, i) => (
            <Star key={i} className="text-primary size-4" />
          ))}
        </div>
      </div>
    </div>
  );
}
