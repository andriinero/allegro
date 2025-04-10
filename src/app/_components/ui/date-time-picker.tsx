"use client";

import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { Button } from "./button";
import { Popover, PopoverContent, PopoverTrigger } from "./popover";
import { CalendarIcon } from "lucide-react";
import { Calendar } from "./calendar";
import { useState } from "react";
import { ScrollBar } from "./scroll-area";
import { ScrollArea } from "./scroll-area";
import { FormField } from "./form";
import { FormLabel } from "./form";
import { FormControl, FormDescription, FormItem, FormMessage } from "./form";
import { UseFormReturn } from "react-hook-form";
import { formatDayMonthYearTime } from "@/lib/date";

type DateTimePicker24hProps = {
  form: UseFormReturn<any>;
  name: string;
  label: string;
  description?: string;
  disabled?: (date: Date) => boolean;
};

export default function DateTimePicker24h({
  form,
  name,
  label,
  description,
  disabled,
}: DateTimePicker24hProps) {
  const [date, setDate] = useState<Date>(form.getValues(name));
  const [isOpen, setIsOpen] = useState(false);

  const hours = Array.from({ length: 24 }, (_, i) => i);
  const handleDateSelect = (selectedDate: Date | undefined) => {
    if (selectedDate) {
      setDate(selectedDate);
      form.setValue(name, selectedDate);
    }
  };

  const handleTimeChange = (type: "hour" | "minute", value: string) => {
    if (date) {
      const newDate = new Date(date);
      if (type === "hour") {
        newDate.setHours(parseInt(value));
      } else if (type === "minute") {
        newDate.setMinutes(parseInt(value));
      }
      setDate(newDate);
      form.setValue(name, newDate);
    }
  };

  return (
    <FormField
      control={form.control}
      name={name}
      render={() => (
        <FormItem>
          <FormLabel>{label}</FormLabel>
          <FormControl>
            <Popover open={isOpen} onOpenChange={setIsOpen}>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className={cn(
                    "flex w-full justify-between text-left font-normal",
                    !date && "text-muted-foreground",
                  )}
                >
                  {date ? (
                    formatDayMonthYearTime(date)
                  ) : (
                    <span>MM/DD/YYYY hh:mm</span>
                  )}
                  <CalendarIcon className="size-4" />
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0">
                <div className="sm:flex">
                  <Calendar
                    mode="single"
                    selected={date}
                    disabled={disabled}
                    onSelect={handleDateSelect}
                    initialFocus
                  />
                  <div className="flex flex-col divide-y sm:h-[300px] sm:flex-row sm:divide-x sm:divide-y-0">
                    <ScrollArea className="w-64 sm:w-auto">
                      <div className="flex p-2 sm:flex-col">
                        {hours.reverse().map((hour) => (
                          <Button
                            key={hour}
                            size="icon"
                            variant={
                              date && date.getHours() === hour
                                ? "default"
                                : "ghost"
                            }
                            className="aspect-square shrink-0 sm:w-full"
                            onClick={() =>
                              handleTimeChange("hour", hour.toString())
                            }
                          >
                            {hour}
                          </Button>
                        ))}
                      </div>
                      <ScrollBar
                        orientation="horizontal"
                        className="sm:hidden"
                      />
                    </ScrollArea>
                    <ScrollArea className="w-64 sm:w-auto">
                      <div className="flex p-2 sm:flex-col">
                        {Array.from({ length: 12 }, (_, i) => i * 5).map(
                          (minute) => (
                            <Button
                              key={minute}
                              size="icon"
                              variant={
                                date && date.getMinutes() === minute
                                  ? "default"
                                  : "ghost"
                              }
                              className="aspect-square shrink-0 sm:w-full"
                              onClick={() =>
                                handleTimeChange("minute", minute.toString())
                              }
                            >
                              {minute.toString().padStart(2, "0")}
                            </Button>
                          ),
                        )}
                      </div>
                      <ScrollBar
                        orientation="horizontal"
                        className="sm:hidden"
                      />
                    </ScrollArea>
                  </div>
                </div>
              </PopoverContent>
            </Popover>
          </FormControl>
          <FormMessage />
          <FormDescription>{description}</FormDescription>
        </FormItem>
      )}
    />
  );
}
