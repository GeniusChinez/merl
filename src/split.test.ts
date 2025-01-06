import { Split } from "./split";
import { expectType } from "tsd";
import { split } from "./split";

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

test("split function should return correct parts", () => {
  expect(split("/users/john/doe")).toEqual(["users", "john", "doe"]);
  expect(split("/home")).toEqual(["home"]);
  expect(split("/about/team/member")).toEqual(["about", "team", "member"]);
  expect(split("/")).toEqual([]);
  expect(split("")).toEqual([]);
  expect(split("/search/typescript")).toEqual(["search", "typescript"]);
  expect(split("//////search/typescript?ioi#67")).toEqual([
    "search",
    "typescript",
  ]);
});

test("split function return type should be correct", () => {
  const result1 = split("/users/john/doe");
  expectType<["users", "john", "doe"]>(result1);

  const result2 = split("/home");
  expectType<["home"]>(result2);

  const result3 = split("/about/team/member");
  expectType<["about", "team", "member"]>(result3);

  const result4 = split("/");
  expectType<[]>(result4);

  const result5 = split("");
  expectType<[]>(result5);

  const result6 = split("/search/typescript");
  expectType<["search", "typescript"]>(result6);

  const result7 = split("//////search/typescript?ioi#67");
  expectType<["search", "typescript"]>(result7);
});
