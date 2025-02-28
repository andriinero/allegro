import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export const cn = (...inputs: ClassValue[]) => {
  return twMerge(clsx(inputs));
};

export const capitalize = (str: string) => {
  return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
};

export const formatUUID = (uuid: string | number) => {
  return uuid.toString().substring(20).toUpperCase() ?? "N/A";
};

export const getInitials = (name: string) => {
  return name
    .split(" ")
    .map((n) => n[0])
    .join("");
};

export const getCellValueWithFallback = (
  value: string | number | null | undefined,
  fallback: string,
) => {
  return typeof value === "string" || typeof value === "number"
    ? value
    : fallback;
};
