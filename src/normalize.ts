/* eslint-disable @typescript-eslint/no-explicit-any */
export type EndsWith<
  T extends string,
  part extends string,
> = T extends `${infer First}${part}` ? [true, First] : [false, T];

export type StartsWith<
  T extends string,
  part extends string,
> = T extends `${part}${infer Rest}` ? [true, Rest] : [false, T];

export type StripLeft<T extends string, S extends string> =
  StartsWith<T, S> extends [true, string]
    ? StripLeft<StartsWith<T, S>[1], S>
    : T;

export type StripRight<T extends string, S extends string> =
  EndsWith<T, S> extends [true, string] ? StripRight<EndsWith<T, S>[1], S> : T;

export type NormalizeUrl<T extends string> =
  T extends `${any}://${any}/${infer Rest}`
    ? NormalizeUrl<Rest>
    : T extends `${any}://${any}/`
      ? NormalizeUrl<"/">
      : T extends `${any}://${any}?${infer Rest}`
        ? NormalizeUrl<`?${Rest}`>
        : T extends `${any}://${any}?`
          ? NormalizeUrl<"/">
          : T extends `${any}://${any}#${infer Rest}`
            ? NormalizeUrl<`#${Rest}`>
            : T extends `${any}://${any}#`
              ? NormalizeUrl<"#">
              : T extends `/${string}`
                ? `/${StripRight<`${StripLeft<T, "/">}`, "/">}`
                : T extends `${infer Rest}`
                  ? `/${StripRight<`${StripLeft<Rest, "/">}`, "/">}`
                  : "/";

export function normalizeUrl<Url extends string>(url: Url): NormalizeUrl<Url> {
  const tempUrl = (() => {
    let temp = url as string;
    if (temp.includes("://")) {
      temp = temp.split("://")[1].split("/").slice(1).join("/");
    }

    while (temp.includes("//")) {
      temp = temp.replace("//", "/");
    }

    while (temp.endsWith("/")) {
      temp = temp.substring(0, temp.length - 1);
    }

    while (temp.startsWith("/")) {
      temp = temp.substring(1);
    }

    return temp;
  })();

  return `/${tempUrl}` as NormalizeUrl<Url>;
}
