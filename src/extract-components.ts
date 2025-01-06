import { ExtractHash } from "./extract-hash";
import { ExtractPath, extractPath } from "./extract-path";
import { ExtractQueryParams } from "./extract-query-params";
import { NormalizeUrl } from "./normalize";
import { Split } from "./split";
import { split } from "./split";
import { normalizeUrl } from "./normalize";
import { extractQueryParams } from "./extract-query-params";
import { extractHash } from "./extract-hash";

export type ExtractComponents<Url extends string> = {
  path: NormalizeUrl<ExtractPath<Url>>;
  parts: Split<ExtractPath<Url>>;
  query: ExtractQueryParams<Url>;
  hash: ExtractHash<Url>;
};

export function extractComponents<Url extends string>(
  url: Url,
): ExtractComponents<Url> {
  const extractedPath = extractPath(url);

  const path = normalizeUrl(extractedPath);
  const parts = split(extractedPath);
  const query = extractQueryParams(url);
  const hash = extractHash(url);

  return {
    path,
    parts,
    query,
    hash,
  };
}
