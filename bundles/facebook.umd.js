(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('@angular/core'), require('angulartics2')) :
	typeof define === 'function' && define.amd ? define(['exports', '@angular/core', 'angulartics2'], factory) :
	(factory((global.angulartics2 = global.angulartics2 || {}, global.angulartics2.facebook = {}),global.ng.core,global.angulartics2));
}(this, (function (exports,core,angulartics2) { 'use strict';

var facebookEventList = [
    'ViewContent',
    'Search',
    'AddToCart',
    'AddToWishlist',
    'InitiateCheckout',
    'AddPaymentInfo',
    'Purchase',
    'Lead',
    'CompleteRegistration',
];
var Angulartics2Facebook = (function () {
    function Angulartics2Facebook(angulartics2$$1) {
        var _this = this;
        this.angulartics2 = angulartics2$$1;
        this.angulartics2.eventTrack
            .pipe(this.angulartics2.filterDeveloperMode())
            .subscribe(function (x) { return _this.eventTrack(x.action, x.properties); });
    }
    Angulartics2Facebook.prototype.eventTrack = function (action, properties) {
        if (properties === void 0) { properties = {}; }
        if (typeof fbq === 'undefined') {
            return;
        }
        if (facebookEventList.indexOf(action) === -1) {
            return fbq('trackCustom', action, properties);
        }
        return fbq('track', action, properties);
    };
    Angulartics2Facebook.decorators = [
        { type: core.Injectable },
    ];
    Angulartics2Facebook.ctorParameters = function () { return [
        { type: angulartics2.Angulartics2, },
    ]; };
    return Angulartics2Facebook;
}());

exports.Angulartics2Facebook = Angulartics2Facebook;

Object.defineProperty(exports, '__esModule', { value: true });

})));
//# sourceMappingURL=facebook.umd.js.map
