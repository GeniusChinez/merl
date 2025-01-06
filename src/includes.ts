/* eslint-disable @typescript-eslint/no-explicit-any */
import { Tail } from "./tail";

export type Includes<L extends any[], V> = L extends []
  ? false
  : L[0] extends V
    ? true
    : Includes<Tail<L>, V>;

export function includes<L extends any[], V>(list: L, v: V): Includes<L, V> {
  for (const item of list) {
    if (item === v) {
      return true as Includes<L, V>;
    }
  }
  return false as Includes<L, V>;
}
