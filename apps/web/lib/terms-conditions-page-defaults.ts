import type { TermsConditionsPageApiData } from "@/types/api-terms-conditions-page"

const l = () => ({ en: "", ar: "" })
const i = () => ({ url: "", key: "", alt: l() })
const s = (order: number) => ({ isVisible: true, order })

export function createEmptyTermsConditionsPage(): TermsConditionsPageApiData {
  return {
    pageName: "Terms & Conditions",
    slug: "terms-conditions",
    status: "draft",
    sections: {
      hero: {
        ...s(0),
        heading: l(),
        description: l(),
        bgImage: i(),
        breadcrumbs: [
          { label: { en: "Home", ar: "الرئيسية" }, href: "/" },
          {
            label: { en: "Terms & Conditions", ar: "الشروط والأحكام" },
            href: "/terms-conditions",
          },
        ],
      },
      content: {
        ...s(1),
        tocLabel: l(),
        lastUpdated: l(),
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
