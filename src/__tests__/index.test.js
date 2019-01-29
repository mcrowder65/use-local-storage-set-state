import React from "react";
import { cleanup, render, fireEvent } from "react-testing-library";

import useState from "../index";

function MyComponent() {
  const [name, setName] = useState("", "name");
  const [flag, setFlag] = useState(false, "flag");
  return (
    <div>
      {name}
      <input
        data-testid="name"
        value={name}
        onChange={e => setName(e.target.value)}
      />

      <button data-testid="button" onClick={() => setFlag(state => !state)}>
        {String(flag)}
      </button>
    </div>
  );
}

afterEach(cleanup);

test("that after inserting text into the document then remounting, the text will remain", () => {
  const { queryByText, queryByTestId, unmount, rerender } = render(
    <MyComponent />
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
