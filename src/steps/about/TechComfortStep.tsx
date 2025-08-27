import Chip from "../../components/ui/Chip"
import StepNav from "../../components/ui/StepNav"
import { useOnboarding } from "../../onboarding/OnboardingContext"
import Doodle from "../../components/Doodle"

export default function TechComfortStep() {
  const { state, setAbout, next, prev } = useOnboarding()
  const setVal = (v: any) => {
    setAbout({ techComfort: v })
  }
  return (
    <div className="max-w-[640px]">
      <div className="flex items-start justify-between">
        <h1 className="text-2xl font-semibold text-zinc-800">How do you feel about technology?</h1>
        <Doodle index={1} />
      </div>
      <div className="mt-6 flex gap-3">
        <Chip label="I like simple things" selected={state.about.techComfort==="simple"} onClick={()=>setVal("simple")} />
        <Chip label="I’m okay with most stuff" selected={state.about.techComfort==="ok"} onClick={()=>setVal("ok")} />
        <Chip label="I love advanced features" selected={state.about.techComfort==="advanced"} onClick={()=>setVal("advanced")} />
      </div>
      <div className="mt-6 text-sm text-zinc-500">
        Optional
        <button className="ml-4 text-[#1E6E68] underline" onClick={next}>Skip for now</button>
      </div>
      <StepNav onBack={prev} onNext={next} />
    </div>
  )
}
