import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

/**
 * Combine class names conditionally
 * @param inputs - Class names to combine
 * @returns Combined class names
*/
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

/**
 * Check if the environment is development
 * @returns True if in development mode, false otherwise
*/
export const isDev = process.env.NODE_ENV !== 'production'

/**
 * Format number of months into a readable string
 * @param months - Number of months
 * @returns Formatted string
*/
export const formatMonths = (months: number) => {
  if (months === 1) return 'mese';
  if (months === 12) return 'anno';
  return `${months} mesi`;
}