import {Question} from "./types";
import ReactChatForm from "./index";
import {clone, assign} from "lodash";

export type StageCommitFunction = (response: string) => void;

export type StageRejectFunction = (error: string) => void;

export type StageValidateFunction = (response: string, commit: StageCommitFunction, reject: StageRejectFunction) => void;

export type StageLoopFeedbackFunction = (response: string) => string[];

export interface StageState {
    response: string;
    [x: string]: any;
};

export default class Stage {
    state: StageState = {response: undefined};
    validate: StageValidateFunction;
    feedback: StageLoopFeedbackFunction;
    property: string;
    form: ReactChatForm;
    question: Question;

    constructor(property: string, question: Question, validate: StageValidateFunction, feedback: StageLoopFeedbackFunction) {
        this.question = question;
        this.feedback = feedback;
        this.property = property;
        this.validate = validate;
        this.commit = this.commit.bind(this);
        this.reject = this.reject.bind(this);
    }

    init(form: ReactChatForm) {
        this.form = form;
        this.state.response = this.form.responses[this.property];
    }

    begin() {
        this.reject(undefined);
    }

    commit(response: string) {
        this.state.response = response;
        this.form.next(response);
    }

    reject(error: string) {
        this.form.generateHistory();
        this.form.fieldComponent.ask(this.question, error).then(((response: string) => {
            this.validate(response, this.commit, this.reject);
        }).bind(this));
    }
}