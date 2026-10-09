"use client"

import { useState } from "react"
import { CheckCircle, XCircle, Clock, X } from "lucide-react"
import { cn } from "@workspace/ui/lib/utils"

export type PartnerCategory = "trade" | "referral"
export type PartnerStatus = "pending" | "accepted" | "rejected"

export interface Partner {
  id: string
  name: string
  email: string
  category: PartnerCategory
  status: PartnerStatus
  submittedAt: string
}

type FilterTab = "all" | PartnerStatus

interface ConfirmState {
  partnerId: string
  action: "accepted" | "rejected"
  name: string
}

// ─── Badge helpers ────────────────────────────────────────────────────────────

function StatusBadge({ status }: { status: PartnerStatus }) {
  const map: Record<PartnerStatus, { label: string; className: string }> = {
    pending: {
      label: "Pending",
      className: "bg-amber-50 text-amber-700 border-amber-200",
    },
    accepted: {
      label: "Accepted",
      className: "bg-emerald-50 text-emerald-700 border-emerald-200",
    },
    rejected: {
      label: "Rejected",
      className: "bg-red-50 text-red-700 border-red-200",
    },
  }
  const { label, className } = map[status]
  return (
    <span
      className={cn(
        "inline-flex items-center rounded border px-1.5 py-0.5 text-[10px] font-semibold",
        className
      )}
    >
      {label}
    </span>
  )
}

function CategoryBadge({ category }: { category: PartnerCategory }) {
  const map: Record<PartnerCategory, { label: string; className: string }> = {
    trade: {
      label: "Trade",
      className: "bg-purple-50 text-purple-700 border-purple-200",
    },
    referral: {
      label: "Referral",
      className: "bg-teal-50 text-teal-700 border-teal-200",
    },
  }
  const { label, className } = map[category]
  return (
    <span
      className={cn(
        "inline-flex items-center rounded border px-1.5 py-0.5 text-[10px] font-semibold",
        className
      )}
    >
      {label}
    </span>
  )
}

// ─── Confirm Dialog ───────────────────────────────────────────────────────────

function ConfirmDialog({
  confirm,
  loading,
  onConfirm,
  onCancel,
}: {
  confirm: ConfirmState
  loading: boolean
  onConfirm: () => void
  onCancel: () => void
}) {
  const isAccept = confirm.action === "accepted"

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/30"
      role="dialog"
      aria-modal="true"
      aria-labelledby="confirm-title"
    >
      <div className="relative w-full max-w-sm rounded-xl border border-zinc-200 bg-white shadow-lg p-6">
        <button
          onClick={onCancel}
          className="absolute right-4 top-4 rounded p-1 text-zinc-400 hover:bg-zinc-100 hover:text-zinc-600"
          aria-label="Close"
        >
          <X className="size-4" />
        </button>

        <div className="flex items-start gap-3">
          {isAccept ? (
            <CheckCircle className="mt-0.5 size-5 shrink-0 text-emerald-500" />
          ) : (
            <XCircle className="mt-0.5 size-5 shrink-0 text-red-500" />
          )}
          <div>
            <p id="confirm-title" className="text-sm font-semibold text-zinc-900">
              {isAccept ? "Accept partner?" : "Reject partner?"}
            </p>
            <p className="mt-1 text-xs text-zinc-500">
              {confirm.name} will receive an email notification about this decision.
            </p>
          </div>
        </div>

        <div className="mt-5 flex justify-end gap-2">
          <button
            onClick={onCancel}
            disabled={loading}
            className="rounded-lg border border-zinc-200 px-3 py-1.5 text-xs font-medium text-zinc-600 transition-colors hover:bg-zinc-50 disabled:opacity-50"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            disabled={loading}
            className={cn(
              "rounded-lg px-3 py-1.5 text-xs font-medium text-white transition-colors disabled:opacity-50",
              isAccept
                ? "bg-emerald-600 hover:bg-emerald-700"
                : "bg-red-600 hover:bg-red-700"
            )}
          >
            {loading ? "Processing…" : isAccept ? "Yes, accept" : "Yes, reject"}
          </button>
        </div>
      </div>
    </div>
  )
}

// ─── Main list ────────────────────────────────────────────────────────────────

const FILTER_TABS: { key: FilterTab; label: string }[] = [
  { key: "all", label: "All" },
  { key: "pending", label: "Pending" },
  { key: "accepted", label: "Accepted" },
  { key: "rejected", label: "Rejected" },
]

