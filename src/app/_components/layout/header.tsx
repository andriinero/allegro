"use client";

import ContentWrapper from "@/app/_components/general/content-wrapper";
import Logo from "@/app/_components/general/logo";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/app/_components/ui/avatar";
import { Button } from "@/app/_components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/app/_components/ui/dropdown-menu";
import { cn } from "@/lib/utils";
import {
  ChevronDown,
  LayoutDashboard,
  LogOut,
  Settings,
  User,
} from "lucide-react";
import type { Session } from "next-auth";
import Link from "next/link";
import { usePathname } from "next/navigation";
import NavLinks from "./nav-links";

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

  const isSolidVariant = variant === "solid";
  const fallbackUsername = session?.user?.name?.substring(0, 2);

  return (
    <header
      className={cn(
        "fixed flex w-full items-center justify-center backdrop-blur",
        { "bg-background shadow": isSolidVariant },
        className,
      )}
    >
      <ContentWrapper className="flex items-center py-2">
        <Logo
          className={cn("flex-1", isSolidVariant && "text-accent-foreground")}
        />

        <NavLinks variant={variant} />

        <div className="flex flex-1 items-center justify-end gap-4">
          {session?.user ? (
            <DropdownMenu>
              <DropdownMenuTrigger className="flex items-center gap-2">
                <Avatar>
                  <AvatarImage src={session?.user?.image ?? ""} />
                  <AvatarFallback>{fallbackUsername}</AvatarFallback>
                </Avatar>
                <ChevronDown
                  className={cn(
                    "size-5 text-background",
                    isSolidVariant && "text-foreground",
                  )}
                />
              </DropdownMenuTrigger>

              <DropdownMenuContent>
                <DropdownMenuLabel>
                  <p>{session.user?.name}</p>
                  <p className="text-xs font-light text-secondary-foreground">
                    {session.user?.email}
                  </p>
                </DropdownMenuLabel>

                <DropdownMenuSeparator />

                <Link href="/dashboard/profile">
                  <DropdownMenuItem>
                    <User /> Profile
                  </DropdownMenuItem>
                </Link>

                <Link href="/dashboard">
                  <DropdownMenuItem>
                    <LayoutDashboard /> Dashboard
                  </DropdownMenuItem>
                </Link>

                <Link href="/dashboard/settings">
                  <DropdownMenuItem>
                    <Settings /> Settings
                  </DropdownMenuItem>
                </Link>

                <DropdownMenuSeparator />

                <Link href="/api/auth/signout">
                  <DropdownMenuItem className="text-destructive">
                    <LogOut /> Logout
                  </DropdownMenuItem>
                </Link>
              </DropdownMenuContent>
            </DropdownMenu>
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
            >
              <Button>Book Lesson Now</Button>
            </Link>
          )}
        </div>
      </ContentWrapper>
    </header>
  );
}
