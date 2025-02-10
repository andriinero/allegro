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
import { zodResolver } from "@hookform/resolvers/zod";
import type { Booking } from "@prisma/client";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

const formSchema = z.object({
  assignment: z.string(),
  notes: z.string(),
  description: z.string(),
  duration: z.number(),
});
type CreateLessonForm = z.infer<typeof formSchema>;

type CreateLessonDrawerProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  currentRow: Booking | null;
};

export default function CreateLessonDrawer({
  open,
  onOpenChange,
  currentRow,
}: CreateLessonDrawerProps) {
  const form = useForm<CreateLessonForm>({
    resolver: zodResolver(formSchema),
  });

  function onSubmit(data: CreateLessonForm) {
    onOpenChange(false);
    form.reset();
    //NOTE: submit values
  }

  return (
    <Sheet
      open={open}
      onOpenChange={(v) => {
        onOpenChange(v);
        form.reset();
      }}
    >
      <SheetContent className="flex flex-col">
        <SheetHeader>
          <SheetTitle>Create Lesson</SheetTitle>
          <SheetDescription>Click save when you&apos;re done.</SheetDescription>
        </SheetHeader>

        <Form {...form}>
          <form
            id="create-lesson-form"
            onSubmit={form.handleSubmit(onSubmit)}
            className="flex-1 space-y-5"
          >
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
                      rows={5}
                    />
                  </FormControl>
                  <FormMessage />
                  <FormDescription>
                    This is your public display name. It can be your real name
                    or a pseudonym.
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
