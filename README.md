# MERL Path Builder

MERL is a TypeScript library for manipulating and extracting components from URLs. This document focuses on the Path Builder feature of the library.

## Installation

```sh
npm install merl
```

## Usage

### Importing the Library

```ts
import { m } from 'merl';
```

### Using the Path Builder

```ts
const urls = [
  'products/:productId/reviews/:reviewId',
  'categories/:categoryId/items',
  '/about',
  '/contact/:contactId',
  'search',
  'users/:userId/settings',
  'orders/:orderId/track',
  'cart',
  'checkout',
  'blog/:blogId/comments/:commentId',
] as const;

const pathBuilder = m.compile(urls);

const url = pathBuilder.products.using('10').reviews.using('5').url();
console.log(url); // Output: /products/10/reviews/5
```

## License

This project is licensed under the MIT License MERL