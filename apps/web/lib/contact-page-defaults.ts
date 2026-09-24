import type { ContactPageApiData } from "@/types/api-contact-page"
import type { ApiImage } from "@/types/api-home-page"

const l = () => ({
  en: "",
  ar: "",
})

const image = (): ApiImage => ({
  url: "",
  key: "",
  alt: l(),
})

const button = () => ({
  label: l(),
  href: "",
  openInNewTab: false,
})

const section = (order: number) => ({
  isVisible: true,
  order,
})

export function createEmptyContactPage(): ContactPageApiData {
  return {
    pageName: "Contact",
    slug: "contact",
    status: "draft",

    sections: {
      /* =========================================================
         HERO
      ========================================================= */

      hero: {
        ...section(1),

        eyebrow: l(),

        heading: l(),

        description: l(),

        backgroundImage: image(),

        mobileImage: image(),

        primaryButton: button(),

        overlayOpacity: 0.5,
      },

      /* =========================================================
         CONTACT INFORMATION
      ========================================================= */

      contactInfo: {
        ...section(2),

        eyebrow: l(),

        heading: l(),

        description: l(),

        items: [],
      },

      /* =========================================================
         CONTACT FORM
      ========================================================= */

      contactForm: {
        ...section(3),

        eyebrow: l(),

        heading: l(),

        description: l(),

        image: image(),

        tabs: [],

        fields: [],

        submitButtonLabel: l(),

        successMessage: l(),

        errorMessage: l(),
      },

      /* =========================================================
         LOCATION
      ========================================================= */

      location: {
        ...section(4),

        eyebrow: l(),

        heading: l(),

        description: l(),

        locations: [],

        mapEmbedUrl: "",

        mapZoom: 10,

        button: button(),
      },

      /* =========================================================
         FAQ
      ========================================================= */

      faq: {
        ...section(5),

        eyebrow: l(),

        heading: l(),

        description: l(),

        faqs: [],
      },
    },

    /* =========================================================
       SEO
    ========================================================= */

    seo: {
      metaTitle: l(),

      metaDescription: l(),

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