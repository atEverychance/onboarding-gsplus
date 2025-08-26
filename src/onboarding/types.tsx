export type Language = "en" | "fr"

export type AgeRange =
  | "u17"
  | "18-24"
  | "25-34"
  | "35-44"
  | "45-54"
  | "55-64"
  | "65+"

export type Gender = "woman" | "man" | "nonbinary" | "prefer_not" | "self"

export type Pronouns = "she" | "he" | "they" | "self"

export type TechComfort = "simple" | "ok" | "advanced"

export type Dependent = {
  id: string
  firstName: string
  lastName: string
  relationship: "spouse" | "child" | "other"
  dob: string
  language?: Language
}

export type AboutYou = {
  ageRange?: AgeRange
  gender?: Gender
  pronouns?: Pronouns
  preferredName?: string
  careLanguages: Language[]
  caregiver?: boolean
  techComfort?: TechComfort
}

export type Household = {
  hasDependents?: boolean
  dependents: Dependent[]
}

export type CarePreferences = {
  modalities?: ("chat" | "phone" | "video" | "inperson")[]
  times?: ("weekdays" | "evenings" | "weekends")[]
  careLanguages?: Language[]
}

export type ClaimsInfo = {
  willSubmitClaims?: boolean
  accountName?: string
  institutionNumber?: string
  transitNumber?: string
  accountNumber?: string
  consent?: boolean
}

export type Notifications = {
  channels?: ("email" | "sms" | "push")[]
  frequency?: "important" | "regular"
}

export type OnboardingState = {
  language?: Language
  about: AboutYou
  household: Household
  goals?: string[]
  challenges?: string[]
  preferences?: CarePreferences
  claims?: ClaimsInfo
  notifications?: Notifications
  currentStepId: string
  completed: Record<string, boolean>
  doodleTheme: "neutral" | "man" | "woman"
}
