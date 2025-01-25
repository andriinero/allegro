"use client";

import { api } from "@/trpc/react";

export default function Page() {
  const { data, isPending } = api.admin.getUsers.useQuery();

  return (
    <div className="">
      {isPending ? (
        <p>Loading...</p>
      ) : data ? (
        <ul className="flex gap-4">
          {data.map((user) => (
            <li key={user.id} className="flex flex-col">
              <p>{user.name}</p>
              <p>{user.email}</p>
              <p>{user.role}</p>
            </li>
          ))}
        </ul>
      ) : (
        <p>Error</p>
      )}
    </div>
  );
}
