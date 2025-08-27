import Chip from "../../components/ui/Chip"
import StepNav from "../../components/ui/StepNav"
import { useOnboarding } from "../../onboarding/OnboardingContext"
import Doodle from "../../components/Doodle"

const opts = [
  { key: "she", label: "She/her" },
  { key: "he", label: "He/him" },
  { key: "they", label: "They/them" },
  { key: "self", label: "Self-describe" },
] as const

export default function PronounsStep() {
  const { state, setAbout, next, prev, completeStep } = useOnboarding()
  const select = (v: any) => {
    setAbout({ pronouns: v })
    completeStep()
  }
  return (
    <div className="max-w-[640px]">
      <div className="flex items-start justify-between">
        <h1 className="text-2xl font-semibold text-zinc-800">What are your pronouns?</h1>
        <Doodle index={0} />
      </div>
      <div className="mt-6 flex flex-wrap gap-3">
        {opts.map((o) => (
          <Chip key={o.key} label={o.label} selected={state.about.pronouns===o.key} onClick={()=>select(o.key)} />
        ))}
      </div>
      <div className="mt-6 text-sm text-zinc-500">
        We want to address you respectfully (optional)
        <button className="ml-4 text-[#1E6E68] underline" onClick={next}>Skip for now</button>
      </div>
      <StepNav onBack={prev} onNext={next} />
    </div>
  )
}
