import { createContext, useContext, useMemo, useState, useEffect, ReactNode } from "react"
import { OnboardingState, Language, Gender, Dependent } from "./types"
import { STEPS } from "./steps"

const STORAGE_KEY = "onboarding_draft_v1"

const initialState: OnboardingState = {
  language: undefined,
  about: {},
  household: { dependents: [], hasDependents: undefined },
  goals: [],
  challenges: [],
  claims: {},
  notifications: {},
  currentStepId: "welcome",
  completed: {},
  doodleTheme: "neutral",
}

type Ctx = {
  state: OnboardingState
  setLanguage: (l: Language) => void
  setAbout: (patch: Partial<OnboardingState["about"]>) => void
  setHousehold: (patch: Partial<OnboardingState["household"]>) => void
  setGoals: (vals: string[]) => void
  setChallenges: (vals: string[]) => void
  setClaims: (patch: Partial<OnboardingState["claims"]>) => void
  setNotifications: (patch: Partial<OnboardingState["notifications"]>) => void
  addDependent: (d: Omit<Dependent, "id">) => void
  updateDependent: (id: string, patch: Partial<Dependent>) => void
  removeDependent: (id: string) => void
  completeStep: (id?: string) => void
  goTo: (id: string) => void
  next: () => void
  prev: () => void
  progress: number
  saveDraft: () => void
}

const OnboardingCtx = createContext<Ctx | null>(null)

export function OnboardingProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<OnboardingState>(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY)
      if (raw) return JSON.parse(raw)
    } catch (error) {
      console.warn('Failed to parse stored onboarding state:', error)
    }
    return initialState
  })

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state))
  }, [state])

  const visibleSteps = useMemo(() => {
    return STEPS.filter((s) => (s.when ? s.when(state) : true))
  }, [state])

  const progress = useMemo(() => {
    const total = visibleSteps.length
    if (total === 0) return 0
    const done = visibleSteps.reduce((acc, s) => acc + (state.completed[s.id] ? 1 : 0), 0)
    return Math.min(100, Math.round((done / total) * 100))
  }, [visibleSteps, state.completed])

  const value: Ctx = {
    state,
    setLanguage: (l) =>
      setState((s) => ({
        ...s,
        language: l,
        completed: { ...s.completed, language: true },
      })),
    setAbout: (patch) =>
      setState((s) => {
        const next = { ...s, about: { ...s.about, ...patch } }
        if (patch.gender) {
          let theme: "neutral" | "man" | "woman" = "neutral"
          const g = patch.gender as Gender
          theme = g === "man" ? "man" : g === "woman" ? "woman" : "neutral"
          next.doodleTheme = theme
        }
        return next
      }),
    setHousehold: (patch) =>
      setState((s) => ({ ...s, household: { ...s.household, ...patch } })),
    setGoals: (vals) =>
      setState((s) => ({ ...s, goals: vals })),
    setChallenges: (vals) =>
      setState((s) => ({ ...s, challenges: vals })),
    setClaims: (patch) =>
      setState((s) => ({ ...s, claims: { ...(s.claims || {}), ...patch } })),
    setNotifications: (patch) =>
      setState((s) => ({ ...s, notifications: { ...(s.notifications || {}), ...patch } })),
    addDependent: (d) =>
      setState((s) => ({
        ...s,
        household: {
          ...s.household,
          dependents: [
            ...s.household.dependents,
            { ...d, id: Math.random().toString(36).slice(2, 9) },
          ],
        },
      })),
    updateDependent: (id, patch) =>
      setState((s) => ({
        ...s,
        household: {
          ...s.household,
          dependents: s.household.dependents.map((x) => (x.id === id ? { ...x, ...patch } : x)),
        },
      })),
    removeDependent: (id) =>
      setState((s) => ({
        ...s,
        household: {
          ...s.household,
          dependents: s.household.dependents.filter((x) => x.id !== id),
        },
      })),
    completeStep: (id) =>
      setState((s) => {
        const key = id ?? s.currentStepId
        return { ...s, completed: { ...s.completed, [key]: true } }
      }),
    goTo: (id) => setState((s) => ({ ...s, currentStepId: id })),
    next: () =>
      setState((s) => {
        const steps = STEPS.filter((st) => (st.when ? st.when(s) : true))
        const i = steps.findIndex((st) => st.id === s.currentStepId)
        const nextId = steps[Math.min(i + 1, steps.length - 1)].id
        return { ...s, currentStepId: nextId }
      }),
    prev: () =>
      setState((s) => {
        const steps = STEPS.filter((st) => (st.when ? st.when(s) : true))
        const i = steps.findIndex((st) => st.id === s.currentStepId)
        const prevId = steps[Math.max(i - 1, 0)].id
        return { ...s, currentStepId: prevId }
      }),
    progress,
    saveDraft: () => {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state))
    },
  }

  return <OnboardingCtx.Provider value={value}>{children}</OnboardingCtx.Provider>
}

export function useOnboarding() {
  const ctx = useContext(OnboardingCtx)
  if (!ctx) throw new Error("Onboarding context")
  return ctx
}
