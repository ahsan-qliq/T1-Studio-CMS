import { Sidebar } from "./sidebar"

interface CmsLayoutProps {
  children: React.ReactNode
}

export function CmsLayout({ children }: CmsLayoutProps) {
  return (
    <div className="flex h-screen overflow-hidden bg-white">
      {/* Left: fixed sidebar */}
      <Sidebar />

      {/* Center: scrollable main content */}
      <main
        className="flex min-w-0 flex-1 flex-col overflow-hidden"
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
