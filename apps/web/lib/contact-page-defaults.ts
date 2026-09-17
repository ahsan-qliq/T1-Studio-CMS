import type { ContactPageApiData, ContactImage } from "@/types/api-contact-page"

const l = () => ({
  en: "",
  ar: "",
})

const image = (): ContactImage => ({
  src: "",
  alt: l(),
})

const apiImage = () => ({
  url: "",
  key: "",
  alt: l(),
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

        overlayOpacity: 0.5,
      },

      /* =========================================================
         CONTACT INFORMATION
      ========================================================= */

      contactInfo: {
        ...section(2),

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

        formFields: [],

        submitButtonLabel: l(),

        successMessage: l(),

        errorMessage: l(),
      },

      /* =========================================================
         LOCATION
      ========================================================= */

      location: {
        ...section(4),

        mapLocations: [],

        mapEmbedUrl: "",

        mapZoom: {
          min: 10,
          max: 18,
        },
      },

      /* =========================================================
         FAQ
      ========================================================= */

      faq: {
        ...section(5),

        items: [],
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

      ogImage: apiImage(),

      noIndex: false,

      noFollow: false,
    },
  }
}
