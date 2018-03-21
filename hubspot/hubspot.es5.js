import { Injectable } from '@angular/core';
import { Angulartics2 } from 'angulartics2';

var Angulartics2Hubspot = (function () {
    function Angulartics2Hubspot(angulartics2) {
        var _this = this;
        this.angulartics2 = angulartics2;
        this.angulartics2.pageTrack
            .pipe(this.angulartics2.filterDeveloperMode())
            .subscribe(function (x) { return _this.pageTrack(x.path); });
        this.angulartics2.eventTrack
            .pipe(this.angulartics2.filterDeveloperMode())
            .subscribe(function (x) { return _this.eventTrack(x.action, x.properties); });
        this.angulartics2.setUserProperties
            .subscribe(function (x) { return _this.setUserProperties(x); });
    }
    Angulartics2Hubspot.prototype.pageTrack = function (path) {
        if (typeof _hsq !== 'undefined') {
            _hsq.push(['setPath', path]);
            _hsq.push(['trackPageView']);
        }
    };
    Angulartics2Hubspot.prototype.eventTrack = function (action, properties) {
        if (typeof _hsq !== 'undefined') {
            _hsq.push(['trackEvent', properties]);
        }
    };
    Angulartics2Hubspot.prototype.setUserProperties = function (properties) {
        if (typeof _hsq !== 'undefined') {
            _hsq.push(['identify', properties]);
        }
    };
    Angulartics2Hubspot.decorators = [
        { type: Injectable },
    ];
    Angulartics2Hubspot.ctorParameters = function () { return [
        { type: Angulartics2, },
    ]; };
    return Angulartics2Hubspot;
}());

export { Angulartics2Hubspot };
//# sourceMappingURL=hubspot.es5.js.map
