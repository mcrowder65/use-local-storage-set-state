import React from "react";
import store from "store";

function useLocalStorageSetState(initialValue, name) {
  const actualInitialValue =
    store.get(name) !== undefined ? store.get(name) : initialValue;
  const [value, setValue] = React.useState(actualInitialValue);

  const theirSetValue = theirNewValue => {
    let valueToSet;
    if (typeof theirNewValue === "function") {
      valueToSet = theirNewValue(value);
      setValue(valueToSet);
    } else {
      setValue(theirNewValue);
      valueToSet = theirNewValue;
    }
    store.set(name, valueToSet);
  };
  return [value, theirSetValue];
}

export default useLocalStorageSetState;