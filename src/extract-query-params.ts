/* eslint-disable @typescript-eslint/no-explicit-any */
import { Tail } from "./tail";

type GetNameValuePair<T extends string> = T extends ""
  ? never
  : T extends `${infer Name}=${infer Value}`
    ? { name: Name; defaultValue: Value }
    : T extends `${infer Name}=`
      ? { name: Name; defaultValue: "" }
      : T extends `${infer Name}`
        ? { name: Name; defaultValue: "" }
        : never;

type FindItemWithName<
  T extends { name: string; defaultValue: string }[],
  name extends string,
> = T extends []
  ? never
  : T[0]["name"] extends name
    ? T[0]
    : FindItemWithName<Tail<T>, name>;

type GatherNameValuePairs<T extends { name: string; defaultValue: string }[]> =
  {
    [key in T[number]["name"]]: FindItemWithName<T, key>["defaultValue"];
  };

type _ExtractQueryParams<Url extends string> = Url extends ``
  ? []
  : Url extends `${infer Section}&${infer Rest}`
    ? [GetNameValuePair<Section>, ..._ExtractQueryParams<Rest>]
    : Url extends `${infer Section}`
      ? [GetNameValuePair<Section>]
      : [];

type ProcessedQueryParams<QueryParams extends string> = GatherNameValuePairs<
  _ExtractQueryParams<QueryParams>
>;

export type ExtractQueryParams<Url extends string> =
  Url extends `${any}?${infer QueryParams}#${any}`
    ? ProcessedQueryParams<QueryParams>
    : Url extends `${any}?${infer QueryParams}`
      ? ProcessedQueryParams<QueryParams>
      : never;

export function extractQueryParams<Url extends string>(url: Url) {
  if (!url.includes("?")) {
    return {} as ExtractQueryParams<Url>;
  }

  const params = {} as any;
  const paramsString = url.substring(url.indexOf("?") + 1).split("#")[0];

  const parts = paramsString.split("&").filter(Boolean);

  for (const part of parts) {
    if (part.includes("=")) {
      const name = part.substring(0, part.indexOf("="));
      params[name] = part.substring(part.indexOf("=") + 1);
      continue;
    }
    params[part] = "";
  }

  return params as ExtractQueryParams<Url>;
}
