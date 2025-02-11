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

type BookingDialogType = "createLesson" | "edit" | "delete";

type BookingsContextType = {
  open: BookingDialogType | null;
  setOpen: (str: BookingDialogType | null) => void;
  currentRow: Booking | null;
  setCurrentRow: Dispatch<SetStateAction<Booking | null>>;
};
const BookingsContext = createContext<BookingsContextType | null>(null);

type BookingsProviderProps = {
  children: ReactNode;
};

export default function BookingsProvider({ children }: BookingsProviderProps) {
  const [open, setOpen] = useDialogState<BookingDialogType>(null);
  const [currentRow, setCurrentRow] = useState<Booking | null>(null);

  return (
    <BookingsContext.Provider
      value={{ open, setOpen, currentRow, setCurrentRow }}
    >
      {children}
    </BookingsContext.Provider>
  );
}

export const useBookings = () => {
  const bookingsContext = useContext(BookingsContext);

  if (!bookingsContext) {
    throw new Error("useBookings has to be used within <BookingsContext>");
  }

  return bookingsContext;
};
