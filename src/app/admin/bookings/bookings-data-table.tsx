"use client";

import { DataTable } from "@/app/_components/table/data-table";
import { api } from "@/trpc/react";
import {
  type ColumnFiltersState,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { useState } from "react";
import { bookingColumns } from "./booking-columns";

export default function BookingsDataTable() {
  const { data, isLoading, isError } = api.booking.admin.getAll.useQuery();
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const table = useReactTable({
    data: data ?? [],
    columns: bookingColumns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onColumnFiltersChange: setColumnFilters,
    getFilteredRowModel: getFilteredRowModel(),
    state: {
      columnFilters,
    },
  });

  return <DataTable table={table} isLoading={isLoading} isError={isError} />;
}
