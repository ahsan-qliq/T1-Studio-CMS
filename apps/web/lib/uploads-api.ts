import { cmsApiJson } from "./cms-api-client"

export interface PresignedUploadUrl {
  uploadUrl: string
  key: string
}

/**
 * Asks the CMS backend for a presigned S3 PUT URL for a given file. The
 * caller uploads directly to `uploadUrl` afterwards — this never touches
 * the file bytes, only negotiates where they should go.
 */
export function getPresignedUploadUrl(
  fileName: string,
  contentType: string
): Promise<PresignedUploadUrl> {
  return cmsApiJson<PresignedUploadUrl>("/uploads/presigned-url", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    data: { fileName, contentType },
  })
}
