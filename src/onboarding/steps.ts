export type StepDef = {
  id: string
  label: string
  required?: boolean
  when?: (ctx: any) => boolean
}

export const STEPS: StepDef[] = [
  { id: "language", label: "Language", required: true },
  { id: "about.gender", label: "About you: Identity" },
  { id: "about.age", label: "About you: Age" },
  { id: "about.pronouns", label: "About you: Pronouns" },
  { id: "about.name", label: "About you: Preferred name" },
  { id: "about.careLang", label: "About you: Care language" },
  { id: "about.caregiver", label: "About you: Caregiver" },
  { id: "about.tech", label: "About you: Tech comfort" },
  { id: "household.hasDeps", label: "Household: Dependents?" },
  {
    id: "household.manageDeps",
    label: "Household: Add dependents",
    required: true,
    when: (ctx) => ctx.household.hasDependents === true,
  },
  { id: "goals", label: "Your goals" },
  { id: "challenges", label: "Your challenges" },
  { id: "prefs", label: "How you like care" },
  { id: "claims.intent", label: "Claims payouts?" },
  {
    id: "claims.deposit",
    label: "Direct deposit",
    required: true,
    when: (ctx) => ctx.claims?.willSubmitClaims === true,
  },
  { id: "notifications", label: "Notifications" },
  { id: "review", label: "Review" },
]
export const __steps_marker = true
