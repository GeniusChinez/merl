# MERL

MERL is a TypeScript library for manipulating and extracting components from URLs. It provides utilities to normalize URLs, extract query parameters, hash fragments, and more.

## Installation

```sh
npm install merl
```

## Usage

### Importing the Library

```ts
import { m } from 'merl';
```

### Normalizing URLs

```ts
const normalizedUrl = m.normalize('http://example.com/users/');
console.log(normalizedUrl); // Output: /users
```

### Extracting Components

```ts
const components = m.extractComponents('/users/:userId/tabs?query=something#section');
console.log(components);
// Output:
// {
//   path: '/users/:userId/tabs',
//   parts: ['users', ':userId', 'tabs'],
//   query: { query: 'something' },
//   hash: 'section'
// }
```

### Extracting Query Parameters

```ts
const queryParams = m.extractQueryParams('/users?name=John&age=30');
console.log(queryParams); // Output: { name: 'John', age: '30' }
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

### Tail Function

```ts
const tail = m.tail([1, 2, 3]);
console.log(tail); // Output: [2, 3]
```

## License

This project is licensed under the MIT License