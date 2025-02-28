"use client";

import useDialogState from "@/hooks/use-dialog-state";
import type { Lesson } from "@prisma/client";
import {
  createContext,
  type Dispatch,
  type ReactNode,
  type SetStateAction,
  useContext,
  useState,
} from "react";

type LessonDialogType = "createLesson" | "edit" | "delete";

type LessonDialogContextType = {
  open: LessonDialogType | null;
  setOpen: (str: LessonDialogType | null) => void;
  currentRow: Lesson | null;
  setCurrentRow: Dispatch<SetStateAction<Lesson | null>>;
};
const LessonDialogContext = createContext<LessonDialogContextType | null>(null);

type LessonDialogContextProviderProps = {
  children: ReactNode;
};

export default function LessonDialogContextProvider({
  children,
}: LessonDialogContextProviderProps) {
  const [open, setOpen] = useDialogState<LessonDialogType>(null);
  const [currentRow, setCurrentRow] = useState<Lesson | null>(null);

  return (
    <LessonDialogContext.Provider
      value={{ open, setOpen, currentRow, setCurrentRow }}
    >
      {children}
    </LessonDialogContext.Provider>
  );
}

export const useLessonDialogContext = () => {
  const lessonDialogContext = useContext(LessonDialogContext);

  if (!lessonDialogContext) {
    throw new Error(
      "useLessonDialogContext has to be used within <LessonDialogContext>",
    );
  }

  return lessonDialogContext;
};
