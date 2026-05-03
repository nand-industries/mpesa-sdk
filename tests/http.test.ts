import { afterEach, beforeEach, describe, expect, it, mock } from "bun:test";
import { generateKeyPairSync } from "crypto";
import { createHttpAdapter } from "../src/http";

describe("createHttpAdapter", () => {
  const originalFetch = globalThis.fetch;
  const { publicKey } = generateKeyPairSync("rsa", { modulusLength: 1024 });
  const publicKeyPem = publicKey.export({ type: "spki", format: "pem" }).toString();

  beforeEach(() => {
    globalThis.fetch = mock();
  });

  afterEach(() => {
    globalThis.fetch = originalFetch;
  });

  it("builds POST requests with default sandbox host, scheme and auth headers", async () => {
    const fetchMock = globalThis.fetch as unknown as ReturnType<typeof mock>;
    fetchMock.mockResolvedValue({
      status: 200,
      json: async () => ({ ok: true }),
    });

    const http = createHttpAdapter({
      env: "sandbox",
      api_key: "api-key",
      public_key: publicKeyPem,
      timeout: 3000,
      service_provider_code: "171717",
      origin: "https://merchant.test",
      headers: {
        "x-trace-id": "trace-1",
      },
    });

    const result = await http.post("/payments", { amount: "10" });

    expect(result).toEqual({
      status: 200,
      data: { ok: true },
    });
    expect(fetchMock).toHaveBeenCalledTimes(1);
    expect(fetchMock).toHaveBeenCalledWith(
      "http://api.sandbox.vm.co.mz:18352/payments",
      expect.objectContaining({
        method: "POST",
        body: JSON.stringify({ amount: "10" }),
        headers: expect.objectContaining({
          "content-type": "application/json",
          Origin: "https://merchant.test",
          Authorization: expect.stringMatching(/^Bearer .+/),
          "x-trace-id": "trace-1",
        }),
      }),
    );
  });

  it("builds GET requests with a custom base_url and handles invalid json", async () => {
    const fetchMock = globalThis.fetch as unknown as ReturnType<typeof mock>;
    fetchMock.mockResolvedValue({
      status: 204,
      json: async () => {
        throw new Error("invalid json");
      },
    });

    const http = createHttpAdapter({
      base_url: "https://custom.test",
      env: "live",
      api_key: "api-key",
      public_key: publicKeyPem,
      service_provider_code: "171717",
      origin: "https://merchant.test",
    });

    const result = await http.get("/status");

    expect(result).toEqual({
      status: 204,
      data: null,
    });
    expect(fetchMock).toHaveBeenCalledWith(
      "https://custom.test/status",
      expect.objectContaining({
        method: "GET",
      }),
    );
  });

  it("uses the endpoint-specific port when no custom base_url is provided", async () => {
    const fetchMock = globalThis.fetch as unknown as ReturnType<typeof mock>;
    fetchMock.mockResolvedValue({
      status: 200,
      json: async () => ({ ok: true }),
    });

    const http = createHttpAdapter({
      env: "sandbox",
      api_key: "api-key",
      public_key: publicKeyPem,
      service_provider_code: "171717",
      origin: "https://merchant.test",
    });

    await http.get("/ipg/v1x/queryTransactionStatus/?input_ThirdPartyReference=ref-1");

    expect(fetchMock).toHaveBeenCalledWith(
      "http://api.sandbox.vm.co.mz:18353/ipg/v1x/queryTransactionStatus/?input_ThirdPartyReference=ref-1",
      expect.objectContaining({
        method: "GET",
      }),
    );
  });

  it("validates the http configuration", () => {
    expect(() =>
      createHttpAdapter({
        env: "sandbox",
        api_key: "",
        public_key: publicKeyPem,
        service_provider_code: "171717",
        origin: "https://merchant.test",
      }),
    ).toThrow();
  });
});
