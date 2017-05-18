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
        this.storeListener();
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
        if (this.currentStage < this.stages.length)
            this.stages[this.currentStage].begin();
        else
            this.fieldComponent.setState({ question: undefined });
    }
    generateHistory() {
        if (this.historyComponent === undefined)
            return;
        let i = 0;
        let messages = [];
        while (i <= this.currentStage && i < this.stages.length) {
            let j = 0;
            let feedback = [], response = undefined;
            if (i === this.currentStage) {
                feedback = this.stages[i].feedback;
            }
            else {
                response = this.responses[this.stages[i].property];
                feedback = [this.stages[i].question.title, ...this.stages[i].finalFeedback(response)];
            }
            messages.push({ response: false, text: feedback[0], stage: i, index: j });
            if (response !== undefined)
                messages.push({ response: true, text: response, stage: i, index: j });
            for (let i = 1; i < feedback.length; i++) {
                messages.push({ response: false, text: feedback[i], stage: i, index: j });
                j++;
            }
            i++;
        }
        this.historyComponent.setState({ messages: messages });
    }
    storeListener() {
        this.responses = this.store.getState();
        this.generateHistory();
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