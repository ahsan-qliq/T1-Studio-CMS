import { Info } from "lucide-react"

export function SectionInfo() {
  return (
    <aside
      className="rounded-lg border border-blue-100 bg-blue-50 p-3 text-xs text-blue-800"
      aria-label="Section types explained"
    >
      <div className="mb-1.5 flex items-center gap-1.5 font-semibold">
        <Info className="size-3.5 shrink-0" aria-hidden />
        Section types
      </div>
      <ul className="space-y-1 text-blue-700">
        <li>
          <strong>Manual</strong> — store page-specific text and media.
        </li>
        <li>
          <strong>Linked</strong> — pull content from collections; only control selection/order.
        </li>
        <li>
          <strong>Global</strong> — reuse shared content across pages.
        </li>
      </ul>
    </aside>
  )
}
