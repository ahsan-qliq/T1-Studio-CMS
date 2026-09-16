import { ContactPageFormClient } from "@/components/cms/contact-page-form/contact-page-form-client"
import { fetchContactPage } from "@/lib/contact-page-api"

export default async function ContactPage() {
  try {
    return <div className="mx-auto w-full px-6 py-6"><ContactPageFormClient initialData={await fetchContactPage()} /></div>
  } catch {
    return <div className="mx-auto max-w-2xl px-6 py-16 text-center"><h1 className="text-lg font-semibold text-zinc-900">Couldn&apos;t load Contact page</h1><p className="mt-2 text-sm text-zinc-500">Check that the API is running and the page exists.</p></div>
  }
}
