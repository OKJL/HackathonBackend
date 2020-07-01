import { random } from "faker"
import { setup, teardown } from ".."
import { firestore } from "@firebase/testing"

describe("Anonymous User", () => {
  let db: firestore.Firestore

  beforeEach(async () => (db = await setup()))
  afterEach(async () => await teardown())

  it("should allow reading/writing/deleting any user document", async () => {
    const ref = db.doc(`users/${random.uuid()}`)

    await expect(ref.get()).toAllow()
    await expect(ref.set({})).toAllow()
    await expect(ref.update({})).toAllow()
    await expect(ref.delete()).toAllow()
  })
})
