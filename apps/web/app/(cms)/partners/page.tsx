import { PartnersList } from "@/components/cms/partners/partners-list"
import type { Partner } from "@/components/cms/partners/partners-list"

// TODO: Replace with real API call — cmsApiJson<Partner[]>("/partners")
const MOCK_PARTNERS: Partner[] = [
  {
    id: "sub_001",
    name: "James Harrington",
    email: "james.harrington@studio.ae",
    category: "trade",
    status: "pending",
    submittedAt: "2026-10-07T09:14:00Z",
  },
  {
    id: "sub_002",
    name: "Layla Al-Mansoori",
    email: "layla@mansooridesign.com",
    category: "referral",
    status: "pending",
    submittedAt: "2026-10-07T11:32:00Z",
  },
  {
    id: "sub_003",
    name: "Marcus Voss",
    email: "m.voss@archform.de",
    category: "trade",
    status: "accepted",
    submittedAt: "2026-10-05T14:20:00Z",
  },
  {
    id: "sub_004",
    name: "Priya Nair",
    email: "priya.nair@interiors.in",
    category: "referral",
    status: "rejected",
    submittedAt: "2026-10-04T08:55:00Z",
  },
  {
    id: "sub_005",
    name: "Omar Khalil",
    email: "omar@khalilstudio.ae",
    category: "trade",
    status: "pending",
    submittedAt: "2026-10-08T16:05:00Z",
  },
]

export default function PartnersPage() {
  return (
    <div className="flex flex-col gap-6 p-6">
      <div>
        <h1 className="text-base font-semibold text-zinc-900">Partners</h1>
        <p className="text-xs text-zinc-500 mt-0.5">
          Review and action trade &amp; referral applications
        </p>
      </div>
      <PartnersList initialPartners={MOCK_PARTNERS} />
    </div>
  )
}
