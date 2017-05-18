import * as React from "react";
import ReactChatForm from "./index";

export interface ReactChatFormMessage {
    response: boolean;
    stage: number;
    index: number;
    text: string;
}

export interface HistoryProps {form: ReactChatForm; };

export default class History extends React.Component<HistoryProps, {messages: ReactChatFormMessage[]; }> {
    constructor(props: HistoryProps) {
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
            historyElements.push(<div key={message.stage + " - " +  message.index + "-" + message.text} className={"react-chat-form-message react-chat-form-" + (message.response ? "response" : "feedback" ) }>{message.text}</div>);
        }
        return <div>{historyElements}</div>;
    }
}