import { describe, expect, it } from "bun:test";
import { ReversalInputSchema, ReversalResponseSchema } from "../../src/schemas/reversal";

describe("Reversal schemas", () => {
  it("maps the input payload to the Mpesa wire format", () => {
    expect(
      ReversalInputSchema.parse({
        transaction_id: "tx-1",
        security_credential: "secret",
        initiator_identifier: "init-1",
        third_party_reference: "ref-1",
        service_provider_code: "171717",
        amount: "10",
      }),
    ).toEqual({
      input_TransactionID: "tx-1",
      input_SecurityCredential: "secret",
      input_InitiatorIdentifier: "init-1",
      input_ThirdPartyReference: "ref-1",
      input_ServiceProviderCode: "171717",
      input_ReversalAmount: "10",
    });
  });

  it("normalizes the payment response", () => {
    expect(
      ReversalResponseSchema.parse({
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
