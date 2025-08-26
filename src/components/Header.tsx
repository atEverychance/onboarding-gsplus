import { ChevronDown } from "lucide-react"

export default function Header() {
  return (
    <header className="w-full bg-[#0E4B47] text-white">
      <div className="mx-auto flex max-w-[1200px] items-center justify-between px-6 py-4">
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-3">
            <div className="h-7 w-7 rounded-sm bg-white/90" />
            <span className="text-xl font-semibold tracking-wide">GreenShield+</span>
          </div>
        </div>
        <div className="flex items-center gap-6 text-sm/6 text-white/90">
          <div className="flex items-center gap-1 hover:text-white cursor-pointer">
            <span>Support</span>
            <ChevronDown size={16} />
          </div>
          <div className="hidden sm:block">EN</div>
        </div>
      </div>
    </header>
  )
}
