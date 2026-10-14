import type { Localized, ApiImage, ApiBreadcrumb } from "./api-home-page"
import type { SeoData } from "./api-spaces-page"

export interface CookiePolicyCategory {
  _id?: string
  title: Localized
  body: Localized
  isVisible: boolean
}

export interface CookiePolicyFaq {
  _id?: string
  question: Localized
  answer: Localized
  isVisible: boolean
}

export interface CookiePolicyPageApiData {
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
    aboutPolicy: {
      isVisible: boolean
      order: number
      title: Localized
      body: Localized
    }
    whatAreCookies: {
      isVisible: boolean
      order: number
      title: Localized
      body: Localized
    }
    cookieTypes: {
      isVisible: boolean
      order: number
      title: Localized
      body: Localized
      categories: CookiePolicyCategory[]
      note: Localized
    }
    yourChoices: {
      isVisible: boolean
      order: number
      title: Localized
      body: Localized
      choices: Localized[]
      note: Localized
    }
    yourRights: {
      isVisible: boolean
      order: number
      title: Localized
      body: Localized
    }
    changes: {
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
    }
    faq: {
      isVisible: boolean
      order: number
      title: Localized
      faqs: CookiePolicyFaq[]
    }
  }
  seo: SeoData
}

export interface CookiePolicyPageApiResponse {
  success: boolean
  data: CookiePolicyPageApiData
}
