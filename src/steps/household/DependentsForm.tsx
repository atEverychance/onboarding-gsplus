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
  email,
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
        <input className="rounded-md border border-zinc-300 px-3 py-2" type="email" placeholder="Email (optional)" value={email||""} onChange={(e)=>onChange({ email: e.target.value||undefined })} />
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
      email: undefined,
    })

  return (
    <div className="max-w-[740px]">
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-zinc-800">Let's add your dependents</h1>
          <p className="mt-2 text-sm text-zinc-500">Add as many as you need. You can always edit or remove them later.</p>
          <div className="mt-4 rounded-lg bg-blue-50 border border-blue-200 p-4">
            <div className="text-sm text-blue-800 space-y-3">
              <p>Your dependents can access GreenShield health services by creating their own confidential account on GreenShield+. Through this account, they'll receive a personalized onboarding experience and gain access to services such as Mental Health support, Telemedicine, Well-being resources, and more—tailored specifically to their needs.</p>
              <p>Privacy is fully protected: your dependents cannot view your activity, and you cannot view theirs.</p>
              <p>To make setup easy, we can send them an invitation email to create their account. Please provide the best email address to reach them.</p>
            </div>
          </div>
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
