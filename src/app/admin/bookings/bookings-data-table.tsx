"use client";

import { DataTable } from "@/app/_components/table/data-table";
import { api } from "@/trpc/react";
import {
  getCoreRowModel,
  getPaginationRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { useRef } from "react";
import { bookingColumns } from "./booking-columns";

export default function BookingsDataTable() {
  const cursorRef = useRef<{ id: string } | undefined>();
  const { data, isLoading, isError } = api.booking.getByCurrentUser.useQuery({
    pagination: {
      cursor: cursorRef.current,
      take: 10,
    },
  });
  const table = useReactTable({
    data: data?.items ?? [],
    columns: bookingColumns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
  });

  return <DataTable table={table} isLoading={isLoading} isError={isError} />;
}
