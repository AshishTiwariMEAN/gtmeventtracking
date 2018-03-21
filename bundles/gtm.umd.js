(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('@angular/core'), require('angulartics2')) :
	typeof define === 'function' && define.amd ? define(['exports', '@angular/core', 'angulartics2'], factory) :
	(factory((global.angulartics2 = global.angulartics2 || {}, global.angulartics2.gtm = {}),global.ng.core,global.angulartics2));
}(this, (function (exports,core,angulartics2) { 'use strict';

var __assign = (undefined && undefined.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
var GoogleTagManagerDefaults = (function () {
    function GoogleTagManagerDefaults() {
        this.userId = null;
    }
    return GoogleTagManagerDefaults;
}());
var Angulartics2GoogleTagManager = (function () {
    function Angulartics2GoogleTagManager(angulartics2$$1) {
        var _this = this;
        this.angulartics2 = angulartics2$$1;
        if (typeof dataLayer !== 'undefined' && dataLayer) {
            dataLayer = window.dataLayer = window.dataLayer || [];
        }
        var defaults = new GoogleTagManagerDefaults;
        this.angulartics2.settings.gtm = __assign({}, defaults, this.angulartics2.settings.gtm);
        this.angulartics2.pageTrack
            .pipe(this.angulartics2.filterDeveloperMode())
            .subscribe(function (x) { return _this.pageTrack(x.path); });
        this.angulartics2.eventTrack
            .pipe(this.angulartics2.filterDeveloperMode())
            .subscribe(function (x) { return _this.eventTrack(x.action, x.properties); });
        this.angulartics2.exceptionTrack
            .pipe(this.angulartics2.filterDeveloperMode())
            .subscribe(function (x) { return _this.exceptionTrack(x); });
        this.angulartics2.setUsername
            .subscribe(function (x) { return _this.setUsername(x); });
    }
    Angulartics2GoogleTagManager.prototype.pageTrack = function (path) {
        if (typeof dataLayer !== 'undefined' && dataLayer) {
            dataLayer.push({
                'event': 'Page View',
                'content-name': path,
                'userId': this.angulartics2.settings.gtm.userId
            });
        }
    };
    Angulartics2GoogleTagManager.prototype.eventTrack = function (action, properties) {
        properties = properties || {};
        if (typeof dataLayer !== 'undefined' && dataLayer) {
            dataLayer.push(__assign({ event: properties.event || 'interaction', target: properties.category || 'Event', action: action, label: properties.label, value: properties.value, interactionType: properties.noninteraction, userId: this.angulartics2.settings.gtm.userId }, properties.gtmCustom));
        }
    };
    Angulartics2GoogleTagManager.prototype.exceptionTrack = function (properties) {
        if (!properties || !properties.appId || !properties.appName || !properties.appVersion) {
            console.error('Must be setted appId, appName and appVersion.');
            return;
        }
        if (properties.fatal === undefined) {
            console.log('No "fatal" provided, sending with fatal=true');
            properties.exFatal = true;
        }
        properties.exDescription = properties.event ? properties.event.stack : properties.description;
        this.eventTrack("Exception thrown for " + properties.appName + " <" + properties.appId + "@" + properties.appVersion + ">", {
            'category': 'Exception',
            'label': properties.exDescription
        });
    };
    Angulartics2GoogleTagManager.prototype.setUsername = function (userId) {
        this.angulartics2.settings.gtm.userId = userId;
    };
    Angulartics2GoogleTagManager.decorators = [
        { type: core.Injectable },
    ];
    Angulartics2GoogleTagManager.ctorParameters = function () { return [
        { type: angulartics2.Angulartics2, },
    ]; };
    return Angulartics2GoogleTagManager;
}());

exports.GoogleTagManagerDefaults = GoogleTagManagerDefaults;
exports.Angulartics2GoogleTagManager = Angulartics2GoogleTagManager;

Object.defineProperty(exports, '__esModule', { value: true });

})));
//# sourceMappingURL=gtm.umd.js.map
