/* eslint-disable @typescript-eslint/no-explicit-any */

export type ExtractPath<Url extends string> = Url extends `${infer Path}?${any}`
  ? Path
  : Url extends `${infer Path}?`
    ? Path
    : Url extends `${infer Path}#${any}`
      ? Path
      : Url extends `${infer Path}#`
        ? Path
        : Url extends `${infer Path}`
          ? Path
          : Url;
