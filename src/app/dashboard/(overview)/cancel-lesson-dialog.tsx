"use client";

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
import { api } from "@/trpc/react";
import { toast } from "sonner";

type CancelLessonDialogProps = {
  id: string | null;
  open: boolean;
  onOpenChange: (open: boolean | null) => void;
};

export default function CancelLessonDialog({
  id,
  open,
  onOpenChange,
}: CancelLessonDialogProps) {
  const utils = api.useUtils();
  const { mutate: cancelLesson } = api.lesson.cancelById.useMutation({
    onSuccess: async () => {
      toast.success("Lesson cancelled");
      await utils.lesson.getByCurrentUser.invalidate();
      onOpenChange(null);
    },
    onError: () => {
      toast.error("Failed to cancel lesson");
    },
  });

  function handleCancel() {
    if (id) cancelLesson({ id });
  }

  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Cancel Lesson</AlertDialogTitle>
          <AlertDialogDescription>
            Are you sure you want to{" "}
            <span className="font-bold text-destructive">cancel</span> this
            lesson? <br /> This action cannot be undone.
          </AlertDialogDescription>
        </AlertDialogHeader>

        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <Button onClick={handleCancel} variant="destructive">
            Cancel
          </Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
