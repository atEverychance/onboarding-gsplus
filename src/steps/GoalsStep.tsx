import Chip from "../components/ui/Chip"
import StepNav from "../components/ui/StepNav"
import { useOnboarding } from "../onboarding/OnboardingContext"
import Doodle from "../components/Doodle"

const allGoals = [
  "Feel less stressed",
  "Sleep better",
  "Improve mood",
  "Save money on meds",
  "Stay on top of a condition",
  "Faster care access",
  "Guidance for life/finances/legal",
  "Improve fitness/nutrition",
] as const

export default function GoalsStep() {
  const { state, setGoals, next, prev, completeStep } = useOnboarding()
  const goals = state.goals || []
  const toggle = (g: string) => {
    const set = new Set(goals)
    set.has(g) ? set.delete(g) : set.add(g)
    const arr = Array.from(set).slice(0, 3)
    setGoals(arr)
    completeStep()
  }
  return (
    <div className="max-w-[640px]">
      <div className="flex items-start justify-between">
        <h1 className="text-2xl font-semibold text-zinc-800">Pick up to 3 goals</h1>
        <Doodle index={0} />
      </div>
      <div className="mt-6 flex flex-wrap gap-3">
        {allGoals.map((g) => (
          <Chip key={g} label={g} selected={goals.includes(g)} onClick={() => toggle(g)} />
        ))}
      </div>
      <div className="mt-6 text-sm text-zinc-500">You can change these later.</div>
      <StepNav onBack={prev} onNext={next} />
    </div>
  )
}
