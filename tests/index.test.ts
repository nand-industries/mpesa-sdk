import { describe, expect, it } from "bun:test";

describe("package entrypoint", () => {
  it("re-exports the public sdk API", async () => {
    const entry = await import("../index");

    expect(entry.createMpesaSdk).toBeFunction();
    expect(entry.PATHS).toBeDefined();
    expect(entry.C2BInputSchema).toBeDefined();
  });
});
