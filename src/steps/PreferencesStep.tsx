import Chip from "../components/ui/Chip"
import StepNav from "../components/ui/StepNav"
import { useOnboarding } from "../onboarding/OnboardingContext"
import Doodle from "../components/Doodle"

const modalities = ["chat","phone","video","inperson"] as const
const times = ["weekdays","evenings","weekends"] as const

export default function PreferencesStep() {
  const { state, setPreferences, next, prev, completeStep } = useOnboarding()
  const prefs = state.preferences || {}

  const toggleModality = (val: (typeof modalities)[number]) => {
    const arr = new Set<(typeof modalities)[number]>(prefs.modalities || [])
    arr.has(val) ? arr.delete(val) : arr.add(val)
    setPreferences({ modalities: Array.from(arr) })
    completeStep()
  }

  const toggleTime = (val: (typeof times)[number]) => {
    const arr = new Set<(typeof times)[number]>(prefs.times || [])
    arr.has(val) ? arr.delete(val) : arr.add(val)
    setPreferences({ times: Array.from(arr) })
    completeStep()
  }

  const toggleLang = (lang: "en" | "fr") => {
    const arr = new Set<"en" | "fr">(prefs.careLanguages || [])
    arr.has(lang) ? arr.delete(lang) : arr.add(lang)
    setPreferences({ careLanguages: Array.from(arr) })
    completeStep()
  }

  return (
    <div className="max-w-[640px]">
      <div className="flex items-start justify-between">
        <h1 className="text-2xl font-semibold text-zinc-800">How do you like care?</h1>
        <Doodle index={2} />
      </div>

      <div className="mt-6">
        <div className="mb-2 text-sm text-zinc-600">Ways to meet</div>
        <div className="flex flex-wrap gap-3">
          {modalities.map((m) => (
            <Chip
              key={m}
              label={m === "inperson" ? "In person" : m.charAt(0).toUpperCase()+m.slice(1)}
              selected={(prefs.modalities||[]).includes(m)}
              onClick={() => toggleModality(m)}
            />
          ))}
        </div>
      </div>

      <div className="mt-6">
        <div className="mb-2 text-sm text-zinc-600">Times that work</div>
        <div className="flex flex-wrap gap-3">
          {times.map((t) => (
            <Chip
              key={t}
              label={t.charAt(0).toUpperCase()+t.slice(1)}
              selected={(prefs.times||[]).includes(t)}
              onClick={() => toggleTime(t)}
            />
          ))}
        </div>
      </div>

      <div className="mt-6">
        <div className="mb-2 text-sm text-zinc-600">Language for care</div>
        <div className="flex gap-3">
          <Chip label="English" selected={(prefs.careLanguages||[]).includes("en")} onClick={()=>toggleLang("en")} />
          <Chip label="Français" selected={(prefs.careLanguages||[]).includes("fr")} onClick={()=>toggleLang("fr")} />
        </div>
      </div>

      <StepNav onBack={prev} onNext={next} />
    </div>
  )
}
