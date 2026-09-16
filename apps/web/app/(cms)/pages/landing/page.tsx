import { LandingPageFormClient } from "@/components/cms/landing-page-form/landing-page-form-client"
import { fetchLandingPage } from "@/lib/landing-page-api"
import { createEmptyLandingPage } from "@/lib/landing-page-defaults"
export default async function LandingPage() {
  let data
  try { data = await fetchLandingPage() } catch { data = createEmptyLandingPage() }
  return <div className="mx-auto w-full px-6 py-6"><LandingPageFormClient initialData={data} /></div>
}
