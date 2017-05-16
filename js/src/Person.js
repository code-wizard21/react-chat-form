"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Family_1 = require("./Family");
var Person = (function () {
    function Person(name) {
        this.name = name;
        this.family = new Family_1.Family('Orphan');
        this.family.addMember(this);
    }
    Person.prototype.sayHello = function () {
        return this.name + "> hello!";
    };
    Person.prototype.setFamily = function (family) {
        this.family = family;
    };
    Object.defineProperty(Person.prototype, "fullName", {
        get: function () {
            return this.name + " " + this.family.name;
        },
        enumerable: true,
        configurable: true
    });
    return Person;
}());
exports.Person = Person;
//# sourceMappingURL=Person.js.map