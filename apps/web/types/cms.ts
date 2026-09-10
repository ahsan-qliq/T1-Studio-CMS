export type Language = "en" | "ar"

export interface HeroButton {
  label: string
  link: string
}

export interface HeroContent {
  eyebrowEn: string
  eyebrowAr: string
  mainHeadingEn: string
  mainHeadingAr: string
  descriptionEn: string
  descriptionAr: string
  primaryButton: HeroButton
  secondaryButton: HeroButton
  backgroundType: "image" | "video"
  useSameMediaForBothLanguages: boolean
  desktopImageUrl?: string
  mobileImageUrl?: string
  imageAltText: string
  visible: boolean
}

export type Viewport = "desktop" | "tablet" | "mobile"

export type SectionType =
  | "Manual"
  | "Linked: Services"
  | "Linked: Spaces"
  | "Linked: Projects"
  | "Linked: Testimonials"
  | "Linked: Blog"
  | "Linked: FAQ"
  | "Global"
  | "Collection"

export type PageStatus = "Published" | "Draft" | "Scheduled"

export type SectionTab = "content" | "data-source" | "display-settings"

export interface LocalizedContent {
  en: string
  ar: string
}

export interface SectionStatus {
  en: boolean
  ar: boolean
}

export interface CmsSection {
  id: string
  number: string
  name: LocalizedContent
  type: SectionType
  status: SectionStatus
  visible: boolean
  thumbnail?: string
}

export interface SelectedProject {
  id: string
  title: string
  location: string
  imageUrl?: string
}

export type ServiceIconKey = "Pencil" | "Hammer" | "Gem" | "Cog" | "Star" | "Home" | "Sparkles"

export interface ServiceCard {
  id: string
  icon: ServiceIconKey
  titleEn: string
  titleAr: string
  subtitleEn: string
  subtitleAr: string
  visible: boolean
}

export interface ServicesContent {
  eyebrowEn: string
  eyebrowAr: string
  headingEn: string
  headingAr: string
  descriptionEn: string
  descriptionAr: string
  cards: ServiceCard[]
}

export interface StatisticItem {
  id: string
  value: string
  labelEn: string
  labelAr: string
}

export interface StatsContent {
  sectionTitleEn: string
  sectionTitleAr: string
  statistics: StatisticItem[]
}

export interface SignatureProjectsContent {
  headingEn: string
  headingAr: string
  buttonLabelEn: string
  buttonLabelAr: string
  selectedProjects: SelectedProject[]
  sourceType: string
  displayMode: "manual" | "latest"
  itemsToDisplay: number
  showLocation: boolean
  showCta: boolean
  sameLayoutForAr: boolean
}

export interface SpaceCard {
  id: string
  imageUrl?: string
  titleEn: string
  titleAr: string
  visible: boolean
}

export interface FeaturedSpacesContent {
  sectionTitleEn: string
  sectionTitleAr: string
  buttonLabelEn: string
  buttonLabelAr: string
  buttonLink: string
  cards: SpaceCard[]
}

export interface CmsPage {
  slug: string
  title: LocalizedContent
  status: PageStatus
  sections: CmsSection[]
  heroContent: HeroContent
  statsContent: StatsContent
  servicesContent: ServicesContent
  featuredSpacesContent: FeaturedSpacesContent
  signatureProjectsContent: SignatureProjectsContent
}

export interface NavPage {
  slug: string
  label: string
  active?: boolean
}

export interface NavSection {
  label: string
  icon?: string
  href?: string
  children?: NavPage[]
  active?: boolean
}

export interface CmsUser {
  name: string
  role: string
  avatarInitials: string
}

export interface SectionFilterCounts {
  all: number
  manual: number
  linked: number
  global: number
}
