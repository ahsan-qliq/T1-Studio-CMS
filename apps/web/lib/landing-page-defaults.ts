import type {
  LandingPageApiData,
  Localized,
  LandingButton,
} from "@/types/api-landing-page"
import type { ApiImage } from "@/types/api-home-page"

const l = (): Localized => ({
  en: "",
  ar: "",
})

const image = (): ApiImage => ({
  url: "",
  key: "",
  alt: l(),
})

const button = (): LandingButton => ({
  label: l(),
  href: "",
  openInNewTab: false,
})

export function createEmptyLandingPage(): LandingPageApiData {
  return {
    slug: "landing-dubai",
    pageName: "Dubai Campaign Landing",
    status: "draft",

    sections: {
      /* =====================================================
         HERO
      ===================================================== */

      hero: {
        eyebrow: l(),

        heading: l(),

        description: l(),

        backgroundImage: image(),

        overlayOpacity: 0.5,

        form: {
          heading: l(),

          description: l(),

          fields: [],

          submitButtonLabel: l(),

          successMessage: l(),
        },
      },

      /* =====================================================
         STATS
      ===================================================== */

      stats: {
        items: [],
      },

      /* =====================================================
         INTRO
      ===================================================== */

      intro: {
        eyebrow: l(),

        heading: l(),

        description: l(),

        secondaryDescription: l(),

        image: image(),

        imagePosition: "right",

        button: button(),
      },

      /* =====================================================
         PROJECTS
      ===================================================== */

      projects: {
        items: [],
      },

      /* =====================================================
         PROCESS
      ===================================================== */

      process: {
        items: [],
      },

      /* =====================================================
         BENEFITS
      ===================================================== */

      benefits: {
        items: [],
      },

      /* =====================================================
         TESTIMONIALS
      ===================================================== */

      testimonials: {
        items: [],

        autoplay: true,

        showNavigation: true,
      },

      /* =====================================================
         FAQ
      ===================================================== */

      faq: {
        items: [],
      },

      /* =====================================================
         CONSULTATION
      ===================================================== */

      consultation: {
        eyebrow: l(),

        heading: l(),

        description: l(),

        formFields: [],

        submitButtonLabel: l(),

        successMessage: l(),
      },
    },

    /* =====================================================
       SEO
    ===================================================== */

    seo: {
      metaTitle: l(),

      metaDescription: l(),

      keywords: {
        en: [],

        ar: [],
      },

      canonicalUrl: "",

      ogImage: image(),

      noIndex: true,

      noFollow: true,
    },
  }
}
