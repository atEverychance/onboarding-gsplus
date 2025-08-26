import { useMemo } from "react"
import { useOnboarding } from "../onboarding/OnboardingContext"

type DoodleFn = () => JSX.Element

const Face = ({ stroke }: { stroke: string }) => (
  <svg width="120" height="80" viewBox="0 0 120 80" aria-hidden="true">
    <circle cx="40" cy="40" r="14" fill="none" stroke={stroke} strokeWidth="3" />
    <circle cx="80" cy="40" r="14" fill="none" stroke={stroke} strokeWidth="3" />
    <circle cx="36" cy="38" r="3" fill={stroke} />
    <circle cx="76" cy="38" r="3" fill={stroke} />
    <path d="M48 54 C60 64, 72 64, 84 54" stroke={stroke} strokeWidth="3" fill="none" strokeLinecap="round" />
  </svg>
)

const Sparkles = ({ stroke }: { stroke: string }) => (
  <svg width="120" height="80" viewBox="0 0 120 80" aria-hidden="true">
    <g stroke={stroke} strokeWidth="3" fill="none" strokeLinecap="round">
      <path d="M20 40 L30 40 M25 35 L25 45" />
      <path d="M60 20 L70 20 M65 15 L65 25" />
      <path d="M90 48 L100 48 M95 43 L95 53" />
    </g>
    <circle cx="60" cy="48" r="10" fill="none" stroke={stroke} strokeWidth="3" />
  </svg>
)

const Heart = ({ stroke }: { stroke: string }) => (
  <svg width="120" height="80" viewBox="0 0 120 80" aria-hidden="true">
    <path
      d="M60 60 L35 40 C28 34 28 24 35 18 C41 13 50 14 55 20 L60 26 L65 20 C70 14 79 13 85 18 C92 24 92 34 85 40 L60 60 Z"
      fill="none"
      stroke={stroke}
      strokeWidth="3"
    />
  </svg>
)

const theme = {
  neutral: { stroke: "#0E4B47" }, // green
  man: { stroke: "#0B5E8E" }, // blue
  woman: { stroke: "#B24A7E" }, // pink
}

const sets: Record<string, DoodleFn[]> = {
  neutral: [
    () => <Face stroke={theme.neutral.stroke} />,
    () => <Sparkles stroke={theme.neutral.stroke} />,
    () => <Heart stroke={theme.neutral.stroke} />,
  ],
  man: [
    () => <Face stroke={theme.man.stroke} />,
    () => <Sparkles stroke={theme.man.stroke} />,
    () => <Heart stroke={theme.man.stroke} />,
  ],
  woman: [
    () => <Face stroke={theme.woman.stroke} />,
    () => <Sparkles stroke={theme.woman.stroke} />,
    () => <Heart stroke={theme.woman.stroke} />,
  ],
}

export default function Doodle({ index = 0 }: { index?: number }) {
  const { state } = useOnboarding()
  const list = sets[state.doodleTheme] ?? sets.neutral
  const Comp = useMemo(() => list[index % list.length], [list, index])
  return (
    <div className="h-16 w-[120px]">
      <Comp />
    </div>
  )
}