export function PartnersList({ initialPartners }: { initialPartners: Partner[] }) {
  const [partners, setPartners] = useState<Partner[]>(initialPartners)
  const [activeTab, setActiveTab] = useState<FilterTab>("all")
  const [confirm, setConfirm] = useState<ConfirmState | null>(null)
  const [loading, setLoading] = useState(false)
  const [toast, setToast] = useState<{
    message: string
    type: "success" | "error"
  } | null>(null)

  const filtered =
    activeTab === "all"
      ? partners
      : partners.filter((p) => p.status === activeTab)

  const counts: Record<FilterTab, number> = {
    all: partners.length,
    pending: partners.filter((p) => p.status === "pending").length,
    accepted: partners.filter((p) => p.status === "accepted").length,
    rejected: partners.filter((p) => p.status === "rejected").length,
  }

  function showToast(message: string, type: "success" | "error") {
    setToast({ message, type })
    setTimeout(() => setToast(null), 3500)
  }

  async function handleConfirm() {
    if (!confirm) return
    setLoading(true)

    const partner = partners.find((p) => p.id === confirm.partnerId)
    if (!partner) {
      setLoading(false)
      return
    }

    try {
      const res = await fetch(`/api/partners/${confirm.partnerId}/status`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          category: partner.category,
          status: confirm.action,
          email: partner.email,
        }),
      })

      const data = (await res.json()) as { success: boolean; message?: string }

      if (!res.ok || !data.success) {
        throw new Error(data.message ?? "Request failed")
      }

      setPartners((prev) =>
        prev.map((p) =>
          p.id === confirm.partnerId ? { ...p, status: confirm.action } : p
        )
      )
      showToast(
        `${partner.name} has been ${confirm.action}. Email notification sent.`,
        "success"
      )
    } catch (err) {
      showToast(
        err instanceof Error ? err.message : "Something went wrong",
        "error"
      )
    } finally {
      setLoading(false)
      setConfirm(null)
    }
  }

  return (
    <>
      {/* Toast */}
      {toast && (
        <div
          className={cn(
            "fixed bottom-5 right-5 z-50 flex items-center gap-2 rounded-lg border px-4 py-3 text-xs font-medium shadow-lg",
            toast.type === "success"
              ? "border-emerald-200 bg-emerald-50 text-emerald-800"
              : "border-red-200 bg-red-50 text-red-800"
          )}
          role="status"
        >
          {toast.type === "success" ? (
            <CheckCircle className="size-4 shrink-0" />
          ) : (
            <XCircle className="size-4 shrink-0" />
          )}
          {toast.message}
        </div>
      )}

      {/* Confirm dialog */}
      {confirm && (
        <ConfirmDialog
          confirm={confirm}
          loading={loading}
          onConfirm={handleConfirm}
          onCancel={() => setConfirm(null)}
        />
      )}

      {/* Filter tabs */}
      <div className="flex items-center gap-1 border-b border-zinc-100 pb-0">
        {FILTER_TABS.map((tab) => (
          <button
            key={tab.key}
            onClick={() => setActiveTab(tab.key)}
            className={cn(
              "flex items-center gap-1.5 border-b-2 px-3 pb-2.5 pt-1 text-xs font-medium transition-colors",
              activeTab === tab.key
                ? "border-zinc-900 text-zinc-900"
                : "border-transparent text-zinc-500 hover:text-zinc-700"
            )}
          >
            {tab.label}
            <span
              className={cn(
                "inline-flex h-4 min-w-4 items-center justify-center rounded-full px-1 text-[10px] font-semibold",
                activeTab === tab.key
                  ? "bg-zinc-900 text-white"
                  : "bg-zinc-100 text-zinc-500"
              )}
            >
              {counts[tab.key]}
            </span>
          </button>
        ))}
      </div>

      {/* Table */}
      <div className="rounded-lg border border-zinc-200 bg-white overflow-hidden">
        {/* Header */}
        <div className="grid grid-cols-[1fr_1fr_90px_90px_120px_auto] items-center border-b border-zinc-100 bg-zinc-50 px-4 py-2.5 text-[10px] font-semibold uppercase tracking-wide text-zinc-500">
          <span>Name</span>
          <span>Email</span>
          <span>Category</span>
          <span>Status</span>
          <span>Submitted</span>
          <span />
        </div>

        {/* Rows */}
        {filtered.length === 0 ? (
          <div className="flex flex-col items-center justify-center gap-2 py-14 text-zinc-400">
            <Clock className="size-8 stroke-[1.5]" />
            <p className="text-xs font-medium">No partners</p>
          </div>
        ) : (
          filtered.map((partner) => (
            <PartnerRow
              key={partner.id}
              partner={partner}
              onAction={(action) =>
                setConfirm({ partnerId: partner.id, action, name: partner.name })
              }
            />
          ))
        )}
      </div>
    </>
  )
}

// ─── Row ──────────────────────────────────────────────────────────────────────

function PartnerRow({
  partner,
  onAction,
}: {
  partner: Partner
  onAction: (action: "accepted" | "rejected") => void
}) {
  const date = new Date(partner.submittedAt).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
  })

  return (
    <div className="grid grid-cols-[1fr_1fr_90px_90px_120px_auto] items-center border-b border-zinc-100 px-4 py-3 last:border-0 hover:bg-zinc-50/60 transition-colors">
      <span className="truncate text-sm font-medium text-zinc-900">
        {partner.name}
      </span>

      <span className="truncate text-xs text-zinc-500">{partner.email}</span>

      <CategoryBadge category={partner.category} />

      <StatusBadge status={partner.status} />

      <span className="text-xs text-zinc-400">{date}</span>

      {/* Actions */}
      <div className="flex items-center justify-end gap-1.5">
        {partner.status === "pending" ? (
          <>
            <button
              onClick={() => onAction("accepted")}
              aria-label={`Accept ${partner.name}`}
              className="inline-flex items-center gap-1 rounded border border-emerald-200 bg-emerald-50 px-2 py-1 text-xs font-medium text-emerald-700 transition-colors hover:bg-emerald-100"
            >
              <CheckCircle className="size-3" />
              Accept
            </button>
            <button
              onClick={() => onAction("rejected")}
              aria-label={`Reject ${partner.name}`}
              className="inline-flex items-center gap-1 rounded border border-red-200 bg-red-50 px-2 py-1 text-xs font-medium text-red-700 transition-colors hover:bg-red-100"
            >
              <XCircle className="size-3" />
              Reject
            </button>
          </>
        ) : (
          <span className="w-[110px]" aria-hidden="true" />
        )}
      </div>
    </div>
  )
}
