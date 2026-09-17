import type {
  TradePageApiData,
  TradePageSections,
} from "@/types/api-trade-page"

const localized = () => ({
  en: "",
  ar: "",
})

const image = () => ({
  url: "",
  key: "",
  alt: localized(),
})

const button = () => ({
  label: localized(),
  href: "",
  openInNewTab: false,
})

const id = () => `tmp-${Math.random().toString(36).slice(2, 10)}`

export function createEmptyTradePage(): TradePageApiData {
  const sections: TradePageSections = {
    hero: {
      isVisible: true,
      order: 1,
      eyebrow: localized(),
      heading: localized(),
      description: localized(),
      backgroundImage: image(),
      overlayOpacity: 0.5,
      primaryButton: button(),
    },

    logos: {
      isVisible: true,
      order: 2,
      items: [],
    },

    whoWeWorkWith: {
      isVisible: true,
      order: 3,
      items: [],
    },

    journey: {
      isVisible: true,
      order: 4,
      items: [],
    },

    stats: {
      isVisible: true,
      order: 5,
      items: [],
    },

    projects: {
      isVisible: true,
      order: 6,
      items: [],
    },

    benefits: {
      isVisible: true,
      order: 7,
      items: [],
    },

    partnershipServices: {
      isVisible: true,
      order: 8,
      items: [],
    },

    industryServices: {
      isVisible: true,
      order: 9,
      items: [],
    },

    resources: {
      isVisible: true,
      order: 10,
      items: [],
    },

    supplierCTA: {
      isVisible: true,
      order: 11,
      eyebrow: localized(),
      heading: localized(),
      description: localized(),
      image: image(),
      benefits: [],
      button: button(),
    },

    designTips: {
      isVisible: true,
      order: 12,
      items: [],
    },

    referral: {
      isVisible: true,
      order: 13,
      items: [],
    },

    consultation: {
      isVisible: true,
      order: 14,
      eyebrow: localized(),
      heading: localized(),
      description: localized(),
      formFields: [],
      submitButtonLabel: localized(),
    },

    faq: {
      isVisible: true,
      order: 15,
      items: [],
    },
  }

  return {
    pageName: "Trade",
    slug: "trade",
    status: "draft",
    sections,

    seo: {
      metaTitle: localized(),
      metaDescription: localized(),
      keywords: {
        en: [],
        ar: [],
      },
      canonicalUrl: "",
      ogImage: image(),
      noIndex: false,
      noFollow: false,
    },
  }
}
