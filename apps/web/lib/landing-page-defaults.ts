import type { LandingPageApiData } from "@/types/api-landing-page"
const l = () => ({ en: "", ar: "" })
const i = () => ({ url: "", key: "", alt: l() })
const b = () => ({ label: l(), href: "", openInNewTab: false })
const s = (order: number) => ({ isVisible: true, order })
export function createEmptyLandingPage(): LandingPageApiData {
  return {
    pageName: "Landing Page", slug: "landing-page", status: "draft",
    sections: {
      hero: { ...s(1), eyebrow: l(), heading: l(), description: l(), backgroundImage: i(), mobileImage: i(), primaryButton: b(), form: { heading: l(), description: l(), fields: [], submitButtonLabel: l(), successMessage: l() }, overlayOpacity: 40 },
      stats: { ...s(2), heading: l(), stats: [] },
      intro: { ...s(3), eyebrow: l(), heading: l(), description: l(), secondaryDescription: l(), image: i(), imagePosition: "left", button: b() },
      projects: { ...s(4), eyebrow: l(), heading: l(), description: l(), projects: [], button: b() },
      process: { ...s(5), eyebrow: l(), heading: l(), description: l(), steps: [] },
      benefits: { ...s(6), eyebrow: l(), heading: l(), description: l(), items: [], button: b() },
      testimonials: { ...s(7), eyebrow: l(), heading: l(), description: l(), testimonials: [], autoplay: true, showNavigation: true },
      faq: { ...s(8), eyebrow: l(), heading: l(), description: l(), faqs: [] },
      consultation: { ...s(9), eyebrow: l(), heading: l(), description: l(), image: i(), tabs: [], fields: [], submitButtonLabel: l(), successMessage: l() },
    },
    seo: { metaTitle: l(), metaDescription: l(), keywords: { en: [], ar: [] }, canonicalUrl: "", ogImage: i(), noIndex: false, noFollow: false },
  }
}
