"use client";

import useDialogState from "@/hooks/use-dialog-state";
import type { Booking } from "@prisma/client";
import {
  createContext,
  type Dispatch,
  type ReactNode,
  type SetStateAction,
  useContext,
  useState,
} from "react";

type BookingsDialogType = "createLesson" | "edit" | "delete";

type BookingsDialogContextType = {
  open: BookingsDialogType | null;
  setOpen: (str: BookingsDialogType | null) => void;
  currentRow: Booking | null;
  setCurrentRow: Dispatch<SetStateAction<Booking | null>>;
};
const BookingsDialogContext = createContext<BookingsDialogContextType | null>(
  null,
);

type BookingsDialogContextProviderProps = {
  children: ReactNode;
};

export default function BookingsDialogContextProvider({
  children,
}: BookingsDialogContextProviderProps) {
  const [open, setOpen] = useDialogState<BookingsDialogType>(null);
  const [currentRow, setCurrentRow] = useState<Booking | null>(null);

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
      "useBookingsDialogContext has to be used within <BookingsDialogContext>",
    );
  }

  return bookingsDialogContext;
};
