import type { ExtractComponents } from "./extract-components";
import { expectType } from "tsd";

test("ExtractComponents type should be correct", () => {
  type Test1 =
    ExtractComponents<"/users/:userId/tabs?query=something&offset=23#section">;
  expectType<{
    path: "/users/:userId/tabs";
    parts: ["users", ":userId", "tabs"];
    query: { query: "something"; offset: "23" };
    hash: "section";
  }>(undefined as unknown as Test1);

  type Test2 = ExtractComponents<"///home?section=main#top">;
  expectType<{
    path: "/home";
    parts: ["home"];
    query: { section: "main" };
    hash: "top";
  }>(undefined as unknown as Test2);

  type Test3 = ExtractComponents<"/about#team">;
  expectType<{ path: "/about"; parts: ["about"]; query: never; hash: "team" }>(
    undefined as unknown as Test3,
  );

  type Test4 = ExtractComponents<"/contact">;
  expectType<{ path: "/contact"; parts: ["contact"]; query: never; hash: "" }>(
    undefined as unknown as Test4,
  );

  type Test5 = ExtractComponents<"#hashOnly">;
  expectType<{ path: "/"; parts: []; query: never; hash: "hashOnly" }>(
    undefined as unknown as Test5,
  );

  type Test6 = ExtractComponents<"plainString">;
  expectType<{
    path: "/plainString";
    parts: ["plainString"];
    query: never;
    hash: "";
  }>(undefined as unknown as Test6);
});
