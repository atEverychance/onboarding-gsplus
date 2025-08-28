import Chip from "../../components/ui/Chip"
import StepNav from "../../components/ui/StepNav"
import { useOnboarding } from "../../onboarding/OnboardingContext"
import Doodle from "../../components/Doodle"

export default function CaregiverStep() {
  const { state, setAbout, next, prev } = useOnboarding()
  const setVal = (v: boolean) => {
    setAbout({ caregiver: v })
  }
  return (
    <div className="max-w-[640px]">
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-zinc-800">Do you regularly care for someone else?</h1>
          <p className="mt-2 text-sm text-zinc-500">This could be an aging parent, child, spouse, or anyone else who depends on you for support.</p>
        </div>
        <Doodle index={0} />
      </div>
      <div className="mt-6 flex gap-3">
        <Chip label="Yes" selected={state.about.caregiver===true} onClick={()=>setVal(true)} />
        <Chip label="No" selected={state.about.caregiver===false} onClick={()=>setVal(false)} />
      </div>
      <div className="mt-6 text-sm text-zinc-500">
        Optional
        <button className="ml-4 text-[#1E6E68] underline" onClick={next}>Skip</button>
      </div>
      <StepNav onBack={prev} onNext={next} />
    </div>
  )
}
