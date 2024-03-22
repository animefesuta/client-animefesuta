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

export function dateFormatted(date: string) {
  const originalDate = new Date(date);
  const year = originalDate.getFullYear();
  const month = originalDate.getMonth() + 1;
  const day = originalDate.getDate();
  return `${year}年${month}月${day}日`;
}
