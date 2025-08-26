import { ButtonHTMLAttributes } from "react"

type Props = ButtonHTMLAttributes<HTMLButtonElement> & { active?: boolean }

function BigButton({ active, className = "", children, ...rest }: Props) {
  return (
    <button
      {...rest}
      className={`w-full rounded-xl border px-5 py-4 text-left text-base transition-colors focus:outline-none focus:ring-2 focus:ring-[#1E6E68] ${
        active ? "border-[#1E6E68] bg-[#E6F1F0] text-[#0E4B47]" : "border-zinc-300 hover:bg-zinc-50"
      } ${className}`}
    >
      {children}
    </button>
  )
}

export { BigButton }
export default BigButton
