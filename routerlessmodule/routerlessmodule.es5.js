import { NgModule } from '@angular/core';
import { Angulartics2, Angulartics2OnModule, ANGULARTICS2_TOKEN, RouterlessTracking } from 'angulartics2';

var Angulartics2RouterlessModule = (function () {
    function Angulartics2RouterlessModule() {
    }
    Angulartics2RouterlessModule.forRoot = function (providers, settings) {
        if (settings === void 0) { settings = {}; }
        return {
            ngModule: Angulartics2RouterlessModule,
            providers: [
                { provide: ANGULARTICS2_TOKEN, useValue: { providers: providers, settings: settings } },
                RouterlessTracking,
                Angulartics2
            ].concat(providers),
        };
    };
    Angulartics2RouterlessModule.decorators = [
        { type: NgModule, args: [{
                    imports: [Angulartics2OnModule],
                },] },
    ];
    Angulartics2RouterlessModule.ctorParameters = function () { return []; };
    return Angulartics2RouterlessModule;
}());

export { Angulartics2RouterlessModule };
//# sourceMappingURL=routerlessmodule.es5.js.map
