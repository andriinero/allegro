"use client";

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
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/app/_components/ui/select";
import { Textarea } from "@/app/_components/ui/textarea";
import { type UpdateProfile, updateProfileSchema } from "@/schemas/profile";
import { api } from "@/trpc/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { GuitarType, ProficiencyLevel, type User } from "@prisma/client";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

type UpdateProfileProps = { sessionUser?: User };

export default function UpdateProfileForm({ sessionUser }: UpdateProfileProps) {
  const form = useForm<UpdateProfile>({
    resolver: zodResolver(updateProfileSchema),
    defaultValues: {
      name: sessionUser?.name ?? "",
      email: sessionUser?.email ?? "",
      guitarType: sessionUser?.guitarType ?? GuitarType.ACOUSTIC,
      proficiency: sessionUser?.proficiency ?? ProficiencyLevel.BEGINNER,
      phone: sessionUser?.phone ?? "",
      location: sessionUser?.location ?? "",
      bio: sessionUser?.bio ?? "",
    },
  });

  const apiUtils = api.useUtils();
  const updateProfileMutation = api.profile.update.useMutation({
    onSuccess: async () => {
      await apiUtils.booking.getByCurrentUser.invalidate();
      toast.success("Profile has been updated");
    },
    onError: (error) => {
      toast.error("Error updating profile", {
        description: error.message,
      });
    },
  });

  function onSubmit(data: UpdateProfile) {
    updateProfileMutation.mutate(data);
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex max-w-lg flex-col gap-4"
      >
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Username</FormLabel>
              <FormControl>
                <Input placeholder="Enter your username" {...field} />
              </FormControl>
              <FormMessage />
              <FormDescription>
                This is your public display name. It can be your real name or a
                pseudonym.
              </FormDescription>
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input placeholder="Enter your email" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="guitarType"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Guitar Type</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select the guitar type you use" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {Object.values(GuitarType).map((t) => (
                    <SelectItem key={t} value={t}>
                      {t.toLowerCase()}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormDescription>
                Select the type of guitar you primarily use
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="proficiency"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Guitar Proficiency Level</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select your proficiency level" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {Object.values(ProficiencyLevel).map((p) => (
                    <SelectItem key={p} value={p}>
                      {p.toLowerCase()}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormDescription>
                Choose the option that best describes your guitar playing
                ability
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="phone"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Phone</FormLabel>
              <FormControl>
                <Input placeholder="Enter your phone" {...field} />
              </FormControl>
              <FormDescription>
                Quick communication with your instructor via WhatsApp
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="location"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Location</FormLabel>
              <FormControl>
                <Input placeholder="e.g. Berlin, Germany" {...field} />
              </FormControl>
              <FormDescription>
                Specify your location for personalized support and relevant
                lesson updates.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="bio"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Bio</FormLabel>
              <FormControl>
                <Textarea placeholder="Enter your bio" {...field} />
              </FormControl>
              <FormDescription>
                Share more about yourself here to help instructor tailor lessons
                to your needs
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button
          type="submit"
          disabled={updateProfileMutation.isPending}
          className="mt-2 self-start"
        >
          Save Changes
        </Button>
      </form>
    </Form>
  );
}
