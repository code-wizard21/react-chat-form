"use strict";
var __assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
var Stage = (function () {
    function Stage(property, question, validate, feedback, options) {
        if (options === void 0) { options = {}; }
        this.options = {
            shouldHide: function () { return false; },
            reference: undefined,
            resolveValue: function (response) { return response; }
        };
        this.question = question;
        this.feedback = feedback;
        this.property = property;
        this.validate = validate;
        this.commit = this.commit.bind(this);
        this.reject = this.reject.bind(this);
        this.options = __assign({}, this.options, { reference: property }, options);
    }
    Stage.prototype.init = function (form) {
        this.form = form;
    };
    Stage.prototype.begin = function () {
        this.reject(undefined);
    };
    Stage.prototype.commit = function (response) {
        this.form.submitResponse(response);
    };
    Stage.prototype.reject = function (error) {
        var _this = this;
        this.form.fieldComponent.ask(this.question, error).then((function (response) {
            var validationResponse = _this.validate(response);
            if (validationResponse === false)
                _this.commit(response);
            else
                _this.reject(validationResponse);
        }).bind(this));
    };
    return Stage;
}());
exports.default = Stage;
//# sourceMappingURL=Stage.js.map