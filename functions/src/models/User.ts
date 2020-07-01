import { firestore } from "firebase-admin"

export interface User {
  "UID": string | null
  "NRIC": string | null
  "Full Name": string | null
  "Contact Number": string | null
  "Resident Of Singapore": boolean | null
  "Device ID": string | null
  "~updatedAt": firestore.FieldValue
  "~createdAt": firestore.FieldValue
}
