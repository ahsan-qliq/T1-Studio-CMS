import { LandingPageFormClient } from "@/components/cms/landing-page-form/landing-page-form-client"
import { fetchLandingPage } from "@/lib/landing-page-api"
import { createEmptyLandingPage } from "@/lib/landing-page-defaults"

interface LandingDetailPageProps {
  params: Promise<{ landingSlug: string }>
}

export default async function LandingDetailPage({
  params,
}: LandingDetailPageProps) {
  const { landingSlug } = await params

  let data

  if (landingSlug === "new") {
    data = createEmptyLandingPage({ slug: "", pageName: "" })
  } else {
    try {
      data = await fetchLandingPage(landingSlug)
    } catch (err) {
      return (
        <div className="mx-auto max-w-2xl px-6 py-16 text-center">
          <h1 className="text-lg font-semibold text-zinc-900">
            Couldn&apos;t load this landing page
          </h1>
          <p className="mt-2 text-sm text-zinc-500">
            {err instanceof Error ? err.message : "Unknown error"} — is the
            API running at the configured CMS_API_BASE_URL, and does a
            record exist for slug &quot;{landingSlug}&quot;?
          </p>
        </div>
      )
    }
  }

  return (
    <div className="mx-auto w-full px-6 py-6">
      <LandingPageFormClient initialData={data} />
    </div>
  )
}