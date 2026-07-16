"use client";

import useDialogState from "@/hooks/use-dialog-state";
import type { RouterOutputs } from "@/trpc/react";
import {
  createContext,
  type Dispatch,
  type ReactNode,
  type SetStateAction,
  useContext,
  useState,
} from "react";

type BookingsDialogType = "createLesson" | "edit" | "delete";
type BookingRow = RouterOutputs["booking"]["admin"]["getAll"][number];

type BookingsDialogContextType = {
  open: BookingsDialogType | null;
  setOpen: (str: BookingsDialogType | null) => void;
  currentRow: BookingRow | null;
  setCurrentRow: Dispatch<SetStateAction<BookingRow | null>>;
};
const BookingsDialogContext = createContext<BookingsDialogContextType | null>(
  null
);

type BookingsDialogContextProviderProps = {
  children: ReactNode;
};

export default function BookingsDialogContextProvider({
  children,
}: BookingsDialogContextProviderProps) {
  const [open, setOpen] = useDialogState<BookingsDialogType>(null);
  const [currentRow, setCurrentRow] = useState<BookingRow | null>(null);

  return (
    <BookingsDialogContext.Provider
      value={{ open, setOpen, currentRow, setCurrentRow }}
    >
      {children}
    </BookingsDialogContext.Provider>
  );
}

export const useBookingsDialogContext = () => {
  const bookingsDialogContext = useContext(BookingsDialogContext);

  if (!bookingsDialogContext) {
    throw new Error(
      "useBookingsDialogContext has to be used within <BookingsDialogContext>"
    );
  }

  return bookingsDialogContext;
};
