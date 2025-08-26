import { useOnboarding } from "../onboarding/OnboardingContext"
import StepNav from "../components/ui/StepNav"
import Doodle from "../components/Doodle"

export default function ReviewStep() {
  const { state, prev, next } = useOnboarding()
  return (
    <div className="max-w-[720px]">
      <div className="flex items-start justify-between">
        <h1 className="text-2xl font-semibold text-zinc-800">Review</h1>
        <Doodle index={2} />
      </div>
      <div className="mt-6 space-y-2 text-sm text-zinc-700">
        <div><strong>Language:</strong> {state.language?.toUpperCase() || "-"}</div>
        <div><strong>About you:</strong> {state.about.ageRange || "-"}, {state.about.gender || "-"}, {state.about.pronouns || "-"}, {state.about.preferredName || "-"}</div>
        <div><strong>Household:</strong> {state.household.hasDependents ? `${state.household.dependents.length} dependents` : "No dependents"}</div>
        <div><strong>Goals:</strong> {(state.goals||[]).join(", ") || "-"}</div>
        <div><strong>Challenges:</strong> {(state.challenges||[]).join(", ") || "-"}</div>
        <div><strong>Preferences:</strong> {(state.preferences?.modalities||[]).join(", ") || "-"}; {(state.preferences?.times||[]).join(", ") || "-"}; {(state.preferences?.careLanguages||[]).join(", ") || "-"}</div>
        <div><strong>Claims:</strong> {state.claims?.willSubmitClaims ? "Will submit" : "No/unsure"}</div>
        <div><strong>Notifications:</strong> {(state.notifications?.channels||[]).join(", ") || "-"} {state.notifications?.frequency ? `(${state.notifications?.frequency})` : ""}</div>
      </div>
      <div className="mt-6">
        <StepNav onBack={prev} onNext={next} nextLabel="Finish" />
      </div>
    </div>
  )
}
