var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
import * as React from 'react';
var GuestInfo = /** @class */ (function (_super) {
    __extends(GuestInfo, _super);
    function GuestInfo(props) {
        var _this = _super.call(this, props) || this;
        _this.state = {
            searchEntry: {
                fullName: "",
                email: "",
                phoneNumber: "",
                partySize: 0,
                hasBirthday: false,
                hasSmoker: false,
                birthdayName: ""
            }
        };
        _this.handleInputChange = _this.handleInputChange.bind(_this);
        return _this;
    }
    GuestInfo.prototype.handleInputChange = function (event) {
        var _a;
        var target = event.target;
        var value = target.type === 'checkbox' ? target.checked : target.value;
        var name = target.name;
        var newEntry = Object.assign({}, this.state.searchEntry, (_a = {}, _a[name] = value, _a));
        this.setState({
            searchEntry: newEntry
        });
    };
    GuestInfo.prototype.render = function () {
        var _this = this;
        return (React.createElement("div", { className: "guestInfo" },
            "Please Fill in the following information to find available reservations slots:",
            React.createElement("form", { onSubmit: function (e) {
                    e.preventDefault();
                    _this.props.handleSubmit(_this.state.searchEntry);
                } },
                React.createElement("label", null,
                    "Full Name:",
                    React.createElement("input", { name: "fullName", type: "string", value: this.state.searchEntry.fullName, onChange: this.handleInputChange })),
                React.createElement("br", null),
                React.createElement("label", null,
                    "E-mail:",
                    React.createElement("input", { name: "email", type: "string", value: this.state.searchEntry.email, onChange: this.handleInputChange })),
                React.createElement("br", null),
                React.createElement("label", null,
                    "Number of guests:",
                    React.createElement("input", { name: "partySize", type: "number", value: this.state.searchEntry.partySize, onChange: this.handleInputChange })),
                React.createElement("br", null),
                React.createElement("label", null,
                    "Will any guest be smoking?:",
                    React.createElement("input", { name: "hasSmoker", type: "checkbox", checked: this.state.searchEntry.hasSmoker, onChange: this.handleInputChange })),
                React.createElement("br", null),
                React.createElement("label", null,
                    "Is it a birthday celebration?:",
                    React.createElement("input", { name: "hasBirthday", type: "checkbox", checked: this.state.searchEntry.hasBirthday, onChange: this.handleInputChange })),
                React.createElement("br", null),
                (this.state.searchEntry.hasBirthday &&
                    React.createElement("label", null,
                        "Name of birthday guest:",
                        React.createElement("input", { name: "birthdayName", type: "string", value: this.state.searchEntry.birthdayName, onChange: this.handleInputChange }))),
                React.createElement("br", null),
                React.createElement("input", { type: "submit", value: "SEARCH" }))));
    };
    return GuestInfo;
}(React.Component));
export default GuestInfo;
//# sourceMappingURL=GuestInfo.js.map