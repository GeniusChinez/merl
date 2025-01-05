export type NormalizeUrl<T extends string> = T extends `/${string}`
  ? T
  : T extends `${infer Rest}`
    ? `/${Rest}`
    : "/";
