import type { Localized } from "@/types/api-home-page"
import type {
  BlogAuthor,
  BlogDetailImage,
  BlogDetailPageApiData,
} from "@/types/api-blog-detail-page"

const localized = (): Localized => ({
  en: "",
  ar: "",
})

const image = (): BlogDetailImage => ({
  url: "",
  key: "",
  alt: localized(),
})

const author = (): BlogAuthor => ({
  name: localized(),
  designation: localized(),
  bio: localized(),
  image: image(),
  linkedinUrl: "",
})

export function createEmptyBlogDetailPage(): BlogDetailPageApiData {
  return {
    slug: "",
    category: "",

    title: localized(),
    excerpt: localized(),
    categoryLabel: localized(),

    tags: {
      en: [],
      ar: [],
    },

    author: author(),

    readTime: localized(),

    featuredImage: image(),

    status: "draft",

    isFeatured: false,

    publishedAt: "",

    sections: {
      hero: {
        eyebrow: localized(),
        title: localized(),
        excerpt: localized(),
        backgroundImage: image(),
        overlayOpacity: 0.4,
      },

      articleContent: {
        intro: localized(),
        blocks: [],
      },

      consultation: {
        eyebrow: localized(),
        heading: localized(),
        description: localized(),
        image: image(),
        formFields: [],
        submitButtonLabel: localized(),
      },

      relatedArticles: {
        items: [],
      },

      authorInfo: {
        author: author(),
      },
    },

    seo: {
      metaTitle: localized(),
      metaDescription: localized(),

      keywords: {
        en: [],
        ar: [],
      },

      canonicalUrl: "",

      ogImage: image(),

      noIndex: false,
      noFollow: false,
    },
  }
}
