import { AboutPageFormClient } from "@/components/cms/about-page-form/about-page-form-client"
import { fetchAboutPage } from "@/lib/about-page-api"

export default async function AboutPage() {
  try {
    return <div className="mx-auto w-full px-6 py-6"><AboutPageFormClient initialData={await fetchAboutPage()} /></div>
  } catch {
    return <div className="mx-auto max-w-2xl px-6 py-16 text-center"><h1 className="text-lg font-semibold text-zinc-900">Couldn&apos;t load About page</h1><p className="mt-2 text-sm text-zinc-500">Check that the API is running and the page exists.</p></div>
  }
}
