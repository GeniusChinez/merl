import type { ExtractPath } from "./extract-path";
import { expectType } from "tsd";

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
