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
