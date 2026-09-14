// import { notFound } from "next/navigation"
// import { PageEditor } from "@/components/cms/page-editor/page-editor"
// import { homePage } from "@/data/mock"

// interface PageEditorPageProps {
//   params: Promise<{ slug: string }>
// }

// export function generateStaticParams() {
//   return [{ slug: "home" }]
// }

// export default async function PageEditorPage({ params }: PageEditorPageProps) {
//   const { slug } = await params

//   // For now only the home page is implemented with full data
//   if (slug !== "home") {
//     notFound()
//   }

//   return <PageEditor page={homePage} />
// }

import { notFound } from "next/navigation"
import { HomePageFormClient } from "@/components/cms/home-page-form/home-page-form-client"
import { fetchRawHomePage } from "@/lib/home-page-api"

interface PageEditorPageProps {
  params: Promise<{ slug: string }>
}

export function generateStaticParams() {
  return [{ slug: "home" }]
}

export default async function PageEditorPage({ params }: PageEditorPageProps) {
  const { slug } = await params

  // For now only the home page is implemented with full data
  if (slug !== "home") {
    notFound()
  }

  // Loads the raw API shape directly — the form's fields map 1:1 to it,
  // so there's no adapter/mapping layer between the API and the UI.
  let data
  try {
    data = await fetchRawHomePage()
  } catch (err) {
    return (
      <div className="mx-auto max-w-2xl px-6 py-16 text-center">
        <h1 className="text-lg font-semibold text-zinc-900">
          Couldn&apos;t load the home page
        </h1>
        <p className="mt-2 text-sm text-zinc-500">
          {err instanceof Error ? err.message : "Unknown error"} — is the API
          running at the configured CMS_API_BASE_URL?
        </p>
      </div>
    )
  }

  return (
    <div className="mx-auto w-full px-6 py-6">
      <HomePageFormClient initialData={data} />
    </div>
  )
}
