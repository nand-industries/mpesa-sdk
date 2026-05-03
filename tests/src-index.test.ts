import { describe, expect, it } from "bun:test";

describe("src entrypoint", () => {
  it("exports the public source API", async () => {
    const entry = await import("../src/index");

    expect(entry.createMpesaSdk).toBeFunction();
    expect(entry.PATHS).toBeDefined();
    expect(entry.PaymentOutputSchema).toBeDefined();
  });
});
