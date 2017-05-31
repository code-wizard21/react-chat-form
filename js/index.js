"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var object_path_1 = require("object-path");
var ReactChatForm = (function () {
    function ReactChatForm(store, update, stages) {
        this.historyComponent = undefined;
        this.fieldComponent = undefined;
        this.waitingForStore = false;
        this.currentStage = -1;
        this.stages = stages;
        this.update = update;
        this.store = store;
        this.storeListener(false);
        store.subscribe(this.storeListener.bind(this));
        for (var _i = 0, stages_1 = stages; _i < stages_1.length; _i++) {
            var stage = stages_1[_i];
            stage.init(this);
        }
    }
    ReactChatForm.prototype.next = function () {
        for (var stageCount = 0; stageCount < this.stages.length; stageCount++) {
            var state = this.store.getState(), stage = this.stages[stageCount];
            if (stage.options.shouldHide(state) === false && stage.validate(object_path_1.get(state, stage.options.reference)) !== false) {
                var oldStage = this.currentStage;
                this.currentStage = stageCount;
                var stage_1 = this.stages[this.currentStage], state_1 = this.store.getState();
                stage_1.begin();
                if (this.currentStage !== oldStage) {
                    var className = "react-chat-form-form-feedback-begin";
                    if (this.currentStage > 0 && this.stages[this.currentStage - 1].feedback(object_path_1.get(state_1, this.stages[oldStage].options.reference)).length > 0)
                        className = "";
                    if (stage_1.question.preface !== undefined) {
                        for (var j = 0; j < stage_1.question.preface.length; j++) {
                            this.historyComponent.add({ response: false, text: stage_1.question.preface[j], className: className });
                            if (j === 0)
                                className = "";
                        }
                    }
                    this.historyComponent.add({ response: false, text: stage_1.question.title, className: className + " react-chat-form-form-feedback-end" });
                }
                return;
            }
        }
        this.fieldComponent.setState({ question: undefined });
    };
    ReactChatForm.prototype.submitResponse = function (response) {
        if (this.currentStage !== -1) {
            var stage = this.stages[this.currentStage];
            this.historyComponent.add({ response: true, text: stage.options.resolveValue(response), className: "" });
            var feedback = stage.feedback(response);
            for (var j = 0; j < feedback.length; j++) {
                var className = "";
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
    };
    ReactChatForm.prototype.forceUpdate = function () {
        this.next();
    };
    ReactChatForm.prototype.storeListener = function (generateHistory) {
        if (generateHistory === void 0) { generateHistory = true; }
        if (this.fieldComponent !== undefined && this.historyComponent !== undefined && this.waitingForStore === true) {
            this.waitingForStore = false;
            this.next();
        }
    };
    ReactChatForm.prototype.mountHistory = function (historyComponent) {
        if (this.historyComponent === undefined) {
            this.historyComponent = historyComponent;
        }
        else {
            console.error("react-chat-form can only mount one history component");
        }
    };
    ReactChatForm.prototype.mountField = function (fieldComponent) {
        if (this.fieldComponent === undefined) {
            this.fieldComponent = fieldComponent;
            this.submitResponse(undefined);
        }
        else {
            console.error("react-chat-form can only mount one field component");
        }
    };
    return ReactChatForm;
}());
exports.default = ReactChatForm;
var Stage_1 = require("./Stage");
exports.Stage = Stage_1.default;
var History_1 = require("./History");
exports.History = History_1.default;
var FieldElement_1 = require("./FieldElement");
exports.FieldElement = FieldElement_1.default;
//# sourceMappingURL=index.js.map