import { cn } from "@/lib/utils";
import Link from "next/link";
import type { ComponentProps } from "react";

type LogoProps = ComponentProps<"a"> & {
  variant?: "solid" | "transparent";
};

export default function Logo({
  className,
  variant = "transparent",
  ...props
}: LogoProps) {
  return (
    <Link
      href="/"
      className={cn(
        "inline-flex items-center text-2xl font-bold tracking-tight text-primary-foreground transition-colors hover:text-primary-foreground/90",
        variant === "solid" &&
          "text-accent-foreground hover:text-accent-foreground/90",
        className,
      )}
      aria-label="Go to homepage"
      {...props}
    >
      <div className="flex items-center space-x-2">
          <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
            <span className="text-primary-foreground font-bold text-sm">A</span>
          </div>
          <span className="font-bold text-xl text-foreground">Allegro</span>
        </div>
    </Link>
  );
}
