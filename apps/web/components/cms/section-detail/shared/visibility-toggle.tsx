"use client"

import { cn } from "@workspace/ui/lib/utils"

interface VisibilityToggleProps {
  checked: boolean
  onChange: (checked: boolean) => void
  ariaLabel?: string
}

export function VisibilityToggle({ checked, onChange, ariaLabel }: VisibilityToggleProps) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      aria-label={ariaLabel ?? "Toggle visibility"}
      onClick={() => onChange(!checked)}
      className={cn(
        "relative inline-flex h-6 w-11 shrink-0 cursor-pointer items-center rounded-full transition-colors",
        "focus:outline-none focus-visible:ring-2 focus-visible:ring-zinc-900 focus-visible:ring-offset-1",
        checked ? "bg-zinc-900" : "bg-zinc-300"
      )}
    >
      <span
        aria-hidden
        className={cn(
          "inline-block size-4 rounded-full bg-white shadow transition-transform",
          checked ? "translate-x-6" : "translate-x-1"
        )}
      />
    </button>
  )
}
