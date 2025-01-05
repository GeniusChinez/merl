import type { FilterEmptyStrings } from "./filter-strings";
import { expectType } from "tsd";

test("FilterEmptyStrings type should be correct", () => {
  const a: FilterEmptyStrings<["a", "", "b", "c", ""]> = ["a", "b", "c"];
  expectType<["a", "b", "c"]>(a);

  const b: FilterEmptyStrings<["", "", ""]> = [];
  expectType<[]>(b);

  const c: FilterEmptyStrings<["a", "b", "c"]> = ["a", "b", "c"];
  expectType<["a", "b", "c"]>(c);

  const d: FilterEmptyStrings<[]> = [];
  expectType<[]>(d);

  const e: FilterEmptyStrings<["", "a", "", "b", "", "c", ""]> = [
    "a",
    "b",
    "c",
  ];
  expectType<["a", "b", "c"]>(e);

  const f: FilterEmptyStrings<["", ""]> = [];
  expectType<[]>(f);

  const g: FilterEmptyStrings<["a", "", "b", "", "c"]> = ["a", "b", "c"];
  expectType<["a", "b", "c"]>(g);
});
