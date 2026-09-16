import { cmsApiJson } from "./cms-api-client"

export interface CurrentUser {
  id?: string
  name?: string
  email?: string
  role?: string
  avatar?: string
}

export function fetchCurrentUser() {
  return cmsApiJson<CurrentUser>("/auth/me")
}
