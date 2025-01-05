import { Includes } from "./includes";
import { Tail } from "./tail";

/* eslint-disable @typescript-eslint/no-explicit-any */
export type RemoveDuplicates<
  T extends any[],
  R extends any[] = [],
> = T extends []
  ? R
  : Includes<R, T[0]> extends true
    ? RemoveDuplicates<Tail<T>, R>
    : RemoveDuplicates<Tail<T>, [...R, T[0]]>;
