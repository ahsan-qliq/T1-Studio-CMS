import type { HomePageApiData, HomePageSections } from "@/types/api-home-page"

const l = () => ({ en: "", ar: "" })
const i = () => ({ url: "", key: "", alt: l() })
const b = () => ({ label: l(), href: "", openInNewTab: false })
const s = (order: number): HomePageSections => ({
  isVisible: true,
  order,
  eyebrow: l(),
  heading: l(),
  description: l(),
})

export function createEmptyHomePage(): HomePageApiData {
  return {
    _id: "",
    pageName: "Home",
    slug: "home",
    status: "draft",
    publishedAt: null,
    createdAt: "",
    updatedAt: "",
    __v: 0,
    sections: {} as HomePageSections,
  }
}
