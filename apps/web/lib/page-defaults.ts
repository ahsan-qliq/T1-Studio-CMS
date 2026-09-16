// Blank skeletons for brand-new pages, used when the API 404s (no record
// yet) or when creating a new Space Detail page from the "Add Space" UI.
// Every field mirrors the real API shape so the form has something valid
// to bind to and POST back.

import type { SpacesPageApiData, SeoData } from "@/types/api-spaces-page"
import type { SpaceDetailPageApiData } from "@/types/api-space-detail-page"

const loc = () => ({ en: "", ar: "" })
const img = () => ({ url: "", key: "", alt: loc() })
const btn = () => ({ label: loc(), href: "", openInNewTab: false })

const emptySeo = (): SeoData => ({
  metaTitle: loc(),
  metaDescription: loc(),
  keywords: { en: [], ar: [] },
  canonicalUrl: "",
  ogImage: img(),
  noIndex: false,
  noFollow: false,
})

export function createEmptySpacesPage(): SpacesPageApiData {
  return {
    pageName: "Spaces",
    slug: "spaces",
    status: "draft",
    sections: {
      hero: {
        isVisible: true, order: 1, eyebrow: loc(), heading: loc(), description: loc(),
        backgroundImage: img(), mobileImage: img(), primaryButton: btn(), secondaryButton: btn(),
        overlayOpacity: 40,
      },
      intro: { isVisible: true, order: 2, eyebrow: loc(), heading: loc(), description: loc(), button: btn() },
      featuredSpaces: {
        isVisible: true, order: 3, eyebrow: loc(), heading: loc(), description: loc(),
        spaces: [], button: btn(), autoplay: true,
      },
      showcase: {
        isVisible: true, order: 4, eyebrow: loc(), heading: loc(), description: loc(),
        gallery: [], autoplay: true, showNavigation: true,
      },
      whyChooseT1: { isVisible: true, order: 5, eyebrow: loc(), heading: loc(), description: loc(), columns: [] },
      signatureProjects: {
        isVisible: true, order: 6, eyebrow: loc(), heading: loc(), description: loc(),
        projects: [], button: btn(),
      },
      journey: { isVisible: true, order: 7, eyebrow: loc(), heading: loc(), description: loc(), steps: [] },
      partnership: {
        isVisible: true, order: 8, eyebrow: loc(), heading: loc(), description: loc(),
        image: img(), steps: [], button: btn(),
      },
      faq: { isVisible: true, order: 9, eyebrow: loc(), heading: loc(), description: loc(), faqs: [] },
    },
    seo: emptySeo(),
  }
}

export function createEmptySpaceDetailPage(input: {
  pageName: string
  spaceType: string
  slug: string
}): SpaceDetailPageApiData {
  return {
    pageName: input.pageName,
    spaceType: input.spaceType,
    slug: input.slug,
    status: "draft",
    sections: {
      hero: {
        isVisible: true, order: 1, eyebrow: loc(), heading: loc(), description: loc(),
        backgroundImage: img(), mobileImage: img(), primaryButton: btn(), overlayOpacity: 40,
      },
      intro: {
        isVisible: true, order: 2, eyebrow: loc(), heading: loc(), description: loc(),
        image: img(), button: btn(), imagePosition: "left",
      },
      features: { isVisible: true, order: 3, eyebrow: loc(), heading: loc(), description: loc(), image: img(), items: [] },
      styles: {
        isVisible: true, order: 4, eyebrow: loc(), heading: loc(), description: loc(),
        items: [], button: btn(), autoplay: true,
      },
      gallery: {
        isVisible: true, order: 5, eyebrow: loc(), heading: loc(), description: loc(),
        images: [], autoplay: true, showNavigation: true,
      },
      materials: { isVisible: true, order: 6, eyebrow: loc(), heading: loc(), description: loc(), materials: [] },
      brands: { isVisible: true, order: 7, heading: loc(), brands: [] },
      relatedProjects: {
        isVisible: true, order: 8, eyebrow: loc(), heading: loc(), description: loc(),
        projects: [], button: btn(),
      },
      journey: { isVisible: true, order: 9, eyebrow: loc(), heading: loc(), description: loc(), steps: [] },
      faq: { isVisible: true, order: 10, eyebrow: loc(), heading: loc(), description: loc(), faqs: [] },
      relatedSpaces: { isVisible: true, order: 11, heading: loc(), spaces: [], button: btn() },
      consultation: {
        isVisible: true, order: 12, eyebrow: loc(), heading: loc(), description: loc(),
        image: img(), button: btn(),
      },
    },
    seo: emptySeo(),
  }
}
