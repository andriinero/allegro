"use client";

import { format } from "date-fns";
import { Field, FieldLabel } from "../ui/field";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Button } from "../ui/button";
import { Calendar } from "../ui/calendar";

type DatePickerSimpleProps = {
  date: Date;
  setDate: (date: Date) => void;
  disabled?: (date: Date) => boolean;
};

export function DatePicker({
  date,
  setDate,
  disabled = () => false,
}: DatePickerSimpleProps) {
  return (
    <Field className="mx-auto w-44">
      <FieldLabel htmlFor="date-picker-simple">Date</FieldLabel>
      <Popover>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            id="date-picker-simple"
            className="justify-start font-normal"
          >
            {date ? format(date, "PPP") : <span>Pick a date</span>}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="start">
          <Calendar
            mode="single"
            selected={date}
            onSelect={setDate}
            defaultMonth={date}
            disabled={disabled}
            required
          />
        </PopoverContent>
      </Popover>
    </Field>
  );
}
