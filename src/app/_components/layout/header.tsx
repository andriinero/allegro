"use client";

import ContentWrapper from "@/app/_components/general/content-wrapper";
import Logo from "@/app/_components/general/logo";
import { Button } from "@/app/_components/ui/button";
import { cn } from "@/lib/utils";
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
    <header
      className={cn(
        "fixed z-20 flex w-full items-center justify-center backdrop-blur",
        variant === "solid" && "border-b border-border bg-background",
        className,
      )}
    >
      <ContentWrapper className="flex items-center py-2">
        <Logo
          className={cn(
            "flex-1",
            variant === "solid" && "text-accent-foreground",
          )}
        />

        <NavLinks variant={variant} />

        <div className="flex flex-1 items-center justify-end gap-4">
          {session?.user ? (
            <UserDropdownMenu user={session.user} variant={variant} />
          ) : (
            <Link href="/api/auth/signin">
              <Button variant="ghost" className="text-primary-foreground">
                Login
              </Button>
            </Link>
          )}

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
      </ContentWrapper>
    </header>
  );
}
