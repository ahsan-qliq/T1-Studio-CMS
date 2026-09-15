import axios, {
  type AxiosError,
  type AxiosInstance,
  type InternalAxiosRequestConfig,
} from "axios"

const configuredBaseUrl =
  process.env.CMS_API_BASE_URL ?? "http://localhost:4000/api"

export const CMS_API_BASE_URL = configuredBaseUrl.replace(/\/+$/, "").endsWith("/api")
  ? configuredBaseUrl.replace(/\/+$/, "")
  : `${configuredBaseUrl.replace(/\/+$/, "")}/api`

export const authInstance = axios.create({
  baseURL: "/api",
  withCredentials: true,
  headers: { "Content-Type": "application/json" },
})

export interface AuthUser {
  id: string
  name: string
  email: string
  role: "admin" | "user"
}

export interface AuthResponse<T> {
  success: boolean
  data?: T
  message?: string
}

export interface LoginData {
  accessToken: string
  refreshToken: string
  user: AuthUser
}

export interface RefreshData {
  accessToken: string
  refreshToken: string
}

export interface RegisterInput {
  name: string
  email: string
  password: string
  role?: "admin" | "user"
}

export interface LoginInput {
  email: string
  password: string
}

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

export async function register(input: RegisterInput) {
  const response = await authInstance.post<AuthResponse<AuthUser>>(
    "/auth/register",
    { ...input, role: input.role ?? "admin" }
  )
  return response.data
}

export async function login(input: LoginInput) {
  const response = await authInstance.post<AuthResponse<LoginData>>(
    "/auth/login",
    input
  )
  return response.data
}

export async function refresh() {
  const response = await authInstance.post<AuthResponse<RefreshData>>(
    "/auth/refresh"
  )
  return response.data
}

export async function logout() {
  const response = await authInstance.post<AuthResponse<undefined>>(
    "/auth/logout"
  )
  return response.data
}

export async function me() {
  const response = await authInstance.get<AuthResponse<AuthUser>>("/auth/me")
  return response.data
}

export function getAuthErrorMessage(error: unknown): string {
  if (axios.isAxiosError(error)) {
    const payload = error.response?.data as { message?: string } | undefined
    return payload?.message ?? error.message
  }

  return error instanceof Error ? error.message : "Authentication failed"
}
