import { describe, expect, it } from "bun:test";
import {
  QueryTransactionStatusInputSchema,
  QueryTransactionStatusResponseSchema,
} from "../../src/schemas/query-transaction-status";

describe("QueryTransactionStatus schemas", () => {
  it("maps the input payload to the Mpesa wire format", () => {
    expect(
      QueryTransactionStatusInputSchema.parse({
        third_party_reference: "ref-1",
        query_reference: "query-1",
        service_provider_code: "171717",
      }),
    ).toEqual({
      input_ThirdPartyReference: "ref-1",
      input_QueryReference: "query-1",
      input_ServiceProviderCode: "171717",
    });
  });

  it("normalizes the status response", () => {
    expect(
      QueryTransactionStatusResponseSchema.parse({
        output_ConversationID: "conv-1",
        output_ResponseDesc: "ok",
        output_ResponseCode: "INS-0",
        output_ThirdPartyReference: "ref-1",
        output_ResponseTransactionStatus: "Completed",
      }),
    ).toEqual({
      conversation_id: "conv-1",
      code: "INS-0",
      description: "ok",
      third_party_reference: "ref-1",
      status: "Completed",
    });
  });
});
