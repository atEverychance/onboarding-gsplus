import { useOnboarding } from "../../onboarding/OnboardingContext"
import StepNav from "../../components/ui/StepNav"
import Doodle from "../../components/Doodle"

export default function ServicesInterstitial() {
  const { state, next, prev } = useOnboarding()
  const name = state.about.preferredName || "you"

  return (
    <div className="max-w-[640px]">
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-zinc-800">Welcome to GreenShield+, {name}!</h1>
          <p className="mt-2 text-lg text-zinc-600">Your comprehensive health benefits are ready 🌟</p>
        </div>
        <Doodle index={0} />
      </div>
      
      <div className="mt-6 space-y-4">
        <div className="flex items-start gap-3 p-4 bg-zinc-50 rounded-lg">
          <span className="text-2xl">🧠</span>
          <div>
            <p className="font-medium text-zinc-800">Mental Health Support</p>
            <p className="text-sm text-zinc-700 mt-1">
              Access to counselors, therapists, and mental health resources when you need them most.
            </p>
          </div>
        </div>
        
        <div className="flex items-start gap-3 p-4 bg-zinc-50 rounded-lg">
          <span className="text-2xl">💻</span>
          <div>
            <p className="font-medium text-zinc-800">Telemedicine</p>
            <p className="text-sm text-zinc-700 mt-1">
              Connect with healthcare providers from the comfort of your home through secure video consultations.
            </p>
          </div>
        </div>
        
        <div className="flex items-start gap-3 p-4 bg-zinc-50 rounded-lg">
          <span className="text-2xl">💊</span>
          <div>
            <p className="font-medium text-zinc-800">Pharmacy Benefits</p>
            <p className="text-sm text-zinc-700 mt-1">
              Prescription coverage and convenient pharmacy services to keep you healthy and save you money.
            </p>
          </div>
        </div>
      </div>
      
      <div className="mt-6 p-4 bg-green-50 rounded-lg">
        <p className="text-sm text-zinc-700">
          🎉 You're all set! Your GreenShield+ benefits are now active and ready to support your health journey.
        </p>
      </div>
      
      <StepNav onBack={prev} onNext={next} nextLabel="Get started" hideSaveLink={true} />
    </div>
  )
}
