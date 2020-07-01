import { assertFails } from "@firebase/testing"

expect.extend({
  async toDeny(x: Promise<any>): Promise<any> {
    let pass = false

    try {
      await assertFails(x)

      pass = true
    } catch (err) {}

    return {
      pass,
      message: () =>
        "Expected Firebase operation to be denied, but it allowed.",
    }
  },
})
