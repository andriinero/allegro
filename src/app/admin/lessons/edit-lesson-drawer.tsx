import { Button } from "@/app/_components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/app/_components/ui/form";
import { Input } from "@/app/_components/ui/input";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
} from "@/app/_components/ui/sheet";
import { Textarea } from "@/app/_components/ui/textarea";
import { api } from "@/trpc/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { type Lesson } from "@prisma/client";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

const editLessonFormSchema = z.object({
  title: z.string().optional(),
  description: z.string().optional(),
  duration: z.number().min(30).max(90).optional(),
  lessonLink: z.string().optional(),
  assignment: z.string().optional(),
});
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

  const apiUtils = api.useUtils();
  const editLessonMutation = api.lesson.admin.updateById.useMutation({
    onSuccess: async () => {
      await apiUtils.lesson.admin.getAll.invalidate();
      toast.success("Lesson has been updated");
      onOpenChange(false);
    },
    onError: (error) => {
      toast.error("Error updating lesson", {
        description: error.message,
      });
    },
  });

  useEffect(() => {
    if (currentRow)
      form.reset({
        title: currentRow.title,
        description: currentRow.description ?? undefined,
        duration: currentRow.duration ?? undefined,
        lessonLink: currentRow.lessonLink ?? undefined,
        assignment: currentRow.assignment ?? undefined,
      });
  }, [form, currentRow]);

  function onSubmit(data: EditLessonForm) {
    if (!currentRow?.id) return;

    editLessonMutation.mutate({
      id: currentRow.id,
      ...data,
    });
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
          >
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Title</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="e.g. Introduction to Basic Accords"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                  <FormDescription>
                    Enter a title that accurately reflects the lesson&apos;s
                    content.
                  </FormDescription>
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="duration"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Duration</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      placeholder="e.g. 45"
                      {...field}
                      min={30}
                      max={90}
                    />
                  </FormControl>
                  <FormMessage />
                  <FormDescription>
                    Specify the length of the lesson in minutes.
                  </FormDescription>
                </FormItem>
              )}
            />

            {currentRow?.lessonLink && (
              <FormField
                control={form.control}
                name="lessonLink"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Lesson Link</FormLabel>
                    <FormControl>
                      <Input placeholder="Zoom link" {...field} />
                    </FormControl>
                    <FormMessage />
                    <FormDescription>
                      Provide the link to the Zoom session for this lesson.
                    </FormDescription>
                  </FormItem>
                )}
              />
            )}

            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Lesson description"
                      {...field}
                      rows={4}
                    />
                  </FormControl>
                  <FormMessage />
                  <FormDescription>
                    Describe the learning objectives of this lesson.
                  </FormDescription>
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="assignment"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Assignment</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Assignment for the student"
                      {...field}
                      rows={4}
                    />
                  </FormControl>
                  <FormMessage />
                  <FormDescription>
                    Explain the assignment requirements and expectations.
                  </FormDescription>
                </FormItem>
              )}
            />
          </form>
        </Form>

        <SheetFooter className="gap-2">
          <SheetClose asChild>
            <Button variant="outline">Close</Button>
          </SheetClose>
          <Button form="edit-lesson-form" type="submit">
            Save Changes
          </Button>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}
