import { useOnboarding } from "../onboarding/OnboardingContext"
import { getThemeColor } from "../utils/theme"

export default function TopProgress() {
  const { progress, state } = useOnboarding()
  const value = Math.min(100, Math.max(0, progress))
  const themeColor = getThemeColor(state.about.gender)
  
  return (
    <div className="w-full">
      <div className="mx-auto max-w-[980px] px-6">
        <div className="mt-6 h-1.5 w-full rounded-full bg-zinc-200">
          <div
            className="h-1.5 rounded-full transition-all"
            style={{ 
              width: `${value}%`,
              backgroundColor: themeColor
            }}
          />
        </div>
        <div className="mt-1 text-right text-xs text-zinc-500">{value}%</div>
      </div>
    </div>
  )
}
