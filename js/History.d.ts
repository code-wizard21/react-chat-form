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
    renderHTML?: boolean;
    delay?: number | ((message: string) => number);
    delayIndicator?: new () => React.Component<any, any>;
    delayComplete?: () => void;
}
export default class History extends React.Component<HistoryProps, {
    messages: ReactChatFormMessage[];
    typing: boolean;
}> {
    stage: ReactChatFormMessage;
    queue: ReactChatFormMessage[];
    constructor(props: HistoryProps);
    componentDidMount(): void;
    flush(): void;
    add(message: ReactChatFormMessage): void;
    render(): JSX.Element;
}
