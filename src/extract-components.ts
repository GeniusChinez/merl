import { ExtractHash } from "./extract-hash";
import { ExtractPath } from "./extract-path";
import { ExtractQueryParams } from "./extract-query-params";
import { NormalizeUrl } from "./normalize";
import { Split } from "./split";

export type ExtractComponents<Url extends string> = {
  path: NormalizeUrl<ExtractPath<Url>>;
  parts: Split<ExtractPath<Url>>;
  query: ExtractQueryParams<Url>;
  hash: ExtractHash<Url>;
};
