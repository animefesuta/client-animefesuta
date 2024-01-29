import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function getPageError(error: unknown): string {
  if (typeof error === "string") {
    return error;
  }

  if (typeof error === "object" && error !== null) {
    const { statusText, message } = error as {
      statusText?: string;
      message?: string;
    };
    return statusText || message || "Unknown error";
  }

  return "Unknown error";
}
