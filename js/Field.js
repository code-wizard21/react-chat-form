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
    ask(question, error) {
        return new Promise(((resolve, reject) => {
            this.setState({ question: question, resolve: resolve, error: error });
        }).bind(this));
    }
    render() {
        let field = null, error = null;
        if (this.state.question !== undefined) {
            if (this.state.question.field.type === "text") {
                field = React.createElement("input", { className: "react-chat-form-field", ref: "react-chat-form-field" });
            }
            if (this.state.error !== undefined) {
                error = React.createElement("div", { className: "react-chat-form-field-error" }, this.state.error);
            }
            return (React.createElement("form", { onSubmit: this.submitField },
                field,
                error));
        }
        return null;
    }
}
exports.default = Field;
//# sourceMappingURL=Field.js.map