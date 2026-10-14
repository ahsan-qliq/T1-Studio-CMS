import { AccessibilityPageFormClient } from "@/components/cms/accessibility-page-form/accessibility-page-form-client"
import { fetchAccessibilityPage } from "@/lib/accessibility-page-api"
import { createEmptyAccessibilityPage } from "@/lib/accessibility-page-defaults"

export default async function AccessibilityPage() {
  let initialData
  try {
    initialData = await fetchAccessibilityPage()
  } catch {
    initialData = createEmptyAccessibilityPage()
  }
  return (
    <div className="mx-auto w-full px-6 py-6">
      <AccessibilityPageFormClient initialData={initialData} />
    </div>
  )
}
