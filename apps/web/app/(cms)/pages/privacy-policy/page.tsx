import { PrivacyPolicyPageFormClient } from "@/components/cms/privacy-policy-page-form/privacy-policy-page-form-client"
import { fetchPrivacyPolicyPage } from "@/lib/privacy-policy-page-api"
import { createEmptyPrivacyPolicyPage } from "@/lib/privacy-policy-page-defaults"

export default async function PrivacyPolicyPage() {
  let initialData
  try {
    initialData = await fetchPrivacyPolicyPage()
  } catch {
    initialData = createEmptyPrivacyPolicyPage()
  }
  return (
    <div className="mx-auto w-full px-6 py-6">
      <PrivacyPolicyPageFormClient initialData={initialData} />
    </div>
  )
}
