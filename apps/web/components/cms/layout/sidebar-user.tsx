import { LogOut } from "lucide-react"
import type { CmsUser } from "@/types/cms"

interface SidebarUserProps {
  user: CmsUser
  onLogout?: () => void
}

export function SidebarUser({ user, onLogout }: SidebarUserProps) {
  return (
    <div className="border-t border-white/10 px-4 py-3">
      <div className="flex items-center gap-3">
        {/* Avatar */}
        <div
          className="flex size-8 shrink-0 items-center justify-center rounded-full bg-amber-400 text-xs font-bold text-zinc-900"
          aria-hidden="true"
        >
          {user.avatarInitials}
        </div>

        {/* User info */}
        <div className="min-w-0 flex-1">
          <p className="truncate text-xs font-semibold text-white">{user.name}</p>
          <p className="truncate text-[10px] text-zinc-400">{user.role}</p>
        </div>

        {/* Log out */}
        <button
          aria-label="Log out"
          onClick={onLogout}
          className="rounded p-1.5 text-zinc-400 transition-colors hover:bg-white/10 hover:text-white"
        >
          <LogOut className="size-3.5" aria-hidden="true" />
        </button>
      </div>
    </div>
  )
}
