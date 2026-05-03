import { describe, expect, it } from "bun:test";
import { B2BInputSchema, B2BResponseSchema } from "../../src/schemas/b2b";

describe("B2B schemas", () => {
  it("maps the input payload to the Mpesa wire format", () => {
    expect(
      B2BInputSchema.parse({
        reference: "T123",
        amount: "10",
        third_party_reference: "ref-1",
        primary_party_code: "111",
        receiver_party_code: "222",
      }),
    ).toEqual({
      input_TransactionReference: "T123",
      input_Amount: "10",
      input_ThirdPartyReference: "ref-1",
      input_PrimaryPartyCode: "111",
      input_ReceiverPartyCode: "222",
    });
  });

  it("normalizes the payment response", () => {
    expect(
      B2BResponseSchema.parse({
        output_ConversationID: "conv-1",
        output_TransactionID: "tx-1",
        output_ResponseDesc: "ok",
        output_ResponseCode: "INS-0",
        output_ThirdPartyReference: "ref-1",
      }),
    ).toEqual({
      conversation_id: "conv-1",
      transaction_id: "tx-1",
      code: "INS-0",
      description: "ok",
      third_party_reference: "ref-1",
    });
  });
});
