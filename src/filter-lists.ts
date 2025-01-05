import { Tail } from "./tail";

/* eslint-disable @typescript-eslint/no-explicit-any */
export type FilterEmptyLists<T extends any[]> = T extends []
  ? []
  : T[0] extends []
    ? FilterEmptyLists<Tail<T>>
    : [T[0], ...FilterEmptyLists<Tail<T>>];
