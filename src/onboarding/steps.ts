export type StepDef = {
  id: string
  label: string
  required?: boolean
  when?: (ctx: any) => boolean
}

export const STEPS: StepDef[] = [
  { id: "welcome", label: "Welcome", required: true },
  { id: "language", label: "Language", required: true },
  { id: "about.gender", label: "About you: How you identify" },
  { id: "about.age", label: "About you: Your age range" },
  { id: "about.pronouns", label: "About you: Your pronouns" },
  { id: "about.name", label: "About you: What we should call you" },
  { id: "about.caregiver", label: "About you: Caregiving" },
  { id: "about.tech", label: "About you: Tech comfort" },
  { id: "interstitial.aboutyou", label: "Your Health Journey", when: (ctx) => ctx.about.gender && ctx.about.ageRange },
  { id: "goals", label: "Your goals" },
  { id: "challenges", label: "Your challenges" },
  { id: "interstitial.goals", label: "How we’ll support your goals", when: (ctx) => ctx.goals && ctx.goals.length > 0 },
  { id: "claims.intent", label: "Submitting claims?" },
  {
    id: "claims.deposit",
    label: "Set up direct deposit",
    required: true,
    when: (ctx) => ctx.claims?.willSubmitClaims === true,
  },
  { id: "household.hasDeps", label: "Household: Any dependents?" },
  {
    id: "household.manageDeps",
    label: "Household: Add dependents",
    required: true,
    when: (ctx) => ctx.household.hasDependents === true,
  },
  { id: "notifications", label: "Notifications" },
  { id: "review", label: "Review and finish" },
  { id: "interstitial.services", label: "Get started" },
]
export const __steps_marker = true
