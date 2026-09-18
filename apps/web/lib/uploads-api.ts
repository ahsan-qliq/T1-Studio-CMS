import { cmsApiFetch } from "./cms-api-client"

export interface PresignedUploadUrl {
  uploadUrl: string
  key: string
}

interface PresignedApiResponse {
  success?: boolean
  data?: PresignedUploadUrl
  uploadUrl?: string
  key?: string
  message?: string
}

/**
 * Gets a presigned S3 PUT URL from the CMS API.
 *
 * Backend:
 *
 * POST /api/uploads/presigned-url
 *
 * Body:
 * {
 *   fileName: "hero.jpg",
 *   contentType: "image/jpeg"
 * }
 *
 * Response:
 * {
 *   data: {
 *     uploadUrl: "...",
 *     key: "uploads/..."
 *   }
 * }
 */
export async function getPresignedUploadUrl(
  fileName: string,
  contentType: string
): Promise<PresignedUploadUrl> {
  const response = await cmsApiFetch("/uploads/presigned-url", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    data: {
      fileName,
      contentType,
    },
  })

  const payload = response.data as PresignedApiResponse

  /*
   * Support the documented:
   *
   * {
   *   data: {
   *     uploadUrl,
   *     key
   *   }
   * }
   *
   * as well as a direct:
   *
   * {
   *   uploadUrl,
   *   key
   * }
   */
  const data = payload?.data ?? payload

  if (!data?.uploadUrl || !data?.key) {
    throw new Error(
      payload?.message ?? "CMS API did not return a valid uploadUrl and key."
    )
  }

  return {
    uploadUrl: data.uploadUrl,
    key: data.key,
  }
}
