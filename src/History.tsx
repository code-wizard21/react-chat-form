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

export interface HistoryProps {form: ReactChatForm; renderHTML?: boolean; delay?: number; delayIndicator?: new() => React.Component<any, any>; };

/**
 * Chat history react component
 * @class
 */
export default class History extends React.Component<HistoryProps, {messages: ReactChatFormMessage[]; typing: boolean; }> {

    stage: ReactChatFormMessage = null;
    queue: ReactChatFormMessage[] = [];

    constructor(props: HistoryProps) {
        super(props);
        this.state = {
            messages: [],
            typing: false
        };
        this.add = this.add.bind(this);
        this.flush = this.flush.bind(this);
    }
    componentDidMount() {
        this.props.form.mountHistory(this);
    }
    flush() {
        if (this.stage === null && this.queue.length > 0) {
            // stage the question
            this.stage = this.queue[0];
            this.queue = this.queue.slice(1);

            // set a timeout
            setTimeout(() => {
                const tmp: ReactChatFormMessage = this.stage;
                this.stage = null;
                this.setState((state) => ({...state, messages: [...state.messages, tmp], typing: this.queue.length > 0}), this.flush);
            }, this.props.delay || 0);

        }
    }
    add(message: ReactChatFormMessage) {
        if (message.response === true) {
            this.setState((state) => ({messages: [...state.messages, message]}));
        } else {
            this.queue.push(message);
            this.setState((state) => ({...state, typing: true}), this.flush);
        }
    }
    render() {
        let historyElements = [];
        for (let i = 0; i < this.state.messages.length; i++) {
            const message = this.state.messages[i];
            historyElements.push(<div key={"message-" + i} className={"react-chat-form-message react-chat-form-" + (message.response ? "response" : "feedback" ) + " " + message.className }>
                {this.props.renderHTML ? <div className="react-chat-form-message-inner" dangerouslySetInnerHTML={{__html: message.text}}/> : <div className="react-chat-form-message-inner">{message.text}</div>}
            </div>);
        }
        if (this.props.delayIndicator && this.state.typing === true) {
            historyElements.push(<this.props.delayIndicator key="delay-indicator"/>);
        }
        return <div className="react-chat-form-history">{historyElements}</div>;
    }
}