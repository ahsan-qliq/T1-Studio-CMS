import type { Localized } from "./api-home-page"

export interface BlogImage {
  src: string
  alt: Localized
}

export interface BlogButton {
  label: Localized
  href: string
  openInNewTab: boolean
}

export interface BlogCategory {
  key: string
  label: Localized
}

export interface BlogFeaturedArticle {
  blogSlug: string
  title: Localized
  excerpt: Localized
  categoryKey: string
  image: BlogImage
  href: string
  featured: boolean
  isVisible: boolean
}

export interface BlogArticle {
  blogSlug: string
  title: Localized
  excerpt: Localized
  category: Localized
  categoryKey: string
  author: Localized
  readTime: Localized
  publishedDate: string
  image: BlogImage
  href: string
  featured: boolean
  isVisible: boolean
}

export interface BlogPartnershipItem {
  icon: string
  title: Localized
  description: Localized
}

export interface BlogFaqItem {
  question: Localized
  answer: Localized
  isVisible: boolean
}

export interface BlogPageApiData {
  _id?: string

  slug: string
  pageName: string
  status: string

  sections: {
    hero: {
      eyebrow: Localized
      heading: Localized
      description: Localized
      backgroundImage: BlogImage
      overlayOpacity: number
      primaryButton: BlogButton
    }

    blogListing: {
      enableCategoryFilter: boolean
      enableLoadMore: boolean
      initialDisplayCount: number
      loadMoreCount: number

      categories: BlogCategory[]

      featuredArticle: BlogFeaturedArticle

      articles: BlogArticle[]
    }

    partnership: {
      items: BlogPartnershipItem[]
    }

    faq: {
      items: BlogFaqItem[]
    }
  }

  seo: {
    metaTitle: Localized
    metaDescription: Localized
    keywords: {
      en: string[]
      ar: string[]
    }
    canonicalUrl: string
    ogImage: BlogImage
    noIndex: boolean
    noFollow: boolean
  }
}
