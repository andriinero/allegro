import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export const cn = (...inputs: ClassValue[]) => {
  return twMerge(clsx(inputs));
};

export const getShortUppercaseUUID = (uuid: string) => {
  return uuid.substring(20).toUpperCase();
};
