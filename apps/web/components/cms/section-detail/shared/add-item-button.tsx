"use client"

import { Plus } from "lucide-react"

interface AddItemButtonProps {
  label: string
  onClick: () => void
}

export function AddItemButton({ label, onClick }: AddItemButtonProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="flex w-full items-center justify-center gap-2 rounded-lg border border-dashed border-zinc-200 py-3 text-sm text-zinc-500 transition-colors hover:border-zinc-300 hover:bg-zinc-50 hover:text-zinc-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-zinc-900"
    >
      <Plus className="size-4" aria-hidden />
      {label}
    </button>
  )
}
