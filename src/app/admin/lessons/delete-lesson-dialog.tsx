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
import { api } from "@/trpc/react";
import type { Lesson } from "@prisma/client";
import { toast } from "sonner";

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
  const utils = api.useUtils();
  const deleteLessonMutation = api.lesson.admin.deleteById.useMutation({
    onSuccess: async () => {
      toast.success("Lesson deleted successfully");
      await utils.lesson.admin.getAll.invalidate();
      onOpenChange(false);
    },
    onError: (error) => {
      toast.error("Error deleting lesson", {
        description: error.message,
      });
    },
  });

  function handleDelete() {
    if (!currentRow?.id) return;

    deleteLessonMutation.mutate({
      id: currentRow.id,
    });
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
            disabled={deleteLessonMutation.isPending}
            className="bg-destructive hover:bg-destructive/90"
          >
            Delete
          </Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
