import { useOnboarding } from "../../onboarding/OnboardingContext"
import StepNav from "../../components/ui/StepNav"
import Doodle from "../../components/Doodle"

export default function AboutYouInterstitial() {
  const { state, next, prev, completeStep } = useOnboarding()
  const { gender, ageRange } = state.about
  
  const getContent = () => {
    if (gender === "woman" && ageRange && !["u17", "18-24"].includes(ageRange)) {
      return {
        title: "Supporting Women's Health in Canada",
        stats: [
          "73% of Canadian women report excellent or very good health (Statistics Canada, 2022)",
          "Regular preventive care reduces health risks by up to 40% (Canadian Medical Association)",
          "Women who engage with healthcare early have better long-term outcomes (Health Canada)"
        ],
        message: "We're here to support your health journey with personalized care that understands your unique needs."
      }
    } else if (gender === "man") {
      return {
        title: "Men's Mental Health Matters",
        stats: [
          "Only 61% of Canadian men report excellent mental health vs 53% of women (Statistics Canada, 2022)",
          "Men are 3x less likely to seek mental health support (Canadian Mental Health Association)",
          "Early intervention improves mental health outcomes by 60% (Mental Health Commission of Canada)"
        ],
        message: "We're breaking down barriers to make it easier for you to access the mental health support you deserve."
      }
    }
    return {
      title: "Your Health Journey Starts Here",
      stats: [
        "Canadians with regular healthcare access report 25% better health outcomes (Statistics Canada, 2022)",
        "Preventive care reduces emergency visits by 35% (Canadian Institute for Health Information)",
        "Personalized healthcare improves satisfaction by 50% (Health Canada)"
      ],
      message: "We're committed to providing you with care that fits your unique needs and lifestyle."
    }
  }

  const content = getContent()
  const name = state.about.preferredName || "there"

  return (
    <div className="max-w-[640px]">
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-zinc-800">{content.title}</h1>
          <p className="mt-2 text-lg text-zinc-600">Hi {name}! 👋</p>
        </div>
        <Doodle index={1} />
      </div>
      
      <div className="mt-6 space-y-4">
        {content.stats.map((stat, i) => (
          <div key={i} className="flex items-start gap-3 p-4 bg-zinc-50 rounded-lg">
            <span className="text-2xl">📊</span>
            <p className="text-sm text-zinc-700">{stat}</p>
          </div>
        ))}
      </div>
      
      <div className="mt-6 p-4 bg-blue-50 rounded-lg">
        <p className="text-sm text-zinc-700">{content.message}</p>
      </div>
      
      <StepNav onBack={prev} onNext={() => {
        completeStep("about.gender")
        completeStep("about.age")
        completeStep("about.pronouns")
        completeStep("about.preferredName")
        completeStep("about.caregiver")
        completeStep("about.techComfort")
        next()
      }} nextLabel="Let's continue" />
    </div>
  )
}
