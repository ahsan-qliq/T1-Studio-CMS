import type { WhyT1PageApiData } from "@/types/api-why-t1-page"
const l = () => ({ en: "", ar: "" })
const i = () => ({ url: "", key: "", alt: l() })
const b = () => ({ label: l(), href: "", openInNewTab: false })
const s = (order: number) => ({ isVisible: true, order })
export function createEmptyWhyT1Page(): WhyT1PageApiData {
  return {
    pageName: "Why T1", slug: "why-t1", status: "draft",
    sections: {
      hero: { ...s(1), eyebrow: l(), heading: l(), description: l(), backgroundImage: i(), mobileImage: i(), primaryButton: b(), overlayOpacity: 40 },
      comparison: { ...s(2), eyebrow: l(), heading: l(), description: l(), columns: [] },
      journey: { ...s(3), eyebrow: l(), heading: l(), description: l(), steps: [] },
      stats: { ...s(4), eyebrow: l(), heading: l(), stats: [] },
      benefits: { ...s(5), eyebrow: l(), heading: l(), description: l(), items: [] },
      designerPicks: { ...s(6), eyebrow: l(), heading: l(), description: l(), items: [], button: b(), autoplay: true, showNavigation: true },
      brands: { ...s(7), eyebrow: l(), heading: l(), description: l(), brands: [] },
      partnership: { ...s(8), eyebrow: l(), heading: l(), description: l(), image: i(), steps: [], button: b() },
      designTips: { ...s(9), eyebrow: l(), heading: l(), description: l(), articles: [], button: b() },
      faq: { ...s(10), eyebrow: l(), heading: l(), description: l(), faqs: [] },
    },
    seo: { metaTitle: l(), metaDescription: l(), keywords: { en: [], ar: [] }, canonicalUrl: "", ogImage: i(), noIndex: false, noFollow: false },
  }
}
