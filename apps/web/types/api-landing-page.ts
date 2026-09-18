import type { ApiImage } from "./api-home-page"

export type Localized = {
  en: string
  ar: string
}

export type LandingButton = {
  label: Localized
  href: string
  openInNewTab: boolean
}

export type LandingFormField = {
  name: string
  type: string
  label: Localized
  placeholder?: Localized
  required: boolean
}

export type LandingHeroForm = {
  heading: Localized
  description: Localized
  fields: LandingFormField[]
  submitButtonLabel: Localized
  successMessage: Localized
}

export type LandingHero = {
  eyebrow: Localized
  heading: Localized
  description: Localized
  backgroundImage: ApiImage
  overlayOpacity: number
  form: LandingHeroForm
}

export type LandingStat = {
  value: string
  label: Localized
  description: Localized
  isVisible: boolean
}

export type LandingStats = {
  items: LandingStat[]
}

export type LandingIntro = {
  eyebrow: Localized
  heading: Localized
  description: Localized
  secondaryDescription: Localized
  image: ApiImage
  imagePosition: string
  button: LandingButton
}

export type LandingProject = {
  projectSlug: string
  title: Localized
  location: Localized
  description: Localized
  image: ApiImage
  href: string
  position: string
}

export type LandingProjects = {
  items: LandingProject[]
}

export type LandingProcessItem = {
  number: string
  icon: string
  title: Localized
  description: Localized
}

export type LandingProcess = {
  items: LandingProcessItem[]
}

export type LandingBenefit = {
  icon: string
  title: Localized
  description: Localized
}

export type LandingBenefits = {
  items: LandingBenefit[]
}

export type LandingTestimonial = {
  clientName: Localized
  designation: Localized
  testimonial: Localized
  image: ApiImage
}

export type LandingTestimonials = {
  items: LandingTestimonial[]
  autoplay: boolean
  showNavigation: boolean
}

export type LandingFaq = {
  question: Localized
  answer: Localized
  isVisible: boolean
}

export type LandingFaqSection = {
  items: LandingFaq[]
}

export type LandingConsultation = {
  eyebrow: Localized
  heading: Localized
  description: Localized
  formFields: LandingFormField[]
  submitButtonLabel: Localized
  successMessage: Localized
}

export type LandingSections = {
  hero: LandingHero
  stats: LandingStats
  intro: LandingIntro
  projects: LandingProjects
  process: LandingProcess
  benefits: LandingBenefits
  testimonials: LandingTestimonials
  faq: LandingFaqSection
  consultation: LandingConsultation
}

export type LandingSeo = {
  metaTitle: Localized
  metaDescription: Localized
  keywords: {
    en: string[]
    ar: string[]
  }
  canonicalUrl: string
  ogImage: ApiImage
  noIndex: boolean
  noFollow: boolean
}

export type LandingPageApiData = {
  _id?: string
  slug: string
  pageName: string
  status: "draft" | "published"
  sections: LandingSections
  seo: LandingSeo
}
