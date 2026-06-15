import { Separator } from "@/app/_components/ui/separator";
import PanelHeaderWrapper from "../(overview)/panel-header-wrapper";
import PanelHeading from "../(overview)/panel-heading";
import CreateBookingForm from "./create-booking-form";

export default function Page() {
  return (
    <div className="flex flex-col">
      <PanelHeaderWrapper>
        <PanelHeading title="Book Lesson" description="Book your next lesson" />
      </PanelHeaderWrapper>

      <Separator className="my-6" />

      <CreateBookingForm />
    </div>
  );
}
