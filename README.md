# use-local-storage-set-state

[![NPM version][npm-image]][npm-url]
[![Build Status][travis-image]][travis-url]
[![Total Status][total-image]][total-url]
[![PRs Welcome][pr-image]][pr-url]
[![Coverage Status][coverage-image]][coverage-url]

[npm-image]: https://badge.fury.io/js/use-local-storage-set-state.svg
[npm-url]: https://npmjs.org/package/use-local-storage-set-state
[travis-image]: https://travis-ci.org/mcrowder65/use-local-storage-set-state.svg?branch=master
[travis-url]: https://travis-ci.org/mcrowder65/use-local-storage-set-state
[total-image]: https://img.shields.io/npm/dt/use-local-storage-set-state.svg
[total-url]: https://img.shields.io/npm/dt/use-local-storage-set-state
[pr-image]: https://img.shields.io/badge/PRs-welcome-brightgreen.svg
[pr-url]: http://makeapullrequest.com
[coverage-image]: https://coveralls.io/repos/github/mcrowder65/use-local-storage-set-state/badge.svg
[coverage-url]: https://coveralls.io/github/mcrowder65/use-local-storage-set-state

## Simple React.useState that sits on top of localStorage

Example:

```jsx
import React from "react";
import useState from "use-local-storage-set-state";

function MyComponent() {
  const [value, setValue] = useState(
    false,
    "name-of-local-storage-key"
  );

  return <button onClick={() => setValue(!value)}>{String(value)}</button>;
}

export default MyComponent;
```

And on refreshes, the value will persist.
