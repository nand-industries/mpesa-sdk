import { execute } from "./core/execute";
import { PATHS } from "./core/paths";
import { createHttpAdapter, type HttpConfig } from "./http";
import {
  C2BInputSchema,
  C2BResponseSchema,
  B2CInputSchema,
  B2CResponseSchema,
  B2BInputSchema,
  B2BResponseSchema,
  ReversalInputSchema,
  ReversalResponseSchema,
  QueryTransactionStatusInputSchema,
  QueryTransactionStatusResponseSchema,
  QueryCustomerNameInputSchema,
  QueryCustomerNameResponseSchema,
  type C2BInput,
  type B2CInput,
  type B2BInput,
  type ReversalInput,
  type QueryTransactionStatusInput,
  type QueryCustomerNameInput,
} from "./schemas";

export const createMpesaSdk = (config: HttpConfig) => {
  const http = createHttpAdapter(config);

  const receive = (input: C2BInput) =>
    execute(
      http,
      {
        method: "POST",
        path: PATHS.c2b,
        inputSchema: C2BInputSchema,
        outputSchema: C2BResponseSchema,
      },
      input,
    );

  const send = (input: B2CInput) =>
    execute(
      http,
      {
        method: "POST",
        path: PATHS.b2c,
        inputSchema: B2CInputSchema,
        outputSchema: B2CResponseSchema,
      },
      input,
    );

  const transfer = (input: B2BInput) =>
    execute(
      http,
      {
        method: "POST",
        path: PATHS.b2b,
        inputSchema: B2BInputSchema,
        outputSchema: B2BResponseSchema,
      },
      input,
    );

  const reverse = (input: ReversalInput) =>
    execute(
      http,
      {
        method: "POST",
        path: PATHS.reversal,
        inputSchema: ReversalInputSchema,
        outputSchema: ReversalResponseSchema,
      },
      input,
    );

  const status = (input: QueryTransactionStatusInput) =>
    execute(
      http,
      {
        method: "GET",
        path: PATHS.status,
        inputSchema: QueryTransactionStatusInputSchema,
        outputSchema: QueryTransactionStatusResponseSchema,
      },
      input,
    );

  const queryCustomer = (input: QueryCustomerNameInput) =>
    execute(
      http,
      {
        method: "GET",
        path: PATHS.customer,
        inputSchema: QueryCustomerNameInputSchema,
        outputSchema: QueryCustomerNameResponseSchema,
      },
      input,
    );

  return {
    send,
    transfer,
    receive,
    transactions: {
      status,
      reverse,
    },
    customers: {
      query: queryCustomer,
    },
  };
};

export type MpesaSdk = ReturnType<typeof createMpesaSdk>;
