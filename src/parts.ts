/* eslint-disable @typescript-eslint/no-explicit-any */
import { RemoveDuplicates } from "./deduplicate";
import { extractComponents, ExtractComponents } from "./extract-components";
import { normalizeUrl, NormalizeUrl } from "./normalize";
import { Tail } from "./tail";

export type ExtractCompoundFirstParts<
  T extends {
    self: string[];
    originalUrl: string;
  }[],
> = T extends []
  ? []
  : T[0]["self"] extends []
    ? ExtractCompoundFirstParts<Tail<T>>
    : T[0]["self"][0] extends `:${any}`
      ? ExtractCompoundFirstParts<Tail<T>>
      : T[0]["self"][0] extends `${infer Part}`
        ? [Part, ...ExtractCompoundFirstParts<Tail<T>>]
        : ExtractCompoundFirstParts<Tail<T>>;

export function extractCompoundFirstPaths<
  T extends {
    self: string[];
    originalUrl: string;
  }[],
>(args: T): ExtractCompoundFirstParts<T> {
  return args
    .map((arg) => arg.self[0])
    .filter(
      (part) => part !== undefined && !part.startsWith(":"),
    ) as ExtractCompoundFirstParts<T>;
}

export type ExtractUrlsParts<
  Urls extends string[],
  Depth extends number = 50,
> = Depth extends 0
  ? []
  : Urls extends []
    ? []
    : [
        {
          self: ExtractComponents<Urls[0]>["parts"];
          originalUrl: Urls[0];
        },
        ...ExtractUrlsParts<Tail<Urls>, Decrement<Depth>>,
      ];

export function extractUrlsParts<Urls extends string[]>(
  urls: Urls,
): ExtractUrlsParts<Urls> {
  return urls.map((url) => ({
    self: extractComponents(url).parts,
    originalUrl: url,
  })) as ExtractUrlsParts<Urls>;
}

export type ExtractUrlPartsWithSameFirstPart<
  T extends {
    self: string[];
    originalUrl: string;
  }[],
  FirstPart,
> = RemoveDuplicates<
  T extends []
    ? []
    : T[0] extends []
      ? ExtractUrlPartsWithSameFirstPart<Tail<T>, FirstPart>
      : T[0]["self"][0] extends FirstPart
        ? [T[0], ...ExtractUrlPartsWithSameFirstPart<Tail<T>, FirstPart>]
        : ExtractUrlPartsWithSameFirstPart<Tail<T>, FirstPart>
>;

export function extractUrlPartsWithSameFirstPart<
  T extends {
    self: string[];
    originalUrl: string;
  }[],
  FirstPart,
>(parts: T, part: FirstPart): ExtractUrlPartsWithSameFirstPart<T, FirstPart> {
  return parts.filter(
    (partObj) => partObj.self.length > 0 && partObj.self[0] === part,
  ) as ExtractUrlPartsWithSameFirstPart<T, FirstPart>;
}

export type ExtractUrlPartsAfterFirst<
  T extends {
    self: string[];
    originalUrl: string;
  }[],
> = T extends []
  ? []
  : T[0]["self"] extends [any, ...infer Rest]
    ? [
        ...(Rest extends []
          ? []
          : [
              {
                self: [...Rest];
                originalUrl: T[0]["originalUrl"];
              },
            ]),
        ...ExtractUrlPartsAfterFirst<Tail<T>>,
      ]
    : T[0]["self"] extends [any]
      ? [...ExtractUrlPartsAfterFirst<Tail<T>>]
      : ExtractUrlPartsAfterFirst<Tail<T>>;

export function extractUrlPartsAfterFirst<
  T extends {
    self: string[];
    originalUrl: string;
  }[],
>(args: T): ExtractUrlPartsAfterFirst<T> {
  return args.flatMap((arg) => {
    if (arg.self.length <= 1) return [];
    const [, ...rest] = arg.self;
    return [
      {
        self: rest,
        originalUrl: arg.originalUrl,
      },
    ];
  }) as ExtractUrlPartsAfterFirst<T>;
}

export type FilterPartsWithEmptyLists<T extends any[]> = T extends []
  ? []
  : T[0]["self"] extends []
    ? FilterPartsWithEmptyLists<Tail<T>>
    : [T[0], ...FilterPartsWithEmptyLists<Tail<T>>];

export function filterPartsWithEmptyLists<
  T extends {
    self: string[];
    originalUrl: string;
  }[],
>(args: T): FilterPartsWithEmptyLists<T> {
  return args.filter(
    (arg) => arg.self.length > 0,
  ) as FilterPartsWithEmptyLists<T>;
}

export type ExtractFirstPathParam<T extends any[]> = T extends []
  ? never
  : T[0] extends []
    ? ExtractFirstPathParam<Tail<T>>
    : T[0]["self"] extends []
      ? ExtractFirstPathParam<Tail<T>>
      : T[0]["self"][0] extends `:${infer Param}`
        ? Param
        : ExtractFirstPathParam<Tail<T>>;

export function extractFirstPathParam<
  T extends {
    self: string[];
    originalUrl: string;
  }[],
