"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
;
class History extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            messages: []
        };
    }
    componentDidMount() {
        this.props.form.mountHistory(this);
    }
    render() {
        let historyElements = [];
        for (let message of this.state.messages) {
            historyElements.push(React.createElement("div", { key: message.stage + " - " + message.index + "-" + message.text, className: "react-chat-form-message react-chat-form-" + (message.response ? "response" : "feedback") },
                React.createElement("div", { className: "react-chat-form-message-inner" }, message.text)));
        }
        return React.createElement("div", { className: "react-chat-form-history" }, historyElements);
    }
}
exports.default = History;
//# sourceMappingURL=History.js.map