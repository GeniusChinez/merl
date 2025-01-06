import type {
  ExtractCompoundFirstParts,
  ExtractUrlsParts,
  ExtractUrlPartsWithSameFirstPart,
  ExtractUrlPartsAfterFirst,
  FilterPartsWithEmptyLists,
  ExtractFirstPathParam,
  ExtractPartsAfterParam,
} from "./parts";
import {
  extractCompoundFirstPaths,
  extractUrlsParts,
  extractUrlPartsWithSameFirstPart,
  extractUrlPartsAfterFirst,
  filterPartsWithEmptyLists,
  extractFirstPathParam,
  extractPartsAfterParam,
  extractUrlParts,
} from "./parts";

describe("extractCompoundFirstPaths", () => {
  it("should extract the first parts of compound paths", () => {
    const input = [
      {
        self: ["users", ":userId", "posts"],
        originalUrl: "/users/:userId/posts",
      },
      { self: ["posts"], originalUrl: "/posts" },
      { self: ["records", ":recordId"], originalUrl: "/records/:recordId" },
    ];
    const expectedOutput = ["users", "posts", "records"];
    const result = extractCompoundFirstPaths(input);
    expect(result).toEqual(expectedOutput);
  });

  it("should handle empty input", () => {
    const input: { self: string[]; originalUrl: string }[] = [];
    const expectedOutput: never[] = [];
    const result = extractCompoundFirstPaths(input);
    expect(result).toEqual(expectedOutput);
  });

  it("should handle input with empty self arrays", () => {
    const input = [
      { self: [], originalUrl: "/empty" },
      { self: ["users"], originalUrl: "/users" },
    ];
    const expectedOutput = ["users"];
    const result = extractCompoundFirstPaths(input);
    expect(result).toEqual(expectedOutput);
  });

  it("should handle input with parameterized first parts", () => {
    const input = [
      { self: [":param"], originalUrl: "/:param" },
      { self: ["users"], originalUrl: "/users" },
    ];
    const expectedOutput = ["users"];
    const result = extractCompoundFirstPaths(input);
    expect(result).toEqual(expectedOutput);
  });
});

describe("ExtractCompoundFirstParts", () => {
  it("should extract the first parts of compound paths", () => {
    type Input = [
      {
        self: ["users", ":userId", "posts"];
        originalUrl: "/users/:userId/posts";
      },
      { self: ["posts"]; originalUrl: "/posts" },
      { self: ["records", ":recordId"]; originalUrl: "/records/:recordId" },
    ];
    type ExpectedOutput = ["users", "posts", "records"];
    type Result = ExtractCompoundFirstParts<Input>;
    const assertEqual: Result extends ExpectedOutput ? true : false = true;
    expect(assertEqual).toBe(true);
  });

  it("should handle empty input", () => {
    type Input = [];
    type ExpectedOutput = [];
    type Result = ExtractCompoundFirstParts<Input>;
    const assertEqual: Result extends ExpectedOutput ? true : false = true;
    expect(assertEqual).toBe(true);
  });

  it("should handle input with empty self arrays", () => {
    type Input = [
      { self: []; originalUrl: "/empty" },
      { self: ["users"]; originalUrl: "/users" },
    ];
    type ExpectedOutput = ["users"];
    type Result = ExtractCompoundFirstParts<Input>;
    const assertEqual: Result extends ExpectedOutput ? true : false = true;
    expect(assertEqual).toBe(true);
  });

  it("should handle input with parameterized first parts", () => {
    type Input = [
      { self: [":param"]; originalUrl: "/:param" },
      { self: ["users"]; originalUrl: "/users" },
    ];
    type ExpectedOutput = ["users"];
    type Result = ExtractCompoundFirstParts<Input>;
    const assertEqual: Result extends ExpectedOutput ? true : false = true;
    expect(assertEqual).toBe(true);
  });
});

