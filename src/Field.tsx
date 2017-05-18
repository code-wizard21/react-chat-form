import * as React from "react";
import ReactChatForm from "./index";
import {Question} from "./types";

export interface FieldProps {form: ReactChatForm; };

export default class Field extends React.Component<FieldProps, {question: Question; resolve: Function; error: string; }> {
    constructor(props: FieldProps) {
        super(props);
        this.state = {
            question: undefined,
            resolve: undefined,
            error: undefined
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
    ask(question: Question, error: string) {
        return new Promise(((resolve: Function, reject: Function) => {
            this.setState({question: question, resolve: resolve, error: error});
        }).bind(this));
    }
    render() {
        let field = null, error = null;
        if (this.state.question !== undefined) {
            if (this.state.question.field.type === "text") {
                field = <input className="react-chat-form-field" ref="react-chat-form-field"/>;
            }
            if (this.state.error !== undefined) {
                error = <div className="react-chat-form-field-error">{this.state.error}</div>;
            }
            return (<form onSubmit={this.submitField}>{field}{error}</form>);
        }
        return null;
    }
}