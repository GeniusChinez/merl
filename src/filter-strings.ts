import { Tail } from "./tail";

export type FilterEmptyStrings<T extends string[]> = T extends []
  ? []
  : T[0] extends ""
    ? FilterEmptyStrings<Tail<T>>
    : [T[0], ...FilterEmptyStrings<Tail<T>>];

export function filterEmptyStrings<T extends string[]>(
  urls: T,
): FilterEmptyStrings<T> {
  return urls.filter(Boolean) as FilterEmptyStrings<T>;
}
