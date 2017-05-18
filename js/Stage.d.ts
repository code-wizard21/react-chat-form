import { Question } from "./types";
import ReactChatForm from "./index";
export declare type StageCommitFunction = (response: string) => void;
export declare type StageRejectFunction = (error: string) => void;
export declare type StageValidateFunction = (response: string, commit: StageCommitFunction, reject: StageRejectFunction) => void;
export declare type StageLoopFeedbackFunction = (response: string) => string[];
export interface StageState {
    response: string;
    [x: string]: any;
}
export default class Stage {
    state: StageState;
    validate: StageValidateFunction;
    feedback: StageLoopFeedbackFunction;
    property: string;
    form: ReactChatForm;
    question: Question;
    constructor(property: string, question: Question, validate: StageValidateFunction, feedback: StageLoopFeedbackFunction);
    init(form: ReactChatForm): void;
    begin(): void;
    commit(response: string): void;
    reject(error: string): void;
}
