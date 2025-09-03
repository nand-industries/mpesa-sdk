import { errors } from "~/error";

export type Result<T, E = string> = Ok<T> | Err<E>;

export type MapResult<T, U> = { ok: T } | { err: U };

export type SafePromise<T> = Promise<Result<T>>;

type Ok<T> = {
  readonly ok: T;
  readonly err?: undefined;
  readonly debug?: undefined;
};

type Err<T = string> = {
  readonly err: T;
  readonly debug: Error | unknown | null;
  readonly ok?: undefined;
};

export function ok<T>(value: T): Ok<T> {
  return { ok: value };
}

export function err<T = string>(message: T, debug?: Error | unknown): Err<T> {
  return { err: message, debug };
}

export async function wrap<T>(f: () => Promise<T>, err_message?: string): Promise<Result<T>> {
  try {
    const data = await f();
    return ok(data);
  } catch (e) {
    return err(err_message || errors.unexpected.message, e);
  }
}

export function safeWrap<TArgs extends any[], T>(fn: (...args: TArgs) => Promise<T>, err_message?: string): (...args: TArgs) => SafePromise<T> {
  return async (...args: TArgs) => {
    try {
      const data = await fn(...args);
      return ok(data);
    } catch (e) {
      return err(err_message || errors.unexpected.message, e);
    }
  };
}

export function isOk<T>(r: Result<T>): r is Ok<T> {
  return r.ok !== undefined;
}

export function isErr<T>(r: Result<T>): r is Err {
  return r.err !== undefined;
}

export function unwrap<T>(r: Result<T>): T {
  if (isOk(r)) return r.ok;
  throw new Error(r.err);
}

export function map<T, U>(r: Result<T>, f: (t: T) => U): Result<U> {
  if (isOk(r)) return ok(f(r.ok));
  return r;
}

export function mapErr<T, U extends string>(r: Result<T>, f: (e: Err) => U): Result<T> {
  if (isErr(r)) return err(f(r));
  return r;
}

export function andThen<T, U>(r: Result<T>, f: (t: T) => Result<U>): Result<U> {
  if (isOk(r)) return f(r.ok);
  return r;
}
