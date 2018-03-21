import { Injectable } from '@angular/core';

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
        { type: Injectable },
    ];
    Angulartics2GoogleAnalyticsEnhancedEcommerce.ctorParameters = function () { return []; };
    return Angulartics2GoogleAnalyticsEnhancedEcommerce;
}());

export { Angulartics2GoogleAnalyticsEnhancedEcommerce };
//# sourceMappingURL=ga-enhanced-ecom.es2015.js.map
