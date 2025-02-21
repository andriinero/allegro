import { cn } from "@/lib/utils";
import Link from "next/link";
import type { ComponentProps } from "react";

type LogoProps = ComponentProps<"a">;

export default function Logo({ className, ...props }: LogoProps) {
  return (
    <Link
      href="/"
      className={cn(
        "inline-flex items-center text-2xl font-bold tracking-tight text-primary-foreground transition-colors hover:text-primary-foreground/90",
        className,
      )}
      aria-label="Go to homepage"
      {...props}
    >
      <h1 className="m-0">Allegro</h1>
    </Link>
  );
}
