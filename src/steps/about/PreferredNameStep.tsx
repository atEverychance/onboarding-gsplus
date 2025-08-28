import StepNav from "../../components/ui/StepNav"
import { useOnboarding } from "../../onboarding/OnboardingContext"
import Doodle from "../../components/Doodle"
import { useState } from "react"

export default function PreferredNameStep() {
  const { state, setAbout, next, prev } = useOnboarding()
  const [val, setVal] = useState(state.about.preferredName || "")
  const save = () => {
    setAbout({ preferredName: val || undefined })
    next()
  }
  return (
    <div className="max-w-[640px]">
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-zinc-800">What should we call you?</h1>
          <p className="mt-2 text-sm text-zinc-500">If you go by a different name, add it here.</p>
        </div>
        <Doodle index={1} />
      </div>
      <input
        value={val}
        onChange={(e)=>setVal(e.target.value)}
        placeholder="Preferred name"
        className="mt-6 w-full rounded-xl border border-zinc-300 px-4 py-3 text-base"
      />
      <StepNav onBack={prev} onNext={save} />
    </div>
  )
}
