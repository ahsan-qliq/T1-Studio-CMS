import type { ApiBreadcrumb } from "@/types/api-home-page"

const crumb = (en: string, ar: string, href: string): ApiBreadcrumb => ({
  label: { en, ar },
  href,
})

const home = () => crumb("Home", "الرئيسية", "/")

export const defaultBreadcrumbs = {
  about: (): ApiBreadcrumb[] => [home(), crumb("About", "عن الشركة", "/about")],
  blog: (): ApiBreadcrumb[] => [home(), crumb("Blog", "المدونة", "/blog")],
  contact: (): ApiBreadcrumb[] => [
    home(),
    crumb("Contact", "اتصل بنا", "/contact"),
  ],
  inspiration: (): ApiBreadcrumb[] => [
    home(),
    crumb("Inspiration", "الإلهام", "/inspiration"),
  ],
  trade: (): ApiBreadcrumb[] => [home(), crumb("Trade", "التجارة", "/trade")],
  whyT1: (): ApiBreadcrumb[] => [
    home(),
    crumb("Why T1", "لماذا T1", "/why-t1"),
  ],
  spaces: (): ApiBreadcrumb[] => [
    home(),
    crumb("Spaces", "المساحات", "/spaces"),
  ],
  projects: (): ApiBreadcrumb[] => [
    home(),
    crumb("Projects", "المشاريع", "/projects"),
  ],
  spaceDetail: (): ApiBreadcrumb[] => defaultBreadcrumbs.spaces(),
  projectDetail: (): ApiBreadcrumb[] => defaultBreadcrumbs.projects(),
  blogDetail: (): ApiBreadcrumb[] => defaultBreadcrumbs.blog(),
  landing: (): ApiBreadcrumb[] => [],
}
