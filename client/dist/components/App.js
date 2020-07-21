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
import GeneralInfo from './GeneralInfo';
import GuestInfo from './GuestInfo';
import SimpleReactValidator from 'simple-react-validator';
var App = /** @class */ (function (_super) {
    __extends(App, _super);
    function App(props) {
        var _this = _super.call(this, props) || this;
        _this.state = {};
        _this.handleSubmit = _this.handleSubmit.bind(_this);
        return _this;
    }
    App.prototype.handleSubmit = function (search) {
        console.log(search);
    };
    App.prototype.render = function () {
        return (React.createElement("div", { className: "app" },
            React.createElement(GeneralInfo, null),
            React.createElement(GuestInfo, { validator: new SimpleReactValidator, handleSubmit: this.handleSubmit })));
    };
    return App;
}(React.Component));
export default App;
//# sourceMappingURL=App.js.map