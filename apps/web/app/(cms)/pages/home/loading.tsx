export default function HomePageLoading() {
  return (
    <div className="mx-auto w-full px-6 py-6" aria-busy="true">
      <p role="status" className="text-sm text-zinc-500">
        Loading home page...
      </p>
      <div aria-hidden="true" className="mt-6 animate-pulse space-y-4">
        <div className="h-10 w-48 rounded bg-zinc-100" />
        <div className="h-64 rounded-xl bg-zinc-100" />
        <div className="h-40 rounded-xl bg-zinc-100" />
      </div>
    </div>
  )
}
