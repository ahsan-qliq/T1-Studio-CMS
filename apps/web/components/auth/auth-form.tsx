"use client"

import Link from "next/link"
import { useRouter } from "next/navigation"
import { FormEvent, useState } from "react"

interface AuthFormProps {
  mode: "login" | "register"
}

export function AuthForm({ mode }: AuthFormProps) {
  const router = useRouter()
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const [submitting, setSubmitting] = useState(false)

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setSubmitting(true)
    setError("")

    try {
      const response = await fetch(`/api/auth/${mode}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(mode === "register" ? { name, email, password } : { email, password }),
      })
      const payload = await response.json()
      if (!response.ok || !payload.success) {
        throw new Error(payload.message ?? "Authentication failed")
      }
      router.push(mode === "login" ? "/pages/home" : "/login")
      router.refresh()
    } catch (cause) {
      setError(cause instanceof Error ? cause.message : "Authentication failed")
    } finally {
      setSubmitting(false)
    }
  }

  const isRegister = mode === "register"

  return (
    <section className="w-full max-w-md rounded-2xl border border-zinc-200 bg-white p-8 shadow-sm">
      <div className="mb-8">
        <div className="mb-4 flex size-10 items-center justify-center rounded-lg bg-amber-400 text-sm font-black text-zinc-900">
          T1
        </div>
        <h1 className="text-2xl font-semibold text-zinc-900">
          {isRegister ? "Create your account" : "Welcome back"}
        </h1>
        <p className="mt-2 text-sm text-zinc-500">
          {isRegister ? "Set up access to the T1 Studio CMS." : "Sign in to manage your studio content."}
        </p>
      </div>

      <form onSubmit={submit} className="space-y-4">
        {isRegister && (
          <label className="block text-sm font-medium text-zinc-700">
            Full name
            <input required value={name} onChange={(event) => setName(event.target.value)} className="mt-1.5 flex h-10 w-full rounded-md border border-zinc-200 px-3 text-sm outline-none focus:ring-2 focus:ring-zinc-900" />
          </label>
        )}
        <label className="block text-sm font-medium text-zinc-700">
          Email
          <input required type="email" value={email} onChange={(event) => setEmail(event.target.value)} className="mt-1.5 flex h-10 w-full rounded-md border border-zinc-200 px-3 text-sm outline-none focus:ring-2 focus:ring-zinc-900" />
        </label>
        <label className="block text-sm font-medium text-zinc-700">
          Password
          <input required minLength={8} type="password" value={password} onChange={(event) => setPassword(event.target.value)} className="mt-1.5 flex h-10 w-full rounded-md border border-zinc-200 px-3 text-sm outline-none focus:ring-2 focus:ring-zinc-900" />
        </label>

        {error && <p role="alert" className="rounded-md bg-red-50 p-3 text-sm text-red-700">{error}</p>}
        <button disabled={submitting} className="h-10 w-full rounded-md bg-zinc-900 text-sm font-medium text-white transition hover:bg-zinc-700 disabled:opacity-50">
          {submitting ? "Please wait..." : isRegister ? "Create account" : "Sign in"}
        </button>
      </form>

      <p className="mt-6 text-center text-sm text-zinc-500">
        {isRegister ? "Already have an account?" : "Need an account?"}{" "}
        <Link className="font-medium text-zinc-900 underline underline-offset-4" href={isRegister ? "/login" : "/register"}>
          {isRegister ? "Sign in" : "Register"}
        </Link>
      </p>
    </section>
  )
}
