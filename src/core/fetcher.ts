import { type MpesaBaseResponse, type Result } from "../types";

export abstract class Fetcher {
  protected abstract BASE_PATH: string;
  protected readonly baseUrl: string;
  protected readonly headers: Headers;
  protected readonly serviceProviderCode: string;
  constructor(baseUrl: string, headers: Headers, serviceProviderCode: string) {
    this.baseUrl = baseUrl;
    this.serviceProviderCode = serviceProviderCode;
    this.headers = headers;
  }

  protected replaceParams(path: string, params: Record<string, string>): string {
    let result = path;
    Object.entries(params).forEach(([key, value]) => {
      result = result.replace(`{${key}}`, value);
    });
    return result;
  }

  private async request<T>(method: string, path: string, body?: unknown): Promise<Result<T>> {
    const requestOptions: RequestInit = {
      method,
      headers: this.headers,
      body: body ? JSON.stringify(body) : undefined,
    };

    try {
      const response = await fetch(`${this.baseUrl}${path}`, requestOptions);

      if (!response.ok) {
        const rawError = await response.text();
        return { data: null, error: JSON.parse(rawError) as MpesaBaseResponse };
      }

      const data = (await response.json()) as any;
      return { data, error: null };
    } catch (error) {
      return {
        data: null,
        error: "unable to fetch data. the request could not be resolved.",
      };
    }
  }

  protected async _get<T>(path: string, queryParams?: Record<string, string>) {
    const queryString = queryParams ? `?${new URLSearchParams(queryParams).toString()}` : "";
    return this.request<T>("GET", `${path}${queryString}`);
  }

  protected async _post<T>(path: string, body: unknown) {
    return this.request<T>("POST", path, body);
  }

  protected async _put<T>(path: string, body: unknown) {
    return this.request<T>("PUT", path, body);
  }

  protected async _patch<T>(path: string, body: unknown) {
    return this.request<T>("PATCH", path, body);
  }

  protected async _delete<T>(path: string) {
    return this.request<T>("DELETE", path);
  }
}