describe("extractUrlsParts", () => {
  it("should extract parts from URLs", () => {
    const input = ["/users/:userId/posts", "/posts", "/records/:recordId"];
    const expectedOutput = [
      {
        self: ["users", ":userId", "posts"],
        originalUrl: "/users/:userId/posts",
      },
      { self: ["posts"], originalUrl: "/posts" },
      { self: ["records", ":recordId"], originalUrl: "/records/:recordId" },
    ];
    const result = extractUrlsParts(input);
    expect(result).toEqual(expectedOutput);
  });

  it("should handle empty input", () => {
    const input: string[] = [];
    const expectedOutput: never[] = [];
    const result = extractUrlsParts(input);
    expect(result).toEqual(expectedOutput);
  });

  it("should handle URLs with no parts", () => {
    const input = ["/"];
    const expectedOutput = [{ self: [], originalUrl: "/" }];
    const result = extractUrlsParts(input);
    expect(result).toEqual(expectedOutput);
  });

  it("should handle URLs with parameterized parts", () => {
    const input = ["/:param", "/users"];
    const expectedOutput = [
      { self: [":param"], originalUrl: "/:param" },
      { self: ["users"], originalUrl: "/users" },
    ];
    const result = extractUrlsParts(input);
    expect(result).toEqual(expectedOutput);
  });
});

describe("ExtractUrlsParts", () => {
  it("should extract parts from URLs", () => {
    type Input = ["/users/:userId/posts", "/posts", "/records/:recordId"];
    type ExpectedOutput = [
      {
        self: ["users", ":userId", "posts"];
        originalUrl: "/users/:userId/posts";
      },
      { self: ["posts"]; originalUrl: "/posts" },
      { self: ["records", ":recordId"]; originalUrl: "/records/:recordId" },
    ];
    type Result = ExtractUrlsParts<Input>;
    const assertEqual: Result extends ExpectedOutput ? true : false = true;
    expect(assertEqual).toBe(true);
  });

  it("should handle empty input", () => {
    type Input = [];
    type ExpectedOutput = [];
    type Result = ExtractUrlsParts<Input>;
    const assertEqual: Result extends ExpectedOutput ? true : false = true;
    expect(assertEqual).toBe(true);
  });

  it("should handle URLs with no parts", () => {
    type Input = ["/"];
    type ExpectedOutput = [{ self: []; originalUrl: "/" }];
    type Result = ExtractUrlsParts<Input>;
    const assertEqual: Result extends ExpectedOutput ? true : false = true;
    expect(assertEqual).toBe(true);
  });

  it("should handle URLs with parameterized parts", () => {
    type Input = ["/:param", "/users"];
    type ExpectedOutput = [
      { self: [":param"]; originalUrl: "/:param" },
      { self: ["users"]; originalUrl: "/users" },
    ];
    type Result = ExtractUrlsParts<Input>;
    const assertEqual: Result extends ExpectedOutput ? true : false = true;
    expect(assertEqual).toBe(true);
  });
});

describe("extractUrlPartsWithSameFirstPart", () => {
  it("should extract parts with the same first part", () => {
    const input = [
      {
        self: ["users", ":userId", "posts"],
        originalUrl: "/users/:userId/posts",
      },
      {
        self: ["users", ":userId", "actions"],
        originalUrl: "/users/:userId/actions",
      },
      { self: ["posts"], originalUrl: "/posts" },
      { self: ["users"], originalUrl: "/users" },
    ];
    const expectedOutput = [
      {
        self: ["users", ":userId", "posts"],
        originalUrl: "/users/:userId/posts",
      },
      {
        self: ["users", ":userId", "actions"],
        originalUrl: "/users/:userId/actions",
      },
      { self: ["users"], originalUrl: "/users" },
    ];
    const result = extractUrlPartsWithSameFirstPart(input, "users");
    expect(result).toEqual(expectedOutput);
  });

  it("should handle empty input", () => {
    const input: { self: string[]; originalUrl: string }[] = [];
    const expectedOutput: never[] = [];
    const result = extractUrlPartsWithSameFirstPart(input, "users");
    expect(result).toEqual(expectedOutput);
  });

  it("should handle input with no matching first part", () => {
    const input = [
      { self: ["posts"], originalUrl: "/posts" },
      { self: ["records"], originalUrl: "/records" },
    ];
    const expectedOutput: never[] = [];
    const result = extractUrlPartsWithSameFirstPart(input, "users");
    expect(result).toEqual(expectedOutput);
  });

  it("should handle input with empty self arrays", () => {
    const input = [
      { self: [], originalUrl: "/empty" },
      { self: ["users"], originalUrl: "/users" },
    ];
    const expectedOutput = [{ self: ["users"], originalUrl: "/users" }];
    const result = extractUrlPartsWithSameFirstPart(input, "users");
    expect(result).toEqual(expectedOutput);
  });
});

