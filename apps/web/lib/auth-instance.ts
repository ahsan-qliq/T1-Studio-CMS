import axios, {
  type AxiosError,
  type AxiosInstance,
  type InternalAxiosRequestConfig,
} from "axios"

const configuredBaseUrl =
  process.env.CMS_API_BASE_URL ?? "http://localhost:5000/api"

export const CMS_API_BASE_URL = configuredBaseUrl.replace(/\/+$/, "").endsWith("/api")
  ? configuredBaseUrl.replace(/\/+$/, "")
  : `${configuredBaseUrl.replace(/\/+$/, "")}/api`

export const authInstance = axios.create({
  baseURL: "/api",
  withCredentials: true,
  headers: { "Content-Type": "application/json" },
})

let refreshRequest: Promise<unknown> | null = null

authInstance.interceptors.response.use(
  (response) => response,
  async (error: AxiosError) => {
    const request = error.config as
      | (InternalAxiosRequestConfig & { _retry?: boolean })
      | undefined
    const isRefreshRequest = request?.url?.endsWith("/auth/refresh")

    if (error.response?.status !== 401 || !request || request._retry || isRefreshRequest) {
      throw error
    }

    request._retry = true
    refreshRequest ??= authInstance.post("/auth/refresh").finally(() => {
      refreshRequest = null
    })

    try {
      await refreshRequest
      return authInstance(request)
    } catch {
      throw error
    }
  }
)

export function createCmsAuthInstance(accessToken?: string): AxiosInstance {
  return axios.create({
    baseURL: CMS_API_BASE_URL,
    headers: accessToken
      ? { Authorization: `Bearer ${accessToken}` }
      : undefined,
  })
}
