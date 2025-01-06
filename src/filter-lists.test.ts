import { FilterEmptyLists } from "./filter-lists";
import { expectType } from "tsd";
import { filterEmptyLists } from "./filter-lists";

test("FilterEmptyLists type should be correct", () => {
  const a: FilterEmptyLists<[[1, 2], [], [3, 4], [], [5]]> = [
    [1, 2],
    [3, 4],
    [5],
  ];
  expectType<[[1, 2], [3, 4], [5]]>(a);

  const b: FilterEmptyLists<[[], [], []]> = [];
  expectType<[]>(b);

  const c: FilterEmptyLists<[[1], [2], [3]]> = [[1], [2], [3]];
  expectType<[[1], [2], [3]]>(c);

  const d: FilterEmptyLists<[]> = [];
  expectType<[]>(d);

  const e: FilterEmptyLists<[[], [1], [], [2], [], [3], []]> = [[1], [2], [3]];
  expectType<[[1], [2], [3]]>(e);

  const f: FilterEmptyLists<[[], []]> = [];
  expectType<[]>(f);

  const g: FilterEmptyLists<[[1], [], [2], [], [3]]> = [[1], [2], [3]];
  expectType<[[1], [2], [3]]>(g);
});

test("FilterEmptyLists type should be correct", () => {
  const a: FilterEmptyLists<[[1, 2], [], [3, 4], [], [5]]> = [
    [1, 2],
    [3, 4],
    [5],
  ];
  expectType<[[1, 2], [3, 4], [5]]>(a);

  const b: FilterEmptyLists<[[], [], []]> = [];
  expectType<[]>(b);

  const c: FilterEmptyLists<[[1], [2], [3]]> = [[1], [2], [3]];
  expectType<[[1], [2], [3]]>(c);

  const d: FilterEmptyLists<[]> = [];
  expectType<[]>(d);

  const e: FilterEmptyLists<[[], [1], [], [2], [], [3], []]> = [[1], [2], [3]];
  expectType<[[1], [2], [3]]>(e);

  const f: FilterEmptyLists<[[], []]> = [];
  expectType<[]>(f);

  const g: FilterEmptyLists<[[1], [], [2], [], [3]]> = [[1], [2], [3]];
  expectType<[[1], [2], [3]]>(g);
});

test("filterEmptyLists function should work correctly", () => {
  expect(filterEmptyLists([[1, 2], [], [3, 4], [], [5]])).toEqual([
    [1, 2],
    [3, 4],
    [5],
  ]);

  expect(filterEmptyLists([[], [], []])).toEqual([]);

  expect(filterEmptyLists([[1], [2], [3]])).toEqual([[1], [2], [3]]);

  expect(filterEmptyLists([])).toEqual([]);

  expect(filterEmptyLists([[], [1], [], [2], [], [3], []])).toEqual([
    [1],
    [2],
    [3],
  ]);

  expect(filterEmptyLists([[], []])).toEqual([]);

  expect(filterEmptyLists([[1], [], [2], [], [3]])).toEqual([[1], [2], [3]]);

  expect(filterEmptyLists([[1, 2, 3], [], [], [4, 5], []])).toEqual([
    [1, 2, 3],
    [4, 5],
  ]);

  expect(filterEmptyLists([[], [1, 2, 3], [], [4, 5], []])).toEqual([
    [1, 2, 3],
    [4, 5],
  ]);

  expect(filterEmptyLists([[], [], [1, 2, 3], [], [4, 5], []])).toEqual([
    [1, 2, 3],
    [4, 5],
  ]);
});
