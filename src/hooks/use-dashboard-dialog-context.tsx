"use client";

import useDialogState from "@/hooks/use-dialog-state";
import {
  createContext,
  type Dispatch,
  type ReactNode,
  type SetStateAction,
  useContext,
  useState,
} from "react";

type DashboardDialogType = "cancelLesson" | "cancelBooking";

type DashboardDialogContextType = {
  open: DashboardDialogType | null;
  setOpen: (str: DashboardDialogType | null) => void;
  id: string | null;
  setId: Dispatch<SetStateAction<string | null>>;
};
const DashboardDialogContext = createContext<DashboardDialogContextType | null>(
  null,
);

type DashboardDialogContextProviderProps = {
  children: ReactNode;
};

export default function DashboardDialogContextProvider({
  children,
}: DashboardDialogContextProviderProps) {
  const [open, setOpen] = useDialogState<DashboardDialogType>(null);
  const [id, setId] = useState<string | null>(null);

  return (
    <DashboardDialogContext.Provider value={{ open, setOpen, id, setId }}>
      {children}
    </DashboardDialogContext.Provider>
  );
}

export const useDashboardDialogContext = () => {
  const dashboardDialogContext = useContext(DashboardDialogContext);

  if (!dashboardDialogContext) {
    throw new Error(
      "useDashboardDialogContext has to be used within <DashboardDialogContext>",
    );
  }

  return dashboardDialogContext;
};
