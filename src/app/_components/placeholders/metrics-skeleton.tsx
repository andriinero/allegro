import { Skeleton } from "@/app/_components/ui/skeleton";

export default function MetricsSkeleton() {
  return (
    <>
      <Skeleton className="col-span-1 h-[126px] rounded-xl shadow" />
      <Skeleton className="col-span-1 h-[126px] rounded-xl shadow" />
      <Skeleton className="col-span-1 h-[126px] rounded-xl shadow" />
      <Skeleton className="col-span-1 h-[126px] rounded-xl shadow" />
    </>
  );
}
