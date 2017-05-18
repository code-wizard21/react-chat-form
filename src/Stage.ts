import {Question} from "./types";
import ReactChatForm from "./index";
import {clone, assign} from "lodash";

export type StageDoneFunction = (stage: Stage) => void;
export type StageNextFunction = (question: Question, state: any) => void;

export interface StageActions {
    done: StageDoneFunction;
    next: StageNextFunction;
};

export type StageLoopLoopFunction = (response: string, state: any, actions: StageActions) => void;

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
    feedback: string[] = [];
    done(response: string) {
        this.state.response = response;
        this.form.next(response);
    }
    next(question: Question, feedback: string[], state: any = false) {
        this.state = assign(state || this.state, {response: this.state.response});
        feedback.push(question.title);
        this.feedback = feedback;
        this.form.generateHistory();
        this.form.fieldComponent.ask(question).then((function(response: string){
            this.loop(response, clone(this.state), this.stageActions);
        }).bind(this));
    }
    stageActions = {done: this.done.bind(this), next: this.next.bind(this)};
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
        this.next(this.question, [], clone(this.state));
    }
}