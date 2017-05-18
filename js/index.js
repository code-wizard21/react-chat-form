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
            let j = 0;
            let feedback = [];
            messages.push({ response: false, text: this.stages[i].question.title, stage: i, index: j });
            if (i !== this.currentStage) {
                const response = this.responses[this.stages[i].property];
                messages.push({ response: true, text: response, stage: i, index: j });
                feedback = this.stages[i].feedback(response);
            }
            for (let j = 0; j < feedback.length; j++) {
                messages.push({ response: false, text: feedback[j], stage: i, index: j + 2 });
                j++;
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