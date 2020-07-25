import { firestore } from "firebase-admin"

export interface User {
  "UID": string | null
  "NRIC/FIN/PPT": string | null
  "Full Name": string | null
  "Contact Number": string | null
  "Country Name": string | null
  "FCM Tokens": firestore.FieldValue | null
  "createdAt": firestore.FieldValue
}
