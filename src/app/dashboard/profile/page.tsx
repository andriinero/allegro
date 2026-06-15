import { auth } from "@/server/auth";
import PanelHeaderWrapper from "../(overview)/panel-header-wrapper";
import PanelHeading from "../(overview)/panel-heading";
import UpdateProfileForm from "./update-profile-form";
import { Separator } from "@/app/_components/ui/separator";

export default async function Page() {
  const session = await auth();

  return (
    <div className="flex flex-col">
      <PanelHeaderWrapper>
        <PanelHeading
          title="Profile"
          description="Manage your personal information and preferences"
        />
      </PanelHeaderWrapper>

      <Separator />

      <UpdateProfileForm sessionUser={session?.user} />
    </div>
  );
}
