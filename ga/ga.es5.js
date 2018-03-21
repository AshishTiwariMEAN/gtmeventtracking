import { Injectable } from '@angular/core';
import { Angulartics2 } from 'angulartics2';

var __assign = (undefined && undefined.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
var GoogleAnalyticsDefaults = (function () {
    function GoogleAnalyticsDefaults() {
        this.additionalAccountNames = [];
        this.userId = null;
        this.transport = '';
    }
    return GoogleAnalyticsDefaults;
}());
var Angulartics2GoogleAnalytics = (function () {
    function Angulartics2GoogleAnalytics(angulartics2) {
        var _this = this;
        this.angulartics2 = angulartics2;
        this.dimensionsAndMetrics = [];
        var defaults = new GoogleAnalyticsDefaults();
        this.angulartics2.settings.ga = __assign({}, defaults, this.angulartics2.settings.ga);
        this.angulartics2.pageTrack
            .pipe(this.angulartics2.filterDeveloperMode())
            .subscribe(function (x) { return _this.pageTrack(x.path); });
        this.angulartics2.eventTrack
            .pipe(this.angulartics2.filterDeveloperMode())
            .subscribe(function (x) { return _this.eventTrack(x.action, x.properties); });
        this.angulartics2.exceptionTrack
            .pipe(this.angulartics2.filterDeveloperMode())
            .subscribe(function (x) { return _this.exceptionTrack(x); });
        this.angulartics2.setUsername.subscribe(function (x) { return _this.setUsername(x); });
        this.angulartics2.setUserProperties.subscribe(function (x) { return _this.setUserProperties(x); });
        this.angulartics2.userTimings
            .pipe(this.angulartics2.filterDeveloperMode())
            .subscribe(function (x) { return _this.userTimings(x); });
    }
    Angulartics2GoogleAnalytics.prototype.pageTrack = function (path) {
        if (typeof _gaq !== 'undefined' && _gaq) {
            _gaq.push(['_trackPageview', path]);
            for (var _i = 0, _a = this.angulartics2.settings.ga.additionalAccountNames; _i < _a.length; _i++) {
                var accountName = _a[_i];
                _gaq.push([accountName + '._trackPageview', path]);
            }
        }
        if (typeof ga !== 'undefined' && ga) {
            if (this.angulartics2.settings.ga.userId) {
                ga('set', '&uid', this.angulartics2.settings.ga.userId);
                for (var _b = 0, _c = this.angulartics2.settings.ga.additionalAccountNames; _b < _c.length; _b++) {
                    var accountName = _c[_b];
                    ga(accountName + '.set', '&uid', this.angulartics2.settings.ga.userId);
                }
            }
            ga('send', 'pageview', path);
            for (var _d = 0, _e = this.angulartics2.settings.ga.additionalAccountNames; _d < _e.length; _d++) {
                var accountName = _e[_d];
                ga(accountName + '.send', 'pageview', path);
            }
        }
    };
    Angulartics2GoogleAnalytics.prototype.eventTrack = function (action, properties) {
        if (!properties || !properties.category) {
            properties = properties || {};
            properties.category = 'Event';
        }
        if (properties.value) {
            var parsed = parseInt(properties.value, 10);
            properties.value = isNaN(parsed) ? 0 : parsed;
        }
        if (typeof ga !== 'undefined') {
            var eventOptions = {
                eventCategory: properties.category,
                eventAction: action,
                eventLabel: properties.label,
                eventValue: properties.value,
                nonInteraction: properties.noninteraction,
                page: properties.page || location.hash.substring(1) || location.pathname,
                userId: this.angulartics2.settings.ga.userId,
                hitCallback: properties.hitCallback,
            };
            this.setDimensionsAndMetrics(properties);
            if (this.angulartics2.settings.ga.transport) {
                ga('send', 'event', eventOptions, {
                    transport: this.angulartics2.settings.ga.transport,
                });
            }
            else {
                ga('send', 'event', eventOptions);
            }
            for (var _i = 0, _a = this.angulartics2.settings.ga.additionalAccountNames; _i < _a.length; _i++) {
                var accountName = _a[_i];
                ga(accountName + '.send', 'event', eventOptions);
            }
        }
        else if (typeof _gaq !== 'undefined') {
            _gaq.push([
                '_trackEvent',
                properties.category,
                action,
                properties.label,
                properties.value,
                properties.noninteraction,
            ]);
        }
    };
    Angulartics2GoogleAnalytics.prototype.exceptionTrack = function (properties) {
        if (properties.fatal === undefined) {
            console.log('No "fatal" provided, sending with fatal=true');
            properties.fatal = true;
        }
        properties.exDescription = properties.description;
        var eventOptions = {
            exFatal: properties.fatal,
            exDescription: properties.description,
        };
        ga('send', 'exception', eventOptions);
        for (var _i = 0, _a = this.angulartics2.settings.ga.additionalAccountNames; _i < _a.length; _i++) {
            var accountName = _a[_i];
            ga(accountName + '.send', 'exception', eventOptions);
        }
    };
    Angulartics2GoogleAnalytics.prototype.userTimings = function (properties) {
        if (!properties ||
            !properties.timingCategory ||
            !properties.timingVar ||
            !properties.timingValue) {
            console.error('Properties timingCategory, timingVar, and timingValue are required to be set.');
            return;
        }
        if (typeof ga !== 'undefined') {
            ga('send', 'timing', properties);
            for (var _i = 0, _a = this.angulartics2.settings.ga.additionalAccountNames; _i < _a.length; _i++) {
                var accountName = _a[_i];
                ga(accountName + '.send', 'timing', properties);
            }
        }
    };
    Angulartics2GoogleAnalytics.prototype.setUsername = function (userId) {
        this.angulartics2.settings.ga.userId = userId;
        if (typeof ga === 'undefined') {
            return;
        }
        ga('set', 'userId', userId);
    };
    Angulartics2GoogleAnalytics.prototype.setUserProperties = function (properties) {
        this.setDimensionsAndMetrics(properties);
    };
    Angulartics2GoogleAnalytics.prototype.setDimensionsAndMetrics = function (properties) {
        var _this = this;
        if (typeof ga === 'undefined') {
            return;
        }
        this.dimensionsAndMetrics.forEach(function (elem) {
            if (!properties.hasOwnProperty(elem)) {
                ga('set', elem, undefined);
                _this.angulartics2.settings.ga.additionalAccountNames.forEach(function (accountName) {
                    ga(accountName + ".set", elem, undefined);
                });
            }
        });
        this.dimensionsAndMetrics = [];
        Object.keys(properties).forEach(function (key) {
            if (key.lastIndexOf('dimension', 0) === 0 ||
                key.lastIndexOf('metric', 0) === 0) {
                ga('set', key, properties[key]);
                _this.angulartics2.settings.ga.additionalAccountNames.forEach(function (accountName) {
                    ga(accountName + ".set", key, properties[key]);
                });
                _this.dimensionsAndMetrics.push(key);
            }
        });
    };
    Angulartics2GoogleAnalytics.decorators = [
        { type: Injectable },
    ];
    Angulartics2GoogleAnalytics.ctorParameters = function () { return [
        { type: Angulartics2, },
    ]; };
    return Angulartics2GoogleAnalytics;
}());

export { GoogleAnalyticsDefaults, Angulartics2GoogleAnalytics };
//# sourceMappingURL=ga.es5.js.map
