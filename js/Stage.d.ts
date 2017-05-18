import { Question } from "./types";
import ReactChatForm from "./index";
export declare type StageDoneFunction = (stage: Stage) => void;
export declare type StageNextFunction = (question: Question, state: any) => void;
export interface StageActions {
    done: StageDoneFunction;
    next: StageNextFunction;
}
export declare type StageLoopLoopFunction = (response: string, state: any, actions: StageActions) => void;
export declare type StageLoopFinalFeedbackFunction = (response: string) => string[];
export interface StageState {
    response: string;
    [x: string]: any;
}
export default class Stage {
    state: StageState;
    loop: StageLoopLoopFunction;
    finalFeedback: StageLoopFinalFeedbackFunction;
    property: string;
    form: ReactChatForm;
    question: Question;
    feedback: string[];
    done(response: string): void;
    next(question: Question, feedback: string[], state?: any): void;
    stageActions: {
        done: any;
        next: any;
    };
    constructor(property: string, question: Question, state: any, loop: StageLoopLoopFunction, finalFeedback: StageLoopFinalFeedbackFunction);
    init(form: ReactChatForm): void;
    begin(): void;
}
