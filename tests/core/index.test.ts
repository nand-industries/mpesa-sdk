import { describe, expect, it } from "bun:test";
import * as core from "../../src/core";

describe("core barrel", () => {
  it("re-exports the shared payment schema", () => {
    expect(core.PaymentOutputSchema).toBeDefined();
  });
});
