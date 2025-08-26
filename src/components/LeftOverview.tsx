import { useOnboarding } from "../onboarding/OnboardingContext"
import { STEPS } from "../onboarding/steps"

export default function LeftOverview() {
  const { state, goTo } = useOnboarding()
  const current = state.currentStepId

  const visible = STEPS.filter((s) => (s.when ? s.when(state) : true))

  const firstAbout = visible.find((s) => s.id.startsWith("about."))
  const aboutIds = visible.filter((s) => s.id.startsWith("about.")).map((s) => s.id)

  const grouped = []
  let addedAbout = false
  for (const s of visible) {
    if (s.id.startsWith("about.")) {
      if (!addedAbout) {
        grouped.push({ id: "about", label: "About you" })
        addedAbout = true
      }
      continue
    }
    grouped.push({ id: s.id, label: s.label })
  }

  const isAboutActive = current.startsWith("about.")
  const isAboutDone = aboutIds.length > 0 && aboutIds.every((id) => state.completed[id])

  function isActive(id: string) {
    return id === "about" ? isAboutActive : id === current
  }
  function isDone(id: string) {
    return id === "about" ? isAboutDone : !!state.completed[id]
  }
  function handleClick(id: string) {
    if (id === "about") {
      if (firstAbout) goTo(firstAbout.id)
      return
    }
    goTo(id)
  }

  return (
    <aside className="w-full max-w-[280px] px-6 pt-6">
      <ul className="space-y-2">
        {grouped.map((s) => {
          const active = isActive(s.id)
          const done = isDone(s.id)
          return (
            <li
              key={s.id}
              className={`cursor-pointer rounded-md border border-zinc-200 p-3 ${
                active ? "bg-zinc-100" : "bg-white"
              }`}
              onClick={() => handleClick(s.id)}
            >
              <div className="flex items-center gap-3">
                <span
                  className={`flex h-5 w-5 items-center justify-center rounded-full border leading-none ${
                    done
                      ? "border-[#1E6E68] text-[#1E6E68]"
                      : active
                      ? "border-zinc-400 text-zinc-400"
                      : "border-zinc-300 text-zinc-300"
                  }`}
                >
                  {done ? "✓" : active ? "◉" : "○"}
                </span>
                <div className="flex-1">
                  <div className="text-sm text-zinc-800">{s.label}</div>
                </div>
              </div>
            </li>
          )
        })}
      </ul>
    </aside>
  )
}
