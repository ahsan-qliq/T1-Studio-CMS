import type { InspirationPageApiData, InspirationSection } from "@/types/api-inspiration-page"

const l = () => ({ en: "", ar: "" })
const i = () => ({ url: "", key: "", alt: l() })
const b = () => ({ label: l(), href: "", openInNewTab: false })
const s = (order: number): InspirationSection => ({ isVisible: true, order, eyebrow: l(), heading: l(), description: l() })

export function createEmptyInspirationPage(): InspirationPageApiData {
  return {
    pageName: "Inspiration",
    slug: "inspiration",
    status: "draft",
    sections: {
      hero: { ...s(1), backgroundImage: i(), mobileImage: i(), primaryButton: b(), overlayOpacity: 40 },
      rooms: { ...s(2), rooms: [], button: b(), autoplay: true, showNavigation: true },
      showcase: { ...s(3), items: [], autoplay: true, showNavigation: true },
      materials: { ...s(4), materials: [], autoplay: false, showNavigation: true },
      inspirationCTA: { ...s(5), backgroundImage: i(), button: b(), overlayOpacity: 40 },
      designTips: { ...s(6), articles: [], button: b() },
      followJourney: { ...s(7), items: [], button: b(), autoplay: true, showNavigation: true },
    },
    seo: { metaTitle: l(), metaDescription: l(), keywords: { en: [], ar: [] }, canonicalUrl: "", ogImage: i(), noIndex: false, noFollow: false },
  }
}
