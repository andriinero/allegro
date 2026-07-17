"use client";

import { Button } from "@/app/_components/ui/button";
import { cn } from "@/lib/utils";
import { ArrowUpRight, Menu } from "lucide-react";
import type { Session } from "next-auth";
import Link from "next/link";
import { usePathname } from "next/navigation";
import NavLinks from "./nav-links";
import UserDropdownMenu from "./user-dropdown-menu";
import Logo from "../general/logo";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "../ui/sheet";
import { navLinks } from "@/data/user-nav";

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
  const bookingHref = session?.user
    ? "/dashboard/book-lesson"
    : "/api/auth/signin";

  return (
    <header
      className={cn(
        "sticky top-0 z-40 border-b border-white/10 bg-slate-950/90 text-white shadow-[0_8px_30px_rgb(15_23_42/0.18)] backdrop-blur-xl supports-[backdrop-filter]:bg-slate-950/80",
        variant === "solid" && "bg-slate-950",
        className
      )}
    >
      <div className="mx-auto flex h-[72px] w-full max-w-screen-xl items-center justify-between gap-6 px-4 sm:px-6 lg:grid lg:grid-cols-[1fr_auto_1fr] lg:px-8">
        <Logo className="shrink-0 lg:justify-self-start" />

        <NavLinks />

        <div className="hidden items-center justify-end gap-2 lg:flex lg:justify-self-end">
          {!session?.user && (
            <Button
              asChild
              variant="ghost"
              className="rounded-full px-5 text-slate-200 hover:bg-white/10 hover:text-white"
            >
              <Link href="/api/auth/signin">Log in</Link>
            </Button>
          )}
          {session?.user && (
            <UserDropdownMenu user={session.user} variant={variant} />
          )}
          {!pathname.startsWith("/dashboard") && (
            <Button
              asChild
              className="group h-10 rounded-full bg-primary px-5 font-semibold shadow-sm transition-colors hover:bg-primary/90"
            >
              <Link href={bookingHref}>
                Book a lesson
                <ArrowUpRight className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </Link>
            </Button>
          )}
        </div>

        <Sheet>
          <SheetTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              className="rounded-full border border-white/10 bg-white/5 text-white hover:bg-white/10 hover:text-white lg:hidden lg:justify-self-end"
              aria-label="Open navigation menu"
            >
              <Menu className="h-5 w-5" />
            </Button>
          </SheetTrigger>
          <SheetContent className="border-slate-800 bg-slate-950 text-white">
            <SheetHeader className="text-left">
              <SheetTitle className="text-white">
                <Logo />
              </SheetTitle>
            </SheetHeader>

            <nav
              className="mt-10 flex flex-col gap-2"
              aria-label="Mobile navigation"
            >
              {navLinks.map((link) => (
                <SheetClose asChild key={link.href}>
                  <Link
                    href={link.href}
                    className={cn(
                      "rounded-xl px-4 py-3 text-lg font-medium text-slate-300 transition-colors hover:bg-white/5 hover:text-white",
                      pathname === link.href && "bg-white/10 text-white"
                    )}
                  >
                    {link.name}
                  </Link>
                </SheetClose>
              ))}
            </nav>

            <div className="mt-8 grid gap-3 border-t border-white/10 pt-8">
              {session?.user && (
                <Button
                  asChild
                  variant="outline"
                  className="h-11 rounded-full border-white/15 bg-transparent text-white hover:bg-white/10 hover:text-white"
                >
                  <Link href="/dashboard">Go to dashboard</Link>
                </Button>
              )}
              {!session?.user && (
                <Button
                  asChild
                  variant="outline"
                  className="h-11 rounded-full border-white/15 bg-transparent text-white hover:bg-white/10 hover:text-white"
                >
                  <Link href="/api/auth/signin">Log in</Link>
                </Button>
              )}
              {!pathname.startsWith("/dashboard") && (
                <Button
                  asChild
                  className="h-11 rounded-full bg-primary font-semibold hover:bg-primary/90"
                >
                  <Link href={bookingHref}>
                    Book a lesson <ArrowUpRight />
                  </Link>
                </Button>
              )}
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
}
