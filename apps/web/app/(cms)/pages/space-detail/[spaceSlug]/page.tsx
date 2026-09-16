import { SpaceDetailFormClient } from "@/components/cms/space-detail-form/space-detail-form-client"
import { fetchSpaceDetailPage } from "@/lib/space-detail-page-api"
import { createEmptySpaceDetailPage } from "@/lib/page-defaults"

interface SpaceDetailPageProps {
  params: Promise<{ spaceSlug: string }>
}

export default async function SpaceDetailEditorPage({ params }: SpaceDetailPageProps) {
  const { spaceSlug } = await params

  let data
  try {
    // fetchSpaceDetailPage returns null on a 404 — fall back to a blank
    // skeleton for that slug so this always renders an editable form; the
    // first save then creates the record via POST.
    data = (await fetchSpaceDetailPage(spaceSlug)) ?? createEmptySpaceDetailPage({
      pageName: spaceSlug,
      spaceType: spaceSlug,
      slug: spaceSlug,
    })
  } catch (err) {
    return (
      <div className="mx-auto max-w-2xl px-6 py-16 text-center">
        <h1 className="text-lg font-semibold text-zinc-900">Couldn&apos;t load this space page</h1>
        <p className="mt-2 text-sm text-zinc-500">
          {err instanceof Error ? err.message : "Unknown error"} — is the API running at the
          configured CMS_API_BASE_URL?
        </p>
      </div>
    )
  }

  return (
    <div className="mx-auto max-w-4xl px-6 py-6">
      <SpaceDetailFormClient initialData={data} />
    </div>
  )
}
