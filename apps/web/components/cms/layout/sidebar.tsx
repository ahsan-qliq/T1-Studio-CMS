import { SidebarNav } from "./sidebar-nav"
import { SidebarUser } from "./sidebar-user"

import { currentUser, sidebarNav } from "@/data/mock"
import { getAuthenticatedUser } from "@/lib/auth"

import { fetchAllSpaceDetailPages } from "@/lib/space-detail-page-api"
import { fetchAllProjectDetailPages } from "@/lib/project-detail-page-api"

import { fetchAllBlogDetailPages } from "@/lib/blog-detail-page-api"

import type { NavPage, NavSection } from "@/types/cms"

/**
 * Build sidebar navigation
 */
async function getSidebarNav(): Promise<NavSection[]> {
  const pagesSection = sidebarNav.find((section) => section.label === "Pages")

  if (!pagesSection) {
    return sidebarNav
  }

  try {
    /**
     * STATIC PAGES
     *
     * Remove dynamic pages from the original mock navigation.
     * Spaces, Projects and Blog are created dynamically below.
     */
    const staticPages = pagesSection.children ?? []

    /**
     * FETCH DYNAMIC DATA
     */
    const [spacesResult, projectsResult, blogsResult] =
      await Promise.allSettled([
        fetchAllSpaceDetailPages(),
        fetchAllProjectDetailPages(),
        fetchAllBlogDetailPages(),
      ])

    /**
     * ==========================================
     * SPACES
     * ==========================================
     */
    let spaceDetailPages: NavPage[] = []

    if (spacesResult.status === "fulfilled") {
      const spaces = spacesResult.value ?? []

      spaceDetailPages = spaces
        .filter((space) => Boolean(space.slug))
        .map((space) => ({
          slug: `space-detail/${space.slug}`,
          label: space.pageName || space.slug,
        }))
    }

    /**
     * ==========================================
     * PROJECTS
     * ==========================================
     */
    let projectDetailPages: NavPage[] = []

    if (projectsResult.status === "fulfilled") {
      const projects = projectsResult.value ?? []

      projectDetailPages = projects
        .filter((project) => Boolean(project.slug))
        .map((project) => ({
          slug: `project-detail/${project.slug}`,
          label: project.pageName || project.slug,
        }))
    }

    /**
     * ==========================================
     * BLOG
     * ==========================================
     */

    let blogDetailPages: NavPage[] = []

    if (blogsResult.status === "fulfilled") {
      const blogs = blogsResult.value ?? []

      blogDetailPages = blogs
        .filter((blog) => Boolean(blog.slug))
        .map((blog) => ({
          slug: `blog-detail/${blog.slug}`,
          label: blog.title?.en || blog.slug,
        }))
    }

    /**
     * ==========================================
     * CREATE DROPDOWN SECTIONS
     * ==========================================
     */
    const dynamicSections: NavSection[] = []

    /**
     * SPACES DROPDOWN
     */
    if (spaceDetailPages.length > 0) {
      dynamicSections.push({
        label: "Spaces",
        icon: "Home",
        children: spaceDetailPages,
      })
    }

    /**
     * PROJECTS DROPDOWN
     */
    if (projectDetailPages.length > 0) {
      dynamicSections.push({
        label: "Projects",
        icon: "FolderOpen",
        children: projectDetailPages,
      })
    }

    /**
     * BLOG DROPDOWN
     */
    dynamicSections.push({
      label: "Blog",
      icon: "FileText",
      children: [
        {
          slug: "blog",
          label: "Blog",
        },
        ...blogDetailPages,
      ],
    })

    /**
     * ==========================================
     * FINAL SIDEBAR
     * ==========================================
     */
    return sidebarNav.flatMap((section) => {
      /**
       * Replace Pages children with:
       *
       * Static Pages
       * Spaces
       * Projects
       * Blog
       */
      if (section === pagesSection) {
        return [
          {
            ...section,
            children: staticPages,
          },
          ...dynamicSections,
        ]
      }

      /**
       * Remove old static Projects section
       * when dynamic Projects exists.
       */
      if (section.label === "Projects" && projectDetailPages.length > 0) {
        return []
      }

      /**
       * Remove old static Spaces section
       * when dynamic Spaces exists.
       */
      if (section.label === "Spaces" && spaceDetailPages.length > 0) {
        return []
      }

      /**
       * Remove old static Blog section.
       */
      if (section.label === "Blog") {
        return []
      }

      return [section]
    })
  } catch {
    /**
     * Fallback if API fails.
     */
    return sidebarNav.map((section) =>
      section === pagesSection
        ? {
            ...section,
            children: section.children?.filter(
              (page) =>
                !page.slug.startsWith("space-detail/") &&
                !page.slug.startsWith("project-detail/") &&
                !page.slug.startsWith("blog-detail/")
            ),
          }
        : section
    )
  }
}

/**
 * Sidebar Component
 */
export async function Sidebar() {
  const navigation = await getSidebarNav()

  const authenticatedUser = await getAuthenticatedUser()

  const sidebarUser = authenticatedUser
    ? {
        name:
          authenticatedUser.name || authenticatedUser.email || currentUser.name,

        role: authenticatedUser.role || currentUser.role,

        avatarInitials: (
          authenticatedUser.name ||
          authenticatedUser.email ||
          currentUser.name
        )
          .split(/\s+/)
          .map((part) => part[0])
          .join("")
          .slice(0, 2)
          .toUpperCase(),
      }
    : currentUser

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
            <p className="text-xs font-bold tracking-wide text-white">
              T1 Studio
            </p>

            <p className="text-[9px] tracking-widest text-zinc-500 uppercase">
              Spaces People Belong In
            </p>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <SidebarNav items={navigation} />

      {/* User */}
      <SidebarUser user={sidebarUser} />

      {/* Footer */}
      <div className="border-t border-white/10 px-4 py-2">
        <p className="text-[9px] text-zinc-600">
          T1 Studio / Interior Design Studio / Version 1.0.0
        </p>
      </div>
    </aside>
  )
}
