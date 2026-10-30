import { Sidebar } from "./sidebar"
import { Suspense } from "react"

interface CmsLayoutProps {
  children: React.ReactNode
}

export function CmsLayout({ children }: CmsLayoutProps) {
  return (
    <div className="flex h-screen overflow-hidden bg-white">
      {/* Left: fixed sidebar */}
      <Suspense
        fallback={
          <aside
            aria-label="CMS sidebar"
            aria-busy="true"
            className="flex h-full w-56 shrink-0 flex-col bg-zinc-900 p-4"
          >
            <p className="text-xs font-bold text-white">T1 Studio</p>
            <p role="status" className="mt-6 text-sm text-zinc-400">
              Loading navigation...
            </p>
          </aside>
        }
      >
        <Sidebar />
      </Suspense>

      {/* Center: scrollable main content */}
      <main
        className="flex min-w-0 flex-1 flex-col overflow-y-auto"
        id="main-content"
        aria-label="Page editor"
      >
        {children}
      </main>

      {/* Right: fixed live preview */}
      {/* <div className="hidden h-full w-[340px] shrink-0 xl:flex xl:flex-col">
        <LivePreview />
      </div> */}
    </div>
  )
}
