import { CookiePolicyPageFormClient } from "@/components/cms/cookie-policy-page-form/cookie-policy-page-form-client"
import { fetchCookiePolicyPage } from "@/lib/cookie-policy-page-api"
import { createEmptyCookiePolicyPage } from "@/lib/cookie-policy-page-defaults"

export default async function CookiePolicyPage() {
  let initialData
  try {
    initialData = await fetchCookiePolicyPage()
  } catch {
    initialData = createEmptyCookiePolicyPage()
  }
  return (
    <div className="mx-auto w-full px-6 py-6">
      <CookiePolicyPageFormClient initialData={initialData} />
    </div>
  )
}
