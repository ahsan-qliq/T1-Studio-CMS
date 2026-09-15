import type { ApiButton, ApiImage, Localized } from "./api-home-page"
import type {
  FaqItemApi,
  JourneyStepItem,
  ProjectItem,
  SeoData,
} from "./api-spaces-page"

export interface FeatureItem {
  _id?: string
  icon: string
  title: Localized
  description: Localized
  isVisible: boolean
}

export interface StyleItem {
  _id?: string
  title: Localized
  description: Localized
  image: ApiImage
  href: string
  isVisible: boolean
}

export interface DetailGalleryItem {
  _id?: string
  image: ApiImage
  title: Localized
  caption: Localized
}

export interface MaterialItem {
  _id?: string
  title: Localized
  description: Localized
  image: ApiImage
  isVisible: boolean
}

export interface BrandItem {
  _id?: string
  name: string
  logo: ApiImage
  href: string
  openInNewTab: boolean
}

export interface RelatedSpaceItem {
  _id?: string
  spaceType: string
  title: Localized
  image: ApiImage
  href: string
  isVisible: boolean
}

export interface SpaceDetailSections {
  hero: {
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
  intro: {
    isVisible: boolean
    order: number
    eyebrow: Localized
    heading: Localized
    description: Localized
    image: ApiImage
    button: ApiButton
    imagePosition: "left" | "right"
  }
  features: {
    isVisible: boolean
    order: number
    eyebrow: Localized
    heading: Localized
    description: Localized
    image: ApiImage
    items: FeatureItem[]
  }
  styles: {
    isVisible: boolean
    order: number
    eyebrow: Localized
    heading: Localized
    description: Localized
    items: StyleItem[]
    button: ApiButton
    autoplay: boolean
  }
  gallery: {
    isVisible: boolean
    order: number
    eyebrow: Localized
    heading: Localized
    description: Localized
    images: DetailGalleryItem[]
    autoplay: boolean
    showNavigation: boolean
  }
  materials: {
    isVisible: boolean
    order: number
    eyebrow: Localized
    heading: Localized
    description: Localized
    materials: MaterialItem[]
  }
  brands: {
    isVisible: boolean
    order: number
    heading: Localized
    brands: BrandItem[]
  }
  relatedProjects: {
    isVisible: boolean
    order: number
    eyebrow: Localized
    heading: Localized
    description: Localized
    projects: ProjectItem[]
    button: ApiButton
  }
  journey: {
    isVisible: boolean
    order: number
    eyebrow: Localized
    heading: Localized
    description: Localized
    steps: JourneyStepItem[]
  }
  faq: {
    isVisible: boolean
    order: number
    eyebrow: Localized
    heading: Localized
    description: Localized
    faqs: FaqItemApi[]
  }
  relatedSpaces: {
    isVisible: boolean
    order: number
    heading: Localized
    spaces: RelatedSpaceItem[]
    button: ApiButton
  }
  consultation: {
    isVisible: boolean
    order: number
    eyebrow: Localized
    heading: Localized
    description: Localized
    image: ApiImage
    button: ApiButton
  }
}

export interface SpaceDetailPageApiData {
  _id?: string
  pageName: string
  spaceType: string
  slug: string
  status: string
  sections: SpaceDetailSections
  seo: SeoData
}

export interface SpaceDetailPageApiResponse {
  success: boolean
  data: SpaceDetailPageApiData
}
