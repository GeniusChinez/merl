import type { Tail } from "./tail";
import { expectType } from "tsd";

describe("Tail type", () => {
  it("should return the tail of a tuple", () => {
    type Test = Tail<[1, 2, 3]>;
    expectType<[2, 3]>({} as Test);
  });

  it("should return an empty tuple if given a single-element tuple", () => {
    type Test = Tail<[1]>;
    expectType<[]>({} as Test);
  });

  it("should return never for an empty tuple", () => {
    type Test = Tail<[]>;
    expectType<never>({} as Test);
  });

  it("should return the tail of a tuple with mixed types", () => {
    type Test = Tail<[string, number, boolean]>;
    expectType<[number, boolean]>({} as Test);
  });

  it("should return never for non-tuple types", () => {
    type Test = Tail<number>;
    expectType<never>({} as Test);
  });
});
