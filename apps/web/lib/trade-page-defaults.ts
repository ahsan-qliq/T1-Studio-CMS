import type { TradePageApiData, TradeSection } from "@/types/api-trade-page"
const l = () => ({ en: "", ar: "" })
const i = () => ({ url: "", key: "", alt: l() })
const b = () => ({ label: l(), href: "", openInNewTab: false })
const s = (order: number): TradeSection => ({ isVisible: true, order, eyebrow: l(), heading: l(), description: l() })
export function createEmptyTradePage(): TradePageApiData {
  const sections = {
    hero: { ...s(1), backgroundImage: i(), mobileImage: i(), primaryButton: b(), secondaryButton: b(), overlayOpacity: 40 },
    logos: s(2), whoWeWorkWith: { ...s(3), button: b() }, journey: s(4), stats: s(5),
    projects: { ...s(6), button: b() }, benefits: s(7), partnershipServices: s(8),
    industryServices: s(9), resources: { ...s(10), button: b() },
    supplierCTA: { ...s(11), image: i(), button: b() }, designTips: { ...s(12), button: b() },
    referral: { ...s(13), image: i(), button: b() }, consultation: { ...s(14), image: i() }, faq: s(15),
  }
  return {
    pageName: "Trade", slug: "trade", status: "draft", sections,
    seo: { metaTitle: l(), metaDescription: l(), keywords: { en: [], ar: [] }, canonicalUrl: "", ogImage: i(), noIndex: false, noFollow: false },
  }
}
