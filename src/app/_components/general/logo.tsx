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
        "group inline-flex items-center text-2xl font-bold tracking-tight text-primary-foreground transition-opacity hover:opacity-90",
        variant === "solid" &&
          "text-accent-foreground hover:text-accent-foreground/90",
        className
      )}
      aria-label="Go to homepage"
      {...props}
    >
      <div className="flex items-center gap-2.5">
        <div className="relative flex h-9 w-9 items-center justify-center overflow-hidden rounded-xl bg-gradient-to-br from-orange-400 via-orange-500 to-rose-500 shadow-lg shadow-orange-950/25 ring-1 ring-white/20 transition-transform group-hover:rotate-3">
          <span className="absolute -right-2 -top-3 h-6 w-6 rounded-full bg-white/30 blur-md" />
          <span className="relative text-sm font-black italic text-white">
            A
          </span>
        </div>
        <span
          className={cn(
            "text-xl font-bold tracking-[-0.03em] text-white",
            variant === "solid" && "text-foreground"
          )}
        >
          Allegro
          <span className="text-orange-500">.</span>
        </span>
      </div>
    </Link>
  );
}
