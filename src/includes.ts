import { Tail } from "./tail";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type Includes<L extends any[], V> = L extends []
  ? false
  : L[0] extends V
    ? true
    : Includes<Tail<L>, V>;
