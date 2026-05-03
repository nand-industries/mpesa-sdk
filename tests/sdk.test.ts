import { afterEach, beforeEach, describe, expect, it, mock } from "bun:test";
import { generateKeyPairSync } from "crypto";
import { createMpesaSdk } from "../src/sdk";

describe("createMpesaSdk", () => {
  const originalFetch = globalThis.fetch;
  const { publicKey } = generateKeyPairSync("rsa", { modulusLength: 1024 });
  const publicKeyPem = publicKey.export({ type: "spki", format: "pem" }).toString();

  beforeEach(() => {
    globalThis.fetch = mock();
  });

  afterEach(() => {
    globalThis.fetch = originalFetch;
  });

  it("wires the receive flow through the c2b endpoint", async () => {
    const fetchMock = globalThis.fetch as ReturnType<typeof mock>;
    fetchMock.mockResolvedValue({
      status: 200,
      json: async () => ({
        output_ConversationID: "conv-1",
        output_TransactionID: "tx-1",
        output_ResponseDesc: "ok",
        output_ResponseCode: "INS-0",
        output_ThirdPartyReference: "ref-1",
      }),
    });

    const sdk = createMpesaSdk({
      base_url: "https://custom.test",
      env: "sandbox",
      api_key: "api-key",
      public_key: publicKeyPem,
      service_provider_code: "171717",
      origin: "https://merchant.test",
    });

    const result = await sdk.receive({
      reference: "T123",
      msisdn: "258841234567",
      amount: "10",
      third_party_reference: "ref-1",
      service_provider_code: "171717",
    });

    expect(fetchMock).toHaveBeenCalledWith(
      "https://custom.test/ipg/v1x/c2bPayment/singleStage/",
      expect.objectContaining({
        method: "POST",
        body: JSON.stringify({
          input_TransactionReference: "T123",
          input_CustomerMSISDN: "258841234567",
          input_Amount: "10",
          input_ThirdPartyReference: "ref-1",
          input_ServiceProviderCode: "171717",
        }),
      }),
    );
    expect(result.data).toEqual({
      conversation_id: "conv-1",
      transaction_id: "tx-1",
      code: "INS-0",
      description: "ok",
      third_party_reference: "ref-1",
    });
    expect(result.meta.ok).toBe(true);
  });

  it("wires transaction status through the GET endpoint", async () => {
    const fetchMock = globalThis.fetch as ReturnType<typeof mock>;
    fetchMock.mockResolvedValue({
      status: 200,
      json: async () => ({
        output_ConversationID: "conv-1",
        output_ResponseDesc: "Completed",
        output_ResponseCode: "INS-0",
        output_ThirdPartyReference: "ref-1",
        output_ResponseTransactionStatus: "Completed",
      }),
    });

    const sdk = createMpesaSdk({
      base_url: "https://custom.test",
      env: "sandbox",
      api_key: "api-key",
      public_key: publicKeyPem,
      service_provider_code: "171717",
      origin: "https://merchant.test",
    });

    const result = await sdk.transactions.status({
      third_party_reference: "ref-1",
      query_reference: "query-1",
      service_provider_code: "171717",
    });

    expect(fetchMock).toHaveBeenCalledWith(
      "https://custom.test/ipg/v1x/queryTransactionStatus/?input_ThirdPartyReference=ref-1&input_QueryReference=query-1&input_ServiceProviderCode=171717",
      expect.objectContaining({
        method: "GET",
      }),
    );
    expect(result.data.status).toBe("Completed");
  });
});
