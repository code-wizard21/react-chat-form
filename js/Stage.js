"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Stage {
    constructor(property, question, validate, feedback) {
        this.question = question;
        this.feedback = feedback;
        this.property = property;
        this.validate = validate;
        this.commit = this.commit.bind(this);
        this.reject = this.reject.bind(this);
    }
    init(form) {
        this.form = form;
    }
    begin() {
        this.reject(undefined);
    }
    commit(response) {
        this.form.next(response);
    }
    reject(error) {
        this.form.generateHistory();
        this.form.fieldComponent.ask(this.question, error).then(((response) => {
            this.validate(response, this.commit, this.reject);
        }).bind(this));
    }
}
exports.default = Stage;
//# sourceMappingURL=Stage.js.map