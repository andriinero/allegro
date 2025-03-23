export default function UserUpcomingLessonsSkeleton() {
  return (
    <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
      {Array.from({ length: 2 }).map((_, index) => (
        <div
          key={index}
          className="flex h-[525px] animate-pulse items-center justify-center rounded-xl bg-muted"
        ></div>
      ))}
    </div>
  );
}
