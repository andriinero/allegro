"use client";

import { api } from "@/trpc/react";
import UserBookingCard from "./user-booking-card";

export default function UserBookings() {
  const { data: bookings } = api.booking.getByCurrentUser.useQuery({
    pagination: { take: 4, page: 0 },
    where: { status: "PENDING" },
  });

  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
      {bookings?.map((booking) => (
        <UserBookingCard key={booking.id} booking={booking} />
      ))}
    </div>
  );
}
