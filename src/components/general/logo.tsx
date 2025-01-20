import { cn } from "@/lib/utils";
import type { ComponentProps } from "react";

type LogoProps = ComponentProps<"h1">;

export default function Logo({ className, ...props }: LogoProps) {
  return (
    <h1
      className={cn("text-2xl font-bold tracking-tight", className)}
      {...props}
    >
      Allegro
    </h1>
  );
}
