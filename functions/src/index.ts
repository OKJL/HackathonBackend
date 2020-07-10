import * as admin from "firebase-admin"
import * as functions from "firebase-functions"

import { User } from "./models/User"
import { Notify } from "./models/Notify"

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
      "NRIC/FIN/PPT": null,
      "Full Name": null,
      "Contact Number": null,
      "Country Name": null,
      "FCM Tokens": null,
      "updatedAt": admin.firestore.FieldValue.serverTimestamp(),
      "createdAt": admin.firestore.FieldValue.serverTimestamp(),
    }

    return ref.set(data, { merge: true }).catch(console.error)
  })

export const notifyUser = functions
  .region(DEPLOYMENT_REGION)
  .firestore.document("notifiers/{notifyID}")
  .onCreate((snap, ctx) => {
    const data = <Notify>snap.data()

    switch (data["Message Type"]) {
      case "ALL_USERS":
        return Promise.resolve()
      case "COUNTRY_NAME":
        return Promise.resolve()
      case "TIMEFRAME_RANGE":
        return Promise.resolve()
      case "SPECIFIC_TOKEN":
        if (data["FCM Token ID"] === undefined) return

        console.log("Message Title: " + data["Message Title"])
        console.log("Message Body: " + data["Message Body"])

        const payload: admin.messaging.MessagingPayload = {
          notification: {
            sound: "default",
            title: data["Message Title"],
            body: data["Message Body"],
          },
        }

        return admin
          .messaging()
          .sendToDevice(data["FCM Token ID"], payload)
          .catch(console.error)
      default:
        return Promise.resolve()
    }
  })
