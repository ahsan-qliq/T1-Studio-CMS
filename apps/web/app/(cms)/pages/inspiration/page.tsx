import { InspirationPageFormClient } from "@/components/cms/inspiration-page-form/inspiration-page-form-client"
import { fetchInspirationPage } from "@/lib/inspiration-page-api"
import { createEmptyInspirationPage } from "@/lib/inspiration-page-defaults"

export default async function InspirationPage() {
  let initialData
  try { initialData = await fetchInspirationPage() } catch { initialData = createEmptyInspirationPage() }
  return <div className="mx-auto w-full px-6 py-6"><InspirationPageFormClient initialData={initialData} /></div>
}
