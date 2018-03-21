(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('@angular/core'), require('angulartics2')) :
	typeof define === 'function' && define.amd ? define(['exports', '@angular/core', 'angulartics2'], factory) :
	(factory((global.angulartics2 = global.angulartics2 || {}, global.angulartics2.kissmetrics = {}),global.ng.core,global.angulartics2));
}(this, (function (exports,core,angulartics2) { 'use strict';

var Angulartics2Kissmetrics = (function () {
    function Angulartics2Kissmetrics(angulartics2$$1) {
        var _this = this;
        this.angulartics2 = angulartics2$$1;
        if (typeof (_kmq) === 'undefined') {
            _kmq = [];
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
    Angulartics2Kissmetrics.prototype.pageTrack = function (path) {
        _kmq.push(['record', 'Pageview', { 'Page': path }]);
    };
    Angulartics2Kissmetrics.prototype.eventTrack = function (action, properties) {
        _kmq.push(['record', action, properties]);
    };
    Angulartics2Kissmetrics.prototype.setUsername = function (userId) {
        _kmq.push(['identify', userId]);
    };
    Angulartics2Kissmetrics.prototype.setUserProperties = function (properties) {
        _kmq.push(['set', properties]);
    };
    Angulartics2Kissmetrics.decorators = [
        { type: core.Injectable },
    ];
    Angulartics2Kissmetrics.ctorParameters = function () { return [
        { type: angulartics2.Angulartics2, },
    ]; };
    return Angulartics2Kissmetrics;
}());

exports.Angulartics2Kissmetrics = Angulartics2Kissmetrics;

Object.defineProperty(exports, '__esModule', { value: true });

})));
//# sourceMappingURL=kissmetrics.umd.js.map
