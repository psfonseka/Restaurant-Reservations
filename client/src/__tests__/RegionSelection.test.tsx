import * as React from 'react';
import { render, fireEvent, waitForElement } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";

import RegionSelection, { Props } from "../components/RegionSelection";

const defaultProps = {
  availableRegions: [{id:1, region_name:"Main Hall"}, {id:3, region_name:"Riverside"}],
  handleSelectChange: (event: React.ChangeEvent<HTMLSelectElement>) => {
    console.log(event.target);
    return;
  }
};

function renderRegionSelection(props: Partial<Props> = {}) {
  return render(<RegionSelection {...defaultProps} {...props}/>);
}


describe("<RegionSelection />", () => {
  test("region selection should properly dynamically render options", async () => {
    const { findByTestId } = renderRegionSelection();
    const optionOne = await findByTestId("1");
    const optionThree = await findByTestId("3");
    expect(optionOne !== undefined && optionThree !== undefined).toBe(true);
  });
});