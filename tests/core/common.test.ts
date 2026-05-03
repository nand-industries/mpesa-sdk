import { describe, expect, it } from "bun:test";
import { PaymentOutputSchema } from "../../src/core/common";

describe("PaymentOutputSchema", () => {
  it("parses the normalized payment payload", () => {
    const result = PaymentOutputSchema.parse({
      conversation_id: "conv-1",
      transaction_id: "tx-1",
      code: "INS-0",
      description: "ok",
      third_party_reference: "ref-1",
    });

    expect(result).toEqual({
      conversation_id: "conv-1",
      transaction_id: "tx-1",
      code: "INS-0",
      description: "ok",
      third_party_reference: "ref-1",
    });
  });

  it("rejects incomplete payloads", () => {
    expect(() =>
      PaymentOutputSchema.parse({
        conversation_id: "conv-1",
      }),
    ).toThrow();
  });
});
