import type {
  ApiButton,
  ApiImage,
  HomePageApiData,
  HomePageSections,
  Localized,
} from "@/types/api-home-page"

const l = (): Localized => ({
  en: "",
  ar: "",
})

const i = (): ApiImage => ({
  url: "",
  key: "",
  alt: l(),
})

const b = (): ApiButton => ({
  label: l(),
  href: "",
  openInNewTab: false,
})

export function createEmptyHomePage(): HomePageApiData {
  const sections: HomePageSections = {
    hero: {
      isVisible: true,
      order: 1,
      eyebrow: l(),
      heading: l(),
      description: l(),
      backgroundImage: i(),
      mobileImage: i(),
      primaryButton: b(),
      secondaryButton: b(),
      overlayOpacity: 0.4,
    },

    stats: {
      isVisible: true,
      order: 2,
      statistics: [],
    },

    services: {
      isVisible: true,
      order: 3,
      eyebrow: l(),
      heading: l(),
      description: l(),
      services: [],
      button: b(),
    },

    featuredSpaces: {
      isVisible: true,
      order: 4,
      eyebrow: l(),
      heading: l(),
      description: l(),
      spaces: [],
      button: b(),
    },

    signatureProjects: {
      isVisible: true,
      order: 5,
      eyebrow: l(),
      heading: l(),
      description: l(),
      projects: [],
      button: b(),
    },

    journey: {
      isVisible: true,
      order: 6,
      eyebrow: l(),
      heading: l(),
      description: l(),
      steps: [],
    },

    whyChooseT1: {
      isVisible: true,
      order: 7,
      eyebrow: l(),
      heading: l(),
      description: l(),
      columns: [],
    },

    testimonials: {
      isVisible: true,
      order: 8,
      eyebrow: l(),
      heading: l(),
      description: l(),
      testimonials: [],
    },

    consultationCTA: {
      isVisible: true,
      order: 9,
      eyebrow: l(),
      heading: l(),
      description: l(),
      image: i(),
      tabs: [],
      fields: [],
      submitButtonLabel: l(),
    },

    partnership: {
      isVisible: true,
      order: 10,
      eyebrow: l(),
      heading: l(),
      description: l(),
      image: i(),
      steps: [],
      button: b(),
    },

    awardsRecognition: {
      isVisible: true,
      order: 11,
      eyebrow: l(),
      heading: l(),
      description: l(),
      awards: [],
    },

    designTips: {
      isVisible: true,
      order: 12,
      eyebrow: l(),
      heading: l(),
      description: l(),
      articles: [],
      button: b(),
    },

    faq: {
      isVisible: true,
      order: 13,
      eyebrow: l(),
      heading: l(),
      description: l(),
      faqs: [],
    },

    locationLinks: {
      isVisible: true,
      order: 14,
      eyebrow: l(),
      heading: l(),
      description: l(),
      columns: [],
    },
  }

  return {
    _id: "",
    pageName: "Home",
    slug: "home",
    status: "draft",
    publishedAt: null,
    createdAt: "",
    updatedAt: "",
    __v: 0,
    sections,
  }
}