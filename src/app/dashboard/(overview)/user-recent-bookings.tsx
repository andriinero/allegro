"use client";

import EmptyState from "@/app/_components/placeholders/empty-state";
import { api } from "@/trpc/react";
import { SquarePlusIcon } from "lucide-react";
import UserBookingCard from "./user-booking-card";

export default function UserRecentBookings() {
  const [bookings] = api.booking.getByCurrentUser.useSuspenseQuery({
    pagination: { take: 9, page: 0 },
    where: { status: "PENDING" },
  });

  return bookings ? (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
      {bookings.map((booking) => (
        <UserBookingCard key={booking.id} booking={booking} />
      ))}
    </div>
  ) : (
    <EmptyState
      icon={SquarePlusIcon}
      title="No recent bookings"
      description="You don't have any recent bookings."
    />
  );
}
