import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/app/_components/ui/alert-dialog";
import { Button } from "@/app/_components/ui/button";
import { formatUUID } from "@/lib/utils";
import type { Lesson } from "@prisma/client";

type DeleteLessonDialogProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  currentRow: Lesson | null;
};

export default function DeleteLessonDialog({
  open,
  onOpenChange,
  currentRow,
}: DeleteLessonDialogProps) {
  function handleDelete() {
    console.log("delete lesson not implemented");
  }

  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogContent className="sm:max-w-[425px]">
        <AlertDialogHeader>
          <AlertDialogTitle>Delete lesson</AlertDialogTitle>
          <AlertDialogDescription>
            You are about to{" "}
            <span className="font-bold text-destructive">delete</span> a lesson
            with the ID{" "}
            <span className="font-bold">
              {formatUUID(currentRow?.id ?? "")}
            </span>
            .
            <br />
            This action cannot be undone.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <Button
            onClick={handleDelete}
            disabled={true}
            className="bg-destructive hover:bg-destructive/90"
          >
            Delete
          </Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
