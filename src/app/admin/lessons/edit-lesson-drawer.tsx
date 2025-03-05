import { Button } from "@/app/_components/ui/button";
import { Form } from "@/app/_components/ui/form";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
} from "@/app/_components/ui/sheet";
import { zodResolver } from "@hookform/resolvers/zod";
import { type Lesson } from "@prisma/client";
import { useForm } from "react-hook-form";
import { z } from "zod";

const editLessonFormSchema = z.object({});
type EditLessonForm = z.infer<typeof editLessonFormSchema>;

type EditLessonDrawerProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  currentRow: Lesson | null;
};

export default function EditBookingDrawer({
  open,
  onOpenChange,
  currentRow,
}: EditLessonDrawerProps) {
  const form = useForm<EditLessonForm>({
    resolver: zodResolver(editLessonFormSchema),
  });

  function onSubmit() {
    console.log("edit lesson not implemented");
  }

  return (
    <Sheet
      open={open}
      onOpenChange={(v) => {
        onOpenChange(v);
        form.reset();
      }}
    >
      <SheetContent className="flex flex-col overflow-y-auto">
        <SheetHeader>
          <SheetTitle>Edit Lesson</SheetTitle>
          <SheetDescription>
            Make changes to the lesson details. Click save when you&apos;re
            done.
          </SheetDescription>
        </SheetHeader>

        <Form {...form}>
          <form
            id="edit-lesson-form"
            onSubmit={form.handleSubmit(onSubmit)}
            className="flex-1 space-y-5"
          ></form>
        </Form>

        <SheetFooter className="gap-2">
          <SheetClose asChild>
            <Button variant="outline">Close</Button>
          </SheetClose>
          <Button form="edit-booking-form" type="submit">
            Save Changes
          </Button>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}
