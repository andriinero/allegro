"use client";

import { format, set, startOfDay } from "date-fns";
import { ChevronDownIcon } from "lucide-react";
import { useState } from "react";
import { Button } from "../ui/button";
import { Calendar } from "../ui/calendar";
import { Field, FieldGroup, FieldLabel } from "../ui/field";
import { Input } from "../ui/input";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";

type DatePickerTimeProps = {
  date: Date | undefined;
  setDate: (date: Date | undefined) => void;
  disabled?: (date: Date) => boolean;
};

const DEFAULT_TIME = "10:30:00";

function combineDateAndTime(day: Date, time: string) {
  const [hours, minutes, seconds] = time.split(":").map(Number);
  return set(startOfDay(day), {
    hours: hours ?? 0,
    minutes: minutes ?? 0,
    seconds: seconds ?? 0,
    milliseconds: 0,
  });
}

export function DatePickerTime({
  date,
  setDate,
  disabled = () => false,
}: DatePickerTimeProps) {
  const [open, setOpen] = useState(false);
  const [time, setTime] = useState(
    date ? format(date, "HH:mm:ss") : DEFAULT_TIME
  );

  return (
    <FieldGroup className="mx-auto max-w-xs flex-row">
      <Field>
        <FieldLabel htmlFor="date-picker-optional">Date</FieldLabel>
        <Popover open={open} onOpenChange={setOpen}>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              id="date-picker-optional"
              className="w-32 justify-between font-normal"
            >
              {date ? format(date, "PPP") : "Select date"}
              <ChevronDownIcon />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto overflow-hidden p-0" align="start">
            <Calendar
              mode="single"
              selected={date}
              captionLayout="dropdown"
              defaultMonth={date}
              disabled={disabled}
              onSelect={(day) => {
                setDate(day ? combineDateAndTime(day, time) : undefined);
                setOpen(false);
              }}
            />
          </PopoverContent>
        </Popover>
      </Field>
      <Field className="w-32">
        <FieldLabel htmlFor="time-picker-optional">Time</FieldLabel>
        <Input
          type="time"
          id="time-picker-optional"
          step="1"
          value={time}
          onChange={(event) => {
            const nextTime = event.target.value;
            setTime(nextTime);
            if (date) setDate(combineDateAndTime(date, nextTime));
          }}
          className="appearance-none bg-background [&::-webkit-calendar-picker-indicator]:hidden [&::-webkit-calendar-picker-indicator]:appearance-none"
        />
      </Field>
    </FieldGroup>
  );
}
