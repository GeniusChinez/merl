import { RemoveDuplicates } from "./deduplicate";
import { extractPath, ExtractPath } from "./extract-path";
import { FilterEmptyStrings } from "./filter-strings";
import { normalizeUrl, NormalizeUrl } from "./normalize";

export type Split<T extends string> = RemoveDuplicates<
  FilterEmptyStrings<
    T extends ""
      ? []
      : NormalizeUrl<T> extends `/${infer Part}/${infer Rest}`
        ? [ExtractPath<Part>, ...Split<Rest>]
        : NormalizeUrl<T> extends `/${infer Part}`
          ? [ExtractPath<Part>]
          : NormalizeUrl<T> extends "/"
            ? []
            : []
  >
>;

export function split<T extends string>(url: T): Split<T> {
  const normalizedUrl = normalizeUrl(url);
  if (normalizedUrl === "/") {
    return [] as Split<T>;
  }

  const parts = normalizedUrl.split("/").filter(Boolean).map(extractPath);
  const uniqueParts = Array.from(new Set(parts)).filter((part) => part !== "");

  return uniqueParts as Split<T>;
}
