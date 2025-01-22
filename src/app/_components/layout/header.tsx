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
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from "@/app/_components/ui/navigation-menu";
import { cn } from "@/lib/utils";
import { auth } from "@/server/auth";
import { LogOut, User } from "lucide-react";
import Link from "next/link";

const navLinks = [
  { href: "/blog", name: "Blog" },
  { href: "/about-me", name: "About Me" },
  { href: "/contact", name: "Contact" },
  { href: "/faq", name: "FAQ" },
];

export default async function Header() {
  const session = await auth();

  const fallbackUsername = session?.user.name?.substring(0, 2);

  return (
    <header className="fixed flex w-full items-center justify-center p-3 backdrop-blur">
      <ContentWrapper className="flex items-center">
        <Logo className="flex-1" />

        <NavigationMenu className="flex-2">
          <NavigationMenuList>
            {navLinks.map((link) => (
              <NavigationMenuItem key={link.href}>
                <Link
                  href={link.href}
                  className={cn(
                    navigationMenuTriggerStyle(),
                    "text-primary-foreground bg-transparent",
                  )}
                >
                  {link.name}
                </Link>
              </NavigationMenuItem>
            ))}
          </NavigationMenuList>
        </NavigationMenu>

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
                  <p className="font-light text-zinc-500">
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
