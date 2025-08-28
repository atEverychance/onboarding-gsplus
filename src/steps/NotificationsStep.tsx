import { useOnboarding } from "../onboarding/OnboardingContext"
import StepNav from "../components/ui/StepNav"
import Doodle from "../components/Doodle"
import { useState } from "react"

type Channel = "email" | "sms"

export default function NotificationsStep() {
  const { state, setNotifications, next, prev, completeStep } = useOnboarding()
  const notif = state.notifications || {}
  const [phone, setPhone] = useState(notif.phone || "")
  const name = state.about.preferredName || "you"
  
  const toggleChannel = (c: Channel) => {
    const set = new Set(notif.channels || [])
    if (set.has(c)) {
      set.delete(c)
    } else {
      set.add(c)
    }
    const newNotif = { ...notif, channels: Array.from(set) }
    if (c === "sms" && !set.has(c)) {
      newNotif.phone = undefined
      setPhone("")
    }
    setNotifications(newNotif)
    completeStep()
  }
  
  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    setPhone(value)
    setNotifications({ ...notif, phone: value })
  }

  const canProceed = !(notif.channels || []).includes("sms") || ((notif.channels || []).includes("sms") && phone.trim().length > 0)

  return (
    <div className="max-w-[640px]">
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-zinc-800">How would you like to stay connected, {name}?</h1>
          <p className="mt-2 text-zinc-600">We'll only send you important updates about your health care</p>
        </div>
        <Doodle index={0} />
      </div>
      
      <div className="mt-6 space-y-4">
        <label className="flex items-center gap-3 cursor-pointer p-4 border border-zinc-200 rounded-lg hover:bg-zinc-50">
          <input
            type="checkbox"
            checked={(notif.channels || []).includes("email")}
            onChange={() => toggleChannel("email")}
            className="w-4 h-4 text-[#1E6E68] border-zinc-300 rounded focus:ring-[#1E6E68]"
          />
          <div>
            <span className="text-zinc-800 font-medium">Email notifications</span>
            <p className="text-sm text-zinc-600">Get updates about your care and health resources</p>
          </div>
        </label>
        
        <label className="flex items-center gap-3 cursor-pointer p-4 border border-zinc-200 rounded-lg hover:bg-zinc-50">
          <input
            type="checkbox"
            checked={(notif.channels || []).includes("sms")}
            onChange={() => toggleChannel("sms")}
            className="w-4 h-4 text-[#1E6E68] border-zinc-300 rounded focus:ring-[#1E6E68]"
          />
          <div>
            <span className="text-zinc-800 font-medium">SMS notifications</span>
            <p className="text-sm text-zinc-600">Get quick reminders and urgent health updates</p>
          </div>
        </label>
        
        {(notif.channels || []).includes("sms") && (
          <div className="ml-7 mt-3">
            <input
              type="tel"
              value={phone}
              onChange={handlePhoneChange}
              placeholder="Phone number (required for SMS)"
              className="w-full rounded-xl border border-zinc-300 px-4 py-3 text-base"
              required
            />
            {(notif.channels || []).includes("sms") && !phone.trim() && (
              <p className="mt-1 text-sm text-red-600">Phone number is required for SMS notifications</p>
            )}
          </div>
        )}
      </div>
      
      <div className="mt-6">
        <StepNav 
          onBack={prev} 
          onNext={canProceed ? next : undefined}
          nextDisabled={!canProceed}
        />
      </div>
    </div>
  )
}
