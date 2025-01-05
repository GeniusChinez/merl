// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type Tail<T> = T extends [any, ...infer Rest] ? Rest : never;
