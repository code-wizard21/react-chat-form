/// <reference types="react" />
import * as React from "react";
import ReactChatForm from "./index";
import { Question } from "./Question";
export declare type AbstractFieldSubmitFunction = (result: string) => void;
export interface AbstractFieldProps {
    question: Question;
    error: String;
    submit: AbstractFieldSubmitFunction;
}
export interface FieldProps {
    form: ReactChatForm;
}
export default class FieldElement extends React.Component<FieldProps, {
    question: Question;
    resolve: Function;
    error: string;
}> {
    constructor(props: FieldProps);
    submitField(e: React.FormEvent<HTMLFormElement>): void;
    componentDidMount(): void;
    submitValue(value: string): void;
    ask(question: Question, error: string): Promise<{}>;
    render(): JSX.Element;
}
