import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export const cn = (...inputs: ClassValue[]) => {
  return twMerge(clsx(inputs));
};

export const formatShortUppercaseUUID = (uuid: string) => {
  return uuid.substring(20).toUpperCase();
};
