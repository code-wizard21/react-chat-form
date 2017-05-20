"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class ReactChatForm {
    constructor(store, update, stages) {
        this.historyComponent = undefined;
        this.fieldComponent = undefined;
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
    next(response) {
        this.currentStage++;
        if (this.currentStage - 1 !== -1) {
            this.update(this.stages[this.currentStage - 1].property, response);
        }
        if (this.currentStage < this.stages.length) {
            this.stages[this.currentStage].begin();
        }
        else {
            this.fieldComponent.setState({ question: undefined });
        }
    }
    generateHistory() {
        if (this.historyComponent === undefined)
            return;
        let i = 0;
        let messages = [];
        while (i <= this.currentStage && i < this.stages.length) {
            let feedback = [];
            const stage = this.stages[i];
            let className = "react-chat-form-form-feedback-begin";
            if (i > 0 && this.stages[i - 1].feedback.length > 0)
                className = "";
            if (stage.question.preface !== undefined) {
                for (let j = 0; j < stage.question.preface.length; j++) {
                    messages.push({ response: false, text: stage.question.preface[j], className: className, stage: i, index: -j });
                    if (j === 0)
                        className = "";
                }
            }
            messages.push({ response: false, text: stage.question.title, className: className + "react-chat-form-form-feedback-end", stage: i, index: 0 });
            if (i !== this.currentStage) {
                const response = this.responses[stage.property];
                messages.push({ response: true, text: response, className: "", stage: i, index: 1 });
                feedback = stage.feedback(response);
            }
            for (let j = 0; j < feedback.length; j++) {
                let className = "";
                if (j === 0)
                    className = "react-chat-form-form-feedback-begin";
                if (j === feedback.length - 1 && i === this.stages.length - 1)
                    className += " react-chat-form-form-feedback-end";
                messages.push({ response: false, text: feedback[j], className: className, stage: i, index: j + 2 });
            }
            i++;
        }
        this.historyComponent.setState({ messages: messages });
    }
    storeListener(generateHistory = true) {
        this.responses = this.store.getState();
        if (generateHistory === true) {
            this.generateHistory();
        }
    }
    mountHistory(historyComponent) {
        if (this.historyComponent === undefined) {
            this.historyComponent = historyComponent;
            this.generateHistory();
        }
        else {
            console.error("react-chat-form can only mount one history component");
        }
    }
    mountField(fieldComponent) {
        if (this.fieldComponent === undefined) {
            this.fieldComponent = fieldComponent;
            this.next(undefined);
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
var Field_1 = require("./Field");
exports.Field = Field_1.default;
//# sourceMappingURL=index.js.map