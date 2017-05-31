import * as React from "react";
import ReactChatForm from "./index";

/**
 * Chat "message" interface
 * @interface
 */
export interface ReactChatFormMessage {
    response: boolean;
    text: string;
    className: string;
}

export interface HistoryProps {form: ReactChatForm; renderHTML?: boolean; };

/**
 * Chat history react component
 * @class
 */
export default class History extends React.Component<HistoryProps, {messages: ReactChatFormMessage[]; }> {
    constructor(props: HistoryProps) {
        super({renderHTML: false, ...props});
        this.state = {
            messages: []
        };
    }
    componentDidMount() {
        this.props.form.mountHistory(this);
    }
    add(message: ReactChatFormMessage) {
        // Have to use functional version, otherwise you get race conditions (proof by experimentation)
        this.setState((state) => ({messages: [...state.messages, message]}));
    }
    render() {
        let historyElements = [];
        for (let i = 0; i < this.state.messages.length; i++) {
            const message = this.state.messages[i];
            historyElements.push(<div key={"message-" + i} className={"react-chat-form-message react-chat-form-" + (message.response ? "response" : "feedback" ) + " " + message.className }>
                {this.props.renderHTML ? <div className="react-chat-form-message-inner" dangerouslySetInnerHTML={{__html: message.text}}/> : <div className="react-chat-form-message-inner">{message.text}</div>}
            </div>);
        }
        return <div className="react-chat-form-history">{historyElements}</div>;
    }
}