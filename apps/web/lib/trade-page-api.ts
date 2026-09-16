import type { TradePageApiData } from "@/types/api-trade-page"
import { cmsApiFetch, cmsApiJson } from "./cms-api-client"

export function fetchTradePage() {
  return cmsApiJson<TradePageApiData>("/trade-page?slug=trade")
}

export function saveTradePage(data: TradePageApiData) {
  return cmsApiFetch(`/trade-page${data._id ? "?slug=trade" : ""}`, {
    method: data._id ? "PATCH" : "POST",
    headers: { "Content-Type": "application/json" },
    data,
  })
}
