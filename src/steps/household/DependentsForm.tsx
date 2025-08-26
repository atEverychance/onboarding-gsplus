import { useState } from "react"
import StepNav from "../../components/ui/StepNav"
import { useOnboarding } from "../../onboarding/OnboardingContext"
import Doodle from "../../components/Doodle"

function DepRow({
  id,
  firstName,
  lastName,
  relationship,
  dob,
  language,
  onChange,
  onRemove,
}: any) {
  return (
    <div className="rounded-xl border border-zinc-200 p-4">
      <div className="grid grid-cols-2 gap-3">
        <input className="rounded-md border border-zinc-300 px-3 py-2" placeholder="First name" value={firstName} onChange={(e)=>onChange({ firstName: e.target.value })} />
        <input className="rounded-md border border-zinc-300 px-3 py-2" placeholder="Last name" value={lastName} onChange={(e)=>onChange({ lastName: e.target.value })} />
        <select className="rounded-md border border-zinc-300 px-3 py-2" value={relationship} onChange={(e)=>onChange({ relationship: e.target.value })}>
          <option value="spouse">Spouse/Partner</option>
          <option value="child">Child</option>
          <option value="other">Other</option>
        </select>
        <input className="rounded-md border border-zinc-300 px-3 py-2" type="date" value={dob} onChange={(e)=>onChange({ dob: e.target.value })} />
        <select className="rounded-md border border-zinc-300 px-3 py-2" value={language||""} onChange={(e)=>onChange({ language: e.target.value||undefined })}>
          <option value="">Care language (optional)</option>
          <option value="en">English</option>
          <option value="fr">Français</option>
        </select>
        <button className="justify-self-start rounded-full border border-zinc-300 px-4 py-2 text-sm" onClick={onRemove}>Remove</button>
      </div>
    </div>
  )
}

export default function DependentsForm() {
  const { state, addDependent, updateDependent, removeDependent, next, prev } = useOnboarding()
  const [touched, setTouched] = useState(false)
  const canNext = state.household.dependents.length > 0

  const add = () =>
    addDependent({
      firstName: "",
      lastName: "",
      relationship: "child",
      dob: "",
      language: undefined,
    })

  return (
    <div className="max-w-[740px]">
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-zinc-800">Add your dependents</h1>
          <p className="mt-2 text-sm text-zinc-500">Add as many as you need. You can edit later.</p>
        </div>
        <Doodle index={0} />
      </div>
      <div className="mt-6 space-y-4">
        {state.household.dependents.map((d) => (
          <DepRow
            key={d.id}
            {...d}
            onChange={(patch: any) => updateDependent(d.id, patch)}
            onRemove={() => removeDependent(d.id)}
          />
        ))}
      </div>
      <button onClick={add} className="mt-4 rounded-full border border-zinc-300 px-4 py-2 text-sm">
        + Add another dependent
      </button>
      {!canNext && touched && (
        <div className="mt-2 text-sm text-red-600">Add at least one dependent or go back.</div>
      )}
      <StepNav
        onBack={prev}
        onNext={() => {
          setTouched(true)
          if (canNext) next()
        }}
        nextDisabled={!canNext}
      />
    </div>
  )
}
