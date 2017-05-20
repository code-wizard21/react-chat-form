"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
;
class Field extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            question: undefined,
            resolve: undefined,
            error: undefined
        };
        this.submitField = this.submitField.bind(this);
    }
    componentDidMount() {
        this.props.form.mountField(this);
    }
    submitField(e) {
        e.preventDefault();
        this.state.resolve(this.refs["react-chat-form-field"].value);
    }
    submitOption(value) {
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
            if (this.state.question.field.type === "text") {
                field = React.createElement("form", { onSubmit: this.submitField },
                    React.createElement("input", { className: "react-chat-form-form-field react-chat-form-form-input", ref: "react-chat-form-field" }),
                    React.createElement("button", { className: "react-chat-form-form-submit" }, "Submit"));
            }
            else if (this.state.question.field.type === "select") {
                let i = 0, options = [];
                for (let option of this.state.question.field.options) {
                    options.push(React.createElement("option", { ref: i + option, value: option }, option));
                    i++;
                }
                field = React.createElement("form", { onSubmit: this.submitField },
                    React.createElement("select", { className: "react-chat-form-form-field react-chat-form-form-select", ref: "react-chat-form-field" }, options),
                    React.createElement("button", { className: "react-chat-form-form-submit" }, "Submit"));
            }
            else if (this.state.question.field.type === "radio") {
                field = [];
                let i = 0;
                for (let option of this.state.question.field.options) {
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
        return null;
    }
}
exports.default = Field;
//# sourceMappingURL=Field.js.map