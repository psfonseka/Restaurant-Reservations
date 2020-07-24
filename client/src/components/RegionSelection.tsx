import * as React from 'react';
import { DiningRegion } from '../types';

export interface Props {
  availableRegions: Array<DiningRegion>,
  handleSelectChange: (event: React.ChangeEvent<HTMLSelectElement>) => void
}

const RegionSelection = (props: Props) => {
  if (props.availableRegions.length === 0) {
    return (
      <div className="regionSelection">
        <br/>
        We sadly could not find any available regions for your group to dine based on the information you gave us.
      </div>
    )
  } else {
    return (
      <div className="regionSelection">
        <br/>
        Please select an available region to dine at:
        <select data-testid="region-selection" onChange={props.handleSelectChange}>
          {props.availableRegions.map((region) => {
          return <option data-testid={region.id} key={region.id} value={region.id}>{region.region_name}</option>
          })}
        </select>
      </div>
    )
  }
};

export default RegionSelection;