import Chip from "../../components/ui/Chip"
import StepNav from "../../components/ui/StepNav"
import { useOnboarding } from "../../onboarding/OnboardingContext"
import Doodle from "../../components/Doodle"

export default function CareLanguageStep() {
  const { state, setAbout, next, prev, completeStep } = useOnboarding()
  const langs: ("en"|"fr")[] = ["en","fr"]
  const toggle = (l: "en"|"fr") => {
    const set = new Set(state.about.careLanguages)
    if (set.has(l)) set.delete(l)
    else set.add(l)
    setAbout({ careLanguages: Array.from(set) })
    completeStep()
  }
  return (
    <div className="max-w-[640px]">
      <div className="flex items-start justify-between">
        <h1 className="text-2xl font-semibold text-zinc-800">Languages you prefer for care</h1>
        <Doodle index={2} />
      </div>
      <div className="mt-6 flex gap-3">
        {langs.map((l)=>(
          <Chip key={l} label={l==="en"?"English":"Français"} selected={state.about.careLanguages.includes(l)} onClick={()=>toggle(l)} />
        ))}
      </div>
      <div className="mt-6 text-sm text-zinc-500">
        Optional
        <button className="ml-4 text-[#1E6E68] underline" onClick={next}>Skip</button>
      </div>
      <StepNav onBack={prev} onNext={next} />
    </div>
  )
}
