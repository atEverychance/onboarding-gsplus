import { useOnboarding } from "../../onboarding/OnboardingContext"
import StepNav from "../../components/ui/StepNav"
import Doodle from "../../components/Doodle"
import BigButton from "../../components/ui/BigButton"

export default function ClaimsIntentStep() {
  const { state, setClaims, next, prev, completeStep } = useOnboarding()
  const will = state.claims?.willSubmitClaims
  const choose = (v: boolean) => {
    setClaims({ willSubmitClaims: v })
    completeStep()
    next()
  }
  return (
    <div className="max-w-[640px]">
      <div className="flex items-start justify-between">
        <h1 className="text-2xl font-semibold text-zinc-800">Planning to submit claims for reimbursement?</h1>
        <Doodle index={0} />
      </div>
      <div className="mt-6 grid grid-cols-2 gap-4 max-w-md">
        <BigButton active={will === true} onClick={() => choose(true)}>Yes</BigButton>
        <BigButton active={will === false} onClick={() => choose(false)}>No</BigButton>
      </div>
      <div className="mt-6">
        <StepNav onBack={prev} onNext={next} />
      </div>
    </div>
  )
}
