export interface UploadedImage {
  url: string
  key: string
}

interface PresignedUploadResponse {
  success: boolean
  data?: {
    uploadUrl: string
    key: string
    url?: string
    publicUrl?: string
  }
  message?: string
}

const ALLOWED_IMAGE_TYPES = ["image/jpeg", "image/png", "image/webp"]

const MAX_FILE_SIZE = 5 * 1024 * 1024

export async function uploadImage(file: File): Promise<UploadedImage> {
  if (!file) {
    throw new Error("No image selected.")
  }

  if (!ALLOWED_IMAGE_TYPES.includes(file.type)) {
    throw new Error("Please upload a JPG, PNG or WEBP image.")
  }

  if (file.size > MAX_FILE_SIZE) {
    throw new Error("Image must be smaller than 5MB.")
  }

  /*
   * =========================================================
   * STEP 1
   * Ask our Next.js API for a presigned S3 URL.
   * =========================================================
   */

  const presignedResponse = await fetch("/api/uploads/presigned-url", {
    method: "POST",

    headers: {
      "Content-Type": "application/json",
    },

    credentials: "include",

    cache: "no-store",

    body: JSON.stringify({
      fileName: file.name,
      contentType: file.type,
    }),
  })

  let result: PresignedUploadResponse

  try {
    result = (await presignedResponse.json()) as PresignedUploadResponse
  } catch {
    throw new Error(
      `Upload API returned an invalid response (${presignedResponse.status}).`
    )
  }

  if (!presignedResponse.ok) {
    throw new Error(
      result?.message ||
        `Failed to get upload URL (${presignedResponse.status}).`
    )
  }

  if (!result.success || !result.data?.uploadUrl || !result.data?.key) {
    throw new Error(
      result?.message || "Upload API did not return uploadUrl and key."
    )
  }

  const { uploadUrl, key, publicUrl, url: returnedUrl } = result.data

  /*
   * =========================================================
   * STEP 2
   * Upload file directly to S3.
   * =========================================================
   *
   * IMPORTANT:
   * Content-Type MUST be exactly the same value used when
   * generating the presigned URL.
   */

  let uploadResponse: Response

  try {
    uploadResponse = await fetch(uploadUrl, {
      method: "PUT",

      headers: {
        "Content-Type": file.type,
      },

      body: file,
    })
  } catch (error) {
    console.error("S3 upload request failed:", error)

    throw new Error(
      "Could not connect to image storage. Check the S3 bucket CORS configuration."
    )
  }

  if (!uploadResponse.ok) {
    let storageMessage = ""

    try {
      storageMessage = await uploadResponse.text()
    } catch {
      // Ignore response parsing errors.
    }

    console.error("S3 upload failed:", {
      status: uploadResponse.status,
      statusText: uploadResponse.statusText,
      response: storageMessage,
    })

    throw new Error(`Image upload to S3 failed (${uploadResponse.status}).`)
  }

  /*
   * =========================================================
   * STEP 3
   * Determine the non-presigned URL.
   * =========================================================
   *
   * The important value for MongoDB is `key`.
   *
   * If the backend gives us a public URL, use it.
   * Otherwise remove the query string from the presigned URL.
   */

  const url = publicUrl || returnedUrl || uploadUrl.split("?")[0]

  if (!url) {
    throw new Error(
      "Image uploaded successfully, but no image URL was returned."
    )
  }

  /*
   * =========================================================
   * STEP 4
   * Return BOTH URL and S3 key.
   * =========================================================
   */

  return {
    url,
    key,
  }
}
