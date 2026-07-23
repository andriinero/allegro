import { Button } from "@/app/_components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/app/_components/ui/card";
import {
  BookOpenIcon,
  CalendarDaysIcon,
  ExternalLinkIcon,
  LifeBuoyIcon,
  SquarePlusIcon,
} from "lucide-react";
import Link from "next/link";
import PanelHeading from "../(overview)/panel-heading";
import PanelWrapper from "../(overview)/panel-wrapper";

const guides = [
  {
    title: "Manage schedule",
    description: "Create, review, and update the tutor's lesson time slots",
    href: "/admin/schedule",
    icon: CalendarDaysIcon,
  },
  {
    title: "Manage bookings",
    description: "Review requests, update bookings, and assign time slots",
    href: "/admin/bookings",
    icon: SquarePlusIcon,
  },
  {
    title: "Manage lessons",
    description: "Update lesson details, links, students, and related bookings",
    href: "/admin/lessons",
    icon: BookOpenIcon,
  },
] as const;

export default function Page() {
  return (
    <PanelWrapper>
      <PanelHeading
        title="Support"
        description="Find the right admin area or report a problem"
      />

      <div className="grid gap-4 md:grid-cols-3">
        {guides.map((guide) => (
          <Card key={guide.href} className="shadow-sm">
            <CardHeader>
              <div className="mb-2 flex size-10 items-center justify-center rounded-lg border bg-muted/30 text-muted-foreground">
                <guide.icon className="size-5" />
              </div>
              <CardTitle className="text-base">{guide.title}</CardTitle>
              <CardDescription>{guide.description}</CardDescription>
            </CardHeader>
            <CardContent>
              <Button asChild variant="outline" className="w-full">
                <Link href={guide.href}>Open</Link>
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card className="shadow-sm">
        <CardHeader className="sm:flex-row sm:items-start sm:justify-between sm:space-y-0">
          <div className="flex gap-3">
            <div className="flex size-10 shrink-0 items-center justify-center rounded-lg border bg-muted/30 text-muted-foreground">
              <LifeBuoyIcon className="size-5" />
            </div>
            <div className="space-y-1.5">
              <CardTitle className="text-base">Still need help?</CardTitle>
              <CardDescription>
                Report the problem with the steps you followed and what you
                expected to happen
              </CardDescription>
            </div>
          </div>
          <Button asChild className="mt-4 shrink-0 sm:mt-0">
            <a
              href="https://github.com/andriinero/allegro/issues/new"
              target="_blank"
              rel="noopener noreferrer"
            >
              Report an issue
              <ExternalLinkIcon />
            </a>
          </Button>
        </CardHeader>
      </Card>
    </PanelWrapper>
  );
}
