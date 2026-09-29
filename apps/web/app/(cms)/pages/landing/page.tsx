// import { LandingPageFormClient } from "@/components/cms/landing-page-form/landing-page-form-client"

// import { fetchLandingPage } from "@/lib/landing-page-api"

// import { createEmptyLandingPage } from "@/lib/landing-page-defaults"

// export default async function LandingDubaiPage() {
//   let data
//   try {
//     data = await fetchLandingPage("landing-dubai")
//   } catch {
//     data = createEmptyLandingPage()
//   }

//   return (
//     <div className="mx-auto w-full px-6 py-6">
//       <LandingPageFormClient initialData={data} />
//     </div>
//   )
// }

import { LandingPagesManager } from "@/components/cms/landing-page-form/landing-pages-manager"
import { fetchAllLandingPages } from "@/lib/landing-page-api"
import type { LandingPageApiData } from "@/types/api-landing-page"

export default async function LandingPagesIndexPage() {
  let pages: LandingPageApiData[] = []

  try {
    pages = await fetchAllLandingPages()
  } catch (error) {
    console.error("Failed to load landing pages:", error)
  }

  return (
    <div className="mx-auto w-full px-6 py-6">
      <LandingPagesManager pages={pages} />
    </div>
  )
}
