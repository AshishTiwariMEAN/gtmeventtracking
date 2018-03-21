(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('@angular/core'), require('angulartics2')) :
	typeof define === 'function' && define.amd ? define(['exports', '@angular/core', 'angulartics2'], factory) :
	(factory((global.angulartics2 = global.angulartics2 || {}, global.angulartics2.hubspot = {}),global.ng.core,global.angulartics2));
}(this, (function (exports,core,angulartics2) { 'use strict';

var Angulartics2Hubspot = (function () {
    function Angulartics2Hubspot(angulartics2$$1) {
        var _this = this;
        this.angulartics2 = angulartics2$$1;
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
        { type: core.Injectable },
    ];
    Angulartics2Hubspot.ctorParameters = function () { return [
        { type: angulartics2.Angulartics2, },
    ]; };
    return Angulartics2Hubspot;
}());

exports.Angulartics2Hubspot = Angulartics2Hubspot;

Object.defineProperty(exports, '__esModule', { value: true });

})));
//# sourceMappingURL=hubspot.umd.js.map
