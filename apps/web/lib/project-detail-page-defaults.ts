import type { ProjectDetailPageApiData } from "@/types/api-project-detail-page"

const localized = () => ({ en: "", ar: "" })
const image = () => ({ url: "", key: "", alt: localized() })
const button = () => ({ label: localized(), href: "", openInNewTab: false })
const section = (order: number) => ({ isVisible: true, order })

export function createEmptyProjectDetailPage(): ProjectDetailPageApiData {
  return {
    pageName: "New Project",
    projectName: localized(),
    slug: "",
    projectCategory: "",
    status: "draft",
    sections: {
      hero: { ...section(1), eyebrow: localized(), heading: localized(), description: localized(), location: localized(), backgroundImage: image(), mobileImage: image(), stats: [], overlayOpacity: 0 },
      overview: { ...section(2), eyebrow: localized(), heading: localized(), description: localized(), image: image(), imagePosition: "left" },
      beforeAfter: { ...section(3), eyebrow: localized(), heading: localized(), description: localized(), items: [], showNavigation: true, autoplay: false },
      gallery: { ...section(4), eyebrow: localized(), heading: localized(), description: localized(), images: [], autoplay: false, showNavigation: true },
      materials: { ...section(5), eyebrow: localized(), heading: localized(), description: localized(), materials: [] },
      projectInfo: { ...section(6), eyebrow: localized(), heading: localized(), description: localized(), details: [], button: button() },
      testimonial: { ...section(7), eyebrow: localized(), heading: localized(), description: localized(), testimonials: [], autoplay: false },
      relatedProjects: { ...section(8), eyebrow: localized(), heading: localized(), description: localized(), projects: [], button: button() },
      consultation: { ...section(9), eyebrow: localized(), heading: localized(), description: localized(), image: image(), fields: [], submitButtonLabel: localized() },
    },
    seo: { metaTitle: localized(), metaDescription: localized(), keywords: { en: [], ar: [] }, canonicalUrl: "", ogImage: image(), noIndex: false, noFollow: false },
  }
}
