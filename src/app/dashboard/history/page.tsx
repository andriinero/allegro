import { Separator } from "@/app/_components/ui/separator";
import PanelHeaderWrapper from "../(overview)/panel-header-wrapper";
import PanelHeading from "../(overview)/panel-heading";

export default function Page() {
  return (
    <>
      <PanelHeaderWrapper>
        <PanelHeading
          title="Lesson History"
          description="View your lesson history and progress"
        />
      </PanelHeaderWrapper>

      <Separator />
    </>
  );
}
