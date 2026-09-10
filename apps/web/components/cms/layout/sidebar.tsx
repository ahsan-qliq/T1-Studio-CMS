import { SidebarNav } from "./sidebar-nav"
import { SidebarUser } from "./sidebar-user"
import { currentUser, sidebarNav } from "@/data/mock"

export function Sidebar() {
  return (
    <aside
      aria-label="CMS sidebar"
      className="flex h-full w-56 shrink-0 flex-col bg-zinc-900"
    >
      {/* Logo */}
      <div className="border-b border-white/10 px-4 py-4">
        <div className="flex items-center gap-2">
          <div
            className="flex size-7 items-center justify-center rounded bg-amber-400 text-xs font-black text-zinc-900"
            aria-hidden="true"
          >
            T1
          </div>
          <div>
            <p className="text-xs font-bold tracking-wide text-white">T1 Studio</p>
            <p className="text-[9px] uppercase tracking-widest text-zinc-500">
              Spaces People Belong In
            </p>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <SidebarNav items={sidebarNav} />

      {/* User */}
      <SidebarUser user={currentUser} />

      {/* Footer */}
      <div className="border-t border-white/10 px-4 py-2">
        <p className="text-[9px] text-zinc-600">
          T1 Studio / Interior Design Studio / Version 1.0.0
        </p>
      </div>
    </aside>
  )
}
