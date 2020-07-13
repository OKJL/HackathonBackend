import { admin } from "firebase-admin/lib/auth"

import { firestore } from "firebase-admin"

export interface Entry {
  "UID": string | null
  "FCM Token ID": string | null
  "Beacon ID": string | null
  "Entered Timestamp": firestore.FieldValue
  "Exited Timestamp": firestore.FieldValue
}
