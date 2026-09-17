import type { ApiButton, ApiImage, Localized } from "./api-home-page"

import type { SeoData } from "./api-spaces-page"

export interface InspirationRoomItem {
  _id?: string
  key: string
  title: Localized
  image: ApiImage
  href: string
  isVisible?: boolean
}

export interface InspirationShowcaseItem {
  _id?: string
  title: Localized
  subtitle: Localized
  description: Localized
  image: ApiImage
  href: string
  isVisible?: boolean
}

export interface InspirationMaterialItem {
  _id?: string
  title: Localized
  subtitle: Localized
  description: Localized
  image: ApiImage
  href: string
  isVisible?: boolean
}

export interface InspirationDesignTipItem {
  _id?: string
  slug: string
  title: Localized
  category: Localized
  description: Localized
  readTime: Localized
  image: ApiImage
  isVisible?: boolean
}

export interface InspirationJourneyItem {
  _id?: string
  title: Localized
  location: Localized
  image: ApiImage
  href: string
  isVisible?: boolean
}

export interface InspirationHero {
  isVisible: boolean
  order: number
  eyebrow: Localized
  heading: Localized
  description: Localized
  backgroundImage: ApiImage
  overlayOpacity: number
  primaryButton: ApiButton
}

export interface InspirationRooms {
  isVisible: boolean
  order: number
  items: InspirationRoomItem[]
  autoplay: boolean
  showNavigation: boolean
}

export interface InspirationShowcase {
  isVisible: boolean
  order: number
  items: InspirationShowcaseItem[]
}

export interface InspirationMaterials {
  isVisible: boolean
  order: number
  items: InspirationMaterialItem[]
  autoplay: boolean
  showNavigation: boolean
}

export interface InspirationCTA {
  isVisible: boolean
  order: number
  eyebrow: Localized
  heading: Localized
  description: Localized
  backgroundImage: ApiImage
  overlayOpacity: number
  button: ApiButton
}

export interface InspirationDesignTips {
  isVisible: boolean
  order: number
  items: InspirationDesignTipItem[]
}

export interface InspirationFollowJourney {
  isVisible: boolean
  order: number
  items: InspirationJourneyItem[]
  autoplay: boolean
  showNavigation: boolean
}

export interface InspirationPageApiData {
  _id?: string

  pageName: string

  slug: string

  status: "draft" | "published"

  sections: {
    hero: InspirationHero
    rooms: InspirationRooms
    showcase: InspirationShowcase
    materials: InspirationMaterials
    inspirationCTA: InspirationCTA
    designTips: InspirationDesignTips
    followJourney: InspirationFollowJourney
  }

  seo: SeoData
}
