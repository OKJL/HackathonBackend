import * as admin from "firebase-admin"
import * as functions from "firebase-functions"

import { User } from "./models/User"

/*
 * Initialize server-side Firebase Admin SDK.
 * Credentials are automatically handled by
 * Google's Servers as they are already
 * authenticated as "sudo-user".
 */
admin.initializeApp()

/*
 * Attach Firestore Admin SDK to a variable
 * for easier referencing.
 */
const db = admin.firestore()

/*
 * Indicate where the Cloud Functions are
 * supposed to be deployed for better
 * latency and throughput.
 */
const DEPLOYMENT_REGION = "asia-east2"

export const createUser = functions
  .region(DEPLOYMENT_REGION)
  .auth.user()
  .onCreate((user, context) => {
    const ref = db.doc(`users/${user.uid}`)

    const data: User = {
      "UID": user.uid,
      "NRIC": null,
      "Full Name": null,
      "Contact Number": !user.phoneNumber ? null : user.phoneNumber,
      "Resident Of Singapore": null,
      "Device ID": null,
      "~updatedAt": admin.firestore.FieldValue.serverTimestamp(),
      "~createdAt": admin.firestore.FieldValue.serverTimestamp(),
    }

    return ref.set(data, { merge: true }).catch(console.error)
  })
