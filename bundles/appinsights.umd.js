(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('@angular/core'), require('@angular/platform-browser'), require('@angular/router'), require('rxjs/operators/filter'), require('angulartics2')) :
	typeof define === 'function' && define.amd ? define(['exports', '@angular/core', '@angular/platform-browser', '@angular/router', 'rxjs/operators/filter', 'angulartics2'], factory) :
	(factory((global.angulartics2 = global.angulartics2 || {}, global.angulartics2.appinsights = {}),global.ng.core,global.ng.platformBrowser,global.ng.router,global.Rx.operators,global.angulartics2));
}(this, (function (exports,core,platformBrowser,router,filter,angulartics2) { 'use strict';

var __assign = (undefined && undefined.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
var AppInsightsDefaults = (function () {
    function AppInsightsDefaults() {
        this.userId = null;
    }
    return AppInsightsDefaults;
}());
var Angulartics2AppInsights = (function () {
    function Angulartics2AppInsights(angulartics2$$1, title, router$$1) {
        var _this = this;
        this.angulartics2 = angulartics2$$1;
        this.title = title;
        this.router = router$$1;
        this.loadStartTime = null;
        this.loadTime = null;
        this.metrics = null;
        this.dimensions = null;
        this.measurements = null;
        if (typeof appInsights === 'undefined') {
            console.warn('appInsights not found');
        }
        var defaults = new AppInsightsDefaults;
        this.angulartics2.settings.appInsights = __assign({}, defaults, this.angulartics2.settings.appInsights);
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
        this.angulartics2.setUserProperties
            .subscribe(function (x) { return _this.setUserProperties(x); });
        this.router.events
            .pipe(this.angulartics2.filterDeveloperMode(), filter.filter(function (event) { return event instanceof router.NavigationStart; }))
            .subscribe(function (event) { return _this.startTimer(); });
        this.router.events
            .pipe(filter.filter(function (event) { return event instanceof router.NavigationError || event instanceof router.NavigationEnd; }))
            .subscribe(function (error) { return _this.stopTimer(); });
    }
    Angulartics2AppInsights.prototype.startTimer = function () {
        this.loadStartTime = Date.now();
        this.loadTime = null;
    };
    Angulartics2AppInsights.prototype.stopTimer = function () {
        this.loadTime = Date.now() - this.loadStartTime;
        this.loadStartTime = null;
    };
    Angulartics2AppInsights.prototype.pageTrack = function (path) {
        appInsights.trackPageView(this.title.getTitle(), path, this.dimensions, this.metrics, this.loadTime);
    };
    Angulartics2AppInsights.prototype.eventTrack = function (name, properties) {
        appInsights.trackEvent(name, properties, this.measurements);
    };
    Angulartics2AppInsights.prototype.exceptionTrack = function (properties) {
        var description = properties.event || properties.description || properties;
        appInsights.trackException(description);
    };
    Angulartics2AppInsights.prototype.setUsername = function (userId) {
        this.angulartics2.settings.appInsights.userId = userId;
        appInsights.setAuthenticatedUserContext(userId);
    };
    Angulartics2AppInsights.prototype.setUserProperties = function (properties) {
        if (properties.userId) {
            this.angulartics2.settings.appInsights.userId = properties.userId;
        }
        if (properties.accountId) {
            appInsights.setAuthenticatedUserContext(this.angulartics2.settings.appInsights.userId, properties.accountId);
        }
        else {
            appInsights.setAuthenticatedUserContext(this.angulartics2.settings.appInsights.userId);
        }
    };
    Angulartics2AppInsights.decorators = [
        { type: core.Injectable },
    ];
    Angulartics2AppInsights.ctorParameters = function () { return [
        { type: angulartics2.Angulartics2, },
        { type: platformBrowser.Title, },
        { type: router.Router, },
    ]; };
    return Angulartics2AppInsights;
}());

exports.AppInsightsDefaults = AppInsightsDefaults;
exports.Angulartics2AppInsights = Angulartics2AppInsights;

Object.defineProperty(exports, '__esModule', { value: true });

})));
//# sourceMappingURL=appinsights.umd.js.map
