(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('@angular/core'), require('@uirouter/core'), require('rxjs/Subject'), require('angulartics2')) :
	typeof define === 'function' && define.amd ? define(['exports', '@angular/core', '@uirouter/core', 'rxjs/Subject', 'angulartics2'], factory) :
	(factory((global.angulartics2 = global.angulartics2 || {}, global.angulartics2.uiroutermodule = {}),global.ng.core,global['@uirouter/core'],global.Rx,global.angulartics2));
}(this, (function (exports,core,core$1,Subject,angulartics2) { 'use strict';

var UIRouterTracking = (function () {
    function UIRouterTracking(transitionService) {
        this.transitionService = transitionService;
    }
    UIRouterTracking.prototype.path = function (trans) {
        return trans.$to().url.format(trans.params());
    };
    UIRouterTracking.prototype.trackLocation = function (settings) {
        var _this = this;
        var subject = new Subject.Subject();
        this.transitionService.onSuccess({}, function (trans) {
            return subject.next({ url: _this.path(trans) });
        }, {
            priority: -10000,
        });
        return subject;
    };
    UIRouterTracking.prototype.prepareExternalUrl = function (url) {
        return url;
    };
    UIRouterTracking.decorators = [
        { type: core.Injectable },
    ];
    UIRouterTracking.ctorParameters = function () { return [
        { type: core$1.TransitionService, },
    ]; };
    return UIRouterTracking;
}());

var Angulartics2UirouterModule = (function () {
    function Angulartics2UirouterModule() {
    }
    Angulartics2UirouterModule.forRoot = function (providers, settings) {
        if (settings === void 0) { settings = {}; }
        return {
            ngModule: Angulartics2UirouterModule,
            providers: [
                { provide: angulartics2.ANGULARTICS2_TOKEN, useValue: { providers: providers, settings: settings } },
                angulartics2.Angulartics2,
                { provide: angulartics2.RouterlessTracking, useClass: UIRouterTracking }
            ].concat(providers),
        };
    };
    Angulartics2UirouterModule.decorators = [
        { type: core.NgModule, args: [{
                    imports: [angulartics2.Angulartics2OnModule],
                },] },
    ];
    Angulartics2UirouterModule.ctorParameters = function () { return []; };
    return Angulartics2UirouterModule;
}());

exports.Angulartics2UirouterModule = Angulartics2UirouterModule;
exports.UIRouterTracking = UIRouterTracking;

Object.defineProperty(exports, '__esModule', { value: true });

})));
//# sourceMappingURL=uiroutermodule.umd.js.map
