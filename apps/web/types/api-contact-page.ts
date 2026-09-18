import type { ApiImage, Localized } from "./api-home-page"
import type { SeoData } from "./api-spaces-page"

/* =========================================================
   HERO
========================================================= */

export interface ContactHeroSection {
  isVisible: boolean
  order: number

  eyebrow: Localized
  heading: Localized
  description: Localized

  backgroundImage: ApiImage

  overlayOpacity: number
}

/* =========================================================
   CONTACT INFO
========================================================= */

export interface ContactInfoItem {
  _id?: string

  type: string

  icon: string

  title: Localized

  value: Localized

  href?: string

  openInNewTab?: boolean

  secondaryValue?: Localized
}

export interface ContactInfoSection {
  isVisible: boolean
  order: number

  items: ContactInfoItem[]
}

/* =========================================================
   CONTACT FORM
========================================================= */

export interface ContactFormTab {
  _id?: string

  label: Localized

  description: Localized

  value: string
}

export interface ContactFormField {
  _id?: string

  name: string

  type: string

  label: Localized

  placeholder: Localized

  required: boolean
}

export interface ContactFormSection {
  isVisible: boolean
  order: number

  eyebrow: Localized

  heading: Localized

  description: Localized

  image: ApiImage

  tabs: ContactFormTab[]

  formFields: ContactFormField[]

  submitButtonLabel: Localized

  successMessage: Localized

  errorMessage: Localized
}

/* =========================================================
   LOCATION
========================================================= */

export interface ContactMapLocation {
  _id?: string

  name: Localized

  address: Localized

  latitude: number

  longitude: number

  googleMapsUrl: string

  phone: string
}

export interface ContactLocationSection {
  isVisible: boolean
  order: number

  mapLocations: ContactMapLocation[]

  mapEmbedUrl: string

  mapZoom: {
    min: number
    max: number
  }
}

/* =========================================================
   FAQ
========================================================= */

export interface ContactFaqItem {
  _id?: string

  question: Localized

  answer: Localized

  isVisible: boolean
}

export interface ContactFaqSection {
  isVisible: boolean
  order: number

  items: ContactFaqItem[]
}

/* =========================================================
   PAGE
========================================================= */

export interface ContactPageApiData {
  _id?: string

  pageName: string

  slug: string

  status: "draft" | "published"

  sections: {
    hero: ContactHeroSection

    contactInfo: ContactInfoSection

    contactForm: ContactFormSection

    location: ContactLocationSection

    faq: ContactFaqSection
  }

  seo: SeoData
}

export interface ContactPageApiResponse {
  success: boolean

  data: ContactPageApiData
}
