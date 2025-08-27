import Chip from "../../components/ui/Chip"
import StepNav from "../../components/ui/StepNav"
import { useOnboarding } from "../../onboarding/OnboardingContext"
import Doodle from "../../components/Doodle"

const opts = [
  { key: "woman", label: "Woman" },
  { key: "man", label: "Man" },
  { key: "nonbinary", label: "Non-binary" },
  { key: "prefer_not", label: "Prefer not to say" },
  { key: "self", label: "Self-describe" },
] as const

export default function GenderStep() {
  const { state, setAbout, next, prev, completeStep } = useOnboarding()
  const select = (v: any) => {
    setAbout({ gender: v })
    completeStep()
  }
  return (
    <div className="max-w-[640px]">
      <div className="flex items-start justify-between">
        <h1 className="text-2xl font-semibold text-zinc-800">How would you like us to know you?</h1>
        <Doodle index={2} />
      </div>
      <div className="mt-6 flex flex-wrap gap-3">
        {opts.map((o) => (
          <Chip key={o.key} label={o.label} selected={state.about.gender===o.key} onClick={()=>select(o.key)} />
        ))}
      </div>
      <div className="mt-6 text-sm text-zinc-500">
        This helps us personalize your experience (completely optional)
        <button className="ml-4 text-[#1E6E68] underline" onClick={next}>Skip for now</button>
      </div>
      <StepNav onBack={prev} onNext={next} />
    </div>
  )
}
