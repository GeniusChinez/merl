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

export function extractPath<Url extends string>(url: Url): ExtractPath<Url> {
  const [path] = url.split(/[?#]/);
  return path as ExtractPath<Url>;
}
