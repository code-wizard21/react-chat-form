import {Question} from "./Question";
import ReactChatForm from "./index";
import {clone, assign} from "lodash";

export type StageCommitFunction = (response: string) => void;

export type StageRejectFunction = (error: string) => void;

export type StageValidateFunction = (response: string) => boolean | string;

export type StageFeedbackFunction = (response: string) => string[];

export interface StageOptions {
    shouldHide?: (state: any) => boolean;
    reference?: string;
}

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
    options: StageOptions = {
        shouldHide: () => false,
        reference: undefined
    };

    constructor(property: string, question: Question, validate: StageValidateFunction, feedback: StageFeedbackFunction, options: StageOptions = {}) {
        this.question = question;
        this.feedback = feedback;
        this.property = property;
        this.validate = validate;
        this.commit = this.commit.bind(this);
        this.reject = this.reject.bind(this);
        this.options = {...this.options, ...{reference: property}, ...options};
    }

    init(form: ReactChatForm) {
        this.form = form;
    }

    begin() {
        this.reject(undefined);
    }

    commit(response: string) {
        this.form.submitResponse(response);
    }

    reject(error: string) {
        this.form.fieldComponent.ask(this.question, error).then(((response: string) => {
            const validationResponse = this.validate(response);
            if (validationResponse === false) this.commit(response);
            else this.reject(validationResponse as string);
        }).bind(this));
    }
}