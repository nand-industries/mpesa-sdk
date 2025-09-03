export type Maybe<T> = T | null;

export function isSome<T>(m: Maybe<T>): m is T {
  return m !== null;
}

export function isNone<T>(m: Maybe<T>): m is null {
  return m === null;
}
