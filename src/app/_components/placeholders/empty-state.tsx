import { LucideIcon } from "lucide-react";

type EmptyStateProps = {
  icon: LucideIcon;
  title: string;
  description: string;
};

export default function EmptyState({
  icon: Icon,
  title,
  description,
}: EmptyStateProps) {
  return (
    <div className="flex h-full flex-col items-center justify-center gap-2 p-4">
      <Icon className="size-6 text-muted-foreground" />

      <div className="flex flex-col items-center gap-1">
        <h5 className="text-sm font-semibold">{title}</h5>
        <p className="text-center text-sm text-muted-foreground">
          {description}
        </p>
      </div>
    </div>
  );
}
