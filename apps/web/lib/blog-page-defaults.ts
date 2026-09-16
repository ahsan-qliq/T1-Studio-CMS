import type { BlogItem, BlogPageApiData } from "@/types/api-blog-page"
import type { ApiImage, Localized } from "@/types/api-home-page"
const l = (): Localized => ({ en: "", ar: "" })
const i = (): ApiImage => ({ url: "", key: "", alt: l() })
const b = () => ({ label: l(), href: "", openInNewTab: false })
const item = (): BlogItem => ({ blogSlug: "", title: l(), excerpt: l(), category: l(), categoryKey: "", author: l(), readTime: l(), publishedDate: null, image: i(), href: "", featured: false, isVisible: true })
const s = (order: number) => ({ isVisible: true, order })
export function createEmptyBlogPage(): BlogPageApiData {
  return {
    pageName: "Blog", slug: "blog", status: "draft",
    sections: {
      hero: { ...s(1), eyebrow: l(), heading: l(), description: l(), backgroundImage: i(), mobileImage: i(), primaryButton: b(), overlayOpacity: 40 },
      blogListing: { ...s(2), eyebrow: l(), heading: l(), description: l(), categories: [], featuredArticle: item(), articles: [], enableCategoryFilter: true, enableLoadMore: true, initialDisplayCount: 6, loadMoreCount: 6, loadMoreButton: b() },
      partnership: { ...s(3), eyebrow: l(), heading: l(), description: l(), image: i(), steps: [], button: b() },
      faq: { ...s(4), eyebrow: l(), heading: l(), description: l(), faqs: [] },
    },
    seo: { metaTitle: l(), metaDescription: l(), keywords: { en: [], ar: [] }, canonicalUrl: "", ogImage: i(), noIndex: false, noFollow: false },
  }
}
