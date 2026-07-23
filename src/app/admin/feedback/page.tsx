import { Button } from "@/app/_components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/app/_components/ui/card";
import {
  BugIcon,
  ExternalLinkIcon,
  LightbulbIcon,
  MessageSquareTextIcon,
} from "lucide-react";
import PanelHeading from "../(overview)/panel-heading";
import PanelWrapper from "../(overview)/panel-wrapper";

const feedbackOptions = [
  {
    title: "Suggest a feature",
    description: "Share an improvement that would make admin work easier",
    href: "https://github.com/andriinero/allegro/issues/new?title=%5BFeature%5D%20",
    icon: LightbulbIcon,
  },
  {
    title: "Report a problem",
    description: "Describe broken behavior or something that feels unclear",
    href: "https://github.com/andriinero/allegro/issues/new?title=%5BBug%5D%20",
    icon: BugIcon,
  },
  {
    title: "General feedback",
    description: "Tell us what works well or what could be more convenient",
    href: "https://github.com/andriinero/allegro/issues/new?title=%5BFeedback%5D%20",
    icon: MessageSquareTextIcon,
  },
] as const;

export default function Page() {
  return (
    <PanelWrapper>
      <PanelHeading
        title="Feedback"
        description="Help shape a clearer and more useful admin dashboard"
      />

      <div className="grid gap-4 md:grid-cols-3">
        {feedbackOptions.map((option) => (
          <Card key={option.title} className="flex flex-col shadow-sm">
            <CardHeader>
              <div className="mb-2 flex size-10 items-center justify-center rounded-lg border bg-muted/30 text-muted-foreground">
                <option.icon className="size-5" />
              </div>
              <CardTitle className="text-base">{option.title}</CardTitle>
              <CardDescription>{option.description}</CardDescription>
            </CardHeader>
            <CardContent className="mt-auto">
              <Button asChild variant="outline" className="w-full">
                <a href={option.href} target="_blank" rel="noopener noreferrer">
                  Continue
                  <ExternalLinkIcon />
                </a>
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card className="bg-muted/20 shadow-none">
        <CardHeader>
          <CardTitle className="text-base">
            What makes feedback useful?
          </CardTitle>
          <CardDescription>
            Include the page, the task you were completing, the result you
            expected, and a screenshot when it helps explain the issue
          </CardDescription>
        </CardHeader>
      </Card>
    </PanelWrapper>
  );
}
