import { WhyT1PageFormClient } from "@/components/cms/why-t1-page-form/why-t1-page-form-client"
import { fetchWhyT1Page } from "@/lib/why-t1-page-api"
import { createEmptyWhyT1Page } from "@/lib/why-t1-page-defaults"

export default async function WhyT1Page() {
  let initialData
  try { initialData = await fetchWhyT1Page() } catch { initialData = createEmptyWhyT1Page() }
  return <div className="mx-auto w-full px-6 py-6"><WhyT1PageFormClient initialData={initialData} /></div>
}
