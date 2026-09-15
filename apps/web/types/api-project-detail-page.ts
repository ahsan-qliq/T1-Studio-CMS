// Types that mirror the /api/project-detail-page response shape exactly,
// field for field — matching the Project Details page Postman payload.

import type { ApiButton, ApiImage, Localized } from "./api-home-page"
import type { SeoData } from "./api-spaces-page"
import type { ProjectPosition } from "./api-projects-page"

export interface ProjectStatItem {
  _id?: string
  value: string
  label: Localized
  icon: string
}

export interface ProjectOverviewSection {
  isVisible: boolean
  order: number
  eyebrow: Localized
  heading: Localized
  description: Localized
  image: ApiImage
  imagePosition: "left" | "right"
}

export interface ProjectBeforeAfterItem {
  _id?: string
  title: Localized
  description: Localized
  beforeImage: ApiImage
  afterImage: ApiImage
  isVisible: boolean
}

export interface ProjectGalleryImageItem {
  _id?: string
  image: ApiImage
  title: Localized
  caption: Localized
  isVisible: boolean
}

export interface ProjectMaterialItem {
  _id?: string
  title: Localized
  subtitle: Localized
  description: Localized
  image: ApiImage
  isVisible: boolean
}

export interface ProjectInfoDetailItem {
  _id?: string
  icon: string
  label: Localized
  value: Localized
  isVisible: boolean
}

export interface ProjectTestimonialItem {
  _id?: string
  clientName: Localized
  designation: Localized
  quote: Localized
  image: ApiImage
  videoUrl: string
  isVisible: boolean
}

export interface ProjectRelatedProjectItem {
  _id?: string
  projectSlug: string
  title: Localized
  location: Localized
  category: Localized
  image: ApiImage
  href: string
  position: ProjectPosition
  isVisible: boolean
}

export interface ConsultationFieldOption {
  value: string
  label: Localized
}

export interface ConsultationFormField {
  _id?: string
  name: string
  label: Localized
  placeholder: Localized
  type: "text" | "email" | "phone" | "select"
  required: boolean
  options: ConsultationFieldOption[]
}

// ─── Sections ────────────────────────────────────────────────────────────

export interface ProjectDetailHeroSection {
  isVisible: boolean
  order: number
  eyebrow: Localized
  heading: Localized
  description: Localized
  location: Localized
  backgroundImage: ApiImage
  mobileImage: ApiImage
  stats: ProjectStatItem[]
  overlayOpacity: number
}

export interface ProjectDetailBeforeAfterSection {
  isVisible: boolean
  order: number
  eyebrow: Localized
  heading: Localized
  description: Localized
  items: ProjectBeforeAfterItem[]
  showNavigation: boolean
  autoplay: boolean
}

export interface ProjectDetailGallerySection {
  isVisible: boolean
  order: number
  eyebrow: Localized
  heading: Localized
  description: Localized
  images: ProjectGalleryImageItem[]
  autoplay: boolean
  showNavigation: boolean
}

export interface ProjectDetailMaterialsSection {
  isVisible: boolean
  order: number
  eyebrow: Localized
  heading: Localized
  description: Localized
  materials: ProjectMaterialItem[]
}

export interface ProjectInfoSection {
  isVisible: boolean
  order: number
  eyebrow: Localized
  heading: Localized
  description: Localized
  details: ProjectInfoDetailItem[]
  button: ApiButton
}

export interface ProjectDetailTestimonialSection {
  isVisible: boolean
  order: number
  eyebrow: Localized
  heading: Localized
  description: Localized
  testimonials: ProjectTestimonialItem[]
  autoplay: boolean
}

export interface ProjectDetailRelatedProjectsSection {
  isVisible: boolean
  order: number
  eyebrow: Localized
  heading: Localized
  description: Localized
  projects: ProjectRelatedProjectItem[]
  button: ApiButton
}

export interface ProjectDetailConsultationSection {
  isVisible: boolean
  order: number
  eyebrow: Localized
  heading: Localized
  description: Localized
  image: ApiImage
  fields: ConsultationFormField[]
  submitButtonLabel: Localized
}

export interface ProjectDetailSections {
  hero: ProjectDetailHeroSection
  overview: ProjectOverviewSection
  beforeAfter: ProjectDetailBeforeAfterSection
  gallery: ProjectDetailGallerySection
  materials: ProjectDetailMaterialsSection
  projectInfo: ProjectInfoSection
  testimonial: ProjectDetailTestimonialSection
  relatedProjects: ProjectDetailRelatedProjectsSection
  consultation: ProjectDetailConsultationSection
}

export interface ProjectDetailPageApiData {
  _id?: string
  pageName: string
  projectName: Localized
  slug: string
  projectCategory: string
  status: string
  sections: ProjectDetailSections
  seo: SeoData
}

export interface ProjectDetailPageApiResponse {
  success: boolean
  data: ProjectDetailPageApiData
}
