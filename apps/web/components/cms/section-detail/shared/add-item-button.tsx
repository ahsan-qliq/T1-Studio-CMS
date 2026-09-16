"use client"

import { Plus } from "lucide-react"
import { Button } from "@workspace/ui/components/button"

interface AddItemButtonProps {
  label: string
  onClick: () => void
}

export function AddItemButton({ label, onClick }: AddItemButtonProps) {
  return (
    <Button
      type="button"
      onClick={onClick}
      variant="outline"
      className="w-full border-dashed text-zinc-500 hover:border-zinc-300 hover:bg-zinc-50 hover:text-zinc-700"
    >
      <Plus className="size-4" aria-hidden />
      {label}
    </Button>
  )
}
