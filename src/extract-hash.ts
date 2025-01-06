/* eslint-disable @typescript-eslint/no-explicit-any */
export type ExtractHash<Url extends string> = Url extends `${any}#${infer Hash}`
  ? Hash
  : never;
