import type { CookiePolicyPageApiData } from "@/types/api-cookie-policy-page"

const l = () => ({ en: "", ar: "" })
const s = (order: number) => ({ isVisible: true, order })

export function createEmptyCookiePolicyPage(): CookiePolicyPageApiData {
  return {
    pageName: "Cookie Policy",
    slug: "cookie-policy",
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
          { label: { en: "Cookie Policy", ar: "سياسة الكوكيز" }, href: "/cookie-policy" },
        ],
      },
      aboutPolicy: { ...s(1), title: l(), body: l() },
      whatAreCookies: { ...s(2), title: l(), body: l() },
      cookieTypes: {
        ...s(3),
        title: l(),
        body: l(),
        categories: [],
        note: l(),
      },
      yourChoices: {
        ...s(4),
        title: l(),
        body: l(),
        choices: [],
        note: l(),
      },
      yourRights: { ...s(5), title: l(), body: l() },
      changes: { ...s(6), title: l(), body: l() },
      contact: {
        ...s(7),
        title: l(),
        body: l(),
        contactSubTitle: l(),
        contactItems: [],
      },
      faq: { ...s(8), title: l(), faqs: [] },
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
