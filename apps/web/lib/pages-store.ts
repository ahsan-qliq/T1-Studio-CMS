import { promises as fs } from "fs"
import path from "path"
import { homePage } from "@/data/mock"
import type { CmsPage } from "@/types/cms"

/**
 * Simple JSON-file-backed store for CMS pages.
 *
 * Each page is stored as its own file at data/pages/<slug>.json.
 * If no file exists yet for a slug, falls back to the seed data in
 * data/mock.ts so the editor has something to show on first load.
 *
 * NOTE: this writes to the local filesystem, which works for local
 * dev and any always-on Node server, but will NOT persist on
 * serverless platforms with read-only/ephemeral filesystems (e.g.
 * Vercel's default runtime resets on every deploy/cold start).
 * Swap this out for a real database before deploying if you need
 * saved content to survive.
 */

const DATA_DIR = path.join(process.cwd(), "data", "pages")

// Seed data for slugs that don't have a saved file yet.
const seedPages: Record<string, CmsPage> = {
  home: homePage,
}

function pageFilePath(slug: string): string {
  // Guard against path traversal via the slug param.
  const safeSlug = slug.replace(/[^a-zA-Z0-9-_]/g, "")
  return path.join(DATA_DIR, `${safeSlug}.json`)
}

export async function getPage(slug: string): Promise<CmsPage | null> {
  const filePath = pageFilePath(slug)

  try {
    const raw = await fs.readFile(filePath, "utf-8")
    return JSON.parse(raw) as CmsPage
  } catch (err) {
    if (isNotFoundError(err)) {
      return seedPages[slug] ?? null
    }
    throw err
  }
}

export async function savePage(slug: string, page: CmsPage): Promise<void> {
  const filePath = pageFilePath(slug)
  await fs.mkdir(path.dirname(filePath), { recursive: true })
  await fs.writeFile(filePath, JSON.stringify(page, null, 2), "utf-8")
}

function isNotFoundError(err: unknown): err is NodeJS.ErrnoException {
  return (
    typeof err === "object" &&
    err !== null &&
    "code" in err &&
    (err as NodeJS.ErrnoException).code === "ENOENT"
  )
}