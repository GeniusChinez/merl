import { expectType } from "tsd";
import type { RemoveDuplicates } from "./deduplicate";

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
