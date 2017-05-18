import {Question} from "./types";
import ReactChatForm from "./index";
import {clone, assign} from "lodash";

export type StageCommitFunction = (response: string) => void;

export type StageRejectFunction = (error: string) => void;

export type StageLoopLoopFunction = (response: string, commit: StageCommitFunction, reject: StageRejectFunction) => void;

export type StageLoopFinalFeedbackFunction = (response: string) => string[];

export interface StageState {
    response: string;
    [x: string]: any;
};

export default class Stage {
    state: StageState = {response: undefined};
    loop: StageLoopLoopFunction;
    finalFeedback: StageLoopFinalFeedbackFunction;
    property: string;
    form: ReactChatForm;
    question: Question;
    commit(response: string) {
        this.state.response = response;
        this.form.next(response);
    }
    reject(error: string) {
        this.form.generateHistory();
        this.form.fieldComponent.ask(this.question, error).then((function(response: string){
            this.loop(response, clone(this.state), this.stageActions);
        }).bind(this));
    }
    stageActions = {commit: this.commit.bind(this), reject: this.reject.bind(this)};
    constructor(property: string, question: Question, state: any = {}, loop: StageLoopLoopFunction, finalFeedback: StageLoopFinalFeedbackFunction) {
        this.question = question;
        this.finalFeedback = finalFeedback;
        this.state = state;
        this.property = property;
        this.loop = loop;
    }
    init(form: ReactChatForm) {
        this.form = form;
        this.state.response = this.form.responses[this.property];
    }
    begin() {
        this.reject(undefined);
    }
}