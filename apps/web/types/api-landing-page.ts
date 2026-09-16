import type { ApiButton, ApiImage, Localized } from "./api-home-page"
import type { SeoData } from "./api-spaces-page"

export interface LandingPageApiData {
  _id?: string
  pageName: string
  slug: string
  status: string
  sections: {
    hero: { isVisible: boolean; order: number; eyebrow: Localized; heading: Localized; description: Localized; backgroundImage: ApiImage; mobileImage: ApiImage; primaryButton: ApiButton; form: { heading: Localized; description: Localized; fields: unknown[]; submitButtonLabel: Localized; successMessage: Localized }; overlayOpacity: number }
    stats: { isVisible: boolean; order: number; heading: Localized; stats: unknown[] }
    intro: { isVisible: boolean; order: number; eyebrow: Localized; heading: Localized; description: Localized; secondaryDescription: Localized; image: ApiImage; imagePosition: "left" | "right"; button: ApiButton }
    projects: { isVisible: boolean; order: number; eyebrow: Localized; heading: Localized; description: Localized; projects: unknown[]; button: ApiButton }
    process: { isVisible: boolean; order: number; eyebrow: Localized; heading: Localized; description: Localized; steps: unknown[] }
    benefits: { isVisible: boolean; order: number; eyebrow: Localized; heading: Localized; description: Localized; items: unknown[]; button: ApiButton }
    testimonials: { isVisible: boolean; order: number; eyebrow: Localized; heading: Localized; description: Localized; testimonials: unknown[]; autoplay: boolean; showNavigation: boolean }
    faq: { isVisible: boolean; order: number; eyebrow: Localized; heading: Localized; description: Localized; faqs: unknown[] }
    consultation: { isVisible: boolean; order: number; eyebrow: Localized; heading: Localized; description: Localized; image: ApiImage; tabs: unknown[]; fields: unknown[]; submitButtonLabel: Localized; successMessage: Localized }
  }
  seo: SeoData
}
