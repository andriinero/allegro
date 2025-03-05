import { Button } from "@/app/_components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/app/_components/ui/dropdown-menu";
import { useLessonsDialogContext } from "@/hooks/use-lessons-dialog-context";
import type { Lesson } from "@prisma/client";
import type { Row } from "@tanstack/react-table";
import { MoreHorizontal } from "lucide-react";

type TableLessonActionsProps = { row: Row<Lesson> };

export default function TableLessonActions({ row }: TableLessonActionsProps) {
  const { setOpen, setCurrentRow } = useLessonsDialogContext();

  return (
    <div className="flex justify-end">
      <DropdownMenu modal={false}>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="h-8 w-8 p-0">
            <span className="sr-only">Open menu</span>
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>

        <DropdownMenuContent align="end">
          <DropdownMenuItem
            onClick={() => {
              setOpen("edit");
              setCurrentRow(row.original);
            }}
          >
            Edit
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
