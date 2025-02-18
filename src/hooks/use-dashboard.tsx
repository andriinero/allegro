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

type DashboardContextType = {
  open: DashboardDialogType | null;
  setOpen: (str: DashboardDialogType | null) => void;
  id: string | null;
  setId: Dispatch<SetStateAction<string | null>>;
};
const DashboardContext = createContext<DashboardContextType | null>(null);

type DashboardProviderProps = {
  children: ReactNode;
};

export default function DashboardProvider({
  children,
}: DashboardProviderProps) {
  const [open, setOpen] = useDialogState<DashboardDialogType>(null);
  const [id, setId] = useState<string | null>(null);

  return (
    <DashboardContext.Provider value={{ open, setOpen, id, setId }}>
      {children}
    </DashboardContext.Provider>
  );
}

export const useDashboard = () => {
  const dashboardContext = useContext(DashboardContext);

  if (!dashboardContext) {
    throw new Error("useDashboard has to be used within <DashboardContext>");
  }

  return dashboardContext;
};
