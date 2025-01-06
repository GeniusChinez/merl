import { Tail } from "./tail";

/* eslint-disable @typescript-eslint/no-explicit-any */
export type FilterEmptyLists<T extends any[]> = T extends []
  ? []
  : T[0] extends []
    ? FilterEmptyLists<Tail<T>>
    : [T[0], ...FilterEmptyLists<Tail<T>>];

export function filterEmptyLists<T extends any[]>(
  stuff: T,
): FilterEmptyLists<T> {
  if (stuff.length === 0) {
    return [] as FilterEmptyLists<T>;
  }

  const [first, ...rest] = stuff;

  if (Array.isArray(first) && first.length === 0) {
    return filterEmptyLists(rest) as FilterEmptyLists<T>;
  }

  return [first, ...filterEmptyLists(rest)] as FilterEmptyLists<T>;
}
