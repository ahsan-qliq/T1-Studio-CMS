import type { SpaceDetailPageApiData } from "@/types/api-space-detail-page"

const localized = () => ({ en: "", ar: "" })
const image = () => ({ url: "", key: "", alt: localized() })
const button = () => ({ label: localized(), href: "", openInNewTab: false })
const section = (order: number) => ({ isVisible: true, order })

export function createEmptySpaceDetailPage(): SpaceDetailPageApiData {
  return {
    pageName: "New Space",
    spaceType: "",
    slug: "",
    status: "draft",
    sections: {
      hero: { ...section(1), eyebrow: localized(), heading: localized(), description: localized(), backgroundImage: image(), mobileImage: image(), primaryButton: button(), overlayOpacity: 0 },
      intro: { ...section(2), eyebrow: localized(), heading: localized(), description: localized(), image: image(), button: button(), imagePosition: "left" },
      features: { ...section(3), eyebrow: localized(), heading: localized(), description: localized(), image: image(), items: [] },
      styles: { ...section(4), eyebrow: localized(), heading: localized(), description: localized(), items: [], button: button(), autoplay: false },
      gallery: { ...section(5), eyebrow: localized(), heading: localized(), description: localized(), images: [], autoplay: false, showNavigation: true },
      materials: { ...section(6), eyebrow: localized(), heading: localized(), description: localized(), materials: [] },
      brands: { ...section(7), heading: localized(), brands: [] },
      relatedProjects: { ...section(8), eyebrow: localized(), heading: localized(), description: localized(), projects: [], button: button() },
      journey: { ...section(9), eyebrow: localized(), heading: localized(), description: localized(), steps: [] },
      faq: { ...section(10), eyebrow: localized(), heading: localized(), description: localized(), faqs: [] },
      relatedSpaces: { ...section(11), heading: localized(), spaces: [], button: button() },
      consultation: { ...section(12), eyebrow: localized(), heading: localized(), description: localized(), image: image(), button: button() },
    },
    seo: {
      metaTitle: localized(),
      metaDescription: localized(),
      keywords: { en: [], ar: [] },
      canonicalUrl: "",
      ogImage: image(),
      noIndex: false,
      noFollow: false,
    },
  }
}
