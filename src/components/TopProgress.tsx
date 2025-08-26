import { useOnboarding } from "../onboarding/OnboardingContext"

export default function TopProgress() {
  const { progress } = useOnboarding()
  const value = Math.min(100, Math.max(0, progress))
  return (
    <div className="w-full">
      <div className="mx-auto max-w-[980px] px-6">
        <div className="mt-6 h-1.5 w-full rounded-full bg-zinc-200">
          <div
            className="h-1.5 rounded-full bg-[#1E6E68] transition-all"
            style={{ width: `${value}%` }}
          />
        </div>
        <div className="mt-1 text-right text-xs text-zinc-500">{value}%</div>
      </div>
    </div>
  )
}
