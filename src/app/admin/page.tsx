"use client";

import { api } from "@/trpc/react";

export default function Page() {
  const { data, isPending } = api.booking.getAll.useQuery();

  return (
    <div className="">
      {isPending ? (
        <p>Loading...</p>
      ) : data ? (
        <ul className="flex gap-4">
          {data.map((booking) => (
            <li key={booking.id} className="flex flex-col">
              <p>
                Id: <span className="font-bold">{booking.id}</span>
              </p>
              <p>
                BookedBy:{" "}
                <span className="font-bold">{booking.bookedBy.name}</span>
              </p>
              <p>
                Date:{" "}
                <span className="font-bold">
                  {booking.date.toLocaleDateString()}
                </span>
              </p>
            </li>
          ))}
        </ul>
      ) : (
        <p>Error</p>
      )}
    </div>
  );
}
