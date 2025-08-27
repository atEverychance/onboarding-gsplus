import { useOnboarding } from "../../onboarding/OnboardingContext"
import StepNav from "../../components/ui/StepNav"
import Doodle from "../../components/Doodle"

export default function GoalsInterstitial() {
  const { state, next, prev } = useOnboarding()
  const name = state.about.preferredName || "you"
  const pronouns = state.about.pronouns
  
  const getSubject = () => {
    if (pronouns === "he") return "he"
    if (pronouns === "she") return "she"
    return "they"
  }

  const getObject = () => {
    if (pronouns === "he") return "him"
    if (pronouns === "she") return "her"
    return "them"
  }

  const subject = getSubject()
  const object = getObject()

  return (
    <div className="max-w-[640px]">
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-zinc-800">We're Here to Support {name}</h1>
          <p className="mt-2 text-lg text-zinc-600">Your goals matter to us 🎯</p>
        </div>
        <Doodle index={2} />
      </div>
      
      <div className="mt-6 space-y-4">
        <div className="flex items-start gap-3 p-4 bg-zinc-50 rounded-lg">
          <span className="text-2xl">🤝</span>
          <p className="text-sm text-zinc-700">
            <strong>Personalized Support:</strong> We'll connect {object} with resources tailored to {pronouns === "they" ? "their" : `${subject === "he" ? "his" : "her"}`} specific health goals and challenges.
          </p>
        </div>
        
        <div className="flex items-start gap-3 p-4 bg-zinc-50 rounded-lg">
          <span className="text-2xl">📱</span>
          <p className="text-sm text-zinc-700">
            <strong>Easy Access:</strong> Our platform makes it simple for {object} to book appointments, access virtual care, and manage {pronouns === "they" ? "their" : `${subject === "he" ? "his" : "her"}`} health journey.
          </p>
        </div>
        
        <div className="flex items-start gap-3 p-4 bg-zinc-50 rounded-lg">
          <span className="text-2xl">💚</span>
          <p className="text-sm text-zinc-700">
            <strong>Comprehensive Care:</strong> From mental health to preventive care, we're here to support every aspect of {pronouns === "they" ? "their" : `${subject === "he" ? "his" : "her"}`} wellbeing.
          </p>
        </div>
      </div>
      
      <div className="mt-6 p-4 bg-green-50 rounded-lg">
        <p className="text-sm text-zinc-700">
          Ready to take the next step? Let's continue setting up {pronouns === "they" ? "their" : `${subject === "he" ? "his" : "her"}`} GreenShield+ experience.
        </p>
      </div>
      
      <StepNav onBack={prev} onNext={next} nextLabel="Continue setup" />
    </div>
  )
}
