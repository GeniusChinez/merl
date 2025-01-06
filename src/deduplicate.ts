import { Includes } from "./includes";
import { Tail } from "./tail";
import { includes } from "./includes";

/* eslint-disable @typescript-eslint/no-explicit-any */
export type RemoveDuplicates<
  T extends any[],
  R extends any[] = [],
> = T extends []
  ? R
  : Includes<R, T[0]> extends true
    ? RemoveDuplicates<Tail<T>, R>
    : RemoveDuplicates<Tail<T>, [...R, T[0]]>;

export function removeDuplicates<T extends any[], R extends any[] = []>(
  items: T,
  acc?: R,
): RemoveDuplicates<T, R> {
  const accumulator: R = acc || ([] as unknown as R);
  if (items.length === 0) {
    return accumulator as RemoveDuplicates<T, R>;
  }
  const [head, ...tail] = items;
  if (includes(accumulator, head)) {
    return removeDuplicates(tail, accumulator);
  } else {
    return removeDuplicates(tail, [...accumulator, head] as unknown as R);
  }
}
