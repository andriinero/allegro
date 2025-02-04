import { cn } from "@/lib/utils";
import { Quote, Star } from "lucide-react";
import type { ReactNode } from "react";
import { Card } from "../_components/ui/card";

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
    <Card className={cn("my-2 space-y-2 rounded-md p-4", className)}>
      <Quote className="size-5 text-green-600" fill="#16a34a" strokeWidth={0} />

      <p className="font-semibold">{children}</p>

      <div className="flex justify-between pt-2 text-green-600">
        <p className="text-sm font-semibold">{authorName}</p>

        <div className="flex gap-0.5">
          {[...(Array(score) as [])].map((_, i) => (
            <Star key={i} className="size-5" fill="#16a34a" strokeWidth={0} />
          ))}
        </div>
      </div>
    </Card>
  );
}
