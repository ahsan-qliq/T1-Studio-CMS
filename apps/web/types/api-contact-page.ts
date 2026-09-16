import type { ApiButton, ApiImage, Localized } from "./api-home-page"
import type { SeoData } from "./api-spaces-page"

export interface ContactSection {
  isVisible: boolean
  order: number
  eyebrow?: Localized
  heading?: Localized
  description?: Localized
  image?: ApiImage
  backgroundImage?: ApiImage
  mobileImage?: ApiImage
  primaryButton?: ApiButton
  overlayOpacity?: number
  [key: string]: unknown
}

export interface ContactPageApiData {
  _id?: string
  pageName: string
  slug: string
  status: "draft" | "published"
  sections: {
    hero: ContactSection
    contactInfo: ContactSection
    contactForm: ContactSection
    location: ContactSection
    faq: ContactSection
  }
  seo: SeoData
}
