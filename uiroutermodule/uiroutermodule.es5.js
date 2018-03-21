import { Injectable, NgModule } from '@angular/core';
import { TransitionService } from '@uirouter/core';
import { Subject } from 'rxjs/Subject';
import { Angulartics2, Angulartics2OnModule, ANGULARTICS2_TOKEN, RouterlessTracking } from 'angulartics2';

var UIRouterTracking = (function () {
    function UIRouterTracking(transitionService) {
        this.transitionService = transitionService;
    }
    UIRouterTracking.prototype.path = function (trans) {
        return trans.$to().url.format(trans.params());
    };
    UIRouterTracking.prototype.trackLocation = function (settings) {
        var _this = this;
        var subject = new Subject();
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
        { type: Injectable },
    ];
    UIRouterTracking.ctorParameters = function () { return [
        { type: TransitionService, },
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
                { provide: ANGULARTICS2_TOKEN, useValue: { providers: providers, settings: settings } },
                Angulartics2,
                { provide: RouterlessTracking, useClass: UIRouterTracking }
            ].concat(providers),
        };
    };
    Angulartics2UirouterModule.decorators = [
        { type: NgModule, args: [{
                    imports: [Angulartics2OnModule],
                },] },
    ];
    Angulartics2UirouterModule.ctorParameters = function () { return []; };
    return Angulartics2UirouterModule;
}());

export { Angulartics2UirouterModule, UIRouterTracking };
//# sourceMappingURL=uiroutermodule.es5.js.map
