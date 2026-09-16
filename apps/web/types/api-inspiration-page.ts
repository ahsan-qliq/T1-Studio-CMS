import type { ApiButton, ApiImage, Localized } from "./api-home-page"
import type { SeoData } from "./api-spaces-page"

export interface InspirationSection {
  isVisible: boolean
  order: number
  eyebrow?: Localized
  heading?: Localized
  description?: Localized
  backgroundImage?: ApiImage
  mobileImage?: ApiImage
  primaryButton?: ApiButton
  button?: ApiButton
  overlayOpacity?: number
  autoplay?: boolean
  showNavigation?: boolean
  [key: string]: unknown
}

export interface InspirationPageApiData {
  _id?: string
  pageName: string
  slug: string
  status: "draft" | "published"
  sections: {
    hero: InspirationSection
    rooms: InspirationSection
    showcase: InspirationSection
    materials: InspirationSection
    inspirationCTA: InspirationSection
    designTips: InspirationSection
    followJourney: InspirationSection
  }
  seo: SeoData
}
