import { useOnboarding } from "../onboarding/OnboardingContext"
import Doodle from "../components/Doodle"

export default function WelcomeStep() {
  const { next, goTo } = useOnboarding()

  const handleSkip = () => {
    goTo("interstitial.services")
  }

  return (
    <div className="max-w-[640px]">
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-zinc-800">Welcome to GreenShield+!</h1>
          <p className="mt-2 text-lg text-zinc-600">You and your dependents now have access to comprehensive care. 🌟</p>
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
            <p className="font-medium text-zinc-800">Pharmacy Care</p>
            <p className="text-sm text-zinc-700 mt-1">
              Prescription coverage and convenient pharmacy services to keep you healthy and save you money.
            </p>
          </div>
        </div>
        
        <div className="flex items-start gap-3 p-4 bg-zinc-50 rounded-lg">
          <span className="text-2xl">🌱</span>
          <div>
            <p className="font-medium text-zinc-800">Well-being Support</p>
            <p className="text-sm text-zinc-700 mt-1">
              Resources and programs to support your overall wellness and healthy lifestyle goals.
            </p>
          </div>
        </div>
      </div>
      
      <div className="mt-6 p-4 bg-green-50 rounded-lg">
        <p className="text-sm text-zinc-700">
          We'd like to do a brief onboarding to personalize your experience and help you get the most out of your care.
        </p>
      </div>
      
      <div className="mt-6 flex gap-3">
        <button
          onClick={handleSkip}
          className="px-4 py-2 text-zinc-600 hover:text-zinc-800 underline"
        >
          Skip for now
        </button>
        <button
          onClick={next}
          className="flex-1 px-4 py-2 bg-[#1E6E68] text-white rounded-lg hover:bg-[#1a5f5a] transition-colors"
        >
          Let's personalize your experience
        </button>
      </div>
    </div>
  )
}
