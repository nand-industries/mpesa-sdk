import { describe, expect, it } from "bun:test";
import { z } from "zod";
import { execute } from "../../src/core/execute";
import type { HttpAdapter } from "../../src/http";

describe("execute", () => {
  const inputSchema = z
    .object({
      id: z.string(),
      amount: z.string(),
    })
    .transform((value) => ({
      input_Id: value.id,
      input_Amount: value.amount,
    }));

  const outputSchema = z
    .object({
      output_ResponseCode: z.string(),
      output_ConversationID: z.string(),
    })
    .transform((value) => ({
      code: value.output_ResponseCode,
      conversation_id: value.output_ConversationID,
    }));

  it("sends POST requests with parsed input and maps success metadata", async () => {
    const responseData = {
      output_ResponseCode: "INS-0",
      output_ConversationID: "conv-1",
    };

    const http: HttpAdapter = {
      post: async (path, body) => {
        expect(path).toBe("/payments");
        expect(body).toEqual({
          input_Id: "abc",
          input_Amount: "10",
        });
        return { status: 200, data: responseData };
      },
      get: async () => {
        throw new Error("GET should not be called");
      },
    };

    const result = await execute(
      http,
      {
        method: "POST",
        path: "/payments",
        inputSchema,
        outputSchema,
      },
      { id: "abc", amount: "10" },
    );

    expect(result.data).toEqual({
      code: "INS-0",
      conversation_id: "conv-1",
    });
    expect(result.raw()).toEqual(responseData);
    expect(result.meta).toEqual({
      statusCode: 200,
      ok: true,
    });
  });

  it("serializes GET requests with query parameters from parsed input", async () => {
    const http: HttpAdapter = {
      post: async () => {
        throw new Error("POST should not be called");
      },
      get: async (url) => {
        expect(url).toBe("/status?input_Id=abc&input_Amount=10");
        return {
          status: 202,
          data: {
            output_ResponseCode: "INS-1",
            output_ConversationID: "conv-2",
          },
        };
      },
    };

    const result = await execute(
      http,
      {
        method: "GET",
        path: "/status",
        inputSchema,
        outputSchema,
      },
      { id: "abc", amount: "10" },
    );

    expect(result.meta).toEqual({
      statusCode: 202,
      ok: false,
    });
  });

  it("throws when the adapter returns an empty payload", async () => {
    const http: HttpAdapter = {
      post: async () => ({ status: 200, data: null }),
      get: async () => ({ status: 200, data: null }),
    };

    await expect(
      execute(
        http,
        {
          method: "POST",
          path: "/payments",
          inputSchema,
          outputSchema,
        },
        { id: "abc", amount: "10" },
      ),
    ).rejects.toThrow("empty response");
  });
});
