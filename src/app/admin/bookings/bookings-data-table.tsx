"use client";

import { DataTable } from "@/app/_components/table/data-table";
import { api } from "@/trpc/react";
import {
  getCoreRowModel,
  getPaginationRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { bookingColumns } from "./booking-columns";

export default function BookingsDataTable() {
  const { data, isLoading, isError } = api.booking.admin.getAll.useQuery();
  const table = useReactTable({
    data: data ?? [],
    columns: bookingColumns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
  });

  return <DataTable table={table} isLoading={isLoading} isError={isError} />;
}
