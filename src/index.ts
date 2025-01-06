import { getPathBuilder } from "./builder";
import { extractComponents } from "./extract-components";
import { extractQueryParams } from "./extract-query-params";
import { normalizeUrl } from "./normalize";
import { tail } from "./tail";

export const m = {
  compile: getPathBuilder,
  normalize: normalizeUrl,
  tail,
  extractComponents,
  extractQueryParams,
};

export default {
  ...m,
};
