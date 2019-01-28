# use-local-storage-set-state

## Simple React.useState that sits on top of localStorage

Example:

```jsx
import React from "react";
import useLocalStorageSetState from "use-local-storage-set-state";

function MyComponent() {
  const [value, setValue] = useLocalStorageSetState(
    false,
    "name-of-local-storage-key"
  );

  return <button onClick={() => setValue(!value)}>{String(value)}</button>;
}

export default MyComponent;
```

And on refreshes, the value will persist.
