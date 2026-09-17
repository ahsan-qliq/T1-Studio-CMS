import type { ApiButton, ApiImage, Localized } from "./api-home-page"
import type { SeoData } from "./api-spaces-page"

export interface WhyT1PageApiData {
  _id?: string
  pageName: string
  slug: string
  status: "draft" | "published"
  sections: {
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
    comparison: {
      isVisible: boolean
      order: number
      eyebrow: Localized
      heading: Localized
      description: Localized
      columns: {
        _id?: string
        title: Localized
        highlighted: boolean
        items: {
          _id?: string
          label: Localized
          description: Localized
          available: boolean
        }[]
      }[]
    }
    journey: {
      isVisible: boolean
      order: number
      eyebrow: Localized
      heading: Localized
      description: Localized
      steps: {
        _id?: string
        icon: string
        title: Localized
        subtitle: Localized
        description: Localized
        advantageTitle: Localized
        advantageDescription: Localized
        highlight: Localized
        isVisible: boolean
      }[]
    }
    stats: {
      isVisible: boolean
      order: number
      eyebrow: Localized
      heading: Localized
      stats: {
        _id?: string
        value: string
        label: Localized
        description: Localized
        isVisible: boolean
      }[]
    }
    benefits: {
      isVisible: boolean
      order: number
      eyebrow: Localized
      heading: Localized
      description: Localized
      items: {
        _id?: string
        icon: string
        title: Localized
        description: Localized
        href: string
        isVisible: boolean
      }[]
    }
    designerPicks: {
      isVisible: boolean
      order: number
      eyebrow: Localized
      heading: Localized
      description: Localized
      items: {
        _id?: string
        title: Localized
        subtitle: Localized
        description: Localized
        image: ApiImage
        category: Localized
        href: string
        isVisible: boolean
      }[]
      button: ApiButton
      autoplay: boolean
      showNavigation: boolean
    }
    brands: {
      isVisible: boolean
      order: number
      eyebrow: Localized
      heading: Localized
      description: Localized
      brands: {
        _id?: string
        name: string
        logo: ApiImage
        href: string
        openInNewTab: boolean
        isVisible: boolean
      }[]
    }
    partnership: {
      isVisible: boolean
      order: number
      eyebrow: Localized
      heading: Localized
      description: Localized
      image: ApiImage
      steps: {
        _id?: string
        icon: string
        title: Localized
        description: Localized
      }[]
      button: ApiButton
    }
    designTips: {
      isVisible: boolean
      order: number
      eyebrow: Localized
      heading: Localized
      description: Localized
      articles: {
        _id?: string
        slug: string
        title: Localized
        category: Localized
        readTime: Localized
        description: Localized
        image: ApiImage
        href: string
        isVisible: boolean
      }[]
      button: ApiButton
    }
    faq: {
      isVisible: boolean
      order: number
      eyebrow: Localized
      heading: Localized
      description: Localized
      faqs: {
        _id?: string
        question: Localized
        answer: Localized
        isVisible: boolean
      }[]
    }
  }
  seo: SeoData
}

export interface WhyT1PageApiResponse {
  success: boolean
  data: WhyT1PageApiData
}
