/// <reference types="react" />
import * as React from "react";
import ReactChatForm from "./index";
import { Question } from "./types";
export interface FieldProps {
    form: ReactChatForm;
}
export default class Field extends React.Component<FieldProps, {
    question: Question;
    resolve: Function;
    error: string;
}> {
    constructor(props: FieldProps);
    componentDidMount(): void;
    submitField(e: React.FormEvent<HTMLFormElement>): void;
    ask(question: Question, error: string): Promise<{}>;
    render(): JSX.Element;
}
