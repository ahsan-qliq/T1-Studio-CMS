"use client"

import { useState } from "react"
import {
  FileText,
  Image,
  FolderOpen,
  MessageSquare,
  Inbox,
  Users,
  Palette,
  Settings,
  Home,
  ChevronDown,
} from "lucide-react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@workspace/ui/lib/utils"
import type { NavSection } from "@/types/cms"

const iconMap: Record<string, React.ElementType> = {
  FileText,
  Image,
  FolderOpen,
  MessageSquare,
  Inbox,
  Users,
  Palette,
  Settings,
  Home,
}

interface SidebarNavProps {
  items: NavSection[]
}

export function SidebarNav({ items }: SidebarNavProps) {
  const [pagesOpen, setPagesOpen] = useState(true)
  const pathname = usePathname()

  return (
    <nav aria-label="CMS navigation" className="flex-1 overflow-y-auto py-3">
      <ul role="list" className="space-y-0.5 px-2">
        {items.map((item) => {
          const Icon = item.icon ? iconMap[item.icon] : null
          const hasChildren = item.children && item.children.length > 0

          if (hasChildren) {
            return (
              <li key={item.label}>
                <button
                  aria-expanded={pagesOpen}
                  aria-controls="pages-submenu"
                  onClick={() => setPagesOpen((v) => !v)}
                  className="flex w-full items-center gap-2.5 rounded-md px-2.5 py-2 text-left text-xs font-medium text-zinc-300 transition-colors hover:bg-white/10 hover:text-white"
                >
                  {Icon && (
                    <Icon className="size-4 shrink-0" aria-hidden="true" />
                  )}
                  <span className="flex-1">{item.label}</span>
                  <ChevronDown
                    className={cn(
                      "size-3.5 transition-transform",
                      pagesOpen ? "rotate-0" : "-rotate-90"
                    )}
                    aria-hidden="true"
                  />
                </button>

                {pagesOpen && (
                  <ul
                    id="pages-submenu"
                    role="list"
                    className="mt-0.5 ml-4 space-y-0.5 border-l border-white/10 pl-3"
                  >
                    {item.children!.map((page) => {
                      const href = `/pages/${page.slug}`
                      const isActive = pathname === href
                      return (
                        <li key={page.slug}>
                          <Link
                            href={href}
                            aria-current={isActive ? "page" : undefined}
                            className={cn(
                              "block rounded-md px-2.5 py-1.5 text-xs transition-colors",
                              isActive
                                ? "border-l-2 border-amber-400 bg-white/10 font-semibold text-white"
                                : "font-normal text-zinc-400 hover:bg-white/10 hover:text-white"
                            )}
                          >
                            {page.label}
                          </Link>
                        </li>
                      )
                    })}
                  </ul>
                )}
              </li>
            )
          }

          return (
            <li key={item.label}>
              <Link
                href={item.href ?? "#"}
                className="flex items-center gap-2.5 rounded-md px-2.5 py-2 text-xs font-medium text-zinc-400 transition-colors hover:bg-white/10 hover:text-white"
              >
                {Icon && (
                  <Icon className="size-4 shrink-0" aria-hidden="true" />
                )}
                {item.label}
              </Link>
            </li>
          )
        })}
      </ul>
    </nav>
  )
}
