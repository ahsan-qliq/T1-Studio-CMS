"use client"

import { useState } from "react"
import { ChevronDown } from "lucide-react"
import { cn } from "@workspace/ui/lib/utils"
import type { PageStatus } from "@/types/cms"

interface PublishStatusProps {
  status: PageStatus
  onChange?: (status: PageStatus) => void
}

const statusOptions: PageStatus[] = ["Published", "Draft", "Scheduled"]

const statusStyles: Record<PageStatus, string> = {
  Published: "text-emerald-700 bg-emerald-50 border-emerald-200",
  Draft: "text-amber-700 bg-amber-50 border-amber-200",
  Scheduled: "text-blue-700 bg-blue-50 border-blue-200",
}

const dotStyles: Record<PageStatus, string> = {
  Published: "bg-emerald-500",
  Draft: "bg-amber-500",
  Scheduled: "bg-blue-500",
}

export function PublishStatus({ status, onChange }: PublishStatusProps) {
  const [open, setOpen] = useState(false)

  return (
    <div className="relative">
      <button
        aria-label={`Page status: ${status}. Click to change.`}
        aria-expanded={open}
        aria-haspopup="listbox"
        onClick={() => setOpen((v) => !v)}
        className={cn(
          "inline-flex items-center gap-1.5 rounded-md border px-2.5 py-1 text-xs font-medium transition-colors",
          statusStyles[status]
        )}
      >
        <span className={cn("size-1.5 rounded-full", dotStyles[status])} aria-hidden="true" />
        {status}
        <ChevronDown className="size-3" aria-hidden="true" />
      </button>

      {open && (
        <>
          <div
            className="fixed inset-0 z-10"
            aria-hidden="true"
            onClick={() => setOpen(false)}
          />
          <ul
            role="listbox"
            aria-label="Page status options"
            className="absolute left-0 top-full z-20 mt-1 min-w-[140px] rounded-md border border-zinc-200 bg-white py-1 shadow-lg"
          >
            {statusOptions.map((opt) => (
              <li key={opt} role="option" aria-selected={opt === status}>
                <button
                  onClick={() => {
                    onChange?.(opt)
                    setOpen(false)
                  }}
                  className={cn(
                    "flex w-full items-center gap-2 px-3 py-1.5 text-xs hover:bg-zinc-50",
                    opt === status ? "font-semibold" : "font-normal text-zinc-700"
                  )}
                >
                  <span className={cn("size-1.5 rounded-full", dotStyles[opt])} aria-hidden="true" />
                  {opt}
                </button>
              </li>
            ))}
          </ul>
        </>
      )}
    </div>
  )
}
