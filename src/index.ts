import {Question} from "./Question";
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
        if (this.currentStage < this.stages.length) {
            this.stages[this.currentStage].begin();
        } else {
            this.fieldComponent.setState({question: undefined});
        }
    }
    generateHistory() {
        if (this.historyComponent === undefined) return;
        let i = 0;
        let messages: ReactChatFormMessage[] = [];
        while (i <= this.currentStage && i < this.stages.length) {
            let j = 0;
            let feedback: string[] = [];
            messages.push({response: false, text: this.stages[i].question.title, stage: i, index: j});
            if (i !== this.currentStage) {
                const response = this.responses[this.stages[i].property];
                messages.push({response: true, text: response, stage: i, index: j});
                feedback = this.stages[i].feedback(response);
            }
            for (let j = 0; j < feedback.length; j++) {
                messages.push({response: false, text: feedback[j], stage: i, index: j + 2});
                j++;
            }
            i++;
        }
        this.historyComponent.setState({messages: messages});
    }
    storeListener(generateHistory = true) {
        this.responses = this.store.getState();
        if (generateHistory === true) {
            this.generateHistory();
        }
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
        this.storeListener(false);
        store.subscribe(this.storeListener.bind(this));
        for (let stage of stages) {
            stage.init(this);
        }
    }
}

export * from "./Question";
export {default as Stage} from "./Stage";
export {default as History} from "./History";
export {default as Field} from "./Field";