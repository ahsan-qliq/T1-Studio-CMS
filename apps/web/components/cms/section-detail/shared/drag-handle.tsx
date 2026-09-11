"use client"

import { GripVertical } from "lucide-react"
import { cn } from "@workspace/ui/lib/utils"

export function DragHandle({ className }: { className?: string }) {
  return (
    <span
      aria-hidden
      className={cn("shrink-0 cursor-grab text-zinc-300 active:cursor-grabbing", className)}
    >
      <GripVertical className="size-4" />
    </span>
  )
}
