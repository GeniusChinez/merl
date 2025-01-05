import { greet } from "./index";

test("greet function", () => {
  expect(greet()).toBe("hey, bro");
});
