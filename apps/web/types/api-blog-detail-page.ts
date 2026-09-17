import type { Localized } from "./api-home-page"

export interface BlogDetailImage {
  src: string
  alt: Localized
}

export interface BlogAuthor {
  name: Localized
  designation: Localized
  bio: Localized
  image: BlogDetailImage
  linkedinUrl: string
}

export interface BlogHeadingBlock {
  type: "heading"
  level: number
  heading: Localized
}

export interface BlogParagraphBlock {
  type: "paragraph"
  content: Localized
}

export interface BlogImageBlock {
  type: "image"
  image: BlogDetailImage
  caption: Localized
}

export interface BlogListBlock {
  type: "list"
  listStyle: "bullet" | "number"
  listItems: Localized[]
}

export interface BlogQuoteBlock {
  type: "quote"
  content: Localized
}

export type BlogContentBlock =
  | BlogHeadingBlock
  | BlogParagraphBlock
  | BlogImageBlock
  | BlogListBlock
  | BlogQuoteBlock

export interface BlogConsultationFormField {
  name: string
  type: string
  label: Localized
  required: boolean
}

export interface BlogRelatedArticle {
  blogSlug: string
  title: Localized
  category: Localized
  readTime: Localized
  image: BlogDetailImage
  href: string
}

export interface BlogDetailPageApiData {
  _id?: string

  slug: string

  category: string

  title: Localized

  excerpt: Localized

  categoryLabel: Localized

  tags: {
    en: string[]
    ar: string[]
  }

  author: BlogAuthor

  readTime: Localized

  featuredImage: BlogDetailImage

  status: "draft" | "published" | "archived"

  isFeatured: boolean

  publishedAt: string

  sections: {
    hero: {
      eyebrow: Localized
      title: Localized
      excerpt: Localized
      backgroundImage: BlogDetailImage
      overlayOpacity: number
    }

    articleContent: {
      intro: Localized
      blocks: BlogContentBlock[]
    }

    consultation: {
      eyebrow: Localized
      heading: Localized
      description: Localized
      image: BlogDetailImage
      formFields: BlogConsultationFormField[]
      submitButtonLabel: Localized
    }

    relatedArticles: {
      items: BlogRelatedArticle[]
    }

    authorInfo: {
      author: BlogAuthor
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
    ogImage: BlogDetailImage
    noIndex: boolean
    noFollow: boolean
  }
}
