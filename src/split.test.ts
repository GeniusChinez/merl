import { Split } from "./split";
import { expectType } from "tsd";
test("Split type should be correct", () => {
  type Test1 = Split<"/users/john/doe">;
  expectType<["users", "john", "doe"]>(undefined as unknown as Test1);

  type Test2 = Split<"/home">;
  expectType<["home"]>(undefined as unknown as Test2);

  type Test3 = Split<"/about/team/member">;
  expectType<["about", "team", "member"]>(undefined as unknown as Test3);

  type Test4 = Split<"/">;
  expectType<[]>(undefined as unknown as Test4);

  type Test5 = Split<"">;
  expectType<[]>(undefined as unknown as Test5);

  type Test6 = Split<"/search/typescript">;
  expectType<["search", "typescript"]>(undefined as unknown as Test6);

  type Test7 = Split<"//////search/typescript?ioi#67">;
  expectType<["search", "typescript"]>(undefined as unknown as Test7);
});
