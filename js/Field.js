"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
;
class Field extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            question: undefined,
            resolve: undefined
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
    ask(question) {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise(((resolve, reject) => {
                this.setState({ question: question, resolve: resolve });
            }).bind(this));
        });
    }
    render() {
        let field = null;
        if (this.state.question !== undefined) {
            if (this.state.question.field.type === "text") {
                field = React.createElement("input", { className: "react-chat-form-field", ref: "react-chat-form-field" });
            }
        }
        return (React.createElement("form", { onSubmit: this.submitField }, field));
    }
}
exports.default = Field;
//# sourceMappingURL=Field.js.map