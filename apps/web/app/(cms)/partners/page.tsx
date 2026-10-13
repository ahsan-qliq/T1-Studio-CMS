import { PartnersList } from "@/components/cms/partners/partners-list"
import type { Partner } from "@/components/cms/partners/partners-list"
import { cmsApiFetch } from "@/lib/cms-api-client"

async function getTradeSubmissions(): Promise<Partner[]> {
  try {
    const res = await cmsApiFetch("/trade-submissions")
    const data = res.data.submissions
    return Array.isArray(data) ? (data as Partner[]) : []
  } catch (error) {
    console.error("[partners] Failed to fetch trade submissions:", error)
    return []
  }
}

export default async function PartnersPage() {
  const partners = await getTradeSubmissions()

  return (
    <div className="flex flex-col gap-6 p-6">
      <div>
        <h1 className="text-base font-semibold text-zinc-900">Partners</h1>
        <p className="text-xs text-zinc-500 mt-0.5">
          Review and action trade &amp; referral applications
        </p>
      </div>
      <PartnersList initialPartners={partners} />
    </div>
  )
}
