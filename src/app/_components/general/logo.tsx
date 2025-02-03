import { cn } from "@/lib/utils";
import Link from "next/link";
import type { ComponentProps } from "react";

type LogoProps = ComponentProps<"a">;

export default function Logo({ className, ...props }: LogoProps) {
  return (
    <Link
      href="/"
      className={cn(
        "text-2xl font-bold tracking-tight text-primary-foreground",
        className,
      )}
      {...props}
    >
      <h1>Allegro</h1>
    </Link>
  );
}
