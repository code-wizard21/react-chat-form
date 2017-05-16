import {Question} from "./types";

/**
 * Main ReactChatForm controller class
 * @class
 */
export default class ReactChatForm {
    questions: Question[];
    constructor(questions: Question[]) {
        this.questions = questions;
    }
}

export * from "./types";
