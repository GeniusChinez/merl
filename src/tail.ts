/* eslint-disable @typescript-eslint/no-explicit-any */
export type Tail<T> = T extends [any, ...infer Rest] ? Rest : never;

export function tail<T extends any[]>(stuff: T): Tail<T> {
  return stuff.slice(1) as Tail<T>;
}
