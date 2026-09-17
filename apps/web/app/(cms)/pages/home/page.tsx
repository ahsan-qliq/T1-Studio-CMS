import { HomePageFormClient } from "@/components/cms/home-page-form/home-page-form-client"
import { fetchHomePage } from "@/lib/home-page-api"
import { createEmptyHomePage } from "@/lib/home-page-defaults"

export default async function AboutPage() {
  let initialData
  try {
    initialData = await fetchHomePage()
  } catch {
    initialData = createEmptyHomePage()
  }
  return (
    <div className="mx-auto w-full px-6 py-6">
      <HomePageFormClient initialData={initialData} />
    </div>
  )
}
