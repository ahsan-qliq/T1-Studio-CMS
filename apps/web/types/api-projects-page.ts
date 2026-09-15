// Types that mirror the /api/project-page response shape exactly, field for
// field — matching the Projects page Postman payload.

import type { ApiButton, ApiImage, Localized } from "./api-home-page"
import type { SeoData } from "./api-spaces-page"

export type ProjectPosition =
  | "top-left"
  | "top-right"
  | "middle-left"
  | "middle-right"
  | "bottom-left"
  | "bottom-right"

export interface ProjectsListItem {
  _id?: string
  slug: string
  title: Localized
  location: Localized
  category: string
  shortDescription: Localized
  image: ApiImage
  href: string
  featured: boolean
  position: ProjectPosition
  isVisible: boolean
}

export interface ProjectsTestimonialItem {
  _id?: string
  clientName: Localized
  designation: Localized
  testimonial: Localized
  image: ApiImage
  videoUrl: string
  isVisible: boolean
}

export interface ProjectsBeforeAfterItem {
  _id?: string
  title: Localized
  description: Localized
  beforeImage: ApiImage
  afterImage: ApiImage
  projectHref: string
  isVisible: boolean
}

export interface ProjectsPartnershipStepItem {
  _id?: string
  icon: string
  title: Localized
  description: Localized
}

export interface ProjectsFaqItem {
  _id?: string
  question: Localized
  answer: Localized
  isVisible: boolean
}

// ─── Sections ────────────────────────────────────────────────────────────

export interface ProjectsHeroSection {
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

export interface ProjectsListSection {
  isVisible: boolean
  order: number
  eyebrow: Localized
  heading: Localized
  description: Localized
  filters: string[]
  projects: ProjectsListItem[]
  loadMoreButton: ApiButton
  enableFilters: boolean
  enableLoadMore: boolean
}

export interface ProjectsTestimonialsSection {
  isVisible: boolean
  order: number
  eyebrow: Localized
  heading: Localized
  description: Localized
  testimonials: ProjectsTestimonialItem[]
  autoplay: boolean
}

export interface ProjectsBeforeAfterSection {
  isVisible: boolean
  order: number
  eyebrow: Localized
  heading: Localized
  description: Localized
  items: ProjectsBeforeAfterItem[]
  autoplay: boolean
  showNavigation: boolean
}

export interface ProjectsPartnershipSection {
  isVisible: boolean
  order: number
  eyebrow: Localized
  heading: Localized
  description: Localized
  image: ApiImage
  steps: ProjectsPartnershipStepItem[]
  button: ApiButton
}

export interface ProjectsFaqSection {
  isVisible: boolean
  order: number
  eyebrow: Localized
  heading: Localized
  description: Localized
  faqs: ProjectsFaqItem[]
}

export interface ProjectsSections {
  hero: ProjectsHeroSection
  projects: ProjectsListSection
  testimonials: ProjectsTestimonialsSection
  beforeAfter: ProjectsBeforeAfterSection
  partnership: ProjectsPartnershipSection
  faq: ProjectsFaqSection
}

export interface ProjectsPageApiData {
  _id?: string
  pageName: string
  slug: string
  status: string
  sections: ProjectsSections
  seo: SeoData
}

export interface ProjectsPageApiResponse {
  success: boolean
  data: ProjectsPageApiData
}
