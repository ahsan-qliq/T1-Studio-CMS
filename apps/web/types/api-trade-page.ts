import type { ApiButton, ApiImage, Localized } from "./api-home-page"
import type { SeoData } from "./api-spaces-page"

export interface TradeLogoItem {
  _id?: string
  name: string
  logo: ApiImage
  href: string
  openInNewTab: boolean
  isVisible: boolean
}

export interface TradeWhoWeWorkWithItem {
  _id?: string
  key: string
  title: Localized
  description: Localized
  image: ApiImage
  href: string
  isVisible: boolean
}

export interface TradeJourneyItem {
  _id?: string
  icon: string
  number: string
  title: Localized
  subtitle: Localized
  description: Localized
  isVisible: boolean
}

export interface TradeStatsItem {
  _id?: string
  value: string
  label: Localized
  description: Localized
  isVisible: boolean
}

export interface TradeProjectItem {
  _id?: string
  projectSlug: string
  title: Localized
  location: Localized
  category: string
  description: Localized
  image: ApiImage
  isVisible: boolean
}

export interface TradeBenefitItem {
  _id?: string
  icon: string
  title: Localized
  description: Localized
  isVisible: boolean
}

export interface TradePartnershipServiceItem {
  _id?: string
  icon: string
  title: Localized
  description: Localized
  href: string
  isVisible: boolean
}

export interface TradeIndustryServiceItem {
  _id?: string
  icon: string
  title: Localized
  description: Localized
  href: string
  isVisible: boolean
}

export interface TradeResourceItem {
  _id?: string
  type: string
  icon: string
  title: Localized
  description: Localized
  fileUrl: string
  buttonLabel: Localized
  isVisible: boolean
}

export interface TradeSupplierBenefit {
  _id?: string
  en: string
  ar: string
}

export interface TradeDesignTipItem {
  _id?: string
  title: Localized
  category: Localized
  description: Localized
  readTime: Localized
  image: ApiImage
  isVisible: boolean
}

export interface TradeReferralItem {
  _id?: string
  icon: string
  title: Localized
  description: Localized
  isVisible: boolean
}

export interface TradeFormField {
  _id?: string
  name: string
  type: string
  label: Localized
  required: boolean
  isVisible: boolean
}

export interface TradeFaqItem {
  _id?: string
  question: Localized
  answer: Localized
  isVisible: boolean
}

export interface TradePageSections {
  hero: {
    isVisible: boolean
    order: number
    eyebrow: Localized
    heading: Localized
    description: Localized
    backgroundImage: ApiImage
    overlayOpacity: number
    primaryButton: ApiButton
  }

  logos: {
    isVisible: boolean
    order: number
    items: TradeLogoItem[]
  }

  whoWeWorkWith: {
    isVisible: boolean
    order: number
    items: TradeWhoWeWorkWithItem[]
  }

  journey: {
    isVisible: boolean
    order: number
    items: TradeJourneyItem[]
  }

  stats: {
    isVisible: boolean
    order: number
    items: TradeStatsItem[]
  }

  projects: {
    isVisible: boolean
    order: number
    items: TradeProjectItem[]
  }

  benefits: {
    isVisible: boolean
    order: number
    items: TradeBenefitItem[]
  }

  partnershipServices: {
    isVisible: boolean
    order: number
    items: TradePartnershipServiceItem[]
  }

  industryServices: {
    isVisible: boolean
    order: number
    items: TradeIndustryServiceItem[]
  }

  resources: {
    isVisible: boolean
    order: number
    items: TradeResourceItem[]
  }

  supplierCTA: {
    isVisible: boolean
    order: number
    eyebrow: Localized
    heading: Localized
    description: Localized
    image: ApiImage
    benefits: Localized[]
    button: ApiButton
  }

  designTips: {
    isVisible: boolean
    order: number
    items: TradeDesignTipItem[]
  }

  referral: {
    isVisible: boolean
    order: number
    items: TradeReferralItem[]
  }

  consultation: {
    isVisible: boolean
    order: number
    eyebrow: Localized
    heading: Localized
    description: Localized
    formFields: TradeFormField[]
    submitButtonLabel: Localized
  }

  faq: {
    isVisible: boolean
    order: number
    items: TradeFaqItem[]
  }
}

export interface TradePageApiData {
  _id?: string
  pageName: string
  slug: string
  status: "draft" | "published"
  sections: TradePageSections
  seo: SeoData
}

export interface TradePageApiResponse {
  success: boolean
  data: TradePageApiData
}