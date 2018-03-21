(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('@angular/core'), require('angulartics2')) :
	typeof define === 'function' && define.amd ? define(['exports', '@angular/core', 'angulartics2'], factory) :
	(factory((global.angulartics2 = global.angulartics2 || {}, global.angulartics2.baidu = {}),global.ng.core,global.angulartics2));
}(this, (function (exports,core,angulartics2) { 'use strict';

var Angulartics2BaiduAnalytics = (function () {
    function Angulartics2BaiduAnalytics(angulartics2$$1) {
        var _this = this;
        this.angulartics2 = angulartics2$$1;
        if (typeof _hmt === 'undefined') {
            _hmt = [];
        }
        else {
            _hmt.push(['_setAutoPageview', false]);
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
    Angulartics2BaiduAnalytics.prototype.pageTrack = function (path) {
        if (typeof _hmt !== 'undefined' && _hmt) {
            _hmt.push(['_trackPageview', path]);
        }
    };
    Angulartics2BaiduAnalytics.prototype.eventTrack = function (action, properties) {
        if (!properties || !properties.category) {
            properties = properties || {};
            properties.category = 'Event';
            properties.opt_label = 'default';
            properties.opt_value = 'default';
        }
        if (typeof _hmt !== 'undefined' && _hmt) {
            _hmt.push([
                '_trackEvent',
                properties.category,
                action,
                properties.opt_label,
                properties.opt_value,
            ]);
        }
    };
    Angulartics2BaiduAnalytics.prototype.setUsername = function (userId) {
        _hmt.push(['_setCustomVar', 1, 'identity', userId]);
    };
    Angulartics2BaiduAnalytics.prototype.setUserProperties = function (properties) {
        _hmt.push(['_setCustomVar', 2, 'user', JSON.stringify(properties)]);
    };
    Angulartics2BaiduAnalytics.decorators = [
        { type: core.Injectable },
    ];
    Angulartics2BaiduAnalytics.ctorParameters = function () { return [
        { type: angulartics2.Angulartics2, },
    ]; };
    return Angulartics2BaiduAnalytics;
}());

exports.Angulartics2BaiduAnalytics = Angulartics2BaiduAnalytics;

Object.defineProperty(exports, '__esModule', { value: true });

})));
//# sourceMappingURL=baidu.umd.js.map
