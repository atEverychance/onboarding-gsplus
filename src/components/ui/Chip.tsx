
type Props = {
  label: string
  selected?: boolean
  onClick?: () => void
}

export default function Chip({ label, selected, onClick }: Props) {
  return (
    <button
      onClick={onClick}
      className={`rounded-full border px-4 py-2 text-sm ${
        selected ? "border-[#1E6E68] bg-[#E6F1F0] text-[#0E4B47]" : "border-zinc-300 hover:bg-zinc-50"
      }`}
    >
      {label}
    </button>
  )
}
