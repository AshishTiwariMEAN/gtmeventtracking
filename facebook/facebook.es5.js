import { Injectable } from '@angular/core';
import { Angulartics2 } from 'angulartics2';

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
    function Angulartics2Facebook(angulartics2) {
        var _this = this;
        this.angulartics2 = angulartics2;
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
        { type: Injectable },
    ];
    Angulartics2Facebook.ctorParameters = function () { return [
        { type: Angulartics2, },
    ]; };
    return Angulartics2Facebook;
}());

export { Angulartics2Facebook };
//# sourceMappingURL=facebook.es5.js.map
