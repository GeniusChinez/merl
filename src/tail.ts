export type Tail<T> = T extends [unknown, ...infer Rest] ? Rest : never;
