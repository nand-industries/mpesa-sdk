import { describe, expect, it } from "bun:test";
import { PATHS } from "../../src/core/paths";

describe("PATHS", () => {
  it("exposes the expected endpoint map", () => {
    expect(PATHS).toEqual({
      c2b: "/ipg/v1x/c2bPayment/singleStage/",
      b2c: "/ipg/v1x/b2cPayment/",
      b2b: "/ipg/v1x/b2bPayment/",
      reversal: "/ipg/v1x/reversal/",
      status: "/ipg/v1x/queryTransactionStatus/",
      customer: "/ipg/v1x/queryCustomerName/",
    });
  });
});
