import { describe, expect, it } from "bun:test";
import {
  QueryCustomerNameInputSchema,
  QueryCustomerNameResponseSchema,
} from "../../src/schemas/query-customer-name";

describe("QueryCustomerName schemas", () => {
  it("maps the input payload to the Mpesa wire format", () => {
    expect(
      QueryCustomerNameInputSchema.parse({
        msisdn: "258841234567",
        third_party_reference: "ref-1",
        service_provider_code: "171717",
      }),
    ).toEqual({
      input_CustomerMSISDN: "258841234567",
      input_ThirdPartyReference: "ref-1",
      input_ServiceProviderCode: "171717",
    });
  });

  it("normalizes the customer response", () => {
    expect(
      QueryCustomerNameResponseSchema.parse({
        output_ConversationID: "conv-1",
        output_ResultDesc: "ok",
        output_ResultCode: "INS-0",
        output_ThirdPartyReference: "ref-1",
        output_CustomerName: "Jane Doe",
      }),
    ).toEqual({
      conversation_id: "conv-1",
      code: "INS-0",
      description: "ok",
      third_party_reference: "ref-1",
      customer_name: "Jane Doe",
    });
  });
});
