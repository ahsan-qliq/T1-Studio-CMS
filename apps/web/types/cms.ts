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

export type GridPosition =
  | "Top Left (1,1)"
  | "Top Right (1,2)"
  | "Middle Left (2,1)"
  | "Middle Right (2,2)"
  | "Bottom Left (3,1)"
  | "Bottom Right (3,2)"

export interface SelectedProject {
  id: string
  title: string
  location: string
  imageUrl?: string
  position?: GridPosition
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
  buttonLink: string
  selectedProjects: SelectedProject[]
  sourceType: string
  displayMode: "manual" | "latest"
  itemsToDisplay: number
  showLocation: boolean
  showCta: boolean
  sameLayoutForAr: boolean
}

export type JourneyIconKey =
  | "Globe"
  | "Lightbulb"
  | "Building2"
  | "Pencil"
  | "Cog"
  | "CheckCircle"
  | "Star"
  | "Hammer"
  | "Package"

export interface JourneyStep {
  id: string
  number: string
  icon: JourneyIconKey
  titleEn: string
  titleAr: string
  subtitleEn: string
  subtitleAr: string
  descriptionEn: string
  descriptionAr: string
  noteEn?: string
  noteAr?: string
  advantageTitleEn?: string
  advantageTitleAr?: string
  advantageTextEn?: string
  advantageTextAr?: string
}

export interface JourneyContent {
  eyebrowEn: string
  eyebrowAr: string
  mainHeadingEn: string
  mainHeadingAr: string
  steps: JourneyStep[]
}

export interface WhyChooseBullet {
  id: string
  textEn: string
  textAr: string
}

export interface WhyChooseColumn {
  id: string
  number: string
  titleEn: string
  titleAr: string
  highlighted: boolean
  bullets: WhyChooseBullet[]
}

export interface WhyChooseContent {
  eyebrowEn: string
  eyebrowAr: string
  mainHeadingEn: string
  mainHeadingAr: string
  descriptionEn: string
  descriptionAr: string
  columns: WhyChooseColumn[]
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

export interface Testimonial {
  id: string
  number: string
  clientName: string
  clientRole: string
  quoteEn: string
  quoteAr: string
  imageUrl?: string
}

export interface TestimonialsContent {
  sectionTitleEn: string
  sectionTitleAr: string
  testimonials: Testimonial[]
}

export type PartnershipIconKey =
  | "Headset"
  | "CheckCircle"
  | "Lightbulb"
  | "Monitor"
  | "UserCheck"
  | "Users"
  | "Handshake"
  | "Star"
  | "Globe"
  | "Award"
  | "Cog"
  | "Package"

export interface PartnershipStep {
  id: string
  number: string
  icon: PartnershipIconKey
  titleEn: string
  titleAr: string
  descriptionEn: string
  descriptionAr: string
}

export interface PartnershipContent {
  sectionTitleEn: string
  sectionTitleAr: string
  descriptionEn: string
  descriptionAr: string
  steps: PartnershipStep[]
}

export type ConsultationFieldType = "Dropdown" | "Text" | "Textarea" | "Email" | "Phone"

export interface ConsultationFormField {
  id: string
  label: string
  type: ConsultationFieldType
  placeholder: string
}

export interface ConsultationTab {
  id: string
  labelEn: string
  labelAr: string
}

export interface ConsultationCtaContent {
  mainHeadingEn: string
  mainHeadingAr: string
  tabs: ConsultationTab[]
  formFields: ConsultationFormField[]
  imageUrl?: string
}

export interface LocationLink {
  id: string
  label: string
  href: string
}

export interface LocationColumn {
  id: string
  number: string
  titleEn: string
  titleAr: string
  links: LocationLink[]
}

export interface LocationLinksContent {
  sectionTitleEn: string
  sectionTitleAr: string
  descriptionEn?: string
  descriptionAr?: string
  columns: LocationColumn[]
}

export interface FaqItem {
  id: string
  number: string
  questionEn: string
  questionAr: string
  answerEn: string
  answerAr: string
}

export interface FaqContent {
  eyebrowEn: string
  eyebrowAr: string
  sectionTitleEn: string
  sectionTitleAr: string
  faqs: FaqItem[]
}

export interface DesignTipsArticle {
  id: string
  number: string
  imageUrl?: string
  titleEn: string
  titleAr: string
  category: string
  readTime: string
  link?: string
}

export interface DesignTipsContent {
  sectionTitleEn: string
  sectionTitleAr: string
  descriptionEn?: string
  descriptionAr?: string
  articles: DesignTipsArticle[]
}

export interface AwardsLogoItem {
  id: string
  number: string
  imageUrl?: string
  altText: string
  linkUrl?: string
}

export interface AwardsContent {
  sectionTitleEn: string
  sectionTitleAr: string
  subtitleEn?: string
  subtitleAr?: string
  logos: AwardsLogoItem[]
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
  journeyContent: JourneyContent
  whyChooseContent: WhyChooseContent
  testimonialsContent: TestimonialsContent
  consultationCtaContent: ConsultationCtaContent
  partnershipContent: PartnershipContent
  awardsContent: AwardsContent
  designTipsContent: DesignTipsContent
  faqContent: FaqContent
  locationLinksContent: LocationLinksContent
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
