"use client"

import { useRef } from "react"
import { ImageIcon } from "lucide-react"
import { Input } from "@workspace/ui/components/input"
import { DragHandle } from "../shared/drag-handle"
import { DeleteButton } from "../shared/delete-button"
import type { GridPosition } from "@/types/cms"
import type { UseFormRegister } from "react-hook-form"
import type { SignatureProjectsFormValues } from "./signature-projects-content-tab"

const GRID_POSITIONS: GridPosition[] = [
  "Top Left (1,1)",
  "Top Right (1,2)",
  "Middle Left (2,1)",
  "Middle Right (2,2)",
  "Bottom Left (3,1)",
  "Bottom Right (3,2)",
]

interface ProjectCardRowProps {
  project: SignatureProjectsFormValues["selectedProjects"][number]
  index: number
  register: UseFormRegister<SignatureProjectsFormValues>
  onImageChange: (file: File | null) => void
  onRemove: () => void
}

export function ProjectCardRow({
  project,
  index,
  register,
  onImageChange,
  onRemove,
}: ProjectCardRowProps) {
  const fileInputRef = useRef<HTMLInputElement>(null)

  return (
    <div
      className="flex items-start gap-3 rounded-lg border border-zinc-200 bg-white px-3 py-3"
      role="listitem"
    >
      <DragHandle className="mt-2" />

      <button
        type="button"
        aria-label={`Upload image for project ${index + 1}`}
        onClick={() => fileInputRef.current?.click()}
        className="relative flex h-[72px] w-[108px] shrink-0 items-center justify-center overflow-hidden rounded-md border border-zinc-200 bg-zinc-50 transition-colors hover:border-zinc-300 hover:bg-zinc-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-zinc-900"
      >
        {project.imageUrl ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={project.imageUrl} alt="" className="h-full w-full object-cover" />
        ) : (
          <ImageIcon className="size-5 text-zinc-400" aria-hidden />
        )}
      </button>

      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        className="sr-only"
        aria-label={`Image file for project ${index + 1}`}
        onChange={(e) => {
          const file = e.target.files?.[0] ?? null
          onImageChange(file)
          e.target.value = ""
        }}
      />

      <div className="flex min-w-0 flex-1 flex-col gap-2">
        <div>
          <label
            htmlFor={`proj-title-${index}`}
            className="mb-1 block text-xs font-medium text-zinc-600"
          >
            Project Title
          </label>
          <Input
            id={`proj-title-${index}`}
            {...register(`selectedProjects.${index}.title`)}
            placeholder="Project title"
            aria-label={`Project ${index + 1} title`}
          />
        </div>
        <div>
          <label
            htmlFor={`proj-location-${index}`}
            className="mb-1 block text-xs font-medium text-zinc-600"
          >
            Location
          </label>
          <Input
            id={`proj-location-${index}`}
            {...register(`selectedProjects.${index}.location`)}
            placeholder="City, Country"
            aria-label={`Project ${index + 1} location`}
          />
        </div>
      </div>

      <div className="w-44 shrink-0">
        <label
          htmlFor={`proj-position-${index}`}
          className="mb-1 block text-xs font-medium text-zinc-600"
        >
          Position
        </label>
        <select
          id={`proj-position-${index}`}
          {...register(`selectedProjects.${index}.position`)}
          aria-label={`Project ${index + 1} grid position`}
          className="w-full rounded-md border border-zinc-200 bg-white px-3 py-2 text-sm text-zinc-900 focus:outline-none focus:ring-2 focus:ring-zinc-900 focus-visible:ring-2"
        >
          {GRID_POSITIONS.map((pos) => (
            <option key={pos} value={pos}>
              {pos}
            </option>
          ))}
        </select>
      </div>

      <DeleteButton onClick={onRemove} ariaLabel={`Delete project ${index + 1}`} className="mt-1.5" />
    </div>
  )
}
