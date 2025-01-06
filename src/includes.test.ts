import { expectType } from "tsd";
import type { Includes } from "./includes";
import { includes } from "./includes";

test("Includes type should be correct", () => {
  const a: Includes<[1, 2, 3], 1> = true;
  expectType<true>(a);

  const b: Includes<[1, 2, 3], 4> = false;
  expectType<false>(b);

  const c: Includes<["a", "b", "c"], "a"> = true;
  expectType<true>(c);

  const d: Includes<["a", "b", "c"], "d"> = false;
  expectType<false>(d);

  const e: Includes<[boolean, number, string], boolean> = true;
  expectType<true>(e);

  const f: Includes<[boolean, number, string], null> = false;
  expectType<false>(f);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const g: Includes<[], any> = false;
  expectType<false>(g);

  const h: Includes<[undefined, null], undefined> = true;
  expectType<true>(h);

  const i: Includes<[undefined, null], null> = true;
  expectType<true>(i);
});

test("includes function should work correctly", () => {
  expect(includes([1, 2, 3], 1)).toBe(true);
  expect(includes([1, 2, 3], 4)).toBe(false);
  expect(includes(["a", "b", "c"], "a")).toBe(true);
  expect(includes(["a", "b", "c"], "d")).toBe(false);
  expect(includes([true, false], true)).toBe(true);
  expect(includes([true, false], null)).toBe(false);
  expect(includes([], 1)).toBe(false);
  expect(includes([undefined, null], undefined)).toBe(true);
  expect(includes([undefined, null], null)).toBe(true);
  expect(includes([1, "a", true], "a")).toBe(true);
  expect(includes([1, "a", true], false)).toBe(false);
});
