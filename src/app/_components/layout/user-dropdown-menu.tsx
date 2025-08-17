import { getInitials } from "@/lib/utils";
import {
  LayoutDashboardIcon,
  LogOutIcon,
  SettingsIcon,
  ShieldIcon,
  UserIcon
} from "lucide-react";
import type { Session } from "next-auth";
import Link from "next/link";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";

type UserDropdownMenuProps = {
  user: Session["user"];
  variant?: "transparent" | "solid";
};

export default function UserDropdownMenu({
  user,
  variant = "transparent",
}: UserDropdownMenuProps) {
  const fallbackUsername = getInitials(user?.name ?? "");

  return (
    <DropdownMenu modal={false}>
      <DropdownMenuTrigger className="flex items-center gap-2">
        <Avatar>
          <AvatarImage src={user?.image ?? ""} />
          <AvatarFallback>{fallbackUsername}</AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>

      <DropdownMenuContent>
        <DropdownMenuLabel>
          <p>{user?.name}</p>
          <p className="text-xs font-light text-secondary-foreground">
            {user?.email}
          </p>
        </DropdownMenuLabel>

        <DropdownMenuSeparator />

        <Link href="/dashboard/profile">
          <DropdownMenuItem>
            <UserIcon /> Profile
          </DropdownMenuItem>
        </Link>

        <Link href="/dashboard">
          <DropdownMenuItem>
            <LayoutDashboardIcon /> Dashboard
          </DropdownMenuItem>
        </Link>

        {user.role === "ADMIN" && (
          <Link href="/admin">
            <DropdownMenuItem>
              <ShieldIcon /> Admin Dashboard
            </DropdownMenuItem>
          </Link>
        )}

        <Link href="/dashboard/settings">
          <DropdownMenuItem>
            <SettingsIcon /> Settings
          </DropdownMenuItem>
        </Link>

        <DropdownMenuSeparator />

        <Link href="/api/auth/signout">
          <DropdownMenuItem className="text-destructive">
            <LogOutIcon /> Logout
          </DropdownMenuItem>
        </Link>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
