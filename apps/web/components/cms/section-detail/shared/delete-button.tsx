"use client"

import { Trash2 } from "lucide-react"
import { cn } from "@workspace/ui/lib/utils"
import { Button } from "@workspace/ui/components/button"

interface DeleteButtonProps {
  onClick: () => void
  ariaLabel?: string
  className?: string
}

export function DeleteButton({ onClick, ariaLabel, className }: DeleteButtonProps) {
  return (
    <Button
      type="button"
      aria-label={ariaLabel ?? "Delete"}
      onClick={onClick}
      variant="ghost"
      size="icon-sm"
      className={cn(
        "text-red-400 hover:bg-red-50 hover:text-red-600",
        className
      )}
    >
      <Trash2 className="size-4" aria-hidden />
    </Button>
  )
}
