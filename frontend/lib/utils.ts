import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

/** Strip legacy "ABB" prefix from reference IDs stored in the database. */
export function formatReferenceId(referenceId?: string | null): string {
  if (!referenceId) return ''
  return referenceId.replace(/^ABB/, '')
}
