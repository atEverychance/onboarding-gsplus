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
        <div>
          <h1 className="text-2xl font-semibold text-zinc-800">How do you feel about technology?</h1>
          <p className="mt-2 text-sm text-zinc-500">This helps us tailor your experience to your comfort level.</p>
        </div>
        <Doodle index={1} />
      </div>
      <div className="mt-6 flex gap-3">
        <Chip label="Keep it simple for me" selected={state.about.techComfort==="simple"} onClick={()=>setVal("simple")} />
        <Chip label="I can handle most things" selected={state.about.techComfort==="ok"} onClick={()=>setVal("ok")} />
        <Chip label="Bring on the bells and whistles" selected={state.about.techComfort==="advanced"} onClick={()=>setVal("advanced")} />
      </div>
      <div className="mt-6 text-sm text-zinc-500">
        <button className="text-[#1E6E68] underline" onClick={next}>Skip for now</button>
      </div>
      <StepNav onBack={prev} onNext={next} />
    </div>
  )
}
