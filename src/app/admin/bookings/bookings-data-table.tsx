"use client";

import { DataTable } from "@/app/_components/table/data-table";
import { api } from "@/trpc/react";
import {
  type ColumnFiltersState,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  type SortingState,
  useReactTable,
} from "@tanstack/react-table";
import { useSearchParams } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";
import { bookingColumns } from "./booking-columns";

export default function BookingsDataTable() {
  const { data, isLoading, isFetching, refetch } =
    api.booking.admin.getAll.useQuery();
  const searchParams = useSearchParams();
  const bookingId = searchParams.get("bookingId");
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>(() =>
    bookingId ? [{ id: "id", value: bookingId }] : []
  );
  const table = useReactTable({
    data: data ?? [],
    columns: bookingColumns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onColumnFiltersChange: setColumnFilters,
    getFilteredRowModel: getFilteredRowModel(),
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    state: {
      columnFilters,
      sorting,
    },
  });

  async function handleRefresh() {
    const result = await refetch();

    if (result.isSuccess) {
      toast.success("Bookings refreshed");
    } else {
      toast.error("Failed to refresh bookings");
    }
  }

  return (
    <DataTable
      table={table}
      isLoading={isLoading}
      isRefreshing={isFetching}
      onRefresh={() => void handleRefresh()}
    />
  );
}
