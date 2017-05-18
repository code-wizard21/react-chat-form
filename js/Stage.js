"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const lodash_1 = require("lodash");
;
;
class Stage {
    constructor(property, question, state = {}, loop, finalFeedback) {
        this.state = { response: undefined };
        this.feedback = [];
        this.stageActions = { done: this.done.bind(this), next: this.next.bind(this) };
        this.question = question;
        this.finalFeedback = finalFeedback;
        this.state = state;
        this.property = property;
        this.loop = loop;
    }
    done(response) {
        this.state.response = response;
        this.form.next(response);
    }
    next(question, feedback, state = false) {
        this.state = lodash_1.assign(state || this.state, { response: this.state.response });
        feedback.push(question.title);
        this.feedback = feedback;
        this.form.generateHistory();
        this.form.fieldComponent.ask(question).then((function (response) {
            this.loop(response, lodash_1.clone(this.state), this.stageActions);
        }).bind(this));
    }
    init(form) {
        this.form = form;
        this.state.response = this.form.responses[this.property];
    }
    begin() {
        this.next(this.question, [], lodash_1.clone(this.state));
    }
}
exports.default = Stage;
//# sourceMappingURL=Stage.js.map