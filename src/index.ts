import {Question} from "./Question";
import Stage from "./Stage";
import {Store} from "redux";
import History, {ReactChatFormMessage} from "./History";
import FieldElement, { AbstractFieldProps } from "./FieldElement";
import { get } from "object-path";

export type ReactChatFormUpdateFunction = (property: string, result: string) => void;

/**
 * Main ReactChatForm controller class
 * @class
 */
export default class ReactChatForm {
    stages: Stage[];
    historyComponent: History = undefined;
    fieldComponent: FieldElement = undefined;
    store: Store<any>;
    waitingForStore: boolean = false;
    update: ReactChatFormUpdateFunction;
    currentStage: number = -1;
    next() {
        for (let stageCount = 0; stageCount < this.stages.length; stageCount++) {
            const state = this.store.getState(), stage = this.stages[stageCount];
            if (stage.options.shouldHide(state) === false && stage.validate(get(state, stage.options.reference) as string) !== false) {
                const oldStage = this.currentStage;
                this.currentStage = stageCount;
                const stage = this.stages[this.currentStage], state = this.store.getState();
                stage.begin();
                if (this.currentStage !== oldStage) {
                    let className = "react-chat-form-form-feedback-begin";
                    if (this.currentStage > 0 && this.stages[this.currentStage - 1].feedback(get(state, this.stages[oldStage].options.reference) as string).length > 0) className = "";
                    if (stage.question.preface !== undefined) {
                        for (let j = 0; j < stage.question.preface.length; j++) {
                            this.historyComponent.add({response: false, text: stage.question.preface[j], className: className});
                            if (j === 0) className = "";
                        }
                    }
                    this.historyComponent.add({response: false, text: stage.question.title, className: className + " react-chat-form-form-feedback-end"});
                }
                return;
            }
        }
        // only reaches here if we've scanned through all questions, we are done!
        this.fieldComponent.setState({question: undefined});
    }
    submitResponse(response: string) {
        if (this.currentStage !== -1) {
            const stage = this.stages[this.currentStage];
            this.historyComponent.add({response: true, text: stage.options.resolveValue(response), className: ""});
            const feedback = stage.feedback(response);
            for (let j = 0; j < feedback.length; j++) {
                let className = "";
                if (j === 0) className = "react-chat-form-form-feedback-begin";
                if (j === feedback.length - 1 && this.currentStage === this.stages.length - 1) className += " react-chat-form-form-feedback-end";
                this.historyComponent.add({response: false, text: feedback[j], className: className});
            }
            this.waitingForStore = true;
            this.update(stage.property, response);
        } else {
            this.next();
        }
    }
    forceUpdate() {
        this.next();
    }
    storeListener(generateHistory = true) {
        if (this.fieldComponent !== undefined && this.historyComponent !== undefined && this.waitingForStore === true) {
            this.waitingForStore = false;
            this.next();
        }
    }
    mountHistory(historyComponent: History) {
        if (this.historyComponent === undefined) {
            this.historyComponent = historyComponent;
        } else {
            console.error("react-chat-form can only mount one history component");
        }
    }
    mountField(fieldComponent: FieldElement) {
        if (this.fieldComponent === undefined) {
            this.fieldComponent = fieldComponent;
            this.submitResponse(undefined);
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
export {default as FieldElement, AbstractFieldProps} from "./FieldElement";