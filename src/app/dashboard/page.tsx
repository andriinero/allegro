import PanelHeaderWrapper from "./(overview)/panel-header-wrapper";
import PanelHeading from "./(overview)/panel-heading";
import { Separator } from "@/app/_components/ui/separator";

export default async function Page() {
  return (
    <div className="flex flex-col">
      <PanelHeaderWrapper>
        <PanelHeading
          title="Dashboard"
          description="Here you can see most important information"
        />
      </PanelHeaderWrapper>

      <Separator />
    </div>
  );
}
