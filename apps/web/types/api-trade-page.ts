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

export interface TradeJourneyStep {
  _id?: string
  number: string
  icon: string
  title: Localized
  subtitle: Localized
  description: Localized
  highlight: Localized
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
  category: Localized
  description: Localized
  image: ApiImage
  href: string
  position: string
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

export interface TradeDesignTipItem {
  _id?: string
  slug: string
  title: Localized
  category: Localized
  readTime: Localized
  description: Localized
  image: ApiImage
  href: string
  isVisible: boolean
}

export interface TradeReferralStep {
  _id?: string
  icon: string
  title: Localized
  description: Localized
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

interface SectionHead {
  isVisible: boolean
  eyebrow: Localized
  heading: Localized
  description: Localized
}

export interface TradePageSections {
  hero: SectionHead & {
    backgroundImage: ApiImage
    mobileImage: ApiImage
    overlayOpacity: number
    primaryButton: ApiButton
    secondaryButton: ApiButton
  }
  logos: {
    isVisible: boolean
    heading: Localized
    description: Localized
    logos: TradeLogoItem[]
  }
  whoWeWorkWith: SectionHead & {
    items: TradeWhoWeWorkWithItem[]
    button: ApiButton
  }
  journey: SectionHead & {
    steps: TradeJourneyStep[]
  }
  stats: {
    isVisible: boolean
    heading: Localized
    stats: TradeStatsItem[]
  }
  projects: SectionHead & {
    projects: TradeProjectItem[]
    button: ApiButton
  }
  benefits: SectionHead & {
    items: TradeBenefitItem[]
  }
  partnershipServices: SectionHead & {
    services: TradePartnershipServiceItem[]
  }
  industryServices: SectionHead & {
    items: TradeIndustryServiceItem[]
  }
  resources: SectionHead & {
    resources: TradeResourceItem[]
    button: ApiButton
  }
  supplierCTA: SectionHead & {
    image: ApiImage
    benefits: Localized[]
    button: ApiButton
  }
  designTips: SectionHead & {
    articles: TradeDesignTipItem[]
    button: ApiButton
  }
  referral: SectionHead & {
    image: ApiImage
    steps: TradeReferralStep[]
    button: ApiButton
  }
  consultation: SectionHead & {
    image: ApiImage
    fields: TradeFormField[]
    submitButtonLabel: Localized
  }
  faq: SectionHead & {
    faqs: TradeFaqItem[]
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
