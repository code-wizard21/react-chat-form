import {Question} from "./types";
import Stage from "./Stage";
import {Store} from "redux";
import History, {ReactChatFormMessage} from "./History";
import Field from "./Field";

export type ReactChatFormUpdateFunction = (property: string, result: string) => void;


/**
 * Main ReactChatForm controller class
 * @class
 */
export default class ReactChatForm {
    stages: Stage[];
    responses: any;
    historyComponent: History = undefined;
    fieldComponent: Field = undefined;
    store: Store<any>;
    update: ReactChatFormUpdateFunction;
    currentStage: number = -1;
    next(response: string) {
        this.currentStage++;
        if (this.currentStage - 1 !== -1) {
            this.update(this.stages[this.currentStage - 1].property, response);
        }
        if (this.currentStage < this.stages.length) this.stages[this.currentStage].begin();
        else this.fieldComponent.setState({question: undefined});
    }
    generateHistory() {
        if (this.historyComponent === undefined) return;
        let i = 0;
        let messages: ReactChatFormMessage[] = [];
        while (i <= this.currentStage && i < this.stages.length) {
            let j = 0;
            let feedback: string[] = [], response = undefined;
            if (i === this.currentStage) {
                feedback = this.stages[i].feedback;
            } else {
                response = this.responses[this.stages[i].property];
                feedback = [this.stages[i].question.title, ...this.stages[i].finalFeedback(response)];
            }
            messages.push({response: false, text: feedback[0], stage: i, index: j});
            if (response !== undefined) messages.push({response: true, text: response, stage: i, index: j});
            for (let i = 1; i < feedback.length; i++) {
                messages.push({response: false, text: feedback[i], stage: i, index: j});
                j++;
            }
            i++;
        }
        this.historyComponent.setState({messages: messages});
    }
    storeListener() {
        this.responses = this.store.getState();
        this.generateHistory();
    }
    mountHistory(historyComponent: History) {
        if (this.historyComponent === undefined) {
            this.historyComponent = historyComponent;
            this.generateHistory();
        } else {
            console.error("react-chat-form can only mount one history component");
        }
    }
    mountField(fieldComponent: Field) {
        if (this.fieldComponent === undefined) {
            this.fieldComponent = fieldComponent;
            this.next(undefined);
        } else {
            console.error("react-chat-form can only mount one field component");
        }
    }
    constructor(store: Store<any>, update: ReactChatFormUpdateFunction, stages: Stage[]) {
        this.stages = stages;
        this.update = update;
        this.store = store;
        this.storeListener();
        store.subscribe(this.storeListener.bind(this));
        for (let stage of stages) {
            stage.init(this);
        }
    }
}

export * from "./types";
export {default as Stage} from "./Stage";
export {default as History} from "./History";
export {default as Field} from "./Field";