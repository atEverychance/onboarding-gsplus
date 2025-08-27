import Chip from "../../components/ui/Chip"
import StepNav from "../../components/ui/StepNav"
import { useOnboarding } from "../../onboarding/OnboardingContext"
import Doodle from "../../components/Doodle"

const options = ["u17","18-24","25-34","35-44","45-54","55-64","65+"] as const

export default function AgeStep() {
  const { state, setAbout, next, prev, completeStep } = useOnboarding()
  const select = (v: any) => {
    setAbout({ ageRange: v })
    completeStep()
  }
  return (
    <div className="max-w-[640px]">
      <div className="flex items-start justify-between">
        <h1 className="text-2xl font-semibold text-zinc-800">What's your age range?</h1>
        <Doodle index={1} />
      </div>
      <div className="mt-6 flex flex-wrap gap-3">
        {options.map((o) => (
          <Chip key={o} label={o === "u17" ? "17 or under" : o} selected={state.about.ageRange===o} onClick={()=>select(o)} />
        ))}
      </div>
      <div className="mt-6 text-sm text-zinc-500">
        This helps us recommend the right care for you (optional)
        <button className="ml-4 text-[#1E6E68] underline" onClick={next}>Skip for now</button>
      </div>
      <StepNav onBack={prev} onNext={next} />
    </div>
  )
}
