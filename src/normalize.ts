/* eslint-disable @typescript-eslint/no-explicit-any */
/**
 * Checks if a string ends with a specified part.
 *
 * @template T - The string to check.
 * @template part - The part to check for at the end of the string.
 * @returns A tuple where the first element is a boolean indicating if the string ends with the part,
 * and the second element is the remaining part of the string if it does, or the original string if it doesn't.
 */
export type EndsWith<
  T extends string,
  part extends string,
> = T extends `${infer First}${part}` ? [true, First] : [false, T];

/**
 * Checks if a string starts with a specified part.
 *
 * @template T - The string to check.
 * @template part - The part to check for at the start of the string.
 * @returns A tuple where the first element is a boolean indicating if the string starts with the part,
 * and the second element is the remaining part of the string if it does, or the original string if it doesn't.
 */
export type StartsWith<
  T extends string,
  part extends string,
> = T extends `${part}${infer Rest}` ? [true, Rest] : [false, T];

/**
 * Recursively strips a specified part from the start of a string.
 *
 * @template T - The string to strip from.
 * @template S - The part to strip from the start of the string.
 * @returns The string with the specified part stripped from the start.
 */
export type StripLeft<T extends string, S extends string> =
  StartsWith<T, S> extends [true, string]
    ? StripLeft<StartsWith<T, S>[1], S>
    : T;

/**
 * Recursively strips a specified part from the end of a string.
 *
 * @template T - The string to strip from.
 * @template S - The part to strip from the end of the string.
 * @returns The string with the specified part stripped from the end.
 */
export type StripRight<T extends string, S extends string> =
  EndsWith<T, S> extends [true, string] ? StripRight<EndsWith<T, S>[1], S> : T;

/**
 * Normalizes a URL by removing the protocol, query parameters, and fragments,
 * and ensuring it starts with a single slash and does not end with a slash.
 *
 * @template T - The URL string to normalize.
 * @returns The normalized URL string.
 */
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

/**
 * Normalizes a URL by removing the protocol, query parameters, and fragments,
 * and ensuring it starts with a single slash and does not end with a slash.
 *
 * @template Url - The URL string to normalize.
 * @param url - The URL string to normalize.
 * @returns The normalized URL string.
 */
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
