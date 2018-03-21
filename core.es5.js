import { InjectionToken, Inject, Injectable, Directive, ElementRef, Input, NgModule, Renderer2 } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { ReplaySubject } from 'rxjs/ReplaySubject';
import { filter } from 'rxjs/operators/filter';
import { Location } from '@angular/common';
import { NavigationEnd, Router } from '@angular/router';
import { delay } from 'rxjs/operators/delay';
import { map } from 'rxjs/operators/map';

var DefaultConfig = (function () {
    function DefaultConfig() {
        this.pageTracking = {
            autoTrackVirtualPages: true,
            basePath: '',
            excludedRoutes: [],
            clearIds: false,
            clearHash: false,
            clearQueryParams: false,
            idsRegExp: /^\d+$|^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$/,
        };
        this.developerMode = false;
        this.ga = {};
        this.appInsights = {};
        this.gtm = {};
    }
    return DefaultConfig;
}());

var ANGULARTICS2_TOKEN = new InjectionToken('ANGULARTICS2');

var RouterlessTracking = (function () {
    function RouterlessTracking() {
    }
    RouterlessTracking.prototype.trackLocation = function (settings) {
        return new BehaviorSubject({ url: '/' });
    };
    RouterlessTracking.prototype.prepareExternalUrl = function (url) {
        return url;
    };
    return RouterlessTracking;
}());

