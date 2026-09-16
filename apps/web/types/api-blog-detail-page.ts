import type { ApiButton, ApiImage, Localized } from "./api-home-page"
import type { SeoData } from "./api-spaces-page"

export interface BlogAuthor {
  name: Localized
  designation: Localized
  bio: Localized
  image: ApiImage
  linkedinUrl: string
  websiteUrl: string
}

export interface BlogContentBlock {
  _id?: string
  type: "heading" | "paragraph" | "image" | "gallery" | "quote" | "list" | "button" | "divider"
  level: number
  heading: Localized
  content: Localized
  image?: ApiImage
  caption: Localized
  images: ApiImage[]
  listStyle: "bullet" | "number"
  listItems: Localized[]
  button?: ApiButton
  isVisible: boolean
}

export interface BlogDetailPageApiData {
  _id?: string
  title: Localized
  slug: string
  excerpt: Localized
  category: string
  categoryLabel: Localized
  tags: { en: string[]; ar: string[] }
  author: BlogAuthor
  readTime: Localized
  featuredImage: ApiImage
  status: "draft" | "published" | "archived"
  isFeatured: boolean
  sections: {
    hero: { isVisible: boolean; order: number; eyebrow: Localized; title: Localized; excerpt: Localized; backgroundImage: ApiImage; mobileImage: ApiImage; overlayOpacity: number }
    articleContent: { isVisible: boolean; order: number; intro: Localized; blocks: BlogContentBlock[] }
    consultation: { isVisible: boolean; order: number; eyebrow: Localized; heading: Localized; description: Localized; image: ApiImage; fields: { _id?: string; name: string; label: Localized; placeholder: Localized; type: string; required: boolean; options: { value: string; label: Localized }[] }[]; submitButtonLabel: Localized; successMessage: Localized }
    relatedArticles: { isVisible: boolean; order: number; eyebrow: Localized; heading: Localized; description: Localized; articles: { _id?: string; blogSlug: string; title: Localized; category: Localized; readTime: Localized; image: ApiImage; href: string; isVisible: boolean }[]; button: ApiButton }
    authorInfo: { isVisible: boolean; order: number; heading: Localized; author: BlogAuthor }
  }
  seo: SeoData
}
