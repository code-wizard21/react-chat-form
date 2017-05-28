/// <reference types="react" />
import * as React from "react";
import ReactChatForm from "./index";
export interface ReactChatFormMessage {
    response: boolean;
    text: string;
    className: string;
}
export interface HistoryProps {
    form: ReactChatForm;
}
export default class History extends React.Component<HistoryProps, {
    messages: ReactChatFormMessage[];
}> {
    constructor(props: HistoryProps);
    componentDidMount(): void;
    add(message: ReactChatFormMessage): void;
    render(): JSX.Element;
}
