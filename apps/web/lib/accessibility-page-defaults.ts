import type { AccessibilityPageApiData } from "@/types/api-accessibility-page"

const l = () => ({ en: "", ar: "" })
const s = (order: number) => ({ isVisible: true, order })

export function createEmptyAccessibilityPage(): AccessibilityPageApiData {
  return {
    pageName: "Accessibility",
    slug: "accessibility",
    status: "draft",
    tocMeta: {
      tocLabel: l(),
      lastUpdated: l(),
    },
    sections: {
      hero: {
        ...s(0),
        heading: l(),
        description: l(),
        bgImage: { url: "", key: "", alt: l() },
        breadcrumbs: [
          { label: { en: "Home", ar: "الرئيسية" }, href: "/" },
          { label: { en: "Accessibility", ar: "إمكانية الوصول" }, href: "/accessibility" },
        ],
      },
      commitment: { ...s(1), title: l(), body: l() },
      standards: { ...s(2), title: l(), body: l(), standards: [], note: l() },
      shortfalls: { ...s(3), title: l(), body: l(), items: [], note: l() },
      beyondWebsite: { ...s(4), title: l(), body: l() },
      contact: {
        ...s(5),
        title: l(),
        body: l(),
        contactSubTitle: l(),
        contactItems: [],
        note: l(),
      },
      faq: { ...s(6), title: l(), faqs: [] },
    },
    seo: {
      metaTitle: l(),
      metaDescription: l(),
      keywords: { en: [], ar: [] },
      canonicalUrl: "",
      noIndex: false,
      noFollow: false,
      ogImage: { url: "", key: "", alt: l() },
    },
  }
}
