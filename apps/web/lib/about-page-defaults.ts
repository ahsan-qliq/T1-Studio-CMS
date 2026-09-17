import type { AboutPageApiData, AboutSection } from "@/types/api-about-page"

const l = () => ({ en: "", ar: "" })
const i = () => ({ url: "", key: "", alt: l() })
const b = () => ({ label: l(), href: "", openInNewTab: false })
const s = (order: number): AboutSection => ({
  isVisible: true,
  order,
  eyebrow: l(),
  heading: l(),
  description: l(),
})

export function createEmptyAboutPage(): AboutPageApiData {
  return {
    pageName: "About Us",
    slug: "about",
    status: "draft",
    sections: {
      hero: {
        ...s(1),
        backgroundImage: i(),
        mobileImage: i(),
        primaryButton: b(),
        overlayOpacity: 40,
      },
      story: {
        ...s(2),
        secondaryDescription: l(),
        image: i(),
        imagePosition: "left",
        button: b(),
      },
      journey: { ...s(3), items: [] },
      philosophy: { ...s(4), items: [] },
      values: { ...s(5), items: [] },
      stats: { ...s(6), items: [] },
      team: { ...s(7), items: [], autoplay: false, showNavigation: true },
      showcase: { ...s(8), items: [] },
      brands: { ...s(9), items: [] },
      partnership: { ...s(10), items: [] },
      faq: { ...s(11), items: [] },
    },
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