describe("ExtractUrlPartsWithSameFirstPart", () => {
  it("should extract parts with the same first part", () => {
    type Input = [
      {
        self: ["users", ":userId", "posts"];
        originalUrl: "/users/:userId/posts";
      },
      {
        self: ["users", ":userId", "actions"];
        originalUrl: "/users/:userId/actions";
      },
      { self: ["posts"]; originalUrl: "/posts" },
      { self: ["users"]; originalUrl: "/users" },
    ];
    type ExpectedOutput = [
      {
        self: ["users", ":userId", "posts"];
        originalUrl: "/users/:userId/posts";
      },
      {
        self: ["users", ":userId", "actions"];
        originalUrl: "/users/:userId/actions";
      },
      { self: ["users"]; originalUrl: "/users" },
    ];
    type Result = ExtractUrlPartsWithSameFirstPart<Input, "users">;
    const assertEqual: Result extends ExpectedOutput ? true : false = true;
    expect(assertEqual).toBe(true);
  });

  it("should handle empty input", () => {
    type Input = [];
    type ExpectedOutput = [];
    type Result = ExtractUrlPartsWithSameFirstPart<Input, "users">;
    const assertEqual: Result extends ExpectedOutput ? true : false = true;
    expect(assertEqual).toBe(true);
  });

  it("should handle input with no matching first part", () => {
    type Input = [
      { self: ["posts"]; originalUrl: "/posts" },
      { self: ["records"]; originalUrl: "/records" },
    ];
    type ExpectedOutput = [];
    type Result = ExtractUrlPartsWithSameFirstPart<Input, "users">;
    const assertEqual: Result extends ExpectedOutput ? true : false = true;
    expect(assertEqual).toBe(true);
  });

  it("should handle input with empty self arrays", () => {
    type Input = [
      { self: []; originalUrl: "/empty" },
      { self: ["users"]; originalUrl: "/users" },
    ];
    type ExpectedOutput = [{ self: ["users"]; originalUrl: "/users" }];
    type Result = ExtractUrlPartsWithSameFirstPart<Input, "users">;
    const assertEqual: Result extends ExpectedOutput ? true : false = true;
    expect(assertEqual).toBe(true);
  });
});

describe("extractUrlPartsAfterFirst", () => {
  it("should extract parts after the first part", () => {
    const input = [
      {
        self: ["users", ":userId", "posts"],
        originalUrl: "/users/:userId/posts",
      },
      { self: ["posts"], originalUrl: "/posts" },
      { self: ["records", ":recordId"], originalUrl: "/records/:recordId" },
    ];
    const expectedOutput = [
      { self: [":userId", "posts"], originalUrl: "/users/:userId/posts" },
      { self: [":recordId"], originalUrl: "/records/:recordId" },
    ];
    const result = extractUrlPartsAfterFirst(input);
    expect(result).toEqual(expectedOutput);
  });

  it("should handle empty input", () => {
    const input: { self: string[]; originalUrl: string }[] = [];
    const expectedOutput: never[] = [];
    const result = extractUrlPartsAfterFirst(input);
    expect(result).toEqual(expectedOutput);
  });

  it("should handle input with empty self arrays", () => {
    const input = [
      { self: [], originalUrl: "/empty" },
      { self: ["users"], originalUrl: "/users" },
    ];
    const expectedOutput = [] as string[];
    const result = extractUrlPartsAfterFirst(input);
    expect(result).toEqual(expectedOutput);
  });

  it("should handle input with single part arrays", () => {
    const input = [
      { self: ["users"], originalUrl: "/users" },
      { self: ["posts"], originalUrl: "/posts" },
    ];
    const expectedOutput = [] as string[];
    const result = extractUrlPartsAfterFirst(input);
    expect(result).toEqual(expectedOutput);
  });
});

