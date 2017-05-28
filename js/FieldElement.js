"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
;
class FieldElement extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            question: undefined,
            resolve: undefined,
            error: undefined
        };
        this.submitField = this.submitField.bind(this);
        this.submitValue = this.submitValue.bind(this);
    }
    submitField(e) {
        e.preventDefault();
        this.state.resolve(this.refs["react-chat-form-field"].value);
    }
    componentDidMount() {
        this.props.form.mountField(this);
    }
    submitValue(value) {
        this.state.resolve(value);
    }
    ask(question, error) {
        return new Promise(((resolve, reject) => {
            this.setState({ question: question, resolve: resolve, error: error });
        }).bind(this));
    }
    render() {
        let field = null, error = null;
        if (this.state.question !== undefined) {
            const questionField = this.state.question.field;
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
                    let i = 0, options = [];
                    for (let option of questionField.options) {
                        options.push(React.createElement("option", { key: i + option, value: option }, option));
                        i++;
                    }
                    field = React.createElement("form", { onSubmit: this.submitField },
                        React.createElement("select", { className: "react-chat-form-form-field react-chat-form-form-select", ref: "react-chat-form-field" }, options),
                        React.createElement("button", { className: "react-chat-form-form-submit" }, "Submit"));
                }
                else if (questionField.type === "radio") {
                    field = [];
                    let i = 0;
                    for (let option of questionField.options) {
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
    }
}
exports.default = FieldElement;
//# sourceMappingURL=FieldElement.js.map