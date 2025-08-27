import Chip from "../components/ui/Chip"
import StepNav from "../components/ui/StepNav"
import { useOnboarding } from "../onboarding/OnboardingContext"
import Doodle from "../components/Doodle"

const allChallenges = [
  "Anxiety",
  "Low mood",
  "Grief",
  "Relationship",
  "Chronic pain",
  "Diabetes",
  "Hypertension",
  "Medication adherence",
  "Mobility",
] as const

export default function ChallengesStep() {
  const { state, setChallenges, next, prev, completeStep } = useOnboarding()
  const list = state.challenges || []
  const toggle = (g: string) => {
    const set = new Set(list)
    if (set.has(g)) {
      set.delete(g)
    } else {
      set.add(g)
    }
    setChallenges(Array.from(set))
    completeStep()
  }
  const name = state.about.preferredName

  return (
    <div className="max-w-[640px]">
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-zinc-800">
            What challenges do you face with healthcare{name ? `, ${name}` : ""}?
          </h1>
          <p className="mt-2 text-zinc-600">Help us understand so we can better support you (optional)</p>
        </div>
        <Doodle index={1} />
      </div>
      <div className="mt-6 flex flex-wrap gap-3">
        {allChallenges.map((g) => (
          <Chip key={g} label={g} selected={list.includes(g)} onClick={() => toggle(g)} />
        ))}
      </div>
      <div className="mt-6 text-sm text-zinc-500">
        Optional
        <button className="ml-4 text-[#1E6E68] underline" onClick={next}>Skip for now</button>
      </div>
      <StepNav onBack={prev} onNext={next} />
    </div>
  )
}
