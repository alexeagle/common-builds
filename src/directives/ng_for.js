/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { ChangeDetectorRef, Directive, Input, IterableDiffers, TemplateRef, ViewContainerRef, isDevMode } from '@angular/core/index';
import { getTypeNameForDebugging } from '../facade/lang';
export class NgForRow {
    /**
     * @param {?} $implicit
     * @param {?} index
     * @param {?} count
     */
    constructor($implicit, index, count) {
        this.$implicit = $implicit;
        this.index = index;
        this.count = count;
    }
    /**
     * @return {?}
     */
    get first() { return this.index === 0; }
    /**
     * @return {?}
     */
    get last() { return this.index === this.count - 1; }
    /**
     * @return {?}
     */
    get even() { return this.index % 2 === 0; }
    /**
     * @return {?}
     */
    get odd() { return !this.even; }
}
function NgForRow_tsickle_Closure_declarations() {
    /** @type {?} */
    NgForRow.prototype.$implicit;
    /** @type {?} */
    NgForRow.prototype.index;
    /** @type {?} */
    NgForRow.prototype.count;
}
/**
 * The `NgFor` directive instantiates a template once per item from an iterable. The context for
 * each instantiated template inherits from the outer context with the given loop variable set
 * to the current item from the iterable.
 *
 * ### Local Variables
 *
 * `NgFor` provides several exported values that can be aliased to local variables:
 *
 * * `index` will be set to the current loop iteration for each template context.
 * * `first` will be set to a boolean value indicating whether the item is the first one in the
 *   iteration.
 * * `last` will be set to a boolean value indicating whether the item is the last one in the
 *   iteration.
 * * `even` will be set to a boolean value indicating whether this item has an even index.
 * * `odd` will be set to a boolean value indicating whether this item has an odd index.
 *
 * ### Change Propagation
 *
 * When the contents of the iterator changes, `NgFor` makes the corresponding changes to the DOM:
 *
 * * When an item is added, a new instance of the template is added to the DOM.
 * * When an item is removed, its template instance is removed from the DOM.
 * * When items are reordered, their respective templates are reordered in the DOM.
 * * Otherwise, the DOM element for that item will remain the same.
 *
 * Angular uses object identity to track insertions and deletions within the iterator and reproduce
 * those changes in the DOM. This has important implications for animations and any stateful
 * controls
 * (such as `<input>` elements which accept user input) that are present. Inserted rows can be
 * animated in, deleted rows can be animated out, and unchanged rows retain any unsaved state such
 * as user input.
 *
 * It is possible for the identities of elements in the iterator to change while the data does not.
 * This can happen, for example, if the iterator produced from an RPC to the server, and that
 * RPC is re-run. Even if the data hasn't changed, the second response will produce objects with
 * different identities, and Angular will tear down the entire DOM and rebuild it (as if all old
 * elements were deleted and all new elements inserted). This is an expensive operation and should
 * be avoided if possible.
 *
 * To customize the default tracking algorithm, `NgFor` supports `trackBy` option.
 * `trackBy` takes a function which has two arguments: `index` and `item`.
 * If `trackBy` is given, Angular tracks changes by the return value of the function.
 *
 * ### Syntax
 *
 * - `<li *ngFor="let item of items; let i = index; trackBy: trackByFn">...</li>`
 * - `<li template="ngFor let item of items; let i = index; trackBy: trackByFn">...</li>`
 *
 * With `<template>` element:
 *
 * ```
 * <template ngFor let-item [ngForOf]="items" let-i="index" [ngForTrackBy]="trackByFn">
 *   <li>...</li>
 * </template>
 * ```
 *
 * ### Example
 *
 * See a [live demo](http://plnkr.co/edit/KVuXxDp0qinGDyo307QW?p=preview) for a more detailed
 * example.
 *
 * \@stable
 */
