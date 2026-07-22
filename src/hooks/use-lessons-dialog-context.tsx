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

type LessonsDialogType = "edit" | "delete";
type LessonRow = RouterOutputs["lesson"]["admin"]["getAll"][number];

type LessonsDialogContextType = {
  open: LessonsDialogType | null;
  setOpen: (str: LessonsDialogType | null) => void;
  currentRow: LessonRow | null;
  setCurrentRow: Dispatch<SetStateAction<LessonRow | null>>;
};
const LessonsDialogContext = createContext<LessonsDialogContextType | null>(
  null
);

type LessonsDialogContextProviderProps = {
  children: ReactNode;
};

export default function LessonsDialogContextProvider({
  children,
}: LessonsDialogContextProviderProps) {
  const [open, setOpen] = useDialogState<LessonsDialogType>(null);
  const [currentRow, setCurrentRow] = useState<LessonRow | null>(null);

  return (
    <LessonsDialogContext.Provider
      value={{
        open,
        setOpen,
        currentRow,
        setCurrentRow,
      }}
    >
      {children}
    </LessonsDialogContext.Provider>
  );
}

export const useLessonsDialogContext = () => {
  const lessonsDialogContext = useContext(LessonsDialogContext);

  if (!lessonsDialogContext) {
    throw new Error(
      "useLessonsDialogContext has to be used within <LessonsDialogContext>"
    );
  }

  return lessonsDialogContext;
};
