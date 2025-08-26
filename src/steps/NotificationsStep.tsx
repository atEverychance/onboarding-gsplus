import { useOnboarding } from "../onboarding/OnboardingContext"
import StepNav from "../components/ui/StepNav"
import Doodle from "../components/Doodle"
import Chip from "../components/ui/Chip"

const channels = ["email","sms","push"] as const

export default function NotificationsStep() {
  const { state, setNotifications, next, prev, completeStep } = useOnboarding()
  const notif = state.notifications || {}
  const toggleChannel = (c: (typeof channels)[number]) => {
    const set = new Set<(typeof channels)[number]>(notif.channels || [])
    set.has(c) ? set.delete(c) : set.add(c)
    setNotifications({ channels: Array.from(set) })
    completeStep()
  }
  const setFreq = (f: "important" | "regular") => {
    setNotifications({ frequency: f })
    completeStep()
  }
  return (
    <div className="max-w-[640px]">
      <div className="flex items-start justify-between">
        <h1 className="text-2xl font-semibold text-zinc-800">Notifications</h1>
        <Doodle index={0} />
      </div>
      <div className="mt-6">
        <div className="mb-2 text-sm text-zinc-600">How should we reach you?</div>
        <div className="flex flex-wrap gap-3">
          {channels.map((c)=>(
            <Chip key={c} label={c === "sms" ? "SMS" : c.charAt(0).toUpperCase()+c.slice(1)} selected={(notif.channels||[]).includes(c)} onClick={()=>toggleChannel(c)} />
          ))}
        </div>
      </div>
      <div className="mt-6">
        <div className="mb-2 text-sm text-zinc-600">How often?</div>
        <div className="flex gap-3">
          <Chip label="Only important" selected={notif.frequency==="important"} onClick={()=>setFreq("important")} />
          <Chip label="Regular updates" selected={notif.frequency==="regular"} onClick={()=>setFreq("regular")} />
        </div>
      </div>
      <div className="mt-6">
        <StepNav onBack={prev} onNext={next} />
      </div>
    </div>
  )
}
