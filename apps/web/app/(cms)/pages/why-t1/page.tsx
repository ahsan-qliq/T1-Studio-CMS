import { WhyT1PageFormClient } from "@/components/cms/why-t1-page-form/why-t1-page-form-client"
import { fetchWhyT1Page } from "@/lib/why-t1-page-api"
import { createEmptyWhyT1Page } from "@/lib/why-t1-page-defaults"

export default async function WhyT1Page() {
  try {
    return <div className="mx-auto w-full px-6 py-6"><WhyT1PageFormClient initialData={await fetchWhyT1Page()} /></div>
  } catch {
    return <div className="mx-auto max-w-2xl px-6 py-16 text-center"><h1 className="text-lg font-semibold text-zinc-900">Couldn&apos;t load Why T1 page</h1><p className="mt-2 text-sm text-zinc-500">Check that the API is running and the page exists.</p></div>
  }
}
