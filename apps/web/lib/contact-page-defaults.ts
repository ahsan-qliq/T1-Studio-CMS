import type { ContactPageApiData, ContactSection } from "@/types/api-contact-page"

const l = () => ({ en: "", ar: "" })
const i = () => ({ url: "", key: "", alt: l() })
const b = () => ({ label: l(), href: "", openInNewTab: false })
const s = (order: number): ContactSection => ({ isVisible: true, order, eyebrow: l(), heading: l(), description: l() })

export function createEmptyContactPage(): ContactPageApiData {
  return {
    pageName: "Contact Us",
    slug: "contact",
    status: "draft",
    sections: {
      hero: { ...s(1), backgroundImage: i(), mobileImage: i(), primaryButton: b(), overlayOpacity: 40 },
      contactInfo: { ...s(2), items: [] },
      contactForm: { ...s(3), image: i(), tabs: [], fields: [], submitButtonLabel: l(), successMessage: l(), errorMessage: l() },
      location: { ...s(4), locations: [], mapEmbedUrl: "", mapZoom: 14, button: b() },
      faq: { ...s(5), faqs: [] },
    },
    seo: { metaTitle: l(), metaDescription: l(), keywords: { en: [], ar: [] }, canonicalUrl: "", ogImage: i(), noIndex: false, noFollow: false },
  }
}
