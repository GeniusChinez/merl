import { ExtractComponents } from "./extract-components";
import { extractComponents } from "./extract-components";

export type Explode<Url extends string> =
  Url extends `${infer Scheme}://${infer Domain}/${infer Rest}`
    ? {
        scheme: Scheme;
        domain: Domain;
        path: {
          original: ExtractComponents<Rest>["path"];
          parts: ExtractComponents<Rest>["parts"];
        };
        query: ExtractComponents<Rest>["query"];
        hash: ExtractComponents<Rest>["hash"];
      }
    : Url extends `${infer Scheme}://${infer Domain}?${infer Rest}`
      ? {
          scheme: Scheme;
          domain: Domain;
          path: {
            original: ExtractComponents<`?${Rest}`>["path"];
            parts: ExtractComponents<`?${Rest}`>["parts"];
          };
          query: ExtractComponents<`?${Rest}`>["query"];
          hash: ExtractComponents<`?${Rest}`>["hash"];
        }
      : Url extends `${infer Scheme}://${infer Domain}#${infer Rest}`
        ? {
            scheme: Scheme;
            domain: Domain;
            path: {
              original: ExtractComponents<`#${Rest}`>["path"];
              parts: ExtractComponents<`#${Rest}`>["parts"];
            };
            query: ExtractComponents<`#${Rest}`>["query"];
            hash: ExtractComponents<`#${Rest}`>["hash"];
          }
        : Url extends `${infer Scheme}://${infer Domain}/`
          ? {
              scheme: Scheme;
              domain: Domain;
              path: {
                original: ExtractComponents<`/`>["path"];
                parts: ExtractComponents<`/`>["parts"];
              };
              query: ExtractComponents<`/`>["query"];
              hash: ExtractComponents<`/`>["hash"];
            }
          : Url extends `${infer Scheme}://${infer Domain}`
            ? {
                scheme: Scheme;
                domain: Domain;
                path: {
                  original: ExtractComponents<`/`>["path"];
                  parts: ExtractComponents<`/`>["parts"];
                };
                query: ExtractComponents<`/`>["query"];
                hash: ExtractComponents<`/`>["hash"];
              }
            : {
                scheme: never;
                domain: never;
                path: {
                  original: ExtractComponents<Url>["path"];
                  parts: ExtractComponents<Url>["parts"];
                };
                query: ExtractComponents<Url>["query"];
                hash: ExtractComponents<Url>["hash"];
              };

export function explode<Url extends string>(url: Url): Explode<Url> {
  const urlPattern =
    /^(?<scheme>[^:]+):\/\/(?<domain>[^/?#]+)(?<path>\/[^?#]*)?(?<query>\?[^#]*)?(?<hash>#.*)?$/;
  const match = url.match(urlPattern);

  if (!match || !match.groups) {
    throw new Error("Invalid URL");
  }

  const { scheme, domain, path = "/", query = "", hash = "" } = match.groups;
  const components = extractComponents(`${path}${query}${hash}`);

  return {
    scheme,
    domain,
    path: {
      original: components.path,
      parts: components.parts,
    },
    query: components.query,
    hash: components.hash,
  } as Explode<Url>;
}
