import type { Localized, ApiImage, ApiBreadcrumb } from "./api-home-page"
import type { SeoData } from "./api-spaces-page"

export interface AccessibilityShortfallItem {
  _id?: string
  title: Localized
  body: Localized
  isVisible: boolean
}

export interface AccessibilityFaq {
  _id?: string
  question: Localized
  answer: Localized
  isVisible: boolean
}

export interface AccessibilityPageApiData {
  _id?: string
  pageName: string
  slug: string
  publishedAt?: string
  status: "draft" | "published"
  tocMeta: {
    tocLabel: Localized
    lastUpdated: Localized
  }
  sections: {
    hero: {
      isVisible: boolean
      order: number
      heading: Localized
      description: Localized
      bgImage: ApiImage
      breadcrumbs?: ApiBreadcrumb[]
    }
    commitment: {
      isVisible: boolean
      order: number
      title: Localized
      body: Localized
    }
    standards: {
      isVisible: boolean
      order: number
      title: Localized
      body: Localized
      standards: Localized[]
      note: Localized
    }
    shortfalls: {
      isVisible: boolean
      order: number
      title: Localized
      body: Localized
      items: AccessibilityShortfallItem[]
      note: Localized
    }
    beyondWebsite: {
      isVisible: boolean
      order: number
      title: Localized
      body: Localized
    }
    contact: {
      isVisible: boolean
      order: number
      title: Localized
      body: Localized
      contactSubTitle: Localized
      contactItems: Localized[]
      note: Localized
    }
    faq: {
      isVisible: boolean
      order: number
      title: Localized
      faqs: AccessibilityFaq[]
    }
  }
  seo: SeoData
}

export interface AccessibilityPageApiResponse {
  success: boolean
  data: AccessibilityPageApiData
}
