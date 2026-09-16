import type { ApiButton, ApiImage, Localized } from "./api-home-page"
import type { SeoData } from "./api-spaces-page"

export interface TradeSection {
  isVisible: boolean
  order: number
  eyebrow?: Localized
  heading: Localized
  description?: Localized
  image?: ApiImage
  button?: ApiButton
  backgroundImage?: ApiImage
  mobileImage?: ApiImage
  primaryButton?: ApiButton
  secondaryButton?: ApiButton
  overlayOpacity?: number
  [key: string]: unknown
}

export interface TradePageApiData {
  _id?: string
  pageName: string
  slug: string
  status: "draft" | "published"
  sections: {
    hero: TradeSection
    logos: TradeSection
    whoWeWorkWith: TradeSection
    journey: TradeSection
    stats: TradeSection
    projects: TradeSection
    benefits: TradeSection
    partnershipServices: TradeSection
    industryServices: TradeSection
    resources: TradeSection
    supplierCTA: TradeSection
    designTips: TradeSection
    referral: TradeSection
    consultation: TradeSection
    faq: TradeSection
  }
  seo: SeoData
}

export interface TradePageApiResponse {
  success: boolean
  data: TradePageApiData
}
