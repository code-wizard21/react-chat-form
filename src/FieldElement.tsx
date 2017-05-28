import * as React from "react";
import ReactChatForm from "./index";
import {Question, TextField, OptionField} from "./Question";


export type AbstractFieldSubmitFunction = (result: string) => void;

export interface AbstractFieldProps {
    question: Question;
    error: String;
    submit: AbstractFieldSubmitFunction;
}

export interface FieldProps {
    form: ReactChatForm;
};

/**
 * Chat form input field react component
 * @class
 */
export default class FieldElement extends React.Component<FieldProps, {question: Question; resolve: Function; error: string; }> {

    constructor(props: FieldProps) {
        super(props);
        this.state = {
            question: undefined,
            resolve: undefined,
            error: undefined
        };
        this.submitField = this.submitField.bind(this); // autobind submitField
        this.submitValue = this.submitValue.bind(this); // autobind submitField
    }

    submitField(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        this.state.resolve((this.refs["react-chat-form-field"] as HTMLInputElement).value);
    }

    componentDidMount() {
        this.props.form.mountField(this);
    }

    submitValue(value: string) {
        this.state.resolve(value);
    }

    ask(question: Question, error: string) {
        return new Promise(((resolve: Function, reject: Function) => {
            this.setState({question: question, resolve: resolve, error: error});
        }).bind(this));
    }
    render() {
        let field = null, error = null;
        if (this.state.question !== undefined) {
            // necessary for typescript validation
            const questionField = this.state.question.field;
            if (questionField.type === "custom") {
                return <questionField.element question={this.state.question} error={this.state.error} submit={this.submitValue} />;
            } else {
                if (questionField.type === "text") {
                    field = <form onSubmit={this.submitField}>
                        <input className="react-chat-form-form-field react-chat-form-form-input" ref="react-chat-form-field"/>
                        <button className="react-chat-form-form-submit">Submit</button>
                    </form>;
                } else if (questionField.type === "select") {
                    let i = 0, options = [];
                    for (let option of questionField.options) {
                        options.push(<option key={i + option} value={option}>{option}</option>);
                        i++;
                    }
                    field = <form onSubmit={this.submitField}>
                        <select className="react-chat-form-form-field react-chat-form-form-select" ref="react-chat-form-field">{options}</select>
                        <button className="react-chat-form-form-submit">Submit</button>
                    </form>;
                } else if (questionField.type === "radio") {
                    field = [];
                    let i = 0;
                    for (let option of questionField.options) {
                        field.push(<button ref={i + option} onClick={this.state.resolve.bind(this, option)} className="react-chat-form-form-field react-chat-form-form-radio">{option}</button>);
                        i++;
                    }
                }
                if (this.state.error !== undefined) {
                    error = <div className="react-chat-form-form-error">{this.state.error}</div>;
                }
                return (<div className="react-chat-form-form">{field}{error}</div>);
            }
        }
        return null;
    }
}