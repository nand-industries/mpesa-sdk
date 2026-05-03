import { describe, expect, it } from "bun:test";
import { B2CInputSchema, B2CResponseSchema } from "../../src/schemas/b2c";

describe("B2C schemas", () => {
  it("maps the input payload to the Mpesa wire format", () => {
    expect(
      B2CInputSchema.parse({
        reference: "T123",
        msisdn: "258841234567",
        amount: "10",
        third_party_reference: "ref-1",
        service_provider_code: "171717",
      }),
    ).toEqual({
      input_TransactionReference: "T123",
      input_CustomerMSISDN: "258841234567",
      input_Amount: "10",
      input_ThirdPartyReference: "ref-1",
      input_ServiceProviderCode: "171717",
    });
  });

  it("normalizes the payment response", () => {
    expect(
      B2CResponseSchema.parse({
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
