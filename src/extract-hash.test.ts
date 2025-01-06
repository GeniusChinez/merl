import { expectType } from "tsd";
import { extractHash, type ExtractHash } from "./extract-hash";

test("ExtractHash type should be correct", () => {
  type Test1 = ExtractHash<"/users/:userId:/tabs#id">;
  expectType<"id">(undefined as unknown as Test1);

  type Test2 = ExtractHash<"/home#section">;
  expectType<"section">(undefined as unknown as Test2);

  type Test3 = ExtractHash<"/about#team">;
  expectType<"team">(undefined as unknown as Test3);

  type Test4 = ExtractHash<"/contact">;
  expectType<never>(undefined as unknown as Test4);

  type Test5 = ExtractHash<"#hashOnly">;
  expectType<"hashOnly">(undefined as unknown as Test5);

  type Test6 = ExtractHash<"plainString">;
  expectType<never>(undefined as unknown as Test6);

  expect(extractHash("/users/:userId:/tabs#id")).toBe("id");
  expect(extractHash("/users/:userId:/tabs#id#end")).toBe("id#end");
  expectType<never>(extractHash("/users"));
});
