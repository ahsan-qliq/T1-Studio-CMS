"use client"

import * as React from "react"

interface ThemeContextValue {
  theme: string
  resolvedTheme: string
  setTheme: (theme: string) => void
}

const ThemeContext = React.createContext<ThemeContextValue>({
  theme: "system",
  resolvedTheme: "light",
  setTheme: () => {},
})

function useTheme() {
  return React.useContext(ThemeContext)
}

function getSystemTheme() {
  return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light"
}

function applyTheme(theme: string): string {
  const resolved = theme === "system" ? getSystemTheme() : theme
  document.documentElement.classList.remove("light", "dark")
  document.documentElement.classList.add(resolved)
  document.documentElement.style.colorScheme = resolved
  return resolved
}

function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setThemeState] = React.useState("system")
  const [resolvedTheme, setResolvedTheme] = React.useState("light")

  React.useEffect(() => {
    let stored = "system"
    // eslint-disable-next-line no-empty
    try { stored = localStorage.getItem("theme") || "system" } catch {}
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setThemeState(stored)
    setResolvedTheme(applyTheme(stored))

    const mq = window.matchMedia("(prefers-color-scheme: dark)")
    const onSystemChange = () => {
      if ((localStorage.getItem("theme") || "system") === "system") {
        setResolvedTheme(applyTheme("system"))
      }
    }
    mq.addEventListener("change", onSystemChange)
    return () => mq.removeEventListener("change", onSystemChange)
  }, [])

  const setTheme = React.useCallback((next: string) => {
    setThemeState(next)
    // eslint-disable-next-line no-empty
    try { localStorage.setItem("theme", next) } catch {}
    setResolvedTheme(applyTheme(next))
  }, [])

  return (
    <ThemeContext.Provider value={{ theme, resolvedTheme, setTheme }}>
      <ThemeHotkey />
      {children}
    </ThemeContext.Provider>
  )
}

function isTypingTarget(target: EventTarget | null) {
  if (!(target instanceof HTMLElement)) return false
  return (
    target.isContentEditable ||
    target.tagName === "INPUT" ||
    target.tagName === "TEXTAREA" ||
    target.tagName === "SELECT"
  )
}

function ThemeHotkey() {
  const { resolvedTheme, setTheme } = useTheme()

  React.useEffect(() => {
    function onKeyDown(event: KeyboardEvent) {
      if (event.defaultPrevented || event.repeat) return
      if (event.metaKey || event.ctrlKey || event.altKey) return
      if (typeof event.key !== "string" || event.key.toLowerCase() !== "d") return
      if (isTypingTarget(event.target)) return
      setTheme(resolvedTheme === "dark" ? "light" : "dark")
    }
    window.addEventListener("keydown", onKeyDown)
    return () => window.removeEventListener("keydown", onKeyDown)
  }, [resolvedTheme, setTheme])

  return null
}

export { ThemeProvider }
