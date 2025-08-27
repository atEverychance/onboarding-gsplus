import BigButton from "../components/ui/BigButton"
import StepNav from "../components/ui/StepNav"
import { useOnboarding } from "../onboarding/OnboardingContext"
import Doodle from "../components/Doodle"

export default function LanguageStep() {
  const { state, setLanguage, next, prev, completeStep } = useOnboarding()
  const choose = (val: "en" | "fr") => {
    setLanguage(val)
    completeStep("language")
  }
  return (
    <div className="max-w-[640px]">
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-zinc-800">Let's start with your language preference</h1>
          <p className="mt-2 text-sm text-zinc-500">We'll use this language for all your communications with GreenShield+ to make sure you feel comfortable every step of the way</p>
        </div>
        <Doodle index={0} />
      </div>
      <div className="mt-6 space-y-3">
        <BigButton onClick={() => choose("en")} active={state.language === "en"}>
          English
        </BigButton>
        <BigButton onClick={() => choose("fr")} active={state.language === "fr"}>
          Français
        </BigButton>
      </div>
      <StepNav onBack={prev} onNext={next} nextDisabled={!state.language} />
    </div>
  )
}
