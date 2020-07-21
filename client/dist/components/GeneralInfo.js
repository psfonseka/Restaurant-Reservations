import * as React from 'react';
var GeneralInfo = function (props) {
    return (React.createElement("div", { className: "generalInfo" },
        React.createElement("h1", null, "Welcome to kRestaurant"),
        React.createElement("div", { className: "paragraph" }, "The restaurant takes reservations on every half-hour slot between 6 p.m. and 10 p.m., and it can accommodate parties of 12 or fewer people. There are 4 dining regions within the restaurant, each having unique constraints. (All regions are non-smoking unless otherwise noted.)"),
        React.createElement("br", null),
        React.createElement("ul", { className: "diningRegionList" },
            React.createElement("li", { className: "diningRegion" }, "Main Hall: Available for parties of 12 or fewer."),
            React.createElement("li", { className: "diningRegion" }, "Bar: Available for parties of 4 or fewer, excluding those with children."),
            React.createElement("li", { className: "diningRegion" }, "Riverside: Available for parties of 8 or fewer."),
            React.createElement("li", { className: "diningRegion" }, "Riverside (smoking allowed): Available for parties of 6 or fewer, excluding those with children."))));
};
export default GeneralInfo;
//# sourceMappingURL=GeneralInfo.js.map