import { AboutPageFormClient } from "@/components/cms/about-page-form/about-page-form-client"
import { fetchAboutPage } from "@/lib/about-page-api"
import { createEmptyAboutPage } from "@/lib/about-page-defaults"

export default async function AboutPage() {
  let initialData
  try {
    initialData = await fetchAboutPage()
  } catch {
    initialData = createEmptyAboutPage()
  }
  return (
    <div className="mx-auto w-full px-6 py-6">
      <AboutPageFormClient initialData={initialData} />
    </div>
  )
}
