(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('@angular/core'), require('angulartics2')) :
	typeof define === 'function' && define.amd ? define(['exports', '@angular/core', 'angulartics2'], factory) :
	(factory((global.angulartics2 = global.angulartics2 || {}, global.angulartics2.routerlessmodule = {}),global.ng.core,global.angulartics2));
}(this, (function (exports,core,angulartics2) { 'use strict';

var Angulartics2RouterlessModule = (function () {
    function Angulartics2RouterlessModule() {
    }
    Angulartics2RouterlessModule.forRoot = function (providers, settings) {
        if (settings === void 0) { settings = {}; }
        return {
            ngModule: Angulartics2RouterlessModule,
            providers: [
                { provide: angulartics2.ANGULARTICS2_TOKEN, useValue: { providers: providers, settings: settings } },
                angulartics2.RouterlessTracking,
                angulartics2.Angulartics2
            ].concat(providers),
        };
    };
    Angulartics2RouterlessModule.decorators = [
        { type: core.NgModule, args: [{
                    imports: [angulartics2.Angulartics2OnModule],
                },] },
    ];
    Angulartics2RouterlessModule.ctorParameters = function () { return []; };
    return Angulartics2RouterlessModule;
}());

exports.Angulartics2RouterlessModule = Angulartics2RouterlessModule;

Object.defineProperty(exports, '__esModule', { value: true });

})));
//# sourceMappingURL=routerlessmodule.umd.js.map
