type Props = {
  onBack?: () => void
  onNext?: () => void
  nextDisabled?: boolean
  nextLabel?: string
}

export default function StepNav({ onBack, onNext, nextDisabled, nextLabel }: Props) {
  return (
    <div className="mt-10 flex items-center gap-4">
      <button
        onClick={onBack}
        className="rounded-full border border-zinc-300 bg-white px-5 py-2 text-sm"
      >
        Back
      </button>
      <button
        onClick={onNext}
        disabled={!!nextDisabled}
        className="rounded-full bg-[#0E4B47] px-6 py-2 text-sm text-white disabled:opacity-50"
      >
        {nextLabel || "Next"}
      </button>
      <a href="#" className="text-sm text-[#1E6E68] underline" onClick={(e)=>e.preventDefault()}>
        Save and come back later
      </a>
    </div>
  )
}
