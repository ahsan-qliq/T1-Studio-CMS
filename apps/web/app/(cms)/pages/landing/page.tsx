import { LandingPageFormClient } from "@/components/cms/landing-page-form/landing-page-form-client"

import { fetchLandingPage } from "@/lib/landing-page-api"

import { createEmptyLandingPage } from "@/lib/landing-page-defaults"

export default async function LandingDubaiPage() {
  try {
    const data = await fetchLandingPage("landing-dubai")

    return (
      <div className="mx-auto w-full px-6 py-6">
        <LandingPageFormClient initialData={data} />
      </div>
    )
  } catch {
    return (
      <div className="mx-auto w-full px-6 py-6">
        <LandingPageFormClient initialData={createEmptyLandingPage()} />
      </div>
    )
  }
}
