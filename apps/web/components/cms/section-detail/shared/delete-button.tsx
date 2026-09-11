"use client"

import { Trash2 } from "lucide-react"
import { cn } from "@workspace/ui/lib/utils"

interface DeleteButtonProps {
  onClick: () => void
  ariaLabel?: string
  className?: string
}

export function DeleteButton({ onClick, ariaLabel, className }: DeleteButtonProps) {
  return (
    <button
      type="button"
      aria-label={ariaLabel ?? "Delete"}
      onClick={onClick}
      className={cn(
        "shrink-0 rounded p-1 text-red-400 transition-colors hover:bg-red-50 hover:text-red-600 focus:outline-none focus-visible:ring-2 focus-visible:ring-red-500",
        className
      )}
    >
      <Trash2 className="size-4" aria-hidden />
    </button>
  )
}
