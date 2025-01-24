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
import { auth } from "@/server/auth";
import { LogOut, User } from "lucide-react";
import Link from "next/link";
import NavMenu from "./nav-menu";

type HeaderProps = {
  variant?: "transparent" | "solid";
};

export default async function Header({ variant = "transparent" }: HeaderProps) {
  const session = await auth();

  const isSolidVariant = variant === "solid";
  const fallbackUsername = session?.user.name?.substring(0, 2);

  return (
    <header
      className={cn(
        "fixed flex w-full items-center justify-center backdrop-blur",
        { "bg-background shadow": isSolidVariant },
      )}
    >
      <ContentWrapper className="flex items-center">
        <Logo
          className={cn("flex-1", { "text-accent-foreground": isSolidVariant })}
        />

        <NavMenu variant={variant} />

        <div className="flex flex-1 items-center justify-end gap-4">
          {session ? (
            <DropdownMenu>
              <DropdownMenuTrigger>
                <Avatar>
                  <AvatarImage src={session.user.image ?? ""} />
                  <AvatarFallback>{fallbackUsername}</AvatarFallback>
                </Avatar>
              </DropdownMenuTrigger>

              <DropdownMenuContent>
                <DropdownMenuLabel>
                  <p>{session.user.name}</p>
                  <p className="font-light text-secondary-foreground">
                    {session.user.email}
                  </p>
                </DropdownMenuLabel>

                <DropdownMenuSeparator />

                <Link href="/profile">
                  <DropdownMenuItem>
                    <User /> Profile
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
          <Link href={session ? "/book-lesson" : "/api/auth/signin"}>
            <Button>Book Lesson Now</Button>
          </Link>
        </div>
      </ContentWrapper>
    </header>
  );
}
