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

type TimeSlotsDialogType = "edit";
export type TimeSlotRow = RouterOutputs["timeSlot"]["admin"]["getAll"][number];

type TimeSlotsDialogContextType = {
  open: TimeSlotsDialogType | null;
  setOpen: (dialog: TimeSlotsDialogType | null) => void;
  currentRow: TimeSlotRow | null;
  setCurrentRow: Dispatch<SetStateAction<TimeSlotRow | null>>;
};

const TimeSlotsDialogContext = createContext<TimeSlotsDialogContextType | null>(
  null
);

type TimeSlotsDialogContextProviderProps = {
  children: ReactNode;
};

export default function TimeSlotsDialogContextProvider({
  children,
}: TimeSlotsDialogContextProviderProps) {
  const [open, setOpen] = useDialogState<TimeSlotsDialogType>(null);
  const [currentRow, setCurrentRow] = useState<TimeSlotRow | null>(null);

  return (
    <TimeSlotsDialogContext.Provider
      value={{ open, setOpen, currentRow, setCurrentRow }}
    >
      {children}
    </TimeSlotsDialogContext.Provider>
  );
}

export function useTimeSlotsDialogContext() {
  const context = useContext(TimeSlotsDialogContext);

  if (!context) {
    throw new Error(
      "useTimeSlotsDialogContext must be used within TimeSlotsDialogContextProvider"
    );
  }

  return context;
}
