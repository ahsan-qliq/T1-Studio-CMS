import { SpaceDetailFormClient } from "@/components/cms/space-detail-form/space-detail-form-client"
import { fetchSpaceDetailPage } from "@/lib/space-detail-page-api"
import { createEmptySpaceDetailPage } from "@/lib/space-detail-page-defaults"

interface SpaceDetailPageProps {
  params: Promise<{ spaceSlug: string }>
}

export default async function SpaceDetailEditorPage({ params }: SpaceDetailPageProps) {
  const { spaceSlug } = await params

  let data
  if (spaceSlug === "new") {
    data = createEmptySpaceDetailPage()
  } else {
    try {
      data = await fetchSpaceDetailPage(spaceSlug)
    } catch (err) {
      return (
        <div className="mx-auto max-w-2xl px-6 py-16 text-center">
          <h1 className="text-lg font-semibold text-zinc-900">
            Couldn&apos;t load this space page
          </h1>
          <p className="mt-2 text-sm text-zinc-500">
            {err instanceof Error ? err.message : "Unknown error"} — is the API
            running at the configured CMS_API_BASE_URL, and does a record exist
            for slug &quot;{spaceSlug}&quot;?
          </p>
        </div>
      )
    }
  }

  return (
    <div className="mx-auto max-w-4xl px-6 py-6">
      <SpaceDetailFormClient initialData={data} />
    </div>
  )
}
