"use client";

import { api } from "@/trpc/react";
import Spinner from "../_components/general/spinner";
import { Separator } from "../_components/ui/separator";
import PanelDescription from "./(overview)/panel-description";
import PanelHeaderWrapper from "./(overview)/panel-header-wrapper";
import PanelHeading from "./(overview)/panel-heading";
import UserBookingsTable from "./(overview)/user-bookings-table";

export default function Page() {
  const { data: bookings, isPending } = api.booking.getByCurrentUser.useQuery();

  return (
    <>
      <PanelHeaderWrapper>
        <PanelHeading>Dashboard</PanelHeading>
        <PanelDescription>Your personalized dashboard</PanelDescription>
      </PanelHeaderWrapper>

      <Separator />

      {isPending ? (
        <Spinner />
      ) : bookings ? (
        <UserBookingsTable data={bookings} />
      ) : (
        <></>
      )}
    </>
  );
}
