export interface UploadedImage {
  url: string
  key: string
}

/**
 * Uploads a file straight to S3 using a presigned URL, without the file
 * bytes ever passing through our own server:
 *
 *  1. Ask our API for a presigned PUT URL + the S3 object key.
 *  2. PUT the file directly to that URL.
 *  3. Derive the object's public URL from the presigned URL (a presigned
 *     PUT URL is the object's own URL with a signature query string
 *     attached, so stripping the query string gives the direct object
 *     URL — this assumes the bucket/CDN serves that path publicly).
 *
 * Callers persist `key` (and usually `url`, for immediate display)
 * alongside their normal form data; nothing here talks to MongoDB.
 */
export async function uploadImage(file: File): Promise<UploadedImage> {
  const presignedResponse = await fetch("/api/uploads/presigned-url", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      fileName: file.name,
      contentType: file.type,
    }),
  })

  const presignedResult = await presignedResponse.json()

  if (!presignedResponse.ok || !presignedResult.success) {
    throw new Error(presignedResult?.message || "Failed to get an upload URL.")
  }

  const { uploadUrl, key } = presignedResult.data as {
    uploadUrl: string
    key: string
  }

  const uploadResponse = await fetch(uploadUrl, {
    method: "PUT",
    headers: {
      "Content-Type": file.type,
    },
    body: file,
  })

  if (!uploadResponse.ok) {
    throw new Error("Failed to upload the image to storage.")
  }

  const url = uploadUrl.split("?")[0]!

  return { url, key }
}
