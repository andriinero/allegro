import { Separator } from "@/app/_components/ui/separator";
import PanelDescription from "../(overview)/panel-description";
import PanelHeaderWrapper from "../(overview)/panel-header-wrapper";
import PanelHeading from "../(overview)/panel-heading";
import CreateBookingForm from "./create-booking-form";

export default function Page() {
  return (
    <div className="flex flex-col">
      <PanelHeaderWrapper>
        <PanelHeading>Book Lesson</PanelHeading>
        <PanelDescription>Book your next lesson</PanelDescription>
      </PanelHeaderWrapper>

      <Separator className="my-6" />

      <CreateBookingForm />
    </div>
  );
}
