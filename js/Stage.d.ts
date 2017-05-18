import { Question } from "./Question";
import ReactChatForm from "./index";
export declare type StageCommitFunction = (response: string) => void;
export declare type StageRejectFunction = (error: string) => void;
export declare type StageValidateFunction = (response: string, commit: StageCommitFunction, reject: StageRejectFunction) => void;
export declare type StageFeedbackFunction = (response: string) => string[];
export default class Stage {
    validate: StageValidateFunction;
    feedback: StageFeedbackFunction;
    property: string;
    form: ReactChatForm;
    question: Question;
    constructor(property: string, question: Question, validate: StageValidateFunction, feedback: StageFeedbackFunction);
    init(form: ReactChatForm): void;
    begin(): void;
    commit(response: string): void;
    reject(error: string): void;
}
