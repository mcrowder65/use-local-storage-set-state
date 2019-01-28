import React from "react";

function useLocalStorageSetState(initialValue, name) {
  const actualInitialValue =
    localStorage.getItem(name) !== undefined
      ? JSON.parse(localStorage.getItem(name))
      : initialValue;
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
    localStorage.setItem(name, valueToSet);
  };
  return [value, theirSetValue];
}

export default useLocalStorageSetState;
