import type { ApiImage, ApiBreadcrumb, Localized } from "./api-home-page"
import type { SeoData } from "./api-spaces-page"

export interface PrivacyPolicyPageApiData {
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
      contactEmail: string
      items: {
        _id?: string
        title: Localized
        body: Localized
        isVisible: boolean
      }[]
    }
  }
  seo: SeoData
}

export interface PrivacyPolicyPageApiResponse {
  success: boolean
  data: PrivacyPolicyPageApiData
}
