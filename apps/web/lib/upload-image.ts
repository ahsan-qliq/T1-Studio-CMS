export interface UploadedImage {
  url: string
  key: string
}

interface PresignedUploadResponse {
  success: boolean
  data?: {
    uploadUrl: string
    key: string
  }
  message?: string
}

/**
 * Uploads an image directly to S3 using a presigned PUT URL.
 *
 * Flow:
 *
 * 1. POST fileName + contentType to our API.
 * 2. API returns a presigned S3 upload URL + object key.
 * 3. PUT the actual file directly to S3.
 * 4. Return both the public URL and S3 key.
 *
 * The key is important because the CMS backend uses it when
 * generating the CloudFront image URL.
 */
export async function uploadImage(file: File): Promise<UploadedImage> {
  if (!file) {
    throw new Error("No image selected.")
  }

  const allowedTypes = ["image/jpeg", "image/png", "image/webp"]

  if (!allowedTypes.includes(file.type)) {
    throw new Error("Please upload a JPG, PNG or WEBP image.")
  }

  const maxFileSize = 5 * 1024 * 1024

  if (file.size > maxFileSize) {
    throw new Error("Image must be smaller than 5MB.")
  }

  /*
   * Step 1:
   * Ask our backend for a presigned S3 upload URL.
   */

  const presignedResponse = await fetch("/api/uploads/presigned-url", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
    body: JSON.stringify({
      fileName: file.name,
      contentType: file.type,
    }),
  })

  let presignedResult: PresignedUploadResponse

  try {
    presignedResult =
      (await presignedResponse.json()) as PresignedUploadResponse
  } catch {
    throw new Error(
      `Upload API returned an invalid response (${presignedResponse.status}).`
    )
  }

  if (
    !presignedResponse.ok ||
    !presignedResult.success ||
    !presignedResult.data?.uploadUrl ||
    !presignedResult.data?.key
  ) {
    throw new Error(
      presignedResult.message ||
        `Failed to get upload URL (${presignedResponse.status}).`
    )
  }

  const { uploadUrl, key } = presignedResult.data

  /*
   * Step 2:
   * Upload the actual file directly to S3.
   *
   * The Content-Type must match the contentType that was
   * supplied when generating the presigned URL.
   */
  const uploadResponse = await fetch(uploadUrl, {
    method: "PUT",
    headers: {
      "Content-Type": file.type,
    },
    body: file,
  })

  if (!uploadResponse.ok) {
    throw new Error(
      `Failed to upload image to storage (${uploadResponse.status}).`
    )
  }

  /*
   * Remove the presigned query string.
   *
   * Example:
   *
   * https://bucket.s3.amazonaws.com/uploads/abc.jpg?X-Amz-...
   *
   * becomes:
   *
   * https://bucket.s3.amazonaws.com/uploads/abc.jpg
   */
  const url = uploadUrl.split("?")[0]

  if (!url) {
    throw new Error("Failed to determine uploaded image URL.")
  }

  /*
   * IMPORTANT:
   * Return BOTH url and key.
   *
   * The form stores both values and cms-api-client.ts
   * sends both values to the CMS API.
   */
  return {
    url,
    key,
  }
}
