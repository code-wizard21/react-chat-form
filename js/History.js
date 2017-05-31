"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
;
var History = (function (_super) {
    __extends(History, _super);
    function History(props) {
        var _this = _super.call(this, __assign({ renderHTML: false }, props)) || this;
        _this.state = {
            messages: []
        };
        return _this;
    }
    History.prototype.componentDidMount = function () {
        this.props.form.mountHistory(this);
    };
    History.prototype.add = function (message) {
        this.setState(function (state) { return ({ messages: state.messages.concat([message]) }); });
    };
    History.prototype.render = function () {
        var historyElements = [];
        for (var i = 0; i < this.state.messages.length; i++) {
            var message = this.state.messages[i];
            historyElements.push(React.createElement("div", { key: "message-" + i, className: "react-chat-form-message react-chat-form-" + (message.response ? "response" : "feedback") + " " + message.className }, this.props.renderHTML ? React.createElement("div", { className: "react-chat-form-message-inner", dangerouslySetInnerHTML: { __html: message.text } }) : React.createElement("div", { className: "react-chat-form-message-inner" }, message.text)));
        }
        return React.createElement("div", { className: "react-chat-form-history" }, historyElements);
    };
    return History;
}(React.Component));
exports.default = History;
//# sourceMappingURL=History.js.map