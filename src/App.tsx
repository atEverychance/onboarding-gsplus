import "./App.css"
import Header from "./components/Header"
import LeftOverview from "./components/LeftOverview"
import TopProgress from "./components/TopProgress"
import { OnboardingProvider, useOnboarding } from "./onboarding/OnboardingContext"
import LanguageStep from "./steps/LanguageStep"
import AgeStep from "./steps/about/AgeStep"
import GenderStep from "./steps/about/GenderStep"
import PronounsStep from "./steps/about/PronounsStep"
import PreferredNameStep from "./steps/about/PreferredNameStep"
import CareLanguageStep from "./steps/about/CareLanguageStep"
import CaregiverStep from "./steps/about/CaregiverStep"
import TechComfortStep from "./steps/about/TechComfortStep"
import HasDependentsStep from "./steps/household/HasDependentsStep"
import DependentsForm from "./steps/household/DependentsForm"
import GoalsStep from "./steps/GoalsStep"
import ChallengesStep from "./steps/ChallengesStep"
import PreferencesStep from "./steps/PreferencesStep"
import ClaimsIntentStep from "./steps/claims/ClaimsIntentStep"
import DirectDepositStep from "./steps/claims/DirectDepositStep"
import NotificationsStep from "./steps/NotificationsStep"
import ReviewStep from "./steps/ReviewStep"

function StepRenderer() {
  const { state } = useOnboarding()
  const id = state.currentStepId
  if (id === "language") return <LanguageStep />
  if (id === "about.gender") return <GenderStep />
  if (id === "about.age") return <AgeStep />
  if (id === "about.pronouns") return <PronounsStep />
  if (id === "about.name") return <PreferredNameStep />
  if (id === "about.careLang") return <CareLanguageStep />
  if (id === "about.caregiver") return <CaregiverStep />
  if (id === "about.tech") return <TechComfortStep />
  if (id === "household.hasDeps") return <HasDependentsStep />
  if (id === "household.manageDeps") return <DependentsForm />
  if (id === "goals") return <GoalsStep />
  if (id === "challenges") return <ChallengesStep />
  if (id === "prefs") return <PreferencesStep />
  if (id === "claims.intent") return <ClaimsIntentStep />
  if (id === "claims.deposit") return <DirectDepositStep />
  if (id === "notifications") return <NotificationsStep />
  if (id === "review") return <ReviewStep />
  return <div />
}

function Shell() {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      <main className="mx-auto flex max-w-[1200px] gap-4">
        <LeftOverview />
        <section className="flex-1 px-6 pb-24">
          <div className="px-2 pt-6">
            <TopProgress />
            <div className="mt-8">
              <StepRenderer />
            </div>
          </div>
        </section>
      </main>
    </div>
  )
}

export default function App() {
  return (
    <OnboardingProvider>
      <Shell />
    </OnboardingProvider>
  )
}
