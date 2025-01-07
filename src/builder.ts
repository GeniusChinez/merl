import { extractUrlParts, ExtractUrlsParts, handleParts } from "./parts";

type RemoveReadonlyness<T> = {
  -readonly [K in keyof T]: T[K];
};

/**
 * Constructs a path builder function based on the provided URLs.
 *
 * @template Urls - A readonly array of string URLs.
 *
 * @param {Urls} urls - An array of URL strings to be used for building paths.
 *
 * @returns {ReturnType<typeof handleParts<ExtractUrlsParts<RemoveReadonlyness<Urls>>, `/`>>}
 * A function that handles the parts of the URLs and constructs paths based on the provided URLs.
 *
 * @example
 * ```typescript
 * const urls = ['/home', '/about', '/contact'] as const;
 * const pathBuilder = getPathBuilder(urls);
 *
 * const homePath = pathBuilder.home.url(); // Returns '/home'
 * const aboutPath = pathBuilder.about.url(); // Returns '/about'
 * const contactPath = pathBuilder.contact.url(); // Returns '/contact'
 * ```
 */
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
