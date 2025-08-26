import Chip from "../../components/ui/Chip"
import StepNav from "../../components/ui/StepNav"
import { useOnboarding } from "../../onboarding/OnboardingContext"
import Doodle from "../../components/Doodle"

export default function HasDependentsStep() {
  const { state, setHousehold, next, prev, completeStep } = useOnboarding()
  const setVal = (v: boolean) => {
    setHousehold({ hasDependents: v })
    completeStep()
  }
  return (
    <div className="max-w-[640px]">
      <div className="flex items-start justify-between">
        <h1 className="text-2xl font-semibold text-zinc-800">Do you have dependents on your plan?</h1>
        <Doodle index={2} />
      </div>
      <div className="mt-6 flex gap-3">
        <Chip label="Yes" selected={state.household.hasDependents===true} onClick={()=>setVal(true)} />
        <Chip label="No" selected={state.household.hasDependents===false} onClick={()=>setVal(false)} />
      </div>
      <StepNav onBack={prev} onNext={next} />
    </div>
  )
}
