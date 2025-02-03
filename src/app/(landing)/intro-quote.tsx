import { TextQuote } from "lucide-react";

import { Separator } from "../_components/ui/separator";
import type { ReactNode } from "react";

type IntroQuoteProps = { author: string; children: ReactNode };

export default function IntroQuote({ author, children }: IntroQuoteProps) {
  return (
    <div className="space-y-2 rounded-xl bg-foreground/60 p-3 sm:bg-transparent sm:p-0">
      <div className="flex items-center gap-2">
        <TextQuote className="size-4" />
        <Separator className="h-4 bg-primary" orientation="vertical" />
        <h4 className="text-lg uppercase">{author}</h4>
      </div>

      <p className="max-w-sm text-sm">{children}</p>
    </div>
  );
}