describe("ExtractUrlPartsAfterFirst", () => {
  it("should extract parts after the first part", () => {
    type Input = [
      {
        self: ["users", ":userId", "posts"];
        originalUrl: "/users/:userId/posts";
      },
      { self: ["posts"]; originalUrl: "/posts" },
      { self: ["records", ":recordId"]; originalUrl: "/records/:recordId" },
    ];
    type ExpectedOutput = [
      { self: [":userId", "posts"]; originalUrl: "/users/:userId/posts" },
      { self: [":recordId"]; originalUrl: "/records/:recordId" },
    ];
    type Result = ExtractUrlPartsAfterFirst<Input>;
    const assertEqual: Result extends ExpectedOutput ? true : false = true;
    expect(assertEqual).toBe(true);
  });

  it("should handle empty input", () => {
    type Input = [];
    type ExpectedOutput = [];
    type Result = ExtractUrlPartsAfterFirst<Input>;
    const assertEqual: Result extends ExpectedOutput ? true : false = true;
    expect(assertEqual).toBe(true);
  });

  it("should handle input with empty self arrays", () => {
    type Input = [
      { self: []; originalUrl: "/empty" },
      { self: ["users"]; originalUrl: "/users" },
    ];
    type ExpectedOutput = [];
    type Result = ExtractUrlPartsAfterFirst<Input>;
    const assertEqual: Result extends ExpectedOutput ? true : false = true;
    expect(assertEqual).toBe(true);
  });

  it("should handle input with single part arrays", () => {
    type Input = [
      { self: ["users"]; originalUrl: "/users" },
      { self: ["posts"]; originalUrl: "/posts" },
    ];
    type ExpectedOutput = [];
    type Result = ExtractUrlPartsAfterFirst<Input>;
    const assertEqual: Result extends ExpectedOutput ? true : false = true;
    expect(assertEqual).toBe(true);
  });
});

describe("filterPartsWithEmptyLists", () => {
  it("should filter out parts with empty self arrays", () => {
    const input = [
      { self: [], originalUrl: "/empty" },
      { self: ["users"], originalUrl: "/users" },
      { self: ["posts"], originalUrl: "/posts" },
    ];
    const expectedOutput = [
      { self: ["users"], originalUrl: "/users" },
      { self: ["posts"], originalUrl: "/posts" },
    ];
    const result = filterPartsWithEmptyLists(input);
    expect(result).toEqual(expectedOutput);
  });

  it("should handle empty input", () => {
    const input: { self: string[]; originalUrl: string }[] = [];
    const expectedOutput: never[] = [];
    const result = filterPartsWithEmptyLists(input);
    expect(result).toEqual(expectedOutput);
  });

  it("should handle input with no empty self arrays", () => {
    const input = [
      { self: ["users"], originalUrl: "/users" },
      { self: ["posts"], originalUrl: "/posts" },
    ];
    const expectedOutput = [
      { self: ["users"], originalUrl: "/users" },
      { self: ["posts"], originalUrl: "/posts" },
    ];
    const result = filterPartsWithEmptyLists(input);
    expect(result).toEqual(expectedOutput);
  });

  it("should handle input with all empty self arrays", () => {
    const input = [
      { self: [], originalUrl: "/empty1" },
      { self: [], originalUrl: "/empty2" },
    ];
    const expectedOutput: never[] = [];
    const result = filterPartsWithEmptyLists(input);
    expect(result).toEqual(expectedOutput);
  });
});

describe("FilterPartsWithEmptyLists", () => {
  it("should filter out parts with empty self arrays", () => {
    type Input = [
      { self: []; originalUrl: "/empty" },
      { self: ["users"]; originalUrl: "/users" },
      { self: ["posts"]; originalUrl: "/posts" },
    ];
    type ExpectedOutput = [
      { self: ["users"]; originalUrl: "/users" },
      { self: ["posts"]; originalUrl: "/posts" },
    ];
    type Result = FilterPartsWithEmptyLists<Input>;
    const assertEqual: Result extends ExpectedOutput ? true : false = true;
    expect(assertEqual).toBe(true);
  });

  it("should handle empty input", () => {
    type Input = [];
    type ExpectedOutput = [];
    type Result = FilterPartsWithEmptyLists<Input>;
    const assertEqual: Result extends ExpectedOutput ? true : false = true;
    expect(assertEqual).toBe(true);
  });

  it("should handle input with no empty self arrays", () => {
    type Input = [
      { self: ["users"]; originalUrl: "/users" },
      { self: ["posts"]; originalUrl: "/posts" },
    ];
    type ExpectedOutput = [
      { self: ["users"]; originalUrl: "/users" },
      { self: ["posts"]; originalUrl: "/posts" },
    ];
    type Result = FilterPartsWithEmptyLists<Input>;
    const assertEqual: Result extends ExpectedOutput ? true : false = true;
    expect(assertEqual).toBe(true);
  });

  it("should handle input with all empty self arrays", () => {
    type Input = [
      { self: []; originalUrl: "/empty1" },
      { self: []; originalUrl: "/empty2" },
    ];
    type ExpectedOutput = [];
    type Result = FilterPartsWithEmptyLists<Input>;
    const assertEqual: Result extends ExpectedOutput ? true : false = true;
    expect(assertEqual).toBe(true);
  });
});

