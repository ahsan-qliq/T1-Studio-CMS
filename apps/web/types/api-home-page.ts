// Types that mirror the /api/home-page response shape exactly, field for
// field. Unlike the old per-section CMS types, there is no translation
// layer here — what the form edits is exactly what gets sent back to the API.

export interface Localized {
  en: string
  ar: string
}

export interface ApiImage {
  url: string
  key: string
  alt: Localized
}

export interface ApiButton {
  label: Localized
  href: string
  openInNewTab: boolean
}

export interface StatItem {
  _id: string
  value: string
  label: Localized
  isVisible: boolean
}

export interface ServiceItem {
  _id: string
  icon: string
  title: Localized
  description: Localized
  href: string
  isVisible: boolean
}

export interface SpaceItem {
  _id: string
  title: Localized
  image: ApiImage
  href: string
  isVisible: boolean
}

export type ProjectPosition =
  | "top-left"
  | "top-right"
  | "middle-left"
  | "middle-right"
  | "bottom-left"
  | "bottom-right"

export interface ProjectItem {
  _id: string
  title: Localized
  description: Localized
  location: Localized
  image: ApiImage
  href: string
  position: ProjectPosition
  isVisible: boolean
}

export interface JourneyStepItem {
  _id: string
  icon: string
  title: Localized
  subtitle: Localized
  description: Localized
  advantageTitle: Localized
  advantageDescription: Localized
  highlight: Localized
  isVisible: boolean
}

export interface WhyChooseItem {
  label: Localized
  available: boolean
}

export interface WhyChooseColumnApi {
  _id: string
  title: Localized
  highlighted: boolean
  items: WhyChooseItem[]
}

export interface TestimonialItem {
  _id?: string
  name?: Localized
  role?: Localized
  quote?: Localized
  image?: ApiImage
  isVisible?: boolean
}

export interface ConsultationTabItem {
  _id: string
  label: Localized
  description: Localized
  value: string
}

export interface ConsultationFieldItem {
  _id?: string
  label?: Localized
  type?: string
  placeholder?: Localized
}

export interface PartnershipStepItem {
  _id: string
  icon: string
  title: Localized
  description: Localized
}

export interface AwardItem {
  _id: string
  name: Localized
  caption: Localized
  logo: ApiImage
  href: string
  openInNewTab: boolean
}

export interface ArticleItem {
  _id?: string
  title?: Localized
  image?: ApiImage
  category?: Localized
  readTime?: string
  href?: string
  isVisible?: boolean
}

export interface FaqItemApi {
  _id: string
  question: Localized
  answer: Localized
  isVisible: boolean
}

export interface LocationLinkItemApi {
  _id: string
  label: Localized
  href: string
  openInNewTab: boolean
}

export interface LocationColumnApi {
  _id: string
  title: Localized
  description: Localized
  links: LocationLinkItemApi[]
}

// ─── Sections ────────────────────────────────────────────────────────────

export interface HeroSection {
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

export interface StatsSection {
  isVisible: boolean
  order: number
  statistics: StatItem[]
}

export interface ServicesSection {
  isVisible: boolean
  order: number
  eyebrow: Localized
  heading: Localized
  description: Localized
  services: ServiceItem[]
  button: ApiButton
}

export interface FeaturedSpacesSection {
  isVisible: boolean
  order: number
  eyebrow: Localized
  heading: Localized
  description: Localized
  spaces: SpaceItem[]
  button: ApiButton
}

export interface SignatureProjectsSection {
  isVisible: boolean
  order: number
  eyebrow: Localized
  heading: Localized
  description: Localized
  projects: ProjectItem[]
  button: ApiButton
}

export interface JourneySection {
  isVisible: boolean
  order: number
  eyebrow: Localized
  heading: Localized
  description: Localized
  steps: JourneyStepItem[]
}

export interface WhyChooseT1Section {
  isVisible: boolean
  order: number
  eyebrow: Localized
  heading: Localized
  description: Localized
  columns: WhyChooseColumnApi[]
}

export interface TestimonialsSection {
  isVisible: boolean
  order: number
  eyebrow: Localized
  heading: Localized
  description: Localized
  testimonials: TestimonialItem[]
}

export interface ConsultationCtaSection {
  isVisible: boolean
  order: number
  eyebrow: Localized
  heading: Localized
  description: Localized
  image: ApiImage
  tabs: ConsultationTabItem[]
  fields: ConsultationFieldItem[]
  submitButtonLabel: Localized
}

export interface PartnershipSection {
  isVisible: boolean
  order: number
  eyebrow: Localized
  heading: Localized
  description: Localized
  image: ApiImage
  steps: PartnershipStepItem[]
  button: ApiButton
}

export interface AwardsRecognitionSection {
  isVisible: boolean
  order: number
  eyebrow: Localized
  heading: Localized
  description: Localized
  awards: AwardItem[]
}

export interface DesignTipsSection {
  isVisible: boolean
  order: number
  eyebrow: Localized
  heading: Localized
  description: Localized
  articles: ArticleItem[]
  button: ApiButton
}

export interface FaqSection {
  isVisible: boolean
  order: number
  eyebrow: Localized
  heading: Localized
  description: Localized
  faqs: FaqItemApi[]
}

export interface LocationLinksSection {
  isVisible: boolean
  order: number
  eyebrow: Localized
  heading: Localized
  description: Localized
  columns: LocationColumnApi[]
}

export interface HomePageSections {
  hero: HeroSection
  stats: StatsSection
  services: ServicesSection
  featuredSpaces: FeaturedSpacesSection
  signatureProjects: SignatureProjectsSection
  journey: JourneySection
  whyChooseT1: WhyChooseT1Section
  testimonials: TestimonialsSection
  consultationCTA: ConsultationCtaSection
  partnership: PartnershipSection
  awardsRecognition: AwardsRecognitionSection
  designTips: DesignTipsSection
  faq: FaqSection
  locationLinks: LocationLinksSection
}

export interface HomePageApiData {
  _id: string
  pageName: string
  slug: string
  status: string
  publishedAt: string | null
  createdAt: string
  updatedAt: string
  __v: number
  sections: HomePageSections
}

export interface HomePageApiResponse {
  success: boolean
  data: HomePageApiData
}
