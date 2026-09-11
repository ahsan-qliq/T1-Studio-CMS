"use client"

import { useState } from "react"
import { Monitor, Tablet, Smartphone, ArrowRight } from "lucide-react"
import { cn } from "@workspace/ui/lib/utils"
import type { GridPosition, SignatureProjectsContent } from "@/types/cms"

type Viewport = "desktop" | "tablet" | "mobile"

const VIEWPORTS: { key: Viewport; icon: React.ElementType; label: string }[] = [
  { key: "desktop", icon: Monitor, label: "Desktop" },
  { key: "tablet", icon: Tablet, label: "Tablet" },
  { key: "mobile", icon: Smartphone, label: "Mobile" },
]

// Map position string to [row, col] (1-indexed)
const POSITION_MAP: Record<GridPosition, [number, number]> = {
  "Top Left (1,1)": [1, 1],
  "Top Right (1,2)": [1, 2],
  "Middle Left (2,1)": [2, 1],
  "Middle Right (2,2)": [2, 2],
  "Bottom Left (3,1)": [3, 1],
  "Bottom Right (3,2)": [3, 2],
}

interface SignatureProjectsPreviewProps {
  content: SignatureProjectsContent
}

export function SignatureProjectsPreview({ content }: SignatureProjectsPreviewProps) {
  const [viewport, setViewport] = useState<Viewport>("desktop")

  // Build a 3×2 grid map
  const grid: Array<Array<(typeof content.selectedProjects)[number] | null>> = [
    [null, null],
    [null, null],
    [null, null],
  ]

  for (const project of content.selectedProjects) {
    if (project.position && project.position in POSITION_MAP) {
      const coords = POSITION_MAP[project.position]
      if (coords) {
        const row = coords[0]
        const col = coords[1]
        const gridRow = grid[row - 1]
        if (gridRow) gridRow[col - 1] = project
      }
    }
  }

  return (
    <div className="flex h-full flex-col border-l border-zinc-200 bg-white">
      {/* Preview header */}
      <div className="flex items-center justify-between border-b border-zinc-100 px-4 py-3">
        <span className="text-xs font-semibold text-zinc-700">Live Preview</span>
        <div
          role="group"
          aria-label="Preview viewport"
          className="flex items-center gap-1 rounded-md border border-zinc-200 p-0.5"
        >
          {VIEWPORTS.map(({ key, icon: Icon, label }) => (
            <button
              key={key}
              type="button"
              aria-pressed={viewport === key}
              aria-label={`${label} preview`}
              onClick={() => setViewport(key)}
              className={cn(
                "rounded p-1.5 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-zinc-900",
                viewport === key
                  ? "bg-zinc-900 text-white"
                  : "text-zinc-500 hover:bg-zinc-100 hover:text-zinc-700"
              )}
            >
              <Icon className="size-3.5" aria-hidden />
            </button>
          ))}
        </div>
      </div>

      {/* Preview area */}
      <div className="flex-1 overflow-hidden bg-zinc-100 p-3">
        <div
          className={cn(
            "h-full overflow-hidden rounded-lg bg-zinc-950 transition-all",
            viewport === "tablet" && "mx-auto max-w-sm",
            viewport === "mobile" && "mx-auto max-w-[200px]"
          )}
        >
          <div className="flex h-full flex-col items-center px-4 py-6">
            {/* Section heading */}
            <h3 className="mb-4 text-center text-sm font-semibold text-white">
              {content.headingEn || "Signature Projects"}
            </h3>

            {/* Project grid */}
            <div
              className="grid w-full flex-1 grid-cols-2 grid-rows-3 gap-1.5"
              aria-label="Project grid preview"
            >
              {grid.map((row, rowIdx) =>
                row.map((project, colIdx) => (
                  <div
                    key={`${rowIdx}-${colIdx}`}
                    className={cn(
                      "relative flex flex-col justify-end overflow-hidden rounded-md",
                      !project && "bg-zinc-900"
                    )}
                    aria-label={
                      project
                        ? `${project.title} at row ${rowIdx + 1}, column ${colIdx + 1}`
                        : `Empty cell at row ${rowIdx + 1}, column ${colIdx + 1}`
                    }
                  >
                    {project ? (
                      <>
                        {project.imageUrl ? (
                          // eslint-disable-next-line @next/next/no-img-element
                          <img
                            src={project.imageUrl}
                            alt={project.title}
                            className="absolute inset-0 h-full w-full object-cover"
                          />
                        ) : (
                          <div className="absolute inset-0 bg-zinc-700" aria-hidden />
                        )}
                        <div className="relative z-10 bg-gradient-to-t from-black/80 to-transparent p-2">
                          <p className="text-[9px] font-semibold leading-tight text-white">
                            {project.title}
                          </p>
                          {project.location && (
                            <p className="text-[8px] text-zinc-400">{project.location}</p>
                          )}
                        </div>
                      </>
                    ) : null}
                  </div>
                ))
              )}
            </div>

            {/* CTA button */}
            {content.buttonLabelEn && (
              <button
                type="button"
                className="mt-4 flex items-center gap-1.5 rounded-full border border-white/30 px-3 py-1.5 text-[10px] font-medium text-white"
                tabIndex={-1}
                aria-hidden
              >
                {content.buttonLabelEn}
                <ArrowRight className="size-3" aria-hidden />
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
