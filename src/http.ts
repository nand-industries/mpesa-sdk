import { z } from "zod";
import { generate_token } from "./utils";
import { portForPath } from "./core/paths";

type Headers = Record<string, string>;

export type HttpResponse<T = unknown> = {
  meta: {
    status: number;
    statusText: string;
  };
  data: T | null;
};

export type HttpAdapter = {
  post<T = unknown>(url: string, body: unknown): Promise<HttpResponse<T>>;
  get<T = unknown>(url: string): Promise<HttpResponse<T>>;
};

export const httpConfigSchema = z.object({
  base_url: z.string().optional(),
  env: z.enum(["live", "sandbox"]),
  api_key: z.string().min(1),
  public_key: z.string().min(1),
  service_provider_code: z.string().min(1),
  origin: z.string().min(1),
  ssl: z.boolean().optional(),
  headers: z.record(z.string(), z.string()).optional(),
  timeout: z.number().optional(),
});

export type HttpConfig = z.infer<typeof httpConfigSchema>;

const HOST = {
  live: "https://api.vm.co.mz",
  sandbox: "https://api.sandbox.vm.co.mz",
} as const;

const trimTrailingSlash = (value: string) => value.replace(/\/+$/, "");

const createBaseUrl = (cfg: HttpConfig) => {
  if (cfg.base_url) return trimTrailingSlash(cfg.base_url);
  const host = HOST[cfg.env];

  return host;
};

export const createHttpAdapter = (config: HttpConfig): HttpAdapter => {
  const cfg = httpConfigSchema.parse(config);

  const headers: Headers = {
    "content-type": "application/json",
    Origin: cfg.origin,
    Authorization: `Bearer ${generate_token(cfg.api_key, cfg.public_key)}`,
    ...cfg.headers,
  };

  const request = async <T>(path: string, init: RequestInit): Promise<HttpResponse<T>> => {
    const baseUrl = createBaseUrl(cfg);
    const port = portForPath(path);
    const response = await fetch(`${baseUrl}:${port}${path}`, {
      ...init,
      headers: { ...headers, ...init.headers },
    });

    const data = await response.json().catch(() => null);

    return {
      meta: {
        status: response.status,
        statusText: response.statusText,
      },
      data: data as T,
    };
  };

  return {
    post: <T>(path: string, body: unknown) =>
      request<T>(path, {
        method: "POST",
        body: JSON.stringify(body),
      }),

    get: <T>(path: string) =>
      request<T>(path, {
        method: "GET",
      }),
  };
};
