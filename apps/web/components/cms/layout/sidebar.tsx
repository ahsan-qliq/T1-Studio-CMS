import { SidebarNav } from "./sidebar-nav"
import { SidebarUser } from "./sidebar-user"
import { currentUser, sidebarNav } from "@/data/mock"
import { fetchSpaceDetailPage } from "@/lib/space-detail-page-api"
import { fetchSpacesPage } from "@/lib/spaces-page-api"
import { fetchProjectDetailPage } from "@/lib/project-detail-page-api"
import { fetchProjectsPage } from "@/lib/projects-page-api"
import type { NavPage, NavSection } from "@/types/cms"

function getSpaceSlug(href: string) {
  const match = href.match(/^\/spaces\/([^/?#]+)\/?$/)
  return match?.[1]
}

function getProjectSlug(href: string) {
  const match = href.match(/^\/projects\/([^/?#]+)\/?$/)
  return match?.[1]
}

async function getSidebarNav(): Promise<NavSection[]> {
  const pagesSection = sidebarNav.find((section) => section.label === "Pages")
  if (!pagesSection) return sidebarNav

  try {
    const spacesPage = await fetchSpacesPage()
    const candidates = spacesPage.sections.featuredSpaces.spaces
      .map((space): NavPage | null => {
        const slug = getSpaceSlug(space.href)
        if (!slug) return null

        return {
          slug: `space-detail/${slug}`,
          label: space.title.en || slug,
        }
      })
      .filter((page): page is NavPage => page !== null)

    const detailPages = await Promise.all(
      candidates.map(async (candidate) => {
        try {
          await fetchSpaceDetailPage(candidate.slug.slice("space-detail/".length))
          return candidate
        } catch {
          return null
        }
      })
    )

    let projectDetailPages: NavPage[] = []
    try {
      const projectsPage = await fetchProjectsPage()
      const projectCandidates = projectsPage.sections.projects.projects
        .map((project): NavPage | null => {
          const slug = getProjectSlug(project.href)
          if (!slug) return null
          return {
            slug: `project-detail/${slug}`,
            label: project.title.en || slug,
          }
        })
        .filter((page): page is NavPage => page !== null)

      const verifiedProjects = await Promise.all(
        projectCandidates.map(async (candidate) => {
          try {
            await fetchProjectDetailPage(
              candidate.slug.slice("project-detail/".length)
            )
            return candidate
          } catch {
            return null
          }
        })
      )
      projectDetailPages = verifiedProjects.filter(
        (page): page is NavPage => page !== null
      )
    } catch {
      projectDetailPages = []
    }

    const staticPages =
      pagesSection.children?.filter(
        (page) =>
          !page.slug.startsWith("space-detail/") &&
          !page.slug.startsWith("project-detail/")
      ) ?? []

    return sidebarNav.map((section) =>
      section === pagesSection
        ? {
            ...section,
            children: [
              ...staticPages,
              ...detailPages.filter(
                (page): page is NavPage => page !== null
              ),
              ...projectDetailPages,
            ],
          }
        : section
    )
  } catch {
    return sidebarNav.map((section) =>
      section === pagesSection
        ? {
            ...section,
            children: section.children?.filter(
              (page) => !page.slug.startsWith("space-detail/")
            ),
          }
        : section
    )
  }
}

export async function Sidebar() {
  const navigation = await getSidebarNav()

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
      <SidebarNav items={navigation} />

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
