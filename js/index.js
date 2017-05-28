"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const object_path_1 = require("object-path");
class ReactChatForm {
    constructor(store, update, stages) {
        this.historyComponent = undefined;
        this.fieldComponent = undefined;
        this.waitingForStore = false;
        this.currentStage = -1;
        this.stages = stages;
        this.update = update;
        this.store = store;
        this.storeListener(false);
        store.subscribe(this.storeListener.bind(this));
        for (let stage of stages) {
            stage.init(this);
        }
    }
    next() {
        for (let stageCount = 0; stageCount < this.stages.length; stageCount++) {
            const state = this.store.getState(), stage = this.stages[stageCount];
            if (stage.options.shouldHide(state) === false && stage.validate(object_path_1.get(state, stage.options.reference)) !== false) {
                const oldStage = this.currentStage;
                this.currentStage = stageCount;
                const stage = this.stages[this.currentStage], state = this.store.getState();
                stage.begin();
                if (this.currentStage !== oldStage) {
                    let className = "react-chat-form-form-feedback-begin";
                    if (this.currentStage > 0 && this.stages[this.currentStage - 1].feedback(object_path_1.get(state, stage.options.reference)).length > 0)
                        className = "";
                    if (stage.question.preface !== undefined) {
                        for (let j = 0; j < stage.question.preface.length; j++) {
                            this.historyComponent.add({ response: false, text: stage.question.preface[j], className: className });
                            if (j === 0)
                                className = "";
                        }
                    }
                    this.historyComponent.add({ response: false, text: stage.question.title, className: className + " react-chat-form-form-feedback-end" });
                }
                return;
            }
        }
        this.fieldComponent.setState({ question: undefined });
    }
    submitResponse(response) {
        if (this.currentStage !== -1) {
            const stage = this.stages[this.currentStage];
            this.historyComponent.add({ response: true, text: stage.options.resolveValue(response), className: "" });
            const feedback = stage.feedback(response);
            for (let j = 0; j < feedback.length; j++) {
                let className = "";
                if (j === 0)
                    className = "react-chat-form-form-feedback-begin";
                if (j === feedback.length - 1 && this.currentStage === this.stages.length - 1)
                    className += " react-chat-form-form-feedback-end";
                this.historyComponent.add({ response: false, text: feedback[j], className: className });
            }
            this.waitingForStore = true;
            this.update(stage.property, response);
        }
        else {
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
    mountHistory(historyComponent) {
        if (this.historyComponent === undefined) {
            this.historyComponent = historyComponent;
        }
        else {
            console.error("react-chat-form can only mount one history component");
        }
    }
    mountField(fieldComponent) {
        if (this.fieldComponent === undefined) {
            this.fieldComponent = fieldComponent;
            this.submitResponse(undefined);
        }
        else {
            console.error("react-chat-form can only mount one field component");
        }
    }
}
exports.default = ReactChatForm;
var Stage_1 = require("./Stage");
exports.Stage = Stage_1.default;
var History_1 = require("./History");
exports.History = History_1.default;
var FieldElement_1 = require("./FieldElement");
exports.FieldElement = FieldElement_1.default;
//# sourceMappingURL=index.js.map