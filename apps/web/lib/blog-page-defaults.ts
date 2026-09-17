import type {
  BlogArticle,
  BlogCategory,
  BlogFaqItem,
  BlogFeaturedArticle,
  BlogImage,
  BlogPageApiData,
  BlogPartnershipItem,
} from "@/types/api-blog-page"

import type { Localized } from "@/types/api-home-page"

const localized = (): Localized => ({
  en: "",
  ar: "",
})

const image = (): BlogImage => ({
  src: "",
  alt: localized(),
})

const button = () => ({
  label: localized(),
  href: "",
  openInNewTab: false,
})

const category = (): BlogCategory => ({
  key: "",
  label: localized(),
})

const featuredArticle = (): BlogFeaturedArticle => ({
  blogSlug: "",
  title: localized(),
  excerpt: localized(),
  categoryKey: "",
  image: image(),
  href: "",
  featured: true,
  isVisible: true,
})

const article = (): BlogArticle => ({
  blogSlug: "",
  title: localized(),
  excerpt: localized(),
  category: localized(),
  categoryKey: "",
  author: localized(),
  readTime: localized(),
  publishedDate: "",
  image: image(),
  href: "",
  featured: false,
  isVisible: true,
})

const partnershipItem = (): BlogPartnershipItem => ({
  icon: "",
  title: localized(),
  description: localized(),
})

const faqItem = (): BlogFaqItem => ({
  question: localized(),
  answer: localized(),
  isVisible: true,
})

export function createEmptyBlogPage(): BlogPageApiData {
  return {
    pageName: "Blog",
    slug: "blog",
    status: "draft",

    sections: {
      /* =========================================================
         HERO
      ========================================================= */

      hero: {
        eyebrow: localized(),

        heading: localized(),

        description: localized(),

        backgroundImage: image(),

        overlayOpacity: 0.5,

        primaryButton: button(),
      },

      /* =========================================================
         BLOG LISTING
      ========================================================= */

      blogListing: {
        enableCategoryFilter: true,

        enableLoadMore: true,

        initialDisplayCount: 9,

        loadMoreCount: 6,

        categories: [],

        featuredArticle: featuredArticle(),

        articles: [],
      },

      /* =========================================================
         PARTNERSHIP
      ========================================================= */

      partnership: {
        items: [],
      },

      /* =========================================================
         FAQ
      ========================================================= */

      faq: {
        items: [],
      },
    },

    /* =========================================================
       SEO
    ========================================================= */

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
