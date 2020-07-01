import { assertSucceeds } from "@firebase/testing";

expect.extend({
  async toAllow(x: Promise<any>): Promise<any> {
    let pass = false;

    try {
      await assertSucceeds(x);

      pass = true;
    } catch (err) {}

    return {
      pass,
      message: () =>
        "Expected Firebase operation to be allowed, but it denied.",
    };
  },
});
