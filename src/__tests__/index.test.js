import React from "react";
import PropTypes from "prop-types";
import { cleanup, render, fireEvent } from "react-testing-library";

import useState from "../index";

function MyComponent() {
  const [name, setName] = useState("", "name");
  const [flag, setFlag] = useState(false, "flag");
  const [array, setArray] = useState([], "array");
  return (
    <div>
      {name}
      <input
        data-testid="name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />

      <button data-testid="button" onClick={() => setFlag((state) => !state)}>
        {String(flag)}
      </button>
      {array.join(",")}
      <button
        data-testid="array-button"
        onClick={() => setArray((state) => [...state, state.length + 1])}
      />
    </div>
  );
}

afterEach(cleanup);

test("that after inserting text into the document then remounting, the text will remain", () => {
  const { queryByText, queryByTestId, unmount, rerender } = render(
    <MyComponent />,
  );

  const newValue = "Lebron James";
  fireEvent.change(queryByTestId("name"), { target: { value: newValue } });

  expect(queryByText(newValue)).toBeInTheDocument();

  unmount();

  rerender(<MyComponent />);

  expect(queryByText(newValue)).toBeInTheDocument();
});

test("that on component reloads, booleans persist", () => {
  const { getByText, getByTestId, unmount, rerender } = render(<MyComponent />);

  fireEvent.click(getByTestId("button"));

  expect(getByText(/true/i)).toBeInTheDocument();

  unmount();

  rerender(<MyComponent />);

  expect(getByText(/true/i)).toBeInTheDocument();
});

test("that on component reloads, arrays persist", () => {
  const { getByText, getByTestId, unmount, rerender } = render(<MyComponent />);

  fireEvent.click(getByTestId("array-button"));

  expect(getByText(/1/i)).toBeInTheDocument();

  fireEvent.click(getByTestId("array-button"));

  expect(getByText(/1,2/i)).toBeInTheDocument();

  unmount();

  rerender(<MyComponent />);

  expect(getByText(/1,2/i)).toBeInTheDocument();
});

test("that it throws when no name is provided", () => {
  expect(() => useState("asdf")).toThrow();
});

test("that when passing a function, it utilizes it to set the value", () => {
  function MyComp(props) {
    const [index, setIndex] = useState((prev) => {
      if (prev >= props.arr.length || prev === undefined) {
        return 0;
      } else {
        return prev;
      }
    }, "index-local-storage");
    return (
      <div>
        <button data-testid="set-index-0" onClick={() => setIndex(0)} />
        <div data-testid="index">{props.arr[index]}</div>
        <button data-testid="set-index-1" onClick={() => setIndex(1)} />
      </div>
    );
  }

  MyComp.propTypes = {
    arr: PropTypes.array.isRequired,
  };

  const { getByTestId, getByText, rerender, unmount } = render(
    <MyComp arr={["first", "second"]} />,
  );

  expect(getByText(/first/i)).toBeInTheDocument();

  fireEvent.click(getByTestId("set-index-1"));

  expect(getByText(/second/i)).toBeInTheDocument();

  unmount();
  rerender(<MyComp arr={["first"]} />);

  expect(getByText(/first/i)).toBeInTheDocument();
});
