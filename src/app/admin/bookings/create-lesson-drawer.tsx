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
import { getNDayMonth } from "@/lib/date";
import { api } from "@/trpc/react";
import { zodResolver } from "@hookform/resolvers/zod";
import type { Booking } from "@prisma/client";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

type CreateLessonDrawerProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  currentRow: Booking | null;
};

const createLessonFormSchema = z.object({
  title: z.string().optional(),
  lessonLink: z.string().optional(),
  assignment: z.string().optional(),
  description: z.string().optional(),
  duration: z.number().min(30).max(90),
});
type CreateLessonForm = z.infer<typeof createLessonFormSchema>;

export default function CreateLessonDrawer({
  open,
  onOpenChange,
  currentRow,
}: CreateLessonDrawerProps) {
  const form = useForm<CreateLessonForm>({
    resolver: zodResolver(createLessonFormSchema),
    defaultValues: { duration: 45 },
  });
  const utils = api.useUtils();
  const createLessonMutation = api.lesson.create.useMutation({
    onSuccess: async () => {
      await utils.booking.getAny.invalidate();
    },
  });

  async function onSubmit(data: CreateLessonForm) {
    onOpenChange(false);
    form.reset();

    if (currentRow?.bookedById) {
      const lesson = await createLessonMutation.mutateAsync({
        ...data,
        bookingId: currentRow?.id,
        studentId: currentRow?.bookedById,
      });

      if (lesson) toast.success("The lesson has been created");
      else toast.error("There was a problem submitting the form");
    } else {
      toast.error("There was a problem submitting the form", {
        description: "StudentId not specified",
      });
    }
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
          <SheetTitle>Create Lesson</SheetTitle>
          <SheetDescription>
            Create an{" "}
            <span className="font-medium">
              {currentRow?.lessonPresence.toLowerCase()}
            </span>{" "}
            lesson {currentRow?.date && `for ${getNDayMonth(currentRow.date)}`}
          </SheetDescription>
        </SheetHeader>

        <Form {...form}>
          <form
            id="create-lesson-form"
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
                      placeholder="e.g. Introduction to Basic Accrods"
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

            {currentRow?.lessonPresence === "ONLINE" && (
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
          <Button form="create-lesson-form" type="submit">
            Create Lesson
          </Button>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}