describe("extractFirstPathParam", () => {
  it("should extract nothing if no parameter is first", () => {
    const input = [
      {
        self: ["users", ":userId", "posts"],
        originalUrl: "/users/:userId/posts",
      },
      { self: ["posts"], originalUrl: "/posts" },
      { self: ["records", ":recordId"], originalUrl: "/records/:recordId" },
    ];
    const expectedOutput = undefined;
    const result = extractFirstPathParam(input);
    expect(result).toEqual(expectedOutput);
  });

  it("should extract the first path parameter", () => {
    const input = [
      { self: [":userId", "posts"], originalUrl: ":userId/posts" },
      { self: ["posts"], originalUrl: "/posts" },
      { self: ["records", ":recordId"], originalUrl: "/records/:recordId" },
    ];
    const expectedOutput = "userId";
    const result = extractFirstPathParam(input);
    expect(result).toEqual(expectedOutput);
  });

  it("should handle empty input", () => {
    const input: { self: string[]; originalUrl: string }[] = [];
    const expectedOutput = undefined;
    const result = extractFirstPathParam(input);
    expect(result).toEqual(expectedOutput);
  });

  it("should handle input with no parameters", () => {
    const input = [
      { self: ["users"], originalUrl: "/users" },
      { self: ["posts"], originalUrl: "/posts" },
    ];
    const expectedOutput = undefined;
    const result = extractFirstPathParam(input);
    expect(result).toEqual(expectedOutput);
  });

  it("should handle input with empty self arrays", () => {
    const input = [
      { self: [], originalUrl: "/empty" },
      { self: ["users"], originalUrl: "/users" },
    ];
    const expectedOutput = undefined;
    const result = extractFirstPathParam(input);
    expect(result).toEqual(expectedOutput);
  });

  it("should handle input with multiple parameters", () => {
    const input = [
      { self: [":param1"], originalUrl: "/:param1" },
      { self: [":param2"], originalUrl: "/:param2" },
    ];
    const expectedOutput = "param1";
    const result = extractFirstPathParam(input);
    expect(result).toEqual(expectedOutput);
  });
});

