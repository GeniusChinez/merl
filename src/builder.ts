import { extractUrlParts, ExtractUrlsParts, handleParts } from "./parts";

type RemoveReadonlyness<T> = {
  -readonly [K in keyof T]: T[K];
};

export function getPathBuilder<Urls extends readonly string[]>(
  urls: Urls,
): ReturnType<
  typeof handleParts<ExtractUrlsParts<RemoveReadonlyness<Urls>>, `/`>
> {
  return handleParts({
    base: "/",
    parts: extractUrlParts(
      urls as RemoveReadonlyness<typeof urls>,
    ) as unknown as ExtractUrlsParts<RemoveReadonlyness<Urls>>,
  });
}
