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
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
;
var FieldElement = (function (_super) {
    __extends(FieldElement, _super);
    function FieldElement(props) {
        var _this = _super.call(this, props) || this;
        _this.state = {
            question: undefined,
            resolve: undefined,
            error: undefined
        };
        _this.submitField = _this.submitField.bind(_this);
        _this.submitValue = _this.submitValue.bind(_this);
        return _this;
    }
    FieldElement.prototype.submitField = function (e) {
        e.preventDefault();
        this.state.resolve(this.refs["react-chat-form-field"].value);
    };
    FieldElement.prototype.componentDidMount = function () {
        this.props.form.mountField(this);
    };
    FieldElement.prototype.submitValue = function (value) {
        this.state.resolve(value);
    };
    FieldElement.prototype.ask = function (question, error) {
        var _this = this;
        return new Promise((function (resolve, reject) {
            _this.setState({ question: question, resolve: resolve, error: error });
        }).bind(this));
    };
    FieldElement.prototype.render = function () {
        var field = null, error = null;
        if (this.state.question !== undefined) {
            var questionField = this.state.question.field;
            if (questionField.type === "custom") {
                return React.createElement(questionField.element, { question: this.state.question, error: this.state.error, submit: this.submitValue });
            }
            else {
                if (questionField.type === "text") {
                    field = React.createElement("form", { onSubmit: this.submitField },
                        React.createElement("input", { className: "react-chat-form-form-field react-chat-form-form-input", ref: "react-chat-form-field" }),
                        React.createElement("button", { className: "react-chat-form-form-submit" }, "Submit"));
                }
                else if (questionField.type === "select") {
                    var i = 0, options = [];
                    for (var _i = 0, _a = questionField.options; _i < _a.length; _i++) {
                        var option = _a[_i];
                        options.push(React.createElement("option", { key: i + option, value: option }, option));
                        i++;
                    }
                    field = React.createElement("form", { onSubmit: this.submitField },
                        React.createElement("select", { className: "react-chat-form-form-field react-chat-form-form-select", ref: "react-chat-form-field" }, options),
                        React.createElement("button", { className: "react-chat-form-form-submit" }, "Submit"));
                }
                else if (questionField.type === "radio") {
                    field = [];
                    var i = 0;
                    for (var _b = 0, _c = questionField.options; _b < _c.length; _b++) {
                        var option = _c[_b];
                        field.push(React.createElement("button", { ref: i + option, onClick: this.state.resolve.bind(this, option), className: "react-chat-form-form-field react-chat-form-form-radio" }, option));
                        i++;
                    }
                }
                if (this.state.error !== undefined) {
                    error = React.createElement("div", { className: "react-chat-form-form-error" }, this.state.error);
                }
                return (React.createElement("div", { className: "react-chat-form-form" },
                    field,
                    error));
            }
        }
        return null;
    };
    return FieldElement;
}(React.Component));
exports.default = FieldElement;
//# sourceMappingURL=FieldElement.js.map