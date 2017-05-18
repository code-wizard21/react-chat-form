import {Question} from "./Question";
import ReactChatForm from "./index";
import {clone, assign} from "lodash";

export type StageCommitFunction = (response: string) => void;

export type StageRejectFunction = (error: string) => void;

export type StageValidateFunction = (response: string, commit: StageCommitFunction, reject: StageRejectFunction) => void;

export type StageFeedbackFunction = (response: string) => string[];

/**
 * A single "stage" (question) of a chat interaction
 * @class
 */
export default class Stage {
    validate: StageValidateFunction;
    feedback: StageFeedbackFunction;
    property: string;
    form: ReactChatForm;
    question: Question;

    constructor(property: string, question: Question, validate: StageValidateFunction, feedback: StageFeedbackFunction) {
        this.question = question;
        this.feedback = feedback;
        this.property = property;
        this.validate = validate;
        this.commit = this.commit.bind(this);
        this.reject = this.reject.bind(this);
    }

    init(form: ReactChatForm) {
        this.form = form;
    }

    begin() {
        this.reject(undefined);
    }

    commit(response: string) {
        this.form.next(response);
    }

    reject(error: string) {
        this.form.generateHistory();
        this.form.fieldComponent.ask(this.question, error).then(((response: string) => {
            this.validate(response, this.commit, this.reject);
        }).bind(this));
    }
}