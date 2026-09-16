import type { BlogDetailPageApiData } from "@/types/api-blog-detail-page"
import type { ApiImage, Localized } from "@/types/api-home-page"
const l = (): Localized => ({ en: "", ar: "" })
const i = (): ApiImage => ({ url: "", key: "", alt: l() })
const b = () => ({ label: l(), href: "", openInNewTab: false })
const author = () => ({ name: l(), designation: l(), bio: l(), image: i(), linkedinUrl: "", websiteUrl: "" })
const s = (order: number) => ({ isVisible: true, order })
export function createEmptyBlogDetailPage(): BlogDetailPageApiData {
  return {
    title: l(), slug: "", excerpt: l(), category: "", categoryLabel: l(), tags: { en: [], ar: [] }, author: author(), readTime: l(), featuredImage: i(), status: "draft", isFeatured: false,
    sections: {
      hero: { ...s(1), eyebrow: l(), title: l(), excerpt: l(), backgroundImage: i(), mobileImage: i(), overlayOpacity: 40 },
      articleContent: { ...s(2), intro: l(), blocks: [] },
      consultation: { ...s(3), eyebrow: l(), heading: l(), description: l(), image: i(), fields: [], submitButtonLabel: l(), successMessage: l() },
      relatedArticles: { ...s(4), eyebrow: l(), heading: l(), description: l(), articles: [], button: b() },
      authorInfo: { ...s(5), heading: l(), author: author() },
    },
    seo: { metaTitle: l(), metaDescription: l(), keywords: { en: [], ar: [] }, canonicalUrl: "", ogImage: i(), noIndex: false, noFollow: false },
  }
}
