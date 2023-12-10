import React from "react";
import { render, fireEvent, wait } from "@testing-library/react";
import BoxList from "./BoxList";

function addBox(boxList, height = "4", width = "4", color = "blue") {
  const heightInput = boxList.getByLabelText("Height");
  const widthInput = boxList.getByLabelText("Width");
  const backgroundInput = boxList.getByLabelText("Background Color");
  fireEvent.change(backgroundInput, { target: { value: color } });
  fireEvent.change(widthInput, { target: { value: width } });
  fireEvent.change(heightInput, { target: { value: height } });
  const button = boxList.getByText("Add a new box!");
  fireEvent.click(button);
}

it("renders without crashing", function() {
  render(<BoxList />);
});

it("matches snapshot", function() {
  const { asFragment } = render(<BoxList />);
  expect(asFragment()).toMatchSnapshot();
});

it("add a new box", function() {
  const boxList = render(<BoxList />);

  // expect a box
  const removeButton = boxList.getByText("Removed box.");
  expect(removeButton).toBeInTheDocument();
  expect(removeButton.previousSibling).toHaveStyle(`
    width: 4em;
    height: 4em;
    background-color: blue;
  `);
});


it("can remove a box", function() {
  const boxList = render(<BoxList />);
  addBox(boxList);

  const removeButton = boxList.getByText("Removed box.");

  // remove a box
  fireEvent.click(removeButton);
  expect(removeButton).not.toBeInTheDocument();
});
