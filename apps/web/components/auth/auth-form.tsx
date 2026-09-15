"use client"

import Link from "next/link"
import { useRouter } from "next/navigation"
import { FormEvent, useState } from "react"
import { Button } from "@workspace/ui/components/button"
import { Input } from "@workspace/ui/components/input"
import { Label } from "@workspace/ui/components/label"
import {
  getAuthErrorMessage,
  login,
  register,
} from "@/lib/auth-instance"

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
      const response =
        mode === "register"
          ? await register({ name, email, password, role: "admin" })
          : await login({ email, password })

      if (!response.success) {
        throw new Error(response.message ?? "Authentication failed")
      }
      router.push(mode === "login" ? "/pages/home" : "/login")
      router.refresh()
    } catch (cause) {
      setError(getAuthErrorMessage(cause))
    } finally {
      setSubmitting(false)
    }
  }

  const isRegister = mode === "register"

  return (
    <section className="w-full max-w-md rounded-xl border border-border bg-card p-4 text-card-foreground shadow-lg shadow-zinc-950/5">
      <div className="mb-4">
        <div className="mb-4 flex size-10 items-center justify-center rounded-lg bg-amber-400 text-sm font-black text-zinc-900">
          T1
        </div>
        <h1 className="text-zinc text-2xl font-semibold">
          {isRegister ? "Create your account" : "Welcome back"}
        </h1>
        <p className="mt-2 text-sm text-zinc-500">
          {isRegister
            ? "Set up access to the T1 Studio CMS."
            : "Sign in to manage your studio content."}
        </p>
      </div>

      <form onSubmit={submit} className="space-y-4">
        {isRegister && (
          <div className="space-y-2">
            <Label htmlFor="name">Full name</Label>
            <Input
              id="name"
              required
              value={name}
              onChange={(event) => setName(event.target.value)}
            />
          </div>
        )}
        <div className="space-y-2">
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            required
            type="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="password">Password</Label>
          <Input
            id="password"
            required
            minLength={8}
            type="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
          />
        </div>

        {error && (
          <p
            role="alert"
            className="rounded-md border border-destructive/20 bg-destructive/10 p-3 text-sm text-destructive"
          >
            {error}
          </p>
        )}
        <Button type="submit" disabled={submitting} className="w-full">
          {submitting
            ? "Please wait..."
            : isRegister
              ? "Create account"
              : "Sign in"}
        </Button>
      </form>

      <p className="mt-6 text-center text-sm text-zinc-500">
        <Link
          className="font-medium text-zinc-500 underline underline-offset-4"
          href={isRegister ? "/login" : "/register"}
        >
          {isRegister
            ? "Already have an account? Sign in"
            : "Need an account? Register"}
        </Link>
      </p>
    </section>
  )
}
