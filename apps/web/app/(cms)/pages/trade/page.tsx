import { TradePageFormClient } from "@/components/cms/trade-page-form/trade-page-form-client"
import { fetchTradePage } from "@/lib/trade-page-api"
import { createEmptyTradePage } from "@/lib/trade-page-defaults"

export default async function TradePage() {
  let initialData
  try {
    initialData = await fetchTradePage()
  } catch {
    initialData = createEmptyTradePage()
  }
  return (
    <div className="mx-auto w-full px-6 py-6">
      <TradePageFormClient initialData={initialData} />
    </div>
  )
}
