"use client"

import { useState } from "react"
import { MoreHorizontal, Trash2 } from "lucide-react"
import { cn } from "@workspace/ui/lib/utils"
import type { CmsSection, Language } from "@/types/cms"

export interface TabDef {
  key: string
  label: string
  icon?: React.ElementType
}

export interface ShellPanelContext {
  language: Language
}

export interface SectionDetailShellProps {
  section: CmsSection
  /** Subtitle shown below the section title. Omit for sections without one (e.g. Hero). */
  subtitle?: string
  tabs: TabDef[]
  defaultTab?: string
  /**
   * Record of tab key → render function.
   * Any tab without a matching key renders a "Coming soon." placeholder.
   */
  panels: Record<string, (ctx: ShellPanelContext) => React.ReactNode>
  /** Show the EN / AR language switcher (default: true). */
  showLanguageSwitcher?: boolean
  /** Extra controls rendered between the title and the "..." button (e.g. a visibility toggle). */
  extraHeaderControls?: React.ReactNode
}

export function SectionDetailShell({
  section,
  subtitle,
  tabs,
  defaultTab,
  panels,
  showLanguageSwitcher = true,
  extraHeaderControls,
}: SectionDetailShellProps) {
  const [activeTab, setActiveTab] = useState(defaultTab ?? tabs[0]?.key ?? "content")
  const [language, setLanguage] = useState<Language>("en")

  const hasSubtitle = Boolean(subtitle)
  const ctx: ShellPanelContext = { language }

  return (
    <div
      className="border-b border-zinc-200 bg-white"
      role="region"
      aria-label={`Edit ${section.name.en} section`}
    >
      {/* ── Header ──────────────────────────────────────────────────────── */}
      <div
        className={cn(
          "flex gap-3 border-b border-zinc-100 px-4 py-3",
          hasSubtitle ? "items-start" : "items-center"
        )}
      >
        <span
          className="flex size-8 shrink-0 items-center justify-center rounded-md bg-zinc-100 text-xs font-bold text-zinc-600"
          aria-hidden
        >
          {section.number}
        </span>

        <div className="flex-1">
          <h2 className="text-sm font-semibold text-zinc-900">
            Edit {section.name.en} Section
          </h2>
          {subtitle && (
            <p className="mt-0.5 text-xs text-zinc-500">{subtitle}</p>
          )}
        </div>

        {extraHeaderControls}

        {showLanguageSwitcher && (
          <div
            role="group"
            aria-label="Content language"
            className="flex overflow-hidden rounded-md border border-zinc-200"
          >
            {(["en", "ar"] as Language[]).map((l) => (
              <button
                key={l}
                type="button"
                aria-pressed={language === l}
                onClick={() => setLanguage(l)}
                className={cn(
                  "px-3 py-1 text-xs font-semibold uppercase transition-colors",
                  "focus:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-zinc-900",
                  language === l
                    ? "bg-zinc-900 text-white"
                    : "bg-white text-zinc-500 hover:bg-zinc-50 hover:text-zinc-800"
                )}
              >
                {l.toUpperCase()}
              </button>
            ))}
          </div>
        )}

        <button
          type="button"
          aria-label={`More options for ${section.name.en}`}
          className="rounded-md p-1 text-zinc-400 transition-colors hover:bg-zinc-100 hover:text-zinc-600 focus:outline-none focus-visible:ring-2 focus-visible:ring-zinc-900"
        >
          <MoreHorizontal className="size-4" aria-hidden />
        </button>
      </div>

      {/* ── Tab bar ─────────────────────────────────────────────────────── */}
      <div
        role="tablist"
        aria-label={`${section.name.en} editor tabs`}
        className="flex border-b border-zinc-100 px-4"
      >
        {tabs.map(({ key, label, icon: Icon }) => (
          <button
            key={key}
            role="tab"
            id={`tab-${section.id}-${key}`}
            aria-selected={activeTab === key}
            aria-controls={`panel-${section.id}-${key}`}
            onClick={() => setActiveTab(key)}
            className={cn(
              "flex items-center gap-1.5 border-b-2 px-3 py-2.5 text-xs font-medium transition-colors",
              "focus:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-zinc-900",
              activeTab === key
                ? "border-zinc-900 text-zinc-900"
                : "border-transparent text-zinc-500 hover:text-zinc-700"
            )}
          >
            {Icon && <Icon className="size-3.5" aria-hidden />}
            {label}
          </button>
        ))}
      </div>

      {/* ── Tab panels ──────────────────────────────────────────────────── */}
      {tabs.map(({ key }) => (
        <div
          key={key}
          role="tabpanel"
          id={`panel-${section.id}-${key}`}
          aria-labelledby={`tab-${section.id}-${key}`}
          hidden={activeTab !== key}
        >
          {activeTab === key &&
            (panels[key]?.(ctx) ?? (
              <p className="px-5 py-6 text-sm text-zinc-500">Coming soon.</p>
            ))}
        </div>
      ))}

      {/* ── Footer ──────────────────────────────────────────────────────── */}
      <div className="flex items-center justify-between border-t border-zinc-100 bg-zinc-50 px-4 py-3">
        <button
          type="button"
          aria-label={`Delete ${section.name.en} section`}
          className="flex items-center gap-1.5 rounded-md px-3 py-1.5 text-xs font-medium text-red-600 transition-colors hover:bg-red-50 focus:outline-none focus-visible:ring-2 focus-visible:ring-red-500"
        >
          <Trash2 className="size-3.5" aria-hidden />
          Delete Section
        </button>
        <div className="flex items-center gap-2">
          <button
            type="button"
            className="rounded-md border border-zinc-200 bg-white px-4 py-1.5 text-xs font-medium text-zinc-700 transition-colors hover:bg-zinc-50 focus:outline-none focus-visible:ring-2 focus-visible:ring-zinc-900"
          >
            Save Draft
          </button>
          <button
            type="button"
            className="rounded-md bg-zinc-900 px-4 py-1.5 text-xs font-semibold text-white transition-colors hover:bg-zinc-800 focus:outline-none focus-visible:ring-2 focus-visible:ring-zinc-900 focus-visible:ring-offset-1"
          >
            Update Section
          </button>
        </div>
      </div>
    </div>
  )
}
