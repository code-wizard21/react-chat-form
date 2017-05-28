import { Question } from "./Question";
import ReactChatForm from "./index";
export declare type StageCommitFunction = (response: string) => void;
export declare type StageRejectFunction = (error: string) => void;
export declare type StageValidateFunction = (response: string) => boolean | string;
export declare type StageFeedbackFunction = (response: string) => string[];
export interface StageOptions {
    shouldHide?: (state: any) => boolean;
    reference?: string;
    resolveValue?: (response: any) => string;
}
export default class Stage {
    validate: StageValidateFunction;
    feedback: StageFeedbackFunction;
    property: string;
    form: ReactChatForm;
    question: Question;
    options: StageOptions;
    constructor(property: string, question: Question, validate: StageValidateFunction, feedback: StageFeedbackFunction, options?: StageOptions);
    init(form: ReactChatForm): void;
    begin(): void;
    commit(response: string): void;
    reject(error: string): void;
}
