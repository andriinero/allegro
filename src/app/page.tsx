import ContentWrapper from "@/components/general/content-wrapper";
import Logo from "@/components/general/logo";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import { auth } from "@/server/auth";
import { HydrateClient } from "@/trpc/server";
import { LogOut, User } from "lucide-react";
import Link from "next/link";

const navLinks = [
  { href: "/blog", name: "Blog" },
  { href: "/about-me", name: "About Me" },
  { href: "/contact", name: "Contact" },
  { href: "/faq", name: "FAQ" },
];

export default async function Home() {
  const session = await auth();

  return (
    <HydrateClient>
      <header className="flex items-center justify-center p-4">
        <ContentWrapper>
          <Logo className="flex-1" />

          <NavigationMenu className="flex-2">
            <NavigationMenuList>
              {navLinks.map((link) => (
                <NavigationMenuItem key={link.href}>
                  <Link
                    href={link.href}
                    className={navigationMenuTriggerStyle()}
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
                    <AvatarFallback>
                      {session.user.name?.substring(0, 2)}
                    </AvatarFallback>
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
                <Button variant="ghost">Login</Button>
              </Link>
            )}
            <Link href="/book-lesson">
              <Button>Book Lesson Now</Button>
            </Link>
          </div>
        </ContentWrapper>
      </header>

      <main></main>

      <footer></footer>
    </HydrateClient>
  );
}
