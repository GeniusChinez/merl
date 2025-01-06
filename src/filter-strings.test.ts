import type { FilterEmptyStrings } from "./filter-strings";
import { expectType } from "tsd";
import { filterEmptyStrings } from "./filter-strings";

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

test("filterEmptyStrings should remove empty strings", () => {
  expect(filterEmptyStrings(["a", "", "b", "c", ""])).toEqual(["a", "b", "c"]);
  expect(filterEmptyStrings(["", "", ""])).toEqual([]);
  expect(filterEmptyStrings(["a", "b", "c"])).toEqual(["a", "b", "c"]);
  expect(filterEmptyStrings([])).toEqual([]);
  expect(filterEmptyStrings(["", "a", "", "b", "", "c", ""])).toEqual([
    "a",
    "b",
    "c",
  ]);
  expect(filterEmptyStrings(["", ""])).toEqual([]);
  expect(filterEmptyStrings(["a", "", "b", "", "c"])).toEqual(["a", "b", "c"]);
});

test("filterEmptyStrings should handle arrays with only empty strings", () => {
  expect(filterEmptyStrings(["", "", ""])).toEqual([]);
  expect(filterEmptyStrings(["", "", "", ""])).toEqual([]);
});

test("filterEmptyStrings should handle arrays with no empty strings", () => {
  expect(filterEmptyStrings(["a", "b", "c"])).toEqual(["a", "b", "c"]);
  expect(filterEmptyStrings(["x", "y", "z"])).toEqual(["x", "y", "z"]);
});

test("filterEmptyStrings should handle mixed arrays", () => {
  expect(filterEmptyStrings(["", "a", "", "b", "", "c", ""])).toEqual([
    "a",
    "b",
    "c",
  ]);
  expect(filterEmptyStrings(["a", "", "b", "", "c"])).toEqual(["a", "b", "c"]);
  expect(filterEmptyStrings(["", "a", "b", "c", ""])).toEqual(["a", "b", "c"]);
});

test("filterEmptyStrings should handle single element arrays", () => {
  expect(filterEmptyStrings([""])).toEqual([]);
  expect(filterEmptyStrings(["a"])).toEqual(["a"]);
});
