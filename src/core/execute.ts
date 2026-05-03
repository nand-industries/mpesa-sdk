import type { z } from "zod";
import type { HttpAdapter } from "~/http";
import type { Response as MpesaResponse } from "./common";

const SUCCESS_CODE = "INS-0";

export type Method = "GET" | "POST";

export type Arguments<I extends z.ZodTypeAny, O extends z.ZodTypeAny> = {
  method: Method;
  path: string;
  inputSchema: I;
  outputSchema: O;
};

const query = (data: unknown) => {
  return new URLSearchParams(data as Record<string, string>).toString();
};

const isOk = (status: number, code?: string) => {
  return status >= 200 && status < 300 && code === SUCCESS_CODE;
};

export const execute = async <I extends z.ZodTypeAny, O extends z.ZodTypeAny>(
  http: HttpAdapter,
  args: Arguments<I, O>,
  input: z.input<I>,
): Promise<MpesaResponse<z.output<O>, z.input<O>>> => {
  const body = args.inputSchema.parse(input);

  if (args.method === "POST") {
    const response = await http.post<unknown>(args.path, body);
    const data = response.data ? args.outputSchema.parse(response.data) : null;
    const code = (data as { code?: string })?.code;
    return {
      data,
      raw: () => response.data as z.input<O>,
      meta: {
        ...response.meta,
        ok: isOk(response.meta.status, code),
      },
    };
  }

  const response = await http.get<unknown>(`${args.path}?${query(body)}`);
  const data = response.data ? args.outputSchema.parse(response.data) : null;
  const code = (data as { code?: string })?.code;
  return {
    data,
    raw: () => response.data as z.input<O>,
    meta: {
      ...response.meta,
      ok: isOk(response.meta.status, code),
    },
  };
};
