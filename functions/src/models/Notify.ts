import { NotifyType } from "../types/NotifyType"

export interface Notify {
  "Message Title": string | undefined
  "Message Body": string | undefined
  "Message Type": NotifyType
  "Country Name"?: string | null
  "Timeframe Start"?: number | null
  "Timeframe End"?: number | null
  "FCM Token ID"?: string | string[]
}
