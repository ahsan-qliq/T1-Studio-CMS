import type { ApiButton, ApiImage, Localized } from "./api-home-page"
import type { SeoData } from "./api-spaces-page"

export interface AboutSection {
  isVisible: boolean
  order: number
  eyebrow?: Localized
  heading?: Localized
  description?: Localized
  image?: ApiImage
  backgroundImage?: ApiImage
  mobileImage?: ApiImage
  primaryButton?: ApiButton
  button?: ApiButton
  overlayOpacity?: number
  autoplay?: boolean
  showNavigation?: boolean
  [key: string]: unknown
}

export interface AboutPageApiData {
  _id?: string
  pageName: string
  slug: string
  status: "draft" | "published"
  sections: {
    hero: AboutSection
    story: AboutSection
    journey: AboutSection
    philosophy: AboutSection
    values: AboutSection
    stats: AboutSection
    team: AboutSection
    showcase: AboutSection
    brands: AboutSection
    partnership: AboutSection
    faq: AboutSection
  }
  seo: SeoData
}
