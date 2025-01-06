import type { ExtractPath } from "./extract-path";
import { expectType } from "tsd";
import { extractPath } from "./extract-path";

test("ExtractPath type should be correct", () => {
  type Test1 = ExtractPath<"/users/:userId/tabs?query=1">;
  expectType<"/users/:userId/tabs">(undefined as unknown as Test1);

  type Test2 = ExtractPath<"/home?section">;
  expectType<"/home">(undefined as unknown as Test2);

  type Test3 = ExtractPath<"/about#team">;
  expectType<"/about">(undefined as unknown as Test3);

  type Test4 = ExtractPath<"/contact">;
  expectType<"/contact">(undefined as unknown as Test4);

  type Test5 = ExtractPath<"#hashOnly">;
  expectType<"">(undefined as unknown as Test5);

  type Test6 = ExtractPath<"plainString">;
  expectType<"plainString">(undefined as unknown as Test6);
});

test("extractPath function should return correct path", () => {
  expect(extractPath("/users/:userId/tabs?query=1")).toBe(
    "/users/:userId/tabs",
  );
  expect(extractPath("/home?section")).toBe("/home");
  expect(extractPath("/about#team")).toBe("/about");
  expect(extractPath("/contact")).toBe("/contact");
  expect(extractPath("#hashOnly")).toBe("");
  expect(extractPath("plainString")).toBe("plainString");
});

test("extractPath function return type should be correct", () => {
  const result1 = extractPath("/users/:userId/tabs?query=1");
  expectType<"/users/:userId/tabs">(result1);

  const result2 = extractPath("/home?section");
  expectType<"/home">(result2);

  const result3 = extractPath("/about#team");
  expectType<"/about">(result3);

  const result4 = extractPath("/contact");
  expectType<"/contact">(result4);

  const result5 = extractPath("#hashOnly");
  expectType<"">(result5);

  const result6 = extractPath("plainString");
  expectType<"plainString">(result6);
});
