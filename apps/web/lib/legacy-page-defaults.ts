import type { HomePageApiData, HomePageSections } from "@/types/api-home-page"
import type { ProjectsPageApiData, ProjectsSections } from "@/types/api-projects-page"
import type { SpacesPageApiData, SpacesSections, SeoData } from "@/types/api-spaces-page"

const localized = () => ({ en: "", ar: "" })
const image = () => ({ url: "", key: "", alt: localized() })
const seo = (): SeoData => ({
  metaTitle: localized(),
  metaDescription: localized(),
  keywords: { en: [], ar: [] },
  canonicalUrl: "",
  ogImage: image(),
  noIndex: false,
  noFollow: false,
})

export function createEmptyHomePage(): HomePageApiData {
  return { _id: "", pageName: "Home", slug: "home", status: "draft", publishedAt: null, createdAt: "", updatedAt: "", __v: 0, sections: {} as HomePageSections }
}

export function createEmptySpacesPage(): SpacesPageApiData {
  return { pageName: "Spaces", slug: "spaces", status: "draft", sections: {} as SpacesSections, seo: seo() }
}

export function createEmptyProjectsPage(): ProjectsPageApiData {
  return { pageName: "Projects", slug: "projects", status: "draft", sections: {} as ProjectsSections, seo: seo() }
}
