"use client";

import { Button } from "@/app/_components/ui/button";
import type { Session } from "next-auth";
import Link from "next/link";
import { usePathname } from "next/navigation";
import NavLinks from "./nav-links";
import UserDropdownMenu from "./user-dropdown-menu";

type HeaderProps = {
  session: Session | null;
  variant?: "transparent" | "solid";
  className?: string;
};

export default function Header({
  session,
  variant = "transparent",
  className,
}: HeaderProps) {
  const pathname = usePathname();

  return (
    <header className="bg-white border-b border-border">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <div className="flex items-center gap-2 flex-1">
            {session?.user ? (
              <UserDropdownMenu user={session.user} variant={variant} />
            ) : null}
          <span className="font-bold text-xl text-foreground">Allegro</span>
        </div>

      <NavLinks variant='solid' />

      <div className="flex items-center justify-end flex-1 gap-4">
            {session?.user ? (
              <Link href="/api/auth/signin" className="hidden sm:block">
                <Button variant="ghost">Login</Button>
              </Link>
            ) : null}
            {!pathname.startsWith("/dashboard") && (
              <Link
                href={
                  session?.user ? "/dashboard/book-lesson" : "/api/auth/signin"
                }
                className="hidden sm:block"
              >
                <Button>Book Lesson Now</Button>
              </Link>
            )}
          </div>
      </div>
    </header>
  );
}
