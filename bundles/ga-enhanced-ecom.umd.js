(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('@angular/core')) :
	typeof define === 'function' && define.amd ? define(['exports', '@angular/core'], factory) :
	(factory((global.angulartics2 = global.angulartics2 || {}, global.angulartics2['ga-enhanced-ecom'] = {}),global.ng.core));
}(this, (function (exports,core) { 'use strict';

var Angulartics2GoogleAnalyticsEnhancedEcommerce = (function () {
    function Angulartics2GoogleAnalyticsEnhancedEcommerce() {
    }
    Angulartics2GoogleAnalyticsEnhancedEcommerce.prototype.ecAddImpression = function (properties) {
        ga('ec:addImpression', properties);
    };
    Angulartics2GoogleAnalyticsEnhancedEcommerce.prototype.ecAddProduct = function (product) {
        ga('ec:addProduct', product);
    };
    Angulartics2GoogleAnalyticsEnhancedEcommerce.prototype.ecSetAction = function (action, properties) {
        ga('ec:setAction', action, properties);
    };
    Angulartics2GoogleAnalyticsEnhancedEcommerce.decorators = [
        { type: core.Injectable },
    ];
    Angulartics2GoogleAnalyticsEnhancedEcommerce.ctorParameters = function () { return []; };
    return Angulartics2GoogleAnalyticsEnhancedEcommerce;
}());

exports.Angulartics2GoogleAnalyticsEnhancedEcommerce = Angulartics2GoogleAnalyticsEnhancedEcommerce;

Object.defineProperty(exports, '__esModule', { value: true });

})));
//# sourceMappingURL=ga-enhanced-ecom.umd.js.map