var __assign = (undefined && undefined.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
var Angulartics2 = (function () {
    function Angulartics2(tracker, setup) {
        var _this = this;
        this.tracker = tracker;
        this.pageTrack = new ReplaySubject(10);
        this.eventTrack = new ReplaySubject(10);
        this.exceptionTrack = new ReplaySubject(10);
        this.setAlias = new ReplaySubject(10);
        this.setUsername = new ReplaySubject(10);
        this.setUserProperties = new ReplaySubject(10);
        this.setUserPropertiesOnce = new ReplaySubject(10);
        this.setSuperProperties = new ReplaySubject(10);
        this.setSuperPropertiesOnce = new ReplaySubject(10);
        this.userTimings = new ReplaySubject(10);
        var defaultConfig = new DefaultConfig();
        this.settings = __assign({}, defaultConfig, setup.settings);
        this.settings.pageTracking = __assign({}, defaultConfig.pageTracking, setup.settings.pageTracking);
        this.tracker
            .trackLocation(this.settings)
            .subscribe(function (event) {
            return _this.trackUrlChange(event.url);
        });
    }
    Angulartics2.prototype.virtualPageviews = function (value) {
        this.settings.pageTracking.autoTrackVirtualPages = value;
    };
    Angulartics2.prototype.excludeRoutes = function (routes) {
        this.settings.pageTracking.excludedRoutes = routes;
    };
    Angulartics2.prototype.withBase = function (value) {
        this.settings.pageTracking.basePath = value;
    };
    Angulartics2.prototype.clearIds = function (value) {
        this.settings.pageTracking.clearIds = value;
    };
    Angulartics2.prototype.developerMode = function (value) {
        this.settings.developerMode = value;
    };
    Angulartics2.prototype.filterDeveloperMode = function () {
        var _this = this;
        return filter(function (value, index) { return !_this.settings.developerMode; });
    };
    Angulartics2.prototype.trackUrlChange = function (url) {
        if (this.settings.pageTracking.autoTrackVirtualPages && !this.matchesExcludedRoute(url)) {
            var clearedUrl = this.clearUrl(url);
            var path = void 0;
            if (this.settings.pageTracking.basePath.length) {
                path = this.settings.pageTracking.basePath + clearedUrl;
            }
            else {
                path = this.tracker.prepareExternalUrl(clearedUrl);
            }
            this.pageTrack.next({ path: path });
        }
    };
    Angulartics2.prototype.matchesExcludedRoute = function (url) {
        for (var _i = 0, _a = this.settings.pageTracking.excludedRoutes; _i < _a.length; _i++) {
            var excludedRoute = _a[_i];
            var matchesRegex = excludedRoute instanceof RegExp && excludedRoute.test(url);
            if (matchesRegex || url.indexOf(excludedRoute) !== -1) {
                return true;
            }
        }
        return false;
    };
    Angulartics2.prototype.clearUrl = function (url) {
        var _this = this;
        if (this.settings.pageTracking.clearIds || this.settings.pageTracking.clearQueryParams ||
            this.settings.pageTracking.clearHash) {
            return url
                .split('/')
                .map(function (part) { return _this.settings.pageTracking.clearQueryParams ? part.split('?')[0] : part; })
                .map(function (part) { return _this.settings.pageTracking.clearHash ? part.split('#')[0] : part; })
                .filter(function (part) { return !_this.settings.pageTracking.clearIds || !part.match(_this.settings.pageTracking.idsRegExp); })
                .join('/');
        }
        return url;
    };
    Angulartics2.decorators = [
        { type: Injectable },
    ];
    Angulartics2.ctorParameters = function () { return [
        { type: RouterlessTracking, },
        { type: undefined, decorators: [{ type: Inject, args: [ANGULARTICS2_TOKEN,] },] },
    ]; };
    return Angulartics2;
}());

var AngularRouterTracking = (function () {
    function AngularRouterTracking(router, location) {
        this.router = router;
        this.location = location;
    }
    AngularRouterTracking.prototype.trackLocation = function (settings) {
        return this.router.events.pipe(filter(function (e) { return e instanceof NavigationEnd; }), filter(function () { return !settings.developerMode; }), map(function (e) {
            return { url: e.urlAfterRedirects };
        }), delay(0));
    };
    AngularRouterTracking.prototype.prepareExternalUrl = function (url) {
        return this.location.prepareExternalUrl(url);
    };
    AngularRouterTracking.decorators = [
        { type: Injectable },
    ];
    AngularRouterTracking.ctorParameters = function () { return [
        { type: Router, },
        { type: Location, },
    ]; };
    return AngularRouterTracking;
}());

var __assign$1 = (undefined && undefined.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
var Angulartics2On = (function () {
    function Angulartics2On(elRef, angulartics2, renderer) {
        this.elRef = elRef;
        this.angulartics2 = angulartics2;
        this.renderer = renderer;
        this.angularticsProperties = {};
    }
    Angulartics2On.prototype.ngAfterContentInit = function () {
        var _this = this;
        this.renderer.listen(this.elRef.nativeElement, this.angulartics2On || 'click', function (event) { return _this.eventTrack(event); });
    };
    Angulartics2On.prototype.eventTrack = function (event) {
        var action = this.angularticsAction;
        var properties = __assign$1({}, this.angularticsProperties, { eventType: event.type });
        if (this.angularticsCategory) {
            properties.category = this.angularticsCategory;
        }
        if (this.angularticsLabel) {
            properties.label = this.angularticsLabel;
        }
        if (this.angularticsValue) {
            properties.value = this.angularticsValue;
        }
        this.angulartics2.eventTrack.next({
            action: action,
            properties: properties,
        });
    };
    Angulartics2On.decorators = [
        { type: Injectable },
        { type: Directive, args: [{ selector: '[angulartics2On]' },] },
    ];
    Angulartics2On.ctorParameters = function () { return [
        { type: ElementRef, },
        { type: Angulartics2, },
        { type: Renderer2, },
    ]; };
    Angulartics2On.propDecorators = {
        "angulartics2On": [{ type: Input, args: ['angulartics2On',] },],
        "angularticsAction": [{ type: Input },],
        "angularticsCategory": [{ type: Input },],
        "angularticsLabel": [{ type: Input },],
        "angularticsValue": [{ type: Input },],
        "angularticsProperties": [{ type: Input },],
    };
    return Angulartics2On;
}());
var Angulartics2OnModule = (function () {
    function Angulartics2OnModule() {
    }
    Angulartics2OnModule.decorators = [
        { type: NgModule, args: [{
                    declarations: [Angulartics2On],
                    exports: [Angulartics2On],
                },] },
    ];
    Angulartics2OnModule.ctorParameters = function () { return []; };
    return Angulartics2OnModule;
}());

var Angulartics2Module = (function () {
    function Angulartics2Module() {
    }
    Angulartics2Module.forRoot = function (providers, settings) {
        if (settings === void 0) { settings = {}; }
        return {
            ngModule: Angulartics2Module,
            providers: [
                { provide: ANGULARTICS2_TOKEN, useValue: { providers: providers, settings: settings } },
                Angulartics2,
                { provide: RouterlessTracking, useClass: AngularRouterTracking }
            ].concat(providers),
        };
    };
    Angulartics2Module.decorators = [
        { type: NgModule, args: [{
                    imports: [Angulartics2OnModule],
                    exports: [Angulartics2On],
                },] },
    ];
    Angulartics2Module.ctorParameters = function () { return []; };
    return Angulartics2Module;
}());

export { Angulartics2, Angulartics2Module, ANGULARTICS2_TOKEN, Angulartics2On, Angulartics2OnModule, RouterlessTracking, AngularRouterTracking, DefaultConfig };
//# sourceMappingURL=core.es5.js.map
