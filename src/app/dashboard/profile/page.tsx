import { auth } from "@/server/auth";
import PanelDescription from "../(overview)/panel-description";
import PanelHeaderWrapper from "../(overview)/panel-header-wrapper";
import PanelHeading from "../(overview)/panel-heading";
import UpdateProfileForm from "./update-profile-form";

export default async function Page() {
  const session = await auth();

  return (
    <div className="flex flex-col gap-4">
      <PanelHeaderWrapper>
        <PanelHeading>Profile</PanelHeading>
        <PanelDescription>
          Manage your personal information and preferences
        </PanelDescription>
      </PanelHeaderWrapper>

      <UpdateProfileForm sessionUser={session?.user} />
    </div>
  );
}
