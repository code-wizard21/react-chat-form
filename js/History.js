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
        var _this = _super.call(this, props) || this;
        _this.stage = null;
        _this.queue = [];
        _this.state = {
            messages: [],
            typing: false
        };
        _this.add = _this.add.bind(_this);
        _this.flush = _this.flush.bind(_this);
        return _this;
    }
    History.prototype.componentDidMount = function () {
        this.props.form.mountHistory(this);
    };
    History.prototype.flush = function () {
        var _this = this;
        if (this.stage === null && this.queue.length > 0) {
            this.stage = this.queue[0];
            this.queue = this.queue.slice(1);
            setTimeout(function () {
                var tmp = _this.stage;
                _this.stage = null;
                _this.setState(function (state) { return (__assign({}, state, { messages: state.messages.concat([tmp]), typing: _this.queue.length > 0 })); }, _this.flush);
            }, this.props.delay || 0);
        }
    };
    History.prototype.add = function (message) {
        if (message.response === true) {
            this.setState(function (state) { return ({ messages: state.messages.concat([message]) }); });
        }
        else {
            this.queue = [message].concat(this.queue);
            this.setState(function (state) { return (__assign({}, state, { typing: true })); }, this.flush);
        }
    };
    History.prototype.render = function () {
        var historyElements = [];
        for (var i = 0; i < this.state.messages.length; i++) {
            var message = this.state.messages[i];
            historyElements.push(React.createElement("div", { key: "message-" + i, className: "react-chat-form-message react-chat-form-" + (message.response ? "response" : "feedback") + " " + message.className }, this.props.renderHTML ? React.createElement("div", { className: "react-chat-form-message-inner", dangerouslySetInnerHTML: { __html: message.text } }) : React.createElement("div", { className: "react-chat-form-message-inner" }, message.text)));
        }
        if (this.props.delayIndicator && this.state.typing === true) {
            historyElements.push(React.createElement(this.props.delayIndicator, { key: "delay-indicator" }));
        }
        return React.createElement("div", { className: "react-chat-form-history" }, historyElements);
    };
    return History;
}(React.Component));
exports.default = History;
//# sourceMappingURL=History.js.map