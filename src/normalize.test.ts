import { expectType } from "tsd";
import type { NormalizeUrl } from "./normalize";

test("NormalizePath type should be correct", () => {
  const a: NormalizeUrl<"/users"> = "/users";
  expectType<"/users">(a);

  const b: NormalizeUrl<"/posts"> = "/posts";
  expectType<"/posts">(b);

  const c: NormalizeUrl<"users"> = "/users";
  expectType<"/users">(c);
});
