import { describe, expect, it } from "bun:test";
import * as schemas from "../../src/schemas";

describe("schemas barrel", () => {
  it("re-exports the public schema set", () => {
    expect(schemas.C2BInputSchema).toBeDefined();
    expect(schemas.B2CInputSchema).toBeDefined();
    expect(schemas.B2BInputSchema).toBeDefined();
    expect(schemas.ReversalInputSchema).toBeDefined();
    expect(schemas.QueryTransactionStatusInputSchema).toBeDefined();
    expect(schemas.QueryCustomerNameInputSchema).toBeDefined();
  });
});
