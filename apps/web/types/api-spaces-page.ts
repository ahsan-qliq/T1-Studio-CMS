import type { ApiButton, ApiImage, Localized } from "./api-home-page"

export interface SpacesFeaturedSpaceItem {
  _id?: string
  title: Localized
  subtitle: Localized
  image: ApiImage
  href: string
  isVisible: boolean
}

export interface ShowcaseGalleryItem {
  _id?: string
  image: ApiImage
  title: Localized
  caption: Localized
  href: string
}

export interface WhyChooseItemApi {
  label: Localized
  available: boolean
}

export interface WhyChooseColumnApi {
  _id?: string
  title: Localized
  highlighted: boolean
  items: WhyChooseItemApi[]
}

export type ProjectPosition =
  | "top-left" | "top-right" | "middle-left" | "middle-right" | "bottom-left" | "bottom-right"

export interface ProjectItem {
  _id?: string
  title: Localized
  location: Localized
  description: Localized
  image: ApiImage
  href: string
  position: ProjectPosition
  isVisible: boolean
}

export interface JourneyStepItem {
  _id?: string
  icon: string
  title: Localized
  subtitle: Localized
  description: Localized
  advantageTitle: Localized
  advantageDescription: Localized
  highlight: Localized
  isVisible: boolean
}

export interface PartnershipStepItem {
  _id?: string
  icon: string
  title: Localized
  description: Localized
}

export interface FaqItemApi {
  _id?: string
  question: Localized
  answer: Localized
  isVisible: boolean
}

export interface SeoData {
  metaTitle: Localized
  metaDescription: Localized
  keywords: { en: string[]; ar: string[] }
  canonicalUrl: string
  ogImage: ApiImage
  noIndex: boolean
  noFollow: boolean
}

export interface SpacesSections {
  hero: {
    isVisible: boolean
    order: number
    eyebrow: Localized
    heading: Localized
    description: Localized
    backgroundImage: ApiImage
    mobileImage: ApiImage
    primaryButton: ApiButton
    secondaryButton: ApiButton
    overlayOpacity: number
  }
  intro: {
    isVisible: boolean
    order: number
    eyebrow: Localized
    heading: Localized
    description: Localized
    button: ApiButton
  }
  featuredSpaces: {
    isVisible: boolean
    order: number
    eyebrow: Localized
    heading: Localized
    description: Localized
    spaces: SpacesFeaturedSpaceItem[]
    button: ApiButton
    autoplay: boolean
  }
  showcase: {
    isVisible: boolean
    order: number
    eyebrow: Localized
    heading: Localized
    description: Localized
    gallery: ShowcaseGalleryItem[]
    autoplay: boolean
    showNavigation: boolean
  }
  whyChooseT1: {
    isVisible: boolean
    order: number
    eyebrow: Localized
    heading: Localized
    description: Localized
    columns: WhyChooseColumnApi[]
  }
  signatureProjects: {
    isVisible: boolean
    order: number
    eyebrow: Localized
    heading: Localized
    description: Localized
    projects: ProjectItem[]
    button: ApiButton
  }
  journey: {
    isVisible: boolean
    order: number
    eyebrow: Localized
    heading: Localized
    description: Localized
    steps: JourneyStepItem[]
  }
  partnership: {
    isVisible: boolean
    order: number
    eyebrow: Localized
    heading: Localized
    description: Localized
    image: ApiImage
    steps: PartnershipStepItem[]
    button: ApiButton
  }
  faq: {
    isVisible: boolean
    order: number
    eyebrow: Localized
    heading: Localized
    description: Localized
    faqs: FaqItemApi[]
  }
}

export interface SpacesPageApiData {
  _id?: string
  pageName: string
  slug: string
  status: string
  sections: SpacesSections
  seo: SeoData
}

export interface SpacesPageApiResponse {
  success: boolean
  data: SpacesPageApiData
}
