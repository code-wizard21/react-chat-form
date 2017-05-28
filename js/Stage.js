"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Stage {
    constructor(property, question, validate, feedback, options = {}) {
        this.options = {
            shouldHide: () => false,
            reference: undefined
        };
        this.question = question;
        this.feedback = feedback;
        this.property = property;
        this.validate = validate;
        this.commit = this.commit.bind(this);
        this.reject = this.reject.bind(this);
        this.options = Object.assign({}, this.options, { reference: property }, options);
    }
    init(form) {
        this.form = form;
    }
    begin() {
        this.reject(undefined);
    }
    commit(response) {
        this.form.submitResponse(response);
    }
    reject(error) {
        this.form.fieldComponent.ask(this.question, error).then(((response) => {
            const validationResponse = this.validate(response);
            if (validationResponse === false)
                this.commit(response);
            else
                this.reject(validationResponse);
        }).bind(this));
    }
}
exports.default = Stage;
//# sourceMappingURL=Stage.js.map