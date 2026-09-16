import type { ApiButton, ApiImage, Localized } from "./api-home-page"
import type { SeoData } from "./api-spaces-page"

export interface BlogItem {
  _id?: string
  blogSlug: string
  title: Localized
  excerpt: Localized
  category: Localized
  categoryKey: string
  author: Localized
  readTime: Localized
  publishedDate: string | null
  image: ApiImage
  href: string
  featured: boolean
  isVisible: boolean
}

export interface BlogPageApiData {
  _id?: string
  pageName: string
  slug: string
  status: string
  sections: {
    hero: { isVisible: boolean; order: number; eyebrow: Localized; heading: Localized; description: Localized; backgroundImage: ApiImage; mobileImage: ApiImage; primaryButton: ApiButton; overlayOpacity: number }
    blogListing: { isVisible: boolean; order: number; eyebrow: Localized; heading: Localized; description: Localized; categories: { _id?: string; key: string; label: Localized; isVisible: boolean }[]; featuredArticle: BlogItem; articles: BlogItem[]; enableCategoryFilter: boolean; enableLoadMore: boolean; initialDisplayCount: number; loadMoreCount: number; loadMoreButton: ApiButton }
    partnership: { isVisible: boolean; order: number; eyebrow: Localized; heading: Localized; description: Localized; image: ApiImage; steps: { _id?: string; icon: string; title: Localized; description: Localized; isVisible: boolean }[]; button: ApiButton }
    faq: { isVisible: boolean; order: number; eyebrow: Localized; heading: Localized; description: Localized; faqs: { _id?: string; question: Localized; answer: Localized; isVisible: boolean }[] }
  }
  seo: SeoData
}
