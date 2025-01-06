import { Explode } from "./explode";
import { expectType } from "tsd";
import { explode } from "./explode";

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
    hash: never;
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
    hash: never;
  }>(undefined as unknown as Test6);
});

test("Explode function should parse URLs correctly", () => {
  const result1 = explode(
    "https://example.com/users/:userId/tabs?query=something&offset=23#section",
  );
  expect(result1).toEqual({
    scheme: "https",
    domain: "example.com",
    path: {
      original: "/users/:userId/tabs",
      parts: ["users", ":userId", "tabs"],
    },
    query: { query: "something", offset: "23" },
    hash: "section",
  });

  const result2 = explode("https://example.com///home?section=main#top");
  expect(result2).toEqual({
    scheme: "https",
    domain: "example.com",
    path: {
      original: "/home",
      parts: ["home"],
    },
    query: { section: "main" },
    hash: "top",
  });

  const result3 = explode("https://example.com/about#team");
  expect(result3).toEqual({
    scheme: "https",
    domain: "example.com",
    path: {
      original: "/about",
      parts: ["about"],
    },
    query: {},
    hash: "team",
  });

  const result4 = explode("https://example.com/contact");
  expect(result4).toEqual({
    scheme: "https",
    domain: "example.com",
    path: {
      original: "/contact",
      parts: ["contact"],
    },
    query: {},
    hash: {},
  });

  const result5 = explode("https://example.com#hashOnly");
  expect(result5).toEqual({
    scheme: "https",
    domain: "example.com",
    path: {
      original: "/",
      parts: [],
    },
    query: {},
    hash: "hashOnly",
  });

  const result6 = explode("https://example.com/plainString");
  expect(result6).toEqual({
    scheme: "https",
    domain: "example.com",
    path: {
      original: "/plainString",
      parts: ["plainString"],
    },
    query: {},
    hash: {},
  });

  const result7 = explode(
    "http://example.com/path/to/resource?foo=bar&baz=qux#fragment",
  );
  expect(result7).toEqual({
    scheme: "http",
    domain: "example.com",
    path: {
      original: "/path/to/resource",
      parts: ["path", "to", "resource"],
    },
    query: { foo: "bar", baz: "qux" },
    hash: "fragment",
  });

  const result8 = explode("ftp://example.com/resource");
  expect(result8).toEqual({
    scheme: "ftp",
    domain: "example.com",
    path: {
      original: "/resource",
      parts: ["resource"],
    },
    query: {},
    hash: {},
  });

  // const result9 = explode("mailto:user@example.com");
  // expect(result9).toEqual({
  //   scheme: "mailto",
  //   domain: "user@example.com",
  //   path: {
  //     original: "/",
  //     parts: [],
  //   },
  //   query: {},
  //   hash: {},
  // });

  // const result10 = explode("file:///C:/path/to/file.txt");
  // expect(result10).toEqual({
  //   scheme: "file",
  //   domain: "",
  //   path: {
  //     original: "/C:/path/to/file.txt",
  //     parts: ["C:", "path", "to", "file.txt"],
  //   },
  //   query: {},
  //   hash: {},
  // });
});
