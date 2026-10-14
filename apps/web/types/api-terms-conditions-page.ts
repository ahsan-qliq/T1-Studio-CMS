import type { ApiImage, ApiBreadcrumb, Localized } from "./api-home-page"
import type { SeoData } from "./api-spaces-page"

export interface TermsSubsection {
  _id?: string
  title: Localized
  body: Localized
  bullets: Localized[]
  isVisible: boolean
}

export interface TermsItem {
  _id?: string
  title: Localized
  intro: Localized
  subsections: TermsSubsection[]
  isVisible: boolean
}

export interface TermsConditionsPageApiData {
  _id?: string
  pageName: string
  slug: string
  status: "draft" | "published"
  sections: {
    hero: {
      isVisible: boolean
      order: number
      heading: Localized
      description: Localized
      bgImage: ApiImage
      breadcrumbs?: ApiBreadcrumb[]
    }
    content: {
      isVisible: boolean
      order: number
      tocLabel: Localized
      lastUpdated: Localized
      items: TermsItem[]
    }
  }
  seo: SeoData
}

export interface TermsConditionsPageApiResponse {
  success: boolean
  data: TermsConditionsPageApiData
}
