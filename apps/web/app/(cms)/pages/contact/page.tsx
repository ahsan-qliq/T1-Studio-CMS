import { ContactPageFormClient } from "@/components/cms/contact-page-form/contact-page-form-client"
import { fetchContactPage } from "@/lib/contact-page-api"
import { createEmptyContactPage } from "@/lib/contact-page-defaults"

export default async function ContactPage() {
  let initialData
  try { initialData = await fetchContactPage() } catch { initialData = createEmptyContactPage() }
  return <div className="mx-auto w-full px-6 py-6"><ContactPageFormClient initialData={initialData} /></div>
}
