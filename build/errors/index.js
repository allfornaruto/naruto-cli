"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BaseError = void 0;
class BaseError {
    constructor(message) {
        this.name = this.constructor.name;
        this.message = message;
    }
}
exports.BaseError = BaseError;
