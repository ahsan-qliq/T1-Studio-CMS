import { fetchCurrentUser, type CurrentUser } from "@/lib/current-user-api"
import { Button } from "@workspace/ui/components/button"

function initials(user: CurrentUser) {
  const value = user.name?.trim() || user.email?.split("@")[0] || "Admin"
  return value
    .split(/\s+/)
    .map((part) => part[0])
    .join("")
    .slice(0, 2)
    .toUpperCase()
}

export default async function SettingsPage() {
  let user: CurrentUser = { name: "Administrator", role: "Administrator" }
  let loadError = ""

  try {
    user = await fetchCurrentUser()
  } catch (error) {
    loadError = error instanceof Error ? error.message : "Unable to load profile"
  }

  return (
    <div className="mx-auto w-full max-w-3xl px-6 py-8">
      <div className="mb-6">
        <h1 className="text-xl font-semibold text-zinc-900">Settings</h1>
        <p className="mt-1 text-sm text-zinc-500">
          Manage your account and CMS preferences.
        </p>
      </div>

      <section className="rounded-lg border border-zinc-200 bg-white p-6">
        <div className="flex items-center gap-4 border-b border-zinc-100 pb-6">
          {user.avatar ? (
            <img
              src={user.avatar}
              alt=""
              className="size-16 rounded-full object-cover"
            />
          ) : (
            <div className="flex size-16 items-center justify-center rounded-full bg-amber-400 text-lg font-bold text-zinc-900">
              {initials(user)}
            </div>
          )}
          <div>
            <h2 className="text-lg font-semibold text-zinc-900">
              {user.name || "Administrator"}
            </h2>
            <p className="text-sm text-zinc-500">{user.role || "Administrator"}</p>
          </div>
        </div>

        {loadError && (
          <p className="mt-4 rounded-md bg-amber-50 px-3 py-2 text-sm text-amber-800">
            Profile API unavailable. Showing the local administrator profile.
          </p>
        )}

        <dl className="mt-6 grid gap-4 sm:grid-cols-2">
          <div>
            <dt className="text-xs font-medium uppercase tracking-wide text-zinc-500">
              Name
            </dt>
            <dd className="mt-1 text-sm text-zinc-900">
              {user.name || "Administrator"}
            </dd>
          </div>
          <div>
            <dt className="text-xs font-medium uppercase tracking-wide text-zinc-500">
              Email
            </dt>
            <dd className="mt-1 text-sm text-zinc-900">
              {user.email || "Not provided"}
            </dd>
          </div>
          <div>
            <dt className="text-xs font-medium uppercase tracking-wide text-zinc-500">
              Role
            </dt>
            <dd className="mt-1 text-sm capitalize text-zinc-900">
              {user.role || "Administrator"}
            </dd>
          </div>
        </dl>

        <div className="mt-6 border-t border-zinc-100 pt-4">
          <Button variant="outline" disabled>
            Edit profile
          </Button>
          <p className="mt-2 text-xs text-zinc-500">
            Profile editing will be enabled when the backend profile update API is available.
          </p>
        </div>
      </section>
    </div>
  )
}
