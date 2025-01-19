import { api } from "@/trpc/server";

export default async function Page() {
  const users = await api.user.getAll({});

  return (
    <div>
      <h1 className="">Registered Users</h1>
      <div className="flex flex-wrap">
        {users.map((user) => (
          <div key={user.id}>
            <p>{user.name}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
