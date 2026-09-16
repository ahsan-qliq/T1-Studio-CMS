import type { AboutPageApiData, AboutSection } from "@/types/api-about-page"

const l = () => ({ en: "", ar: "" })
const i = () => ({ url: "", key: "", alt: l() })
const b = () => ({ label: l(), href: "", openInNewTab: false })
const s = (order: number): AboutSection => ({ isVisible: true, order, eyebrow: l(), heading: l(), description: l() })

export function createEmptyAboutPage(): AboutPageApiData {
  return {
    pageName: "About Us",
    slug: "about",
    status: "draft",
    sections: {
      hero: { ...s(1), backgroundImage: i(), mobileImage: i(), primaryButton: b(), overlayOpacity: 40 },
      story: { ...s(2), secondaryDescription: l(), image: i(), imagePosition: "left", button: b() },
      journey: { ...s(3), items: [] },
      philosophy: { ...s(4), items: [] },
      values: { ...s(5), values: [] },
      stats: { ...s(6), stats: [] },
      team: { ...s(7), members: [], autoplay: false, showNavigation: true },
      showcase: { ...s(8), images: [], autoplay: true, showNavigation: true },
      brands: { ...s(9), brands: [] },
      partnership: { ...s(10), image: i(), steps: [], button: b() },
      faq: { ...s(11), faqs: [] },
    },
    seo: { metaTitle: l(), metaDescription: l(), keywords: { en: [], ar: [] }, canonicalUrl: "", ogImage: i(), noIndex: false, noFollow: false },
  }
}
