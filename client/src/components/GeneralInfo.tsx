import * as React from 'react';

interface Props {

}

const GeneralInfo: React.FunctionComponent<Props> = (props) => {
  return (
    <div className="generalInfo">
      <h1>
          Welcome to kRestaurant
      </h1>
      <div className="paragraph">
      The restaurant takes reservations on every half-hour slot between 6 p.m. and 10 p.m., and it can accommodate parties of 12 or fewer people. There are 4 dining regions within the restaurant, each having unique constraints. (All regions are non-smoking unless otherwise noted.)
      </div>
      <br/>
      <ul className="diningRegionList">
        <li className="diningRegion">
          Main Hall: Available for parties of 12 or fewer.
        </li>
        <li className="diningRegion">
          Bar: Available for parties of 4 or fewer, excluding those with children.        
        </li>
        <li className="diningRegion">
          Riverside: Available for parties of 8 or fewer.
        </li>
        <li className="diningRegion">
          Riverside (smoking allowed): Available for parties of 6 or fewer, excluding those with children.
        </li>
      </ul>
    </div>
  );
}

export default GeneralInfo;
