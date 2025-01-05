import { expectType } from "tsd";
import type { Includes } from "./includes";

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
