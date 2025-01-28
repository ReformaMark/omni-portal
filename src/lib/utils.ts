import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatPrice(value: number | string, decimals: number = 2): string {
  const numberValue = typeof value === "string" ? parseFloat(value) : value;
  if (isNaN(numberValue)) return "Invalid number";
  return numberValue.toFixed(decimals).replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

export function generateBuyerId(): string {
  const prefix = "B-";
  const randomNumber = Math.floor(100000 + Math.random() * 900000);
  return `${prefix}${randomNumber}`;
}

export function generateSellerId(): string {
  const prefix = "S-";
  const randomNumber = Math.floor(100000 + Math.random() * 900000);
  return `${prefix}${randomNumber}`;
}

export function generateAdminId(): string {
  const prefix = "A-";
  const randomNumber = Math.floor(100000 + Math.random() * 900000);
  return `${prefix}${randomNumber}`;
}

export function getConvexErrorMessage(error: Error): string {
  try {
    // If it's not a string, return default message
    if (typeof error.message !== 'string') {
      return "Something went wrong";
    }

    // If message contains ConvexError, extract it
    if (error.message.includes("ConvexError:")) {
      // Split the message by "ConvexError:"
      const parts = error.message.split("ConvexError:");

      if (parts.length < 2) return "Something went wrong";

      // Get the part after "ConvexError:"
      let errorMessage = parts[1].trim();

      // Remove everything after "at handler" if it exists
      const handlerIndex = errorMessage.indexOf(" at handler");
      if (handlerIndex !== -1) {
        errorMessage = errorMessage.substring(0, handlerIndex);
      }

      // Clean up any remaining artifacts
      return errorMessage.replace(/\s+/g, ' ').trim();
    }

    // If no ConvexError found, return the original message or default
    return error.message || "Something went wrong";
  } catch {
    // If any parsing fails, return default message
    return "Something went wrong";
  }
}

export function formatDate(convexDate: number) {
  const roundedTimestamp = Math.floor(convexDate);

  const readableDate = new Date(roundedTimestamp);

  // Extract month, day, and year
  const month = readableDate.getMonth() + 1; // Months are 0-based, so add 1
  const day = readableDate.getDate();
  const year = readableDate.getFullYear();

  // Format as M/D/YYYY
  return `${month}/${day}/${year}`;
}

export function formatDateVerbose(convexDate: number) {
  const roundedTimestamp = Math.floor(convexDate);
  const readableDate = new Date(roundedTimestamp);

  const options: Intl.DateTimeFormatOptions = {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  };

  return readableDate.toLocaleDateString('en-US', options);
}