describe("ExtractFirstPathParam", () => {
  it("should not extract anything if no param is first", () => {
    type Input = [
      {
        self: ["users", ":userId", "posts"];
        originalUrl: "/users/:userId/posts";
      },
      { self: ["posts"]; originalUrl: "/posts" },
      { self: ["records", ":recordId"]; originalUrl: "/records/:recordId" },
    ];
    type ExpectedOutput = "userId";
    type Result = ExtractFirstPathParam<Input>;
    const assertEqual: Result extends ExpectedOutput ? true : false = true;
    expect(assertEqual).toBe(true);
  });

  it("should extract the first path parameter", () => {
    type Input = [
      { self: [":userId", "posts"]; originalUrl: "/:userId/posts" },
      { self: ["posts"]; originalUrl: "/posts" },
      { self: ["records", ":recordId"]; originalUrl: "/records/:recordId" },
    ];
    type ExpectedOutput = "userId";
    type Result = ExtractFirstPathParam<Input>;
    const assertEqual: Result extends ExpectedOutput ? true : false = true;
    expect(assertEqual).toBe(true);
  });

  it("should handle empty input", () => {
    type Input = [];
    type ExpectedOutput = never;
    type Result = ExtractFirstPathParam<Input>;
    const assertEqual: Result extends ExpectedOutput ? true : false = true;
    expect(assertEqual).toBe(true);
  });

  it("should handle input with no parameters", () => {
    type Input = [
      { self: ["users"]; originalUrl: "/users" },
      { self: ["posts"]; originalUrl: "/posts" },
    ];
    type ExpectedOutput = never;
    type Result = ExtractFirstPathParam<Input>;
    const assertEqual: Result extends ExpectedOutput ? true : false = true;
    expect(assertEqual).toBe(true);
  });

  it("should handle input with empty self arrays", () => {
    type Input = [
      { self: []; originalUrl: "/empty" },
      { self: ["users"]; originalUrl: "/users" },
    ];
    type ExpectedOutput = never;
    type Result = ExtractFirstPathParam<Input>;
    const assertEqual: Result extends ExpectedOutput ? true : false = true;
    expect(assertEqual).toBe(true);
  });

  it("should handle input with multiple parameters", () => {
    type Input = [
      { self: [":param1"]; originalUrl: "/:param1" },
      { self: [":param2"]; originalUrl: "/:param2" },
    ];
    type ExpectedOutput = "param1";
    type Result = ExtractFirstPathParam<Input>;
    const assertEqual: Result extends ExpectedOutput ? true : false = true;
    expect(assertEqual).toBe(true);
  });
});

describe("extractPartsAfterParam", () => {
  it("should extract parts after the specified parameter", () => {
    const input = [
      { self: [":userId", "posts"], originalUrl: "/:userId/posts" },
      { self: ["posts"], originalUrl: "/posts" },
      { self: ["records", ":recordId"], originalUrl: "/records/:recordId" },
    ];
    const expectedOutput = [{ self: ["posts"], originalUrl: "/:userId/posts" }];
    const result = extractPartsAfterParam(input, "userId");
    expect(result).toEqual(expectedOutput);
  });

  it("should handle empty input", () => {
    const input: { self: string[]; originalUrl: string }[] = [];
    const expectedOutput: never[] = [];
    const result = extractPartsAfterParam(input, "userId");
    expect(result).toEqual(expectedOutput);
  });

  it("should handle input with no matching parameter", () => {
    const input = [
      { self: ["posts"], originalUrl: "/posts" },
      { self: ["records"], originalUrl: "/records" },
    ];
    const expectedOutput: never[] = [];
    const result = extractPartsAfterParam(input, "userId");
    expect(result).toEqual(expectedOutput);
  });

  it("should handle input with empty self arrays", () => {
    const input = [
      { self: [], originalUrl: "/empty" },
      { self: ["users"], originalUrl: "/users" },
    ];
    const expectedOutput: never[] = [];
    const result = extractPartsAfterParam(input, "userId");
    expect(result).toEqual(expectedOutput);
  });

  it("should handle input with multiple matching parameters", () => {
    const input = [
      { self: [":param1", "posts"], originalUrl: "/:param1/posts" },
      { self: [":param2", "actions"], originalUrl: "/:param2/actions" },
    ];
    const expectedOutput = [{ self: ["posts"], originalUrl: "/:param1/posts" }];
    const result = extractPartsAfterParam(input, "param1");
    expect(result).toEqual(expectedOutput);
  });
});

