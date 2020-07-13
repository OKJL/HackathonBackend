import { NotifyType } from "../types/NotifyType"

export interface Notify {
  "Message Title": string | undefined
  "Message Body": string | undefined
  "Message Type": NotifyType
  "Country Name"?: string
  "FCM Token ID"?: string | string[]
}
