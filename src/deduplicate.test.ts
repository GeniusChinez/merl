import { expectType } from "tsd";
import type { RemoveDuplicates } from "./deduplicate";
import { removeDuplicates } from "./deduplicate";

test("RemoveDuplicates type should be correct", () => {
  type Test1 = RemoveDuplicates<[1, 2, 2, 3]>;
  expectType<[1, 2, 3]>(undefined as unknown as Test1);

  type Test2 = RemoveDuplicates<["a", "b", "a", "c"]>;
  expectType<["a", "b", "c"]>(undefined as unknown as Test2);

  type Test3 = RemoveDuplicates<[boolean, number, boolean, string]>;
  expectType<[boolean, number, string]>(undefined as unknown as Test3);

  type Test4 = RemoveDuplicates<[1, 1, 1, 1]>;
  expectType<[1]>(undefined as unknown as Test4);

  type Test5 = RemoveDuplicates<[]>;
  expectType<[]>(undefined as unknown as Test5);

  type Test6 = RemoveDuplicates<[undefined, null, undefined]>;
  expectType<[undefined, null]>(undefined as unknown as Test6);
});

test("removeDuplicates function should remove duplicates from an array of numbers", () => {
  const result = removeDuplicates([1, 2, 2, 3]);
  expect(result).toEqual([1, 2, 3]);
});

test("removeDuplicates function should remove duplicates from an array of strings", () => {
  const result = removeDuplicates(["a", "b", "a", "c"]);
  expect(result).toEqual(["a", "b", "c"]);
});

test("removeDuplicates function should remove duplicates from an array of mixed types", () => {
  const result = removeDuplicates([true, 1, true, "string"]);
  expect(result).toEqual([true, 1, "string"]);
});

test("removeDuplicates function should handle an array with all identical elements", () => {
  const result = removeDuplicates([1, 1, 1, 1]);
  expect(result).toEqual([1]);
});

test("removeDuplicates function should handle an empty array", () => {
  const result = removeDuplicates([]);
  expect(result).toEqual([]);
});

test("removeDuplicates function should handle an array with undefined and null values", () => {
  const result = removeDuplicates([undefined, null, undefined]);
  expect(result).toEqual([undefined, null]);
});
