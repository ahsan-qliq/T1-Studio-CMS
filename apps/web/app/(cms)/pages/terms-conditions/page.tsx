import { TermsConditionsPageFormClient } from "@/components/cms/terms-conditions-page-form/terms-conditions-page-form-client"
import { fetchTermsConditionsPage } from "@/lib/terms-conditions-page-api"
import { createEmptyTermsConditionsPage } from "@/lib/terms-conditions-page-defaults"

export default async function TermsConditionsPage() {
  let initialData
  try {
    initialData = await fetchTermsConditionsPage()
  } catch {
    initialData = createEmptyTermsConditionsPage()
  }
  return (
    <div className="mx-auto w-full px-6 py-6">
      <TermsConditionsPageFormClient initialData={initialData} />
    </div>
  )
}
