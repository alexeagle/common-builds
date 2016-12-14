/**
 * @license undefined
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 * @return {?}
 */
export function unimplemented() {
    throw new Error('unimplemented');
}
export class BaseError extends Error {
    /**
     * @param {?} message
     */
    constructor(message) {
        // Errors don't use current this, instead they create a new instance.
        // We have to do forward all of our api to the nativeInstance.
        const nativeError = super(message);
        this._nativeError = nativeError;
    }
    /**
     * @return {?}
     */
    get message() { return this._nativeError.message; }
    /**
     * @param {?} message
     * @return {?}
     */
    set message(message) { this._nativeError.message = message; }
    /**
     * @return {?}
     */
    get name() { return this._nativeError.name; }
    /**
     * @return {?}
     */
    get stack() { return ((this._nativeError)).stack; }
    /**
     * @param {?} value
     * @return {?}
     */
    set stack(value) { ((this._nativeError)).stack = value; }
    /**
     * @return {?}
     */
    toString() { return this._nativeError.toString(); }
}
function BaseError_tsickle_Closure_declarations() {
    /** @type {?} */
    BaseError.prototype._nativeError;
}
export class WrappedError extends BaseError {
    /**
     * @param {?} message
     * @param {?} error
     */
    constructor(message, error) {
        super(`${message} caused by: ${error instanceof Error ? error.message : error}`);
        this.originalError = error;
    }
    /**
     * @return {?}
     */
    get stack() {
        return (((this.originalError instanceof Error ? this.originalError : this._nativeError)))
            .stack;
    }
}
function WrappedError_tsickle_Closure_declarations() {
    /** @type {?} */
    WrappedError.prototype.originalError;
}
//# sourceMappingURL=errors.js.map