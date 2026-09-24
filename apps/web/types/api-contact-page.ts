import type { ApiButton, ApiImage, Localized } from "./api-home-page"
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
  mobileImage: ApiImage

  primaryButton: ApiButton

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

  isVisible?: boolean
}

export interface ContactInfoSection {
  isVisible: boolean
  order: number

  eyebrow: Localized
  heading: Localized
  description: Localized

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

  isVisible?: boolean
}

export interface ContactFormFieldOption {
  _id?: string

  value: string

  label: Localized
}

export interface ContactFormField {
  _id?: string

  name: string

  type: string

  label: Localized

  placeholder: Localized

  required: boolean

  options: ContactFormFieldOption[]
}

export interface ContactFormSection {
  isVisible: boolean
  order: number

  eyebrow: Localized

  heading: Localized

  description: Localized

  image: ApiImage

  tabs: ContactFormTab[]

  fields: ContactFormField[]

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

  latitude: number | null

  longitude: number | null

  googleMapsUrl: string

  phone: string

  isVisible?: boolean
}

export interface ContactLocationSection {
  isVisible: boolean
  order: number

  eyebrow: Localized

  heading: Localized

  description: Localized

  locations: ContactMapLocation[]

  mapEmbedUrl: string

  mapZoom: number

  button: ApiButton
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

  eyebrow: Localized

  heading: Localized

  description: Localized

  faqs: ContactFaqItem[]
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
