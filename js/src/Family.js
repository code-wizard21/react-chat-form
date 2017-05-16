"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Family = (function () {
    function Family(name) {
        this.name = name;
        this.members = [];
    }
    Family.prototype.addMember = function (person) {
        person.setFamily(this);
        this.members.push(person);
    };
    Object.defineProperty(Family.prototype, "size", {
        get: function () {
            return this.members.length;
        },
        enumerable: true,
        configurable: true
    });
    return Family;
}());
exports.Family = Family;
//# sourceMappingURL=Family.js.map