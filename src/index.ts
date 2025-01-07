import { getPathBuilder } from "./builder";

export const m = {
  compile: getPathBuilder,
};

export default {
  ...m,
};

module.exports = m;