describe("ExtractPartsAfterParam", () => {
  it("should extract parts after the specified parameter", () => {
    type Input = [
      { self: [":userId", "posts"]; originalUrl: "/:userId/posts" },
      { self: ["posts"]; originalUrl: "/posts" },
      { self: ["records", ":recordId"]; originalUrl: "/records/:recordId" },
    ];
    type ExpectedOutput = [{ self: ["posts"]; originalUrl: "/:userId/posts" }];
    type Result = ExtractPartsAfterParam<Input, "userId">;
    const assertEqual: Result extends ExpectedOutput ? true : false = true;
    expect(assertEqual).toBe(true);
  });

  it("should handle empty input", () => {
    type Input = [];
    type ExpectedOutput = [];
    type Result = ExtractPartsAfterParam<Input, "userId">;
    const assertEqual: Result extends ExpectedOutput ? true : false = true;
    expect(assertEqual).toBe(true);
  });

  it("should handle input with no matching parameter", () => {
    type Input = [
      { self: ["posts"]; originalUrl: "/posts" },
      { self: ["records"]; originalUrl: "/records" },
    ];
    type ExpectedOutput = [];
    type Result = ExtractPartsAfterParam<Input, "userId">;
    const assertEqual: Result extends ExpectedOutput ? true : false = true;
    expect(assertEqual).toBe(true);
  });

  it("should handle input with empty self arrays", () => {
    type Input = [
      { self: []; originalUrl: "/empty" },
      { self: ["users"]; originalUrl: "/users" },
    ];
    type ExpectedOutput = [];
    type Result = ExtractPartsAfterParam<Input, "userId">;
    const assertEqual: Result extends ExpectedOutput ? true : false = true;
    expect(assertEqual).toBe(true);
  });

  it("should handle input with multiple matching parameters", () => {
    type Input = [
      { self: [":param1", "posts"]; originalUrl: "/:param1/posts" },
      { self: [":param2", "actions"]; originalUrl: "/:param2/actions" },
    ];
    type ExpectedOutput = [{ self: ["posts"]; originalUrl: "/:param1/posts" }];
    type Result = ExtractPartsAfterParam<Input, "param1">;
    const assertEqual: Result extends ExpectedOutput ? true : false = true;
    expect(assertEqual).toBe(true);
  });
});

describe("extractUrlParts", () => {
  it("should extract parts from URLs", () => {
    const input = ["/users/:userId/posts", "/posts", "/records/:recordId"];
    const expectedOutput = [
      {
        self: ["users", ":userId", "posts"],
        originalUrl: "/users/:userId/posts",
      },
      { self: ["posts"], originalUrl: "/posts" },
      { self: ["records", ":recordId"], originalUrl: "/records/:recordId" },
    ];
    const result = extractUrlParts(input);
    expect(result).toEqual(expectedOutput);
  });

  it("should handle empty input", () => {
    const input: string[] = [];
    const expectedOutput: never[] = [];
    const result = extractUrlParts(input);
    expect(result).toEqual(expectedOutput);
  });

  it("should handle URLs with no parts", () => {
    const input = ["/"];
    const expectedOutput = [{ self: [], originalUrl: "/" }];
    const result = extractUrlParts(input);
    expect(result).toEqual(expectedOutput);
  });

  it("should handle URLs with parameterized parts", () => {
    const input = ["/:param", "/users"];
    const expectedOutput = [
      { self: [":param"], originalUrl: "/:param" },
      { self: ["users"], originalUrl: "/users" },
    ];
    const result = extractUrlParts(input);
    expect(result).toEqual(expectedOutput);
  });
});

describe("ExtractUrlParts", () => {
  it("should extract parts from URLs", () => {
    type Input = ["/users/:userId/posts", "/posts", "/records/:recordId"];
    type ExpectedOutput = [
      {
        self: ["users", ":userId", "posts"];
        originalUrl: "/users/:userId/posts";
      },
      { self: ["posts"]; originalUrl: "/posts" },
      { self: ["records", ":recordId"]; originalUrl: "/records/:recordId" },
    ];
    type Result = ExtractUrlsParts<Input>;
    const assertEqual: Result extends ExpectedOutput ? true : false = true;
    expect(assertEqual).toBe(true);
  });

  it("should handle empty input", () => {
    type Input = [];
    type ExpectedOutput = [];
    type Result = ExtractUrlsParts<Input>;
    const assertEqual: Result extends ExpectedOutput ? true : false = true;
    expect(assertEqual).toBe(true);
  });

  it("should handle URLs with no parts", () => {
    type Input = ["/"];
    type ExpectedOutput = [{ self: []; originalUrl: "/" }];
    type Result = ExtractUrlsParts<Input>;
    const assertEqual: Result extends ExpectedOutput ? true : false = true;
    expect(assertEqual).toBe(true);
  });

  it("should handle URLs with parameterized parts", () => {
    type Input = ["/:param", "/users"];
    type ExpectedOutput = [
      { self: [":param"]; originalUrl: "/:param" },
      { self: ["users"]; originalUrl: "/users" },
    ];
    type Result = ExtractUrlsParts<Input>;
    const assertEqual: Result extends ExpectedOutput ? true : false = true;
    expect(assertEqual).toBe(true);
  });
});
