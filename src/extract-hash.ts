/* eslint-disable @typescript-eslint/no-explicit-any */
export type ExtractHash<Url extends string> = Url extends `${any}#${infer Hash}`
  ? Hash
  : never;

export function extractHash<Url extends string>(url: Url) {
  if (url.includes("#")) {
    return url.substring(url.indexOf("#") + 1) as ExtractHash<Url>;
  }
  return {} as never;
}
