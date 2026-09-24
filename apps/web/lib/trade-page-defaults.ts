import type {
  TradePageApiData,
  TradePageSections,
} from "@/types/api-trade-page"

const l = () => ({ en: "", ar: "" })
const i = () => ({ url: "", key: "", alt: l() })
const b = () => ({ label: l(), href: "", openInNewTab: false })
const head = () => ({
  isVisible: true,
  eyebrow: l(),
  heading: l(),
  description: l(),
})

export function createEmptyTradePage(): TradePageApiData {
  const sections: TradePageSections = {
    hero: {
      ...head(),
      backgroundImage: i(),
      mobileImage: i(),
      overlayOpacity: 40,
      primaryButton: b(),
      secondaryButton: b(),
    },
    logos: { isVisible: true, heading: l(), description: l(), logos: [] },
    whoWeWorkWith: { ...head(), items: [], button: b() },
    journey: { ...head(), steps: [] },
    stats: { isVisible: true, heading: l(), stats: [] },
    projects: { ...head(), projects: [], button: b() },
    benefits: { ...head(), items: [] },
    partnershipServices: { ...head(), services: [] },
    industryServices: { ...head(), items: [] },
    resources: { ...head(), resources: [], button: b() },
    supplierCTA: { ...head(), image: i(), benefits: [], button: b() },
    designTips: { ...head(), articles: [], button: b() },
    referral: { ...head(), image: i(), steps: [], button: b() },
    consultation: {
      ...head(),
      image: i(),
      fields: [],
      submitButtonLabel: l(),
    },
    faq: { ...head(), faqs: [] },
  }

  return {
    pageName: "Trade",
    slug: "trade",
    status: "draft",
    sections,
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
