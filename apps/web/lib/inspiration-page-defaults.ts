import type {
  InspirationPageApiData,
  InspirationHero,
  InspirationRooms,
  InspirationShowcase,
  InspirationMaterials,
  InspirationCTA,
  InspirationDesignTips,
  InspirationFollowJourney,
} from "@/types/api-inspiration-page"

const l = () => ({
  en: "",
  ar: "",
})

const i = () => ({
  url: "",
  key: "",
  alt: l(),
})

const b = () => ({
  label: l(),
  href: "",
  openInNewTab: false,
})

export function createEmptyInspirationPage(): InspirationPageApiData {
  const hero: InspirationHero = {
    isVisible: true,
    order: 1,
    eyebrow: l(),
    heading: l(),
    description: l(),
    backgroundImage: i(),
    mobileImage: i(),
    overlayOpacity: 0.45,
    primaryButton: b(),
  }

  const rooms: InspirationRooms = {
    isVisible: true,
    order: 2,
    eyebrow: l(),
    heading: l(),
    description: l(),
    rooms: [],
    button: b(),
    autoplay: true,
    showNavigation: true,
  }

  const showcase: InspirationShowcase = {
    isVisible: true,
    order: 3,
    eyebrow: l(),
    heading: l(),
    description: l(),
    items: [],
    autoplay: true,
    showNavigation: true,
  }

  const materials: InspirationMaterials = {
    isVisible: true,
    order: 4,
    eyebrow: l(),
    heading: l(),
    description: l(),
    materials: [],
    autoplay: false,
    showNavigation: true,
  }

  const inspirationCTA: InspirationCTA = {
    isVisible: true,
    order: 5,
    eyebrow: l(),
    heading: l(),
    description: l(),
    backgroundImage: i(),
    overlayOpacity: 0.6,
    button: b(),
  }

  const designTips: InspirationDesignTips = {
    isVisible: true,
    order: 6,
    eyebrow: l(),
    heading: l(),
    description: l(),
    articles: [],
    button: b(),
  }

  const followJourney: InspirationFollowJourney = {
    isVisible: true,
    order: 7,
    eyebrow: l(),
    heading: l(),
    description: l(),
    items: [],
    button: b(),
    autoplay: true,
    showNavigation: false,
  }

  return {
    pageName: "Inspiration",
    slug: "inspiration",
    status: "draft",

    sections: {
      hero,
      rooms,
      showcase,
      materials,
      inspirationCTA,
      designTips,
      followJourney,
    },

    seo: {
      metaTitle: l(),
      metaDescription: l(),
      keywords: {
        en: [],
        ar: [],
      },
      canonicalUrl: "",
      ogImage: i(),
      noIndex: false,
      noFollow: false,
    },
  }
}
