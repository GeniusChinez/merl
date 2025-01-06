import { RemoveDuplicates } from "./deduplicate";
import { ExtractPath } from "./extract-path";
import { FilterEmptyStrings } from "./filter-strings";
import { NormalizeUrl } from "./normalize";

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
