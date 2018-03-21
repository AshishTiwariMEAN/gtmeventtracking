import { Injectable } from '@angular/core';
import { Angulartics2 } from 'angulartics2';

var Angulartics2Piwik = (function () {
    function Angulartics2Piwik(angulartics2) {
        var _this = this;
        this.angulartics2 = angulartics2;
        if (typeof (_paq) === 'undefined') {
            console.warn('Piwik not found');
        }
        this.angulartics2.pageTrack
            .pipe(this.angulartics2.filterDeveloperMode())
            .subscribe(function (x) { return _this.pageTrack(x.path); });
        this.angulartics2.eventTrack
            .pipe(this.angulartics2.filterDeveloperMode())
            .subscribe(function (x) { return _this.eventTrack(x.action, x.properties); });
        this.angulartics2.setUsername
            .subscribe(function (x) { return _this.setUsername(x); });
        this.angulartics2.setUserProperties
            .subscribe(function (x) { return _this.setUserProperties(x); });
    }
    Angulartics2Piwik.prototype.pageTrack = function (path, location) {
        try {
            _paq.push(['setDocumentTitle', window.document.title]);
            _paq.push(['setCustomUrl', path]);
            _paq.push(['trackPageView']);
        }
        catch (e) {
            if (!(e instanceof ReferenceError)) {
                throw e;
            }
        }
    };
    Angulartics2Piwik.prototype.eventTrack = function (action, properties) {
        if (properties === void 0) { properties = {}; }
        var params = [];
        switch (action) {
            case 'setEcommerceView':
                params = ['setEcommerceView',
                    properties.productSKU,
                    properties.productName,
                    properties.categoryName,
                    properties.price,
                ];
                break;
            case 'addEcommerceItem':
                params = [
                    'addEcommerceItem',
                    properties.productSKU,
                    properties.productName,
                    properties.productCategory,
                    properties.price,
                    properties.quantity,
                ];
                break;
            case 'trackEcommerceCartUpdate':
                params = ['trackEcommerceCartUpdate', properties.grandTotal];
                break;
            case 'trackEcommerceOrder':
                params = [
                    'trackEcommerceOrder',
                    properties.orderId,
                    properties.grandTotal,
                    properties.subTotal,
                    properties.tax,
                    properties.shipping,
                    properties.discount,
                ];
                break;
            case 'trackGoal':
                params = [
                    'trackGoal',
                    properties.goalId,
                    properties.value,
                ];
                break;
            default:
                if (properties.value) {
                    var parsed = parseInt(properties.value, 10);
                    properties.value = isNaN(parsed) ? 0 : parsed;
                }
                params = [
                    'trackEvent',
                    properties.category,
                    action,
                    properties.name || properties.label,
                    properties.value,
                ];
        }
        try {
            _paq.push(params);
        }
        catch (e) {
            if (!(e instanceof ReferenceError)) {
                throw e;
            }
        }
    };
    Angulartics2Piwik.prototype.setUsername = function (userId) {
        try {
            _paq.push(['setUserId', userId]);
        }
        catch (e) {
            if (!(e instanceof ReferenceError)) {
                throw e;
            }
        }
    };
    Angulartics2Piwik.prototype.setUserProperties = function (properties) {
        var dimensions = this.setCustomDimensions(properties);
        try {
            if (dimensions.length === 0) {
                _paq.push(['setCustomVariable', properties]);
            }
        }
        catch (e) {
            if (!(e instanceof ReferenceError)) {
                throw e;
            }
        }
    };
    Angulartics2Piwik.prototype.setCustomDimensions = function (properties) {
        var dimensionRegex = /dimension[1-9]\d*/;
        var dimensions = Object.keys(properties)
            .filter(function (key) { return dimensionRegex.exec(key); });
        dimensions.forEach(function (dimension) {
            var number = Number(dimension.substr(9));
            _paq.push(['setCustomDimension', number, properties[dimension]]);
        });
        return dimensions;
    };
    Angulartics2Piwik.decorators = [
        { type: Injectable },
    ];
    Angulartics2Piwik.ctorParameters = function () { return [
        { type: Angulartics2, },
    ]; };
    return Angulartics2Piwik;
}());

export { Angulartics2Piwik };
//# sourceMappingURL=piwik.es2015.js.map
