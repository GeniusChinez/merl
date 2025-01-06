import { extractQueryParams, ExtractQueryParams } from "./extract-query-params";
import { expectType } from "tsd";

test("ExtractQueryParams type should be correct", () => {
  type Test1 = ExtractQueryParams<"/users?name=John&age=30">;
  expectType<{ name: "John"; age: "30" }>(undefined as unknown as Test1);

  type Test2 = ExtractQueryParams<"/home?section">;
  expectType<{ section: "" }>(undefined as unknown as Test2);

  type Test3 = ExtractQueryParams<"/about?team&member=5">;
  expectType<{ team: ""; member: "5" }>(undefined as unknown as Test3);

  type Test4 = ExtractQueryParams<"/contact">;
  expectType<never>(undefined as unknown as Test4);

  type Test5 = ExtractQueryParams<"/search?query=typescript">;
  expectType<{ query: "typescript" }>(undefined as unknown as Test5);

  type Test6 = ExtractQueryParams<"/plainString">;
  expectType<never>(undefined as unknown as Test6);
});

test("extractQueryParams function should return correct values", () => {
  expect(extractQueryParams("/users?name=John&age=30")).toEqual({
    name: "John",
    age: "30",
  });

  expect(extractQueryParams("/home?section")).toEqual({
    section: "",
  });

  expect(extractQueryParams("/about?team&member=5")).toEqual({
    team: "",
    member: "5",
  });

  expect(extractQueryParams("/contact")).toEqual({});

  expect(extractQueryParams("/search?query=typescript")).toEqual({
    query: "typescript",
  });

  expect(extractQueryParams("/plainString")).toEqual({});
});
