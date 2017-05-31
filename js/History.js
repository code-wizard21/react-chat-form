"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
;
class History extends React.Component {
    constructor(props) {
        super(Object.assign({ renderHTML: false }, props));
        this.state = {
            messages: []
        };
    }
    componentDidMount() {
        this.props.form.mountHistory(this);
    }
    add(message) {
        this.setState((state) => ({ messages: [...state.messages, message] }));
    }
    render() {
        let historyElements = [];
        for (let i = 0; i < this.state.messages.length; i++) {
            const message = this.state.messages[i];
            historyElements.push(React.createElement("div", { key: "message-" + i, className: "react-chat-form-message react-chat-form-" + (message.response ? "response" : "feedback") + " " + message.className }, this.props.renderHTML ? React.createElement("div", { className: "react-chat-form-message-inner", dangerouslySetInnerHTML: { __html: message.text } }) : React.createElement("div", { className: "react-chat-form-message-inner" }, message.text)));
        }
        return React.createElement("div", { className: "react-chat-form-history" }, historyElements);
    }
}
exports.default = History;
//# sourceMappingURL=History.js.map