import { auth } from "@/server/auth";
import { redirect } from "next/navigation";
import type { ReactNode } from "react";

type LayoutProps = { children: ReactNode };

export default async function Layout({ children }: LayoutProps) {
  const session = await auth();

  if (!session || session.user.role !== "ADMIN") return redirect("/");

  return <div className="">{children}</div>;
}
