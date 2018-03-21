(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('@angular/common'), require('@angular/core'), require('angulartics2')) :
	typeof define === 'function' && define.amd ? define(['exports', '@angular/common', '@angular/core', 'angulartics2'], factory) :
	(factory((global.angulartics2 = global.angulartics2 || {}, global.angulartics2.adobeanalytics = {}),global.ng.common,global.ng.core,global.angulartics2));
}(this, (function (exports,common,core,angulartics2) { 'use strict';

var Angulartics2AdobeAnalytics = (function () {
    function Angulartics2AdobeAnalytics(angulartics2$$1, location) {
        var _this = this;
        this.angulartics2 = angulartics2$$1;
        this.location = location;
        this.angulartics2.pageTrack
            .pipe(this.angulartics2.filterDeveloperMode())
            .subscribe(function (x) { return _this.pageTrack(x.path); });
        this.angulartics2.eventTrack
            .pipe(this.angulartics2.filterDeveloperMode())
            .subscribe(function (x) { return _this.eventTrack(x.action, x.properties); });
        this.angulartics2.setUserProperties
            .subscribe(function (x) { return _this.setUserProperties(x); });
    }
    Angulartics2AdobeAnalytics.prototype.pageTrack = function (path) {
        if (typeof s !== 'undefined' && s) {
            s.clearVars();
            s.t({ pageName: path });
        }
    };
    Angulartics2AdobeAnalytics.prototype.eventTrack = function (action, properties) {
        if (!properties) {
            properties = properties || {};
        }
        if (typeof s !== 'undefined' && s) {
            if (typeof properties === 'object') {
                this.setUserProperties(properties);
            }
            if (action) {
                var linkName = (properties['linkName']) ? properties['linkName'] : action;
                var disableDelay = !!properties['disableDelay'] ? true : this;
                if (properties['action']) {
                    action = properties['action'];
                }
                this.setPageName();
                if (action.toUpperCase() === 'DOWNLOAD') {
                    s.tl(disableDelay, 'd', linkName);
                }
                else if (action.toUpperCase() === 'EXIT') {
                    s.tl(disableDelay, 'e', linkName);
                }
                else {
                    s.tl(disableDelay, 'o', linkName);
                }
            }
        }
    };
    Angulartics2AdobeAnalytics.prototype.setPageName = function () {
        var path = this.location.path(true);
        var hashNdx = path.indexOf('#');
        if (hashNdx > 0 && hashNdx < path.length) {
            s.pageName = path.substring(hashNdx + 1);
        }
        else {
            s.pageName = path;
        }
    };
    Angulartics2AdobeAnalytics.prototype.setUserProperties = function (properties) {
        if (typeof s !== 'undefined' && s) {
            if (typeof properties === 'object') {
                for (var key in properties) {
                    if (properties.hasOwnProperty(key)) {
                        s[key] = properties[key];
                    }
                }
            }
        }
    };
    Angulartics2AdobeAnalytics.decorators = [
        { type: core.Injectable },
    ];
    Angulartics2AdobeAnalytics.ctorParameters = function () { return [
        { type: angulartics2.Angulartics2, },
        { type: common.Location, },
    ]; };
    return Angulartics2AdobeAnalytics;
}());

exports.Angulartics2AdobeAnalytics = Angulartics2AdobeAnalytics;

Object.defineProperty(exports, '__esModule', { value: true });

})));
//# sourceMappingURL=adobeanalytics.umd.js.map
