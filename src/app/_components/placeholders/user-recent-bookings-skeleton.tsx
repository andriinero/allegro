export default function UserRecentBookingsSkeleton() {
  return (
    <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
      {Array.from({ length: 3 }).map((_, index) => (
        <div
          key={index}
          className="flex h-[268px] animate-pulse items-center justify-center rounded-xl bg-muted"
        ></div>
      ))}
    </div>
  );
}
