import { parseMpesaError } from "~/error";
import { MpesaBaseResponse } from "~/types";
import { err, ok, Result } from "~/types/result";

type RequestOptions = {
  url: string;
  method: RequestInit["method"];
  headers?: Headers;
  body?: unknown;
};

async function request<T>(options: RequestOptions): Promise<Result<T, MpesaBaseResponse | string>> {
  try {
    const body = options.body ? JSON.stringify(options.body) : undefined;
    const requestOptions: RequestInit = {
      method: options.method,
      headers: options.headers,
      body,
    };
    const response = await fetch(options.url, requestOptions);

    if (!response.ok) {
      const rawError = await response.text();
      const error = JSON.parse(rawError) as MpesaBaseResponse;
      return err(error);
    }

    const data = await response.json();
    return ok(data);
  } catch (e) {
    return err(parseMpesaError(e));
  }
}

type FeacherOptions = {
  baseUrl: string;
  headers?: Headers;
};

export function fetcher(options: FeacherOptions) {
  function get<T>(path: string, method: RequestInit["method"], body?: unknown): Promise<Result<T, MpesaBaseResponse | string>> {
    const absulute = `${options.baseUrl}${path}`;
    return request({ url: absulute, method, body, headers: options.headers });
  }
  function post<T>(path: string, body: unknown): Promise<Result<T, MpesaBaseResponse | string>> {
    const absulute = `${options.baseUrl}${path}`;
    return request({ url: absulute, method: "POST", body, headers: options.headers });
  }

  function put<T>(path: string, body: unknown): Promise<Result<T, MpesaBaseResponse | string>> {
    const absulute = `${options.baseUrl}${path}`;
    return request({ url: absulute, method: "PUT", body, headers: options.headers });
  }

  function _delete<T>(path: string): Promise<Result<T, MpesaBaseResponse | string>> {
    const absulute = `${options.baseUrl}${path}`;
    return request({ url: absulute, method: "DELETE", headers: options.headers });
  }

  return {
    get,
    post,
    put,
    delete: _delete,
  };
}

export type Fetcher = ReturnType<typeof fetcher>;
