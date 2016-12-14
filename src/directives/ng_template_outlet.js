/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { Directive, Input, ViewContainerRef } from '@angular/core/index';
/**
 *
 *
 * ```
 * <template [ngTemplateOutlet]="templateRefExpression"
 *           [ngOutletContext]="objectExpression">
 * </template>
 * ```
 *
 *
 * You can attach a context object to the `EmbeddedViewRef` by setting `[ngOutletContext]`.
 * `[ngOutletContext]` should be an object, the object's keys will be the local template variables
 * available within the `TemplateRef`.
 *
 * Note: using the key `$implicit` in the context object will set it's value as default.
 *
 */
export class NgTemplateOutlet {
    /**
     * @param {?} _viewContainerRef
     */
    constructor(_viewContainerRef) {
        this._viewContainerRef = _viewContainerRef;
    }
    /**
     * @param {?} context
     * @return {?}
     */
    set ngOutletContext(context) { this._context = context; }
    /**
     * @param {?} templateRef
     * @return {?}
     */
    set ngTemplateOutlet(templateRef) { this._templateRef = templateRef; }
    /**
     * @param {?} changes
     * @return {?}
     */
    ngOnChanges(changes) {
        if (this._viewRef) {
            this._viewContainerRef.remove(this._viewContainerRef.indexOf(this._viewRef));
        }
        if (this._templateRef) {
            this._viewRef = this._viewContainerRef.createEmbeddedView(this._templateRef, this._context);
        }
    }
}
NgTemplateOutlet.decorators = [
    { type: Directive, args: [{ selector: '[ngTemplateOutlet]' },] },
];
/** @nocollapse */
NgTemplateOutlet.ctorParameters = () => [
    { type: ViewContainerRef, },
];
NgTemplateOutlet.propDecorators = {
    'ngOutletContext': [{ type: Input },],
    'ngTemplateOutlet': [{ type: Input },],
};
function NgTemplateOutlet_tsickle_Closure_declarations() {
    /** @type {?} */
    NgTemplateOutlet.decorators;
    /**
     * @nocollapse
     * @type {?}
     */
    NgTemplateOutlet.ctorParameters;
    /** @type {?} */
    NgTemplateOutlet.propDecorators;
    /** @type {?} */
    NgTemplateOutlet.prototype._viewRef;
    /** @type {?} */
    NgTemplateOutlet.prototype._context;
    /** @type {?} */
    NgTemplateOutlet.prototype._templateRef;
    /** @type {?} */
    NgTemplateOutlet.prototype._viewContainerRef;
}
//# sourceMappingURL=ng_template_outlet.js.map