>(args: T): ExtractFirstPathParam<T> {
  for (const arg of args) {
    if (arg.self.length > 0 && arg.self[0].startsWith(":")) {
      return arg.self[0].slice(1) as ExtractFirstPathParam<T>;
    }
  }
  return undefined as never;
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
type Decrement<N extends number> = ((...args: any[]) => void) extends (
  first: any,
  ...rest: infer R
) => void
  ? R["length"]
  : never;

export type ExtractPartsAfterParam<
  T extends {
    self: string[];
    originalUrl: string;
  }[],
  Param extends string,
> = T extends []
  ? []
  : T[0] extends []
    ? ExtractPartsAfterParam<Tail<T>, Param>
    : T[0]["self"] extends []
      ? ExtractPartsAfterParam<Tail<T>, Param>
      : T[0]["self"] extends [`:${Param}`, ...infer Rest]
        ? [
            {
              self: Rest;
              originalUrl: T[0]["originalUrl"];
            },
            ...ExtractPartsAfterParam<Tail<T>, Param>,
          ]
        : ExtractPartsAfterParam<Tail<T>, Param>;

export function extractPartsAfterParam<
  T extends {
    self: string[];
    originalUrl: string;
  }[],
  Param extends string,
>(items: T, param: Param): ExtractPartsAfterParam<T, Param> {
  return items.flatMap((item) => {
    if (item.self.length === 0) return [];
    const [first, ...rest] = item.self;
    if (first === `:${param}`) {
      return [
        {
          self: rest,
          originalUrl: item.originalUrl,
        },
      ];
    }
    return [];
  }) as ExtractPartsAfterParam<T, Param>;
}

export function extractUrlParts<Urls extends string[]>(
  urls: Urls,
): ExtractUrlsParts<Urls> {
  const result: {
    self: string[];
    originalUrl: string;
  }[] = [];
  for (const url of urls) {
    result.push({
      self: extractComponents(url)["parts"],
      originalUrl: url,
    });
  }
  return result as ExtractUrlsParts<Urls>;
}

export function handleParts<
  UrlParts extends any[],
  BaseUrl extends string,
>(config: {
  base: BaseUrl;
  parts: UrlParts;
}): {
  [key in ExtractCompoundFirstParts<UrlParts>[number]]: // {
  //   url: (query?:
  //     {
  //       offset?: number;
  //       limit?: number;
  //       q?: string;
  //       order?: "asc" | "desc";
  //       orderBy?: string;
  //       [key: string]: any;
  //     }
  //   ) => `${BaseUrl}${key}`;
  // }
  ReturnType<
    typeof handleParts<
      FilterPartsWithEmptyLists<
        ExtractUrlPartsAfterFirst<
          ExtractUrlPartsWithSameFirstPart<UrlParts, key>
        >
      >,
      `${BaseUrl}${key}/`
    >
  > &
    (ExtractFirstPathParam<
      ExtractUrlPartsAfterFirst<ExtractUrlPartsWithSameFirstPart<UrlParts, key>>
    > extends never
      ? object
      : {
          using: <Id extends string>(
            id: Id,
          ) => ReturnType<
            typeof handleParts<
              FilterPartsWithEmptyLists<
                ExtractPartsAfterParam<
                  ExtractUrlPartsAfterFirst<UrlParts>,
                  ExtractFirstPathParam<
                    ExtractUrlPartsAfterFirst<
                      ExtractUrlPartsWithSameFirstPart<UrlParts, key>
                    >
                  >
                >
              >,
              `${BaseUrl}${key}/${Id}/`
            >
          >;
        });
} & {
  url: (query?: {
    offset?: number;
    limit?: number;
    q?: string;
    order?: "asc" | "desc";
    orderBy?: string;
    [key: string]: any;
  }) => NormalizeUrl<BaseUrl>;
} {
  const result: ReturnType<typeof handleParts<UrlParts, BaseUrl>> = {
    url: (query?: Record<string, any>) => {
      const queryString = query
        ? "?" + new URLSearchParams(query).toString()
        : "";
      return `${normalizeUrl(config.base)}${queryString}` as NormalizeUrl<BaseUrl>;
    },
  };

  const keys = [...new Set(extractCompoundFirstPaths(config.parts))];

  for (const key of keys) {
    (result[key] as any) = {
      // url: (query?: Record<string, any>) => {
      //   const queryString = query
      //     ? '?' + new URLSearchParams(query).toString()
      //     : '';
      //   return `${config.base}${key}${queryString}`;
      // },
      ...handleParts({
        base: `${config.base}${key}/` as never,
        parts: filterPartsWithEmptyLists(
          extractUrlPartsAfterFirst(
            extractUrlPartsWithSameFirstPart(config.parts, key),
          ),
        ),
      }),
      ...(() => {
        const paramName = extractFirstPathParam(
          extractUrlPartsAfterFirst(
            extractUrlPartsWithSameFirstPart(config.parts, key),
          ),
        );
        if (!paramName) {
          return {};
        }
        return {
          using: <Id extends string>(id: Id) => {
            return handleParts({
              base: `${config.base}${key}/${id}/` as never,
              parts: filterPartsWithEmptyLists(
                extractPartsAfterParam(
                  extractUrlPartsAfterFirst(config.parts),
                  paramName,
                ),
              ),
            });
          },
        };
      })(),
    } as any;
  }
  return result;
}