export class NgFor {
    /**
     * @param {?} _viewContainer
     * @param {?} _template
     * @param {?} _differs
     * @param {?} _cdr
     */
    constructor(_viewContainer, _template, _differs, _cdr) {
        this._viewContainer = _viewContainer;
        this._template = _template;
        this._differs = _differs;
        this._cdr = _cdr;
        this._differ = null;
    }
    /**
     * @param {?} fn
     * @return {?}
     */
    set ngForTrackBy(fn) {
        if (isDevMode() && fn != null && typeof fn !== 'function') {
            // TODO(vicb): use a log service once there is a public one available
            if ((console) && (console.warn)) {
                console.warn(`trackBy must be a function, but received ${JSON.stringify(fn)}. ` +
                    `See https://angular.io/docs/ts/latest/api/common/index/NgFor-directive.html#!#change-propagation for more information.`);
            }
        }
        this._trackByFn = fn;
    }
    /**
     * @return {?}
     */
    get ngForTrackBy() { return this._trackByFn; }
    /**
     * @param {?} value
     * @return {?}
     */
    set ngForTemplate(value) {
        if (value) {
            this._template = value;
        }
    }
    /**
     * @param {?} changes
     * @return {?}
     */
    ngOnChanges(changes) {
        if ('ngForOf' in changes) {
            // React on ngForOf changes only once all inputs have been initialized
            const /** @type {?} */ value = changes['ngForOf'].currentValue;
            if (!this._differ && value) {
                try {
                    this._differ = this._differs.find(value).create(this._cdr, this.ngForTrackBy);
                }
                catch (e) {
                    throw new Error(`Cannot find a differ supporting object '${value}' of type '${getTypeNameForDebugging(value)}'. NgFor only supports binding to Iterables such as Arrays.`);
                }
            }
        }
    }
    /**
     * @return {?}
     */
    ngDoCheck() {
        if (this._differ) {
            const /** @type {?} */ changes = this._differ.diff(this.ngForOf);
            if (changes)
                this._applyChanges(changes);
        }
    }
    /**
     * @param {?} changes
     * @return {?}
     */
    _applyChanges(changes) {
        const /** @type {?} */ insertTuples = [];
        changes.forEachOperation((item, adjustedPreviousIndex, currentIndex) => {
            if (item.previousIndex == null) {
                const /** @type {?} */ view = this._viewContainer.createEmbeddedView(this._template, new NgForRow(null, null, null), currentIndex);
                const /** @type {?} */ tuple = new RecordViewTuple(item, view);
                insertTuples.push(tuple);
            }
            else if (currentIndex == null) {
                this._viewContainer.remove(adjustedPreviousIndex);
            }
            else {
                const /** @type {?} */ view = this._viewContainer.get(adjustedPreviousIndex);
                this._viewContainer.move(view, currentIndex);
                const /** @type {?} */ tuple = new RecordViewTuple(item, /** @type {?} */ (view));
                insertTuples.push(tuple);
            }
        });
        for (let /** @type {?} */ i = 0; i < insertTuples.length; i++) {
            this._perViewChange(insertTuples[i].view, insertTuples[i].record);
        }
        for (let /** @type {?} */ i = 0, /** @type {?} */ ilen = this._viewContainer.length; i < ilen; i++) {
            const /** @type {?} */ viewRef = (this._viewContainer.get(i));
            viewRef.context.index = i;
            viewRef.context.count = ilen;
        }
        changes.forEachIdentityChange((record) => {
            const /** @type {?} */ viewRef = (this._viewContainer.get(record.currentIndex));
            viewRef.context.$implicit = record.item;
        });
    }
    /**
     * @param {?} view
     * @param {?} record
     * @return {?}
     */
    _perViewChange(view, record) {
        view.context.$implicit = record.item;
    }
}
NgFor.decorators = [
    { type: Directive, args: [{ selector: '[ngFor][ngForOf]' },] },
];
/** @nocollapse */
NgFor.ctorParameters = () => [
    { type: ViewContainerRef, },
    { type: TemplateRef, },
    { type: IterableDiffers, },
    { type: ChangeDetectorRef, },
];
NgFor.propDecorators = {
    'ngForOf': [{ type: Input },],
    'ngForTrackBy': [{ type: Input },],
    'ngForTemplate': [{ type: Input },],
};
function NgFor_tsickle_Closure_declarations() {
    /** @type {?} */
    NgFor.decorators;
    /**
     * @nocollapse
     * @type {?}
     */
    NgFor.ctorParameters;
    /** @type {?} */
    NgFor.propDecorators;
    /** @type {?} */
    NgFor.prototype.ngForOf;
    /** @type {?} */
    NgFor.prototype._differ;
    /** @type {?} */
    NgFor.prototype._trackByFn;
    /** @type {?} */
    NgFor.prototype._viewContainer;
    /** @type {?} */
    NgFor.prototype._template;
    /** @type {?} */
    NgFor.prototype._differs;
    /** @type {?} */
    NgFor.prototype._cdr;
}
class RecordViewTuple {
    /**
     * @param {?} record
     * @param {?} view
     */
    constructor(record, view) {
        this.record = record;
        this.view = view;
    }
}
function RecordViewTuple_tsickle_Closure_declarations() {
    /** @type {?} */
    RecordViewTuple.prototype.record;
    /** @type {?} */
    RecordViewTuple.prototype.view;
}
//# sourceMappingURL=ng_for.js.map