import { useState } from "react"
import { useOnboarding } from "../../onboarding/OnboardingContext"
import StepNav from "../../components/ui/StepNav"
import Doodle from "../../components/Doodle"

export default function DirectDepositStep() {
  const { state, setClaims, next, prev, completeStep } = useOnboarding()
  const c = state.claims || {}
  const [local, setLocal] = useState({
    institutionNumber: c.institutionNumber || "",
    transitNumber: c.transitNumber || "",
    accountNumber: c.accountNumber || "",
    consent: !!c.consent,
  })

  const canNext =
    /^\d{3}$/.test(local.institutionNumber) &&
    /^\d{5}$/.test(local.transitNumber) &&
    /^\d{7,12}$/.test(local.accountNumber) &&
    local.consent

  const save = () => {
    setClaims(local)
    completeStep()
    next()
  }

  return (
    <div className="max-w-[640px]">
      <div className="flex items-start justify-between">
        <h1 className="text-2xl font-semibold text-zinc-800">Set up direct deposit</h1>
        <Doodle index={1} />
      </div>
      <div className="mt-2 text-sm text-zinc-500">Providers submit 87% of claims on behalf of members. Providing this info helps get you paid up to two weeks faster!</div>

      <div className="mt-6 grid gap-4 max-w-md">
        <div className="grid grid-cols-3 gap-3">
          <label className="text-sm text-zinc-700">
            Institution (3)
            <input
              className="mt-1 w-full rounded-md border border-zinc-300 px-3 py-2"
              inputMode="numeric"
              maxLength={3}
              value={local.institutionNumber}
              onChange={(e) => setLocal({ ...local, institutionNumber: e.target.value.replace(/\\D/g, "").slice(0,3) })}
            />
          </label>
          <label className="text-sm text-zinc-700">
            Transit (5)
            <input
              className="mt-1 w-full rounded-md border border-zinc-300 px-3 py-2"
              inputMode="numeric"
              maxLength={5}
              value={local.transitNumber}
              onChange={(e) => setLocal({ ...local, transitNumber: e.target.value.replace(/\\D/g, "").slice(0,5) })}
            />
          </label>
          <label className="text-sm text-zinc-700">
            Account (7–12)
            <input
              className="mt-1 w-full rounded-md border border-zinc-300 px-3 py-2"
              inputMode="numeric"
              maxLength={12}
              value={local.accountNumber}
              onChange={(e) => setLocal({ ...local, accountNumber: e.target.value.replace(/\\D/g, "").slice(0,12) })}
            />
          </label>
        </div>
        <label className="flex items-center gap-3 text-sm text-zinc-700">
          <input
            type="checkbox"
            checked={local.consent}
            onChange={(e) => setLocal({ ...local, consent: e.target.checked })}
          />
          I authorize deposits to this account.
        </label>
      </div>
      <div className="mt-6">
        <StepNav onBack={prev} onNext={save} nextDisabled={!canNext} />
      </div>
    </div>
  )
}
