import { FilterEmptyLists } from "./filter-lists";
import { expectType } from "tsd";

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
