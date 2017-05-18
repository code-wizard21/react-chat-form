import * as React from "react";
import ReactChatForm from "./index";
import {Question} from "./types";

export interface FieldProps {form: ReactChatForm; };

export default class Field extends React.Component<FieldProps, {question: Question; resolve: Function; }> {
    constructor(props: FieldProps) {
        super(props);
        this.state = {
            question: undefined,
            resolve: undefined
        };
        this.submitField = this.submitField.bind(this); // autobind submitField
    }
    componentDidMount() {
        this.props.form.mountField(this);
    }
    submitField(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        this.state.resolve((this.refs["react-chat-form-field"] as HTMLInputElement).value);
    }
    async ask(question: Question) {
        return new Promise(((resolve: Function, reject: Function) => {
            this.setState({question: question, resolve: resolve});
        }).bind(this));
    }
    render() {
        let field = null;
        if (this.state.question !== undefined) {
            if (this.state.question.field.type === "text") {
                field = <input className="react-chat-form-field" ref="react-chat-form-field"/>;
            }
        }
        return (<form onSubmit={this.submitField}>{field}</form>);
    }
}