import type { PrivacyPolicyPageApiData } from "@/types/api-privacy-policy-page"

const l = () => ({ en: "", ar: "" })
const i = () => ({ url: "", key: "", alt: l() })
const s = (order: number) => ({ isVisible: true, order })

export function createEmptyPrivacyPolicyPage(): PrivacyPolicyPageApiData {
  return {
    pageName: "Privacy Policy",
    slug: "privacy-policy",
    status: "draft",
    sections: {
      hero: {
        ...s(0),
        heading: l(),
        description: l(),
        bgImage: i(),
        breadcrumbs: [
          { label: { en: "Home", ar: "الرئيسية" }, href: "/" },
          { label: { en: "Privacy Policy", ar: "سياسة الخصوصية" }, href: "/privacy-policy" },
        ],
      },
      content: {
        ...s(1),
        tocLabel: l(),
        lastUpdated: l(),
        contactEmail: "",
        items: [],
      },
    },
    seo: {
      metaTitle: l(),
      metaDescription: l(),
      keywords: { en: [], ar: [] },
      canonicalUrl: "",
      ogImage: i(),
      noIndex: false,
      noFollow: false,
    },
  }
}
