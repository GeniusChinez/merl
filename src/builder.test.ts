import { getPathBuilder } from "./builder";

const newUrls = [
  "products/:productId/reviews/:reviewId",
  "categories/:categoryId/items",
  "/about",
  "/contact/:contactId",
  "search",
  "users/:userId/settings",
  "orders/:orderId/track",
  "cart",
  "checkout",
  "blog/:blogId/comments/:commentId",
] as const;

const newPathBuilder = getPathBuilder(newUrls);

it("should build correct URL for nested paths in new URLs", () => {
  const url = newPathBuilder.products.using("10").reviews.using("5").url();
  expect(url).toBe("/products/10/reviews/5");
});

it("should build correct URL with query parameters in new URLs", () => {
  const url = newPathBuilder.categories.using("3").items.url({
    sort: "asc",
    page: 2,
  });

  const expectedUrl = "/categories/3/items?sort=asc&page=2";

  // Helper function to normalize URLs by sorting query parameters
  const standardize = (inputUrl: string) => {
    const [basePath, queryString] = inputUrl.split("?");
    if (!queryString) return basePath; // No query params, return the base path

    const params = new URLSearchParams(queryString);
    const sortedParams = new URLSearchParams([...params.entries()].sort());
    return `${basePath}?${sortedParams}`;
  };

  expect(standardize(url)).toBe(standardize(expectedUrl));
});

it("should build correct URL for static paths in new URLs", () => {
  const url = newPathBuilder.about.url();
  expect(url).toBe("/about");
});

it("should build correct URL for dynamic paths in new URLs", () => {
  const url = newPathBuilder.contact.using("456").url();
  expect(url).toBe("/contact/456");
});

it("should build correct URL for search path in new URLs", () => {
  const url = newPathBuilder.search.url({ query: "typescript" });
  expect(url).toBe("/search?query=typescript");
});

it("should build correct URL for user settings path in new URLs", () => {
  const url = newPathBuilder.users.using("789").settings.url();
  expect(url).toBe("/users/789/settings");
});

it("should build correct URL for order tracking path in new URLs", () => {
  const url = newPathBuilder.orders.using("101112").track.url();
  expect(url).toBe("/orders/101112/track");
});

it("should build correct URL for cart path in new URLs", () => {
  const url = newPathBuilder.cart.url();
  expect(url).toBe("/cart");
});

it("should build correct URL for checkout path in new URLs", () => {
  const url = newPathBuilder.checkout.url();
  expect(url).toBe("/checkout");
});

it("should build correct URL for nested blog comments path in new URLs", () => {
  const url = newPathBuilder.blog.using("202").comments.using("303").url();
  expect(url).toBe("/blog/202/comments/303");
});

// it("should return correct types for nested paths in new URLs", () => {
//   const url = newPathBuilder.products.using("10").reviews.using("5").url();
//   type ExpectedType = "/products/10/reviews/5/";
//   const assertType: ExpectedType = url;
//   expect(typeof url).toBe("string");
// });

// it("should return correct types for static paths in new URLs", () => {
//   const url = newPathBuilder.about.url();
//   type ExpectedType = string;
//   const assertType: ExpectedType = url;
//   expect(typeof url).toBe("string");
// });

// it("should return correct types for dynamic paths in new URLs", () => {
//   const url = newPathBuilder.contact.using("456").url();
//   type ExpectedType = string;
//   const assertType: ExpectedType = url;
//   expect(typeof url).toBe("string");
// });
