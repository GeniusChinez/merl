import { expectType } from "tsd";
import type { NormalizeUrl } from "./normalize";

import { normalizeUrl } from "./normalize";

test("NormalizePath type should be correct", () => {
  const a: NormalizeUrl<"/users"> = "/users";
  expectType<"/users">(a);

  const b: NormalizeUrl<"/posts"> = "/posts";
  expectType<"/posts">(b);

  const c: NormalizeUrl<"users"> = "/users";
  expectType<"/users">(c);
});
test("NormalizePath type should be correct", () => {
  const a: NormalizeUrl<"/users"> = "/users";
  expectType<"/users">(a);

  const b: NormalizeUrl<"/posts"> = "/posts";
  expectType<"/posts">(b);

  const c: NormalizeUrl<"users"> = "/users";
  expectType<"/users">(c);
});

test("normalizeUrl function should return correct normalized URL", () => {
  expect(normalizeUrl("/users")).toBe("/users");
  expect(normalizeUrl("users")).toBe("/users");
  expect(normalizeUrl("/users/")).toBe("/users");
  expect(normalizeUrl("users/")).toBe("/users");
  expect(normalizeUrl("http://example.com/users")).toBe("/users");
  expect(normalizeUrl("http://example.com/users/")).toBe("/users");
  expect(normalizeUrl("http://example.com/users?query=1")).toBe(
    "/users?query=1",
  );
  expect(normalizeUrl("http://example.com/users#section")).toBe(
    "/users#section",
  );
  expect(normalizeUrl("/")).toBe("/");
  expect(normalizeUrl("")).toBe("/");
});

test("normalizeUrl function return type should be string", () => {
  const result = normalizeUrl("/users");
  expectType<string>(result);
});
