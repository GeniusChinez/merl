import { Explode } from "./explode";
import { expectType } from "tsd";
test("Explode type should be correct", () => {
  type Test1 =
    Explode<"https://example.com/users/:userId/tabs?query=something&offset=23#section">;
  expectType<{
    scheme: "https";
    domain: "example.com";
    path: {
      original: "/users/:userId/tabs";
      parts: ["users", ":userId", "tabs"];
    };
    query: { query: "something"; offset: "23" };
    hash: "section";
  }>(undefined as unknown as Test1);

  type Test2 = Explode<"https://example.com///home?section=main#top">;
  expectType<{
    scheme: "https";
    domain: "example.com";
    path: {
      original: "/home";
      parts: ["home"];
    };
    query: { section: "main" };
    hash: "top";
  }>(undefined as unknown as Test2);

  type Test3 = Explode<"https://example.com/about#team">;
  expectType<{
    scheme: "https";
    domain: "example.com";
    path: {
      original: "/about";
      parts: ["about"];
    };
    query: never;
    hash: "team";
  }>(undefined as unknown as Test3);

  type Test4 = Explode<"https://example.com/contact">;
  expectType<{
    scheme: "https";
    domain: "example.com";
    path: {
      original: "/contact";
      parts: ["contact"];
    };
    query: never;
    hash: "";
  }>(undefined as unknown as Test4);

  type Test5 = Explode<"https://example.com#hashOnly">;
  expectType<{
    scheme: "https";
    domain: "example.com";
    path: {
      original: "/";
      parts: [];
    };
    query: never;
    hash: "hashOnly";
  }>(undefined as unknown as Test5);

  type Test6 = Explode<"https://example.com/plainString">;
  expectType<{
    scheme: "https";
    domain: "example.com";
    path: {
      original: "/plainString";
      parts: ["plainString"];
    };
    query: never;
    hash: "";
  }>(undefined as unknown as Test6);
});
