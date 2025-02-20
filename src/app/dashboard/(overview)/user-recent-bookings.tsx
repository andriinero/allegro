"use client";

import { api } from "@/trpc/react";
import UserBookingCard from "./user-booking-card";

export default function UserRecentBookings() {
  const [bookings] = api.booking.getByCurrentUser.useSuspenseQuery({
    pagination: { take: 9, page: 0 },
    where: { status: "PENDING" },
  });

  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
      {bookings.items.map((booking) => (
        <UserBookingCard key={booking.id} booking={booking} />
      ))}
    </div>
  );
